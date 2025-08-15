
'use client';

import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, User, Sparkles, MessageSquare, Bot, FileText, BarChart, Settings } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Conversation, Message } from './chat-container';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface ChatWindowProps {
    activeConversation: Conversation | null;
    isLoading: boolean;
    onSendMessage: (message: string, isNewChat?: boolean) => Promise<void>;
    onNewChat: () => void;
}

const examplePrompts = [
    { icon: FileText, text: "Summarize my last meeting" },
    { icon: BarChart, text: "Analyze the Q3 sales data" },
    { icon: Bot, text: "Draft a follow-up email" },
    { icon: Settings, text: "Explain the new API endpoint" },
];


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
        const isNewChat = !activeConversation;
        await onSendMessage(prompt, isNewChat);
    }

    if (!activeConversation) {
        return (
            <div className="flex-1 flex flex-col justify-end p-4 md:p-8">
                 <div className="max-w-3xl mx-auto w-full">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold font-headline text-foreground">Welcome back! 👋</h1>
                        <p className="text-lg text-muted-foreground mt-2">How can I help you today?</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {examplePrompts.map((prompt) => (
                           <button
                             key={prompt.text}
                             onClick={() => handleInitialSend(prompt.text)}
                             disabled={isLoading}
                             className="text-left p-4 rounded-lg border border-border/20 bg-secondary/30 hover:bg-secondary/80 transition-colors disabled:opacity-50"
                           >
                              <div className="flex items-center gap-3">
                                <prompt.icon className="h-5 w-5 text-primary" />
                                <p className="font-semibold">{prompt.text}</p>
                              </div>
                           </button>
                        ))}
                    </div>
                </div>
                
                <div className="p-4 border-t border-border/10 bg-background/50 backdrop-blur-sm">
                    <form id="chat-form" onSubmit={handleSendMessageSubmit} className="relative max-w-3xl mx-auto">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask or search for anything..."
                            className="pr-12 h-12 bg-secondary/50 border-border/30 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:ring-2 rounded-xl transition-all"
                            disabled={isLoading}
                        />
                        <Button type="submit" size="icon" className="absolute top-1/2 right-2.5 -translate-y-1/2 h-8 w-8 bg-primary hover:bg-primary/90 rounded-full glow-shadow-primary transition-all hover:scale-110" disabled={isLoading || !input.trim()}>
                            <ArrowRight size={20} />
                        </Button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <ScrollArea className="flex-1" ref={scrollAreaRef}>
                <div className="space-y-6 p-4 md:p-8 max-w-3xl mx-auto">
                    {activeConversation.messages.map((message) => (
                        <div key={message.id} className={cn("flex items-start gap-4", message.role === 'user' ? 'justify-end' : '')}>
                            {message.role === 'model' && (
                                <Avatar className="w-8 h-8 border border-primary/50 bg-primary/20 text-primary">
                                    <AvatarFallback className="bg-transparent"><Sparkles size={20} /></AvatarFallback>
                                </Avatar>
                            )}
                            <div className={cn(
                                "max-w-xl p-4 rounded-xl prose prose-sm prose-invert", 
                                message.role === 'user' 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-secondary text-secondary-foreground',
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
                        <div className="flex items-start gap-4 max-w-3xl mx-auto">
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
                 <form id="chat-form" onSubmit={handleSendMessageSubmit} className="relative max-w-3xl mx-auto">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask or search for anything..."
                        className="pr-12 h-12 bg-secondary/50 border-border/30 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:ring-2 rounded-xl transition-all"
                        disabled={isLoading}
                    />
                    <Button type="submit" size="icon" className="absolute top-1/2 right-2.5 -translate-y-1/2 h-8 w-8 bg-primary hover:bg-primary/90 rounded-full glow-shadow-primary transition-all hover:scale-110" disabled={isLoading || !input.trim()}>
                        <ArrowRight size={20} />
                    </Button>
                </form>
            </div>
        </div>
    );
}

    