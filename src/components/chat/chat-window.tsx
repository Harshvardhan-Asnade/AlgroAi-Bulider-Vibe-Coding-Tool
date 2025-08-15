
'use client';

import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, User, Sparkles, MessageSquare } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Conversation, Message } from './chat-container';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatWindowProps {
    activeConversation: Conversation | null;
    isLoading: boolean;
    onSendMessage: (message: string, isNewChat?: boolean) => Promise<void>;
    onNewChat: () => void;
}

export default function ChatWindow({ activeConversation, isLoading, onSendMessage, onNewChat }: ChatWindowProps) {
    const [input, setInput] = useState('');
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const handleSendMessageSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        
        const messageToSend = input;
        setInput('');
        await onSendMessage(messageToSend, !activeConversation);
    };

     useEffect(() => {
        if (scrollAreaRef.current) {
            const scrollableNode = scrollAreaRef.current.querySelector(':first-child') as HTMLElement;
            if(scrollableNode) {
                scrollableNode.scrollTo({
                    top: scrollableNode.scrollHeight,
                    behavior: 'smooth',
                });
            }
        }
    }, [activeConversation?.messages, isLoading]);


    const handleInitialSend = async (prompt: string) => {
        // This now correctly ensures a new chat is created before sending the prompt.
        const isNewChat = !activeConversation;
        if (isNewChat) {
          onNewChat();
        }
        // Use a timeout to allow the state to update from onNewChat before sending.
        setTimeout(() => {
          onSendMessage(prompt, true);
        }, 0);
    }

    // Placeholder for when there's no active conversation
    if (!activeConversation) {
        return (
            <div className="flex-1 flex flex-col">
                 <div className="flex flex-1 flex-col items-center justify-center text-center p-4">
                    <MessageSquare size={48} className="text-muted-foreground mb-4" />
                    <h2 className="text-2xl font-semibold font-headline">Start a Conversation</h2>
                    <p className="text-muted-foreground mt-2 max-w-md">You can ask me anything, from explaining complex topics to helping you write code.</p>
                     <div className="mt-8 flex flex-wrap justify-center items-center gap-2 max-w-3xl">
                          <span className="text-sm text-muted-foreground mr-2">Try an example:</span>
                          {[
                            "Plan a 5-day trip to Japan",
                            "Python script for bubble sort",
                            "Help with password recovery",
                            "Explain mitosis vs. meiosis",
                            "Top 3 smartphones under ₹20k",
                            "Weekly diet plan for better sleep",
                            "Email for a deadline extension",
                            "To-do list for today"
                          ].map((prompt) => (
                            <button
                                key={prompt}
                                onClick={() => handleInitialSend(prompt)}
                                disabled={isLoading}
                                className="text-sm text-muted-foreground hover:text-primary hover:border-primary/50 border border-muted-foreground/20 rounded-full px-3 py-1 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                            >
                                {prompt}
                            </button>
                          ))}
                      </div>
                </div>
                <div className="p-4 border-t border-border/10 bg-background/50 backdrop-blur-sm">
                    <form id="chat-form" onSubmit={handleSendMessageSubmit} className="relative">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask AlgroAI anything..."
                            className={cn(
                                "pr-12 bg-secondary border-border focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:ring-2 rounded-xl transition-all",
                                input.length > 0 ? "border-primary/50 scale-[1.02]" : ""
                            )}
                            disabled={isLoading}
                        />
                        <Button type="submit" size="icon" className="absolute top-1/2 right-2 -translate-y-1/2 h-8 w-8 bg-primary hover:bg-primary/90 rounded-full glow-shadow-primary transition-all hover:scale-110" disabled={isLoading || !input.trim()}>
                            <ArrowRight size={20} />
                        </Button>
                    </form>
                    <p className="text-xs text-center text-muted-foreground mt-2">AlgroAI can make mistakes. Consider checking important information.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <ScrollArea className="flex-1" ref={scrollAreaRef}>
                <div className="space-y-6 p-4">
                    {activeConversation.messages.map((message) => (
                        <div key={message.id} className={cn("flex items-start gap-4", message.role === 'user' ? 'justify-end' : '')}>
                            {message.role === 'model' && (
                                <Avatar className="w-8 h-8 border border-primary/50 bg-primary/20 text-primary">
                                    <AvatarFallback className="bg-transparent"><Sparkles size={20} /></AvatarFallback>
                                </Avatar>
                            )}
                            <div className={cn(
                                "max-w-xl p-4 rounded-2xl prose prose-sm prose-invert", 
                                message.role === 'user' 
                                ? 'bg-primary text-primary-foreground rounded-br-none' 
                                : 'bg-secondary text-secondary-foreground rounded-bl-none',
                                'prose-headings:text-foreground prose-p:text-foreground prose-a:text-primary prose-strong:text-foreground prose-blockquote:text-muted-foreground prose-table:text-foreground'
                            )}>
                               <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {message.content}
                               </ReactMarkdown>
                            </div>
                            {message.role === 'user' && (
                                <Avatar className="w-8 h-8 border border-border">
                                    <AvatarFallback><User size={20} /></AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-start gap-4">
                            <Avatar className="w-8 h-8 border border-primary/50 bg-primary/20 text-primary">
                                <AvatarFallback className="bg-transparent"><Sparkles size={20} /></AvatarFallback>
                            </Avatar>
                            <div className="max-w-xl p-4 rounded-2xl bg-secondary text-secondary-foreground rounded-bl-none">
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 bg-primary rounded-full animate-pulse" style={{animationDelay: '0s'}} />
                                    <span className="h-2 w-2 bg-primary rounded-full animate-pulse" style={{animationDelay: '0.2s'}}/>
                                    <span className="h-2 w-2 bg-primary rounded-full animate-pulse" style={{animationDelay: '0.4s'}}/>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>
            <div className="p-4 border-t border-border/10 bg-background/50 backdrop-blur-sm">
                <form id="chat-form" onSubmit={handleSendMessageSubmit} className="relative">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask AlgroAI anything..."
                        className={cn(
                            "pr-12 bg-secondary border-border focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:ring-2 rounded-xl transition-all",
                            input.length > 0 ? "border-primary/50 scale-[1.02]" : ""
                        )}
                        disabled={isLoading}
                    />
                    <Button type="submit" size="icon" className="absolute top-1/2 right-2 -translate-y-1/2 h-8 w-8 bg-primary hover:bg-primary/90 rounded-full glow-shadow-primary transition-all hover:scale-110" disabled={isLoading || !input.trim()}>
                        <ArrowRight size={20} />
                    </Button>
                </form>
                 <p className="text-xs text-center text-muted-foreground mt-2">AlgroAI can make mistakes. Consider checking important information.</p>
            </div>
        </div>
    );
}
