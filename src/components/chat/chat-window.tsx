
'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, User, Sparkles, Bot, FileText, BarChart, Settings, Copy, Check } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Conversation, Message } from './chat-container';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { AnimatePresence, motion } from 'framer-motion';

interface ChatWindowProps {
    activeConversation: Conversation | null;
    isLoading: boolean;
    onSendMessage: (message: string, isNewChat?: boolean) => Promise<void>;
}

const examplePrompts = [
    { icon: Bot, text: "Explain what an LLM is" },
    { icon: FileText, text: "Draft an email to my team" },
    { icon: BarChart, text: "Analyze Q3 sales data" },
    { icon: Settings, text: "How to set up a new project?" },
];

function TypingEffect({ text }: { text: string }) {
    const [displayedText, setDisplayedText] = useState('');
    
    useEffect(() => {
        setDisplayedText(''); // Reset when text changes
        if (text) {
            let i = 0;
            const intervalId = setInterval(() => {
                setDisplayedText(text.slice(0, i + 1));
                i++;
                if (i >= text.length) {
                    clearInterval(intervalId);
                }
            }, 20); // Adjust speed of typing here
            return () => clearInterval(intervalId);
        }
    }, [text]);

    return <ReactMarkdown remarkPlugins={[remarkGfm]}>{displayedText}</ReactMarkdown>;
}

function WelcomeScreen({ onPromptClick }: { onPromptClick: (prompt: string) => void }) {
    return (
        <div className="flex-1 flex flex-col justify-center items-center p-4 md:p-8 bg-background">
             <div className="max-w-3xl mx-auto w-full text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Avatar className="w-16 h-16 mx-auto mb-4 border-2 border-primary/30 bg-primary/10 text-primary">
                        <AvatarFallback className="bg-transparent"><Sparkles size={32} /></AvatarFallback>
                    </Avatar>
                    <h1 className="text-4xl font-bold font-headline text-foreground">Welcome back!</h1>
                    <p className="text-lg text-muted-foreground mt-2">How can I help you today?</p>
                </motion.div>

                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {examplePrompts.map((prompt, index) => (
                       <motion.button
                         key={prompt.text}
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                         whileHover={{ y: -5, boxShadow: '0px 10px 20px hsla(var(--primary) / 0.1)' }}
                         onClick={() => onPromptClick(prompt.text)}
                         className="text-left p-4 rounded-xl border border-border/20 bg-secondary/30 hover:bg-secondary/80 transition-all"
                       >
                          <div className="flex items-center gap-3">
                            <prompt.icon className="h-5 w-5 text-primary" />
                            <p className="font-semibold">{prompt.text}</p>
                          </div>
                       </motion.button>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

function MessageContent({ content }: { content: string }) {
    const formattedContent = useMemo(() => {
        try {
            const parsed = JSON.parse(content);
            if (Array.isArray(parsed) && parsed.every(item => item.day && item.location && item.activities)) {
                return parsed.map(day => 
                    `### Day ${day.day}: ${day.location}\n\n` +
                    day.activities.map((activity: string) => `- ${activity}`).join('\n')
                ).join('\n\n');
            }
        } catch (e) {
            // Not a JSON object we can format, return as is.
        }
        return content;
    }, [content]);

    return <ReactMarkdown remarkPlugins={[remarkGfm]}>{formattedContent}</ReactMarkdown>;
}


function ActiveChat({ conversation, isLoading }: { conversation: Conversation, isLoading: boolean }) {
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

    const handleCopy = (content: string, messageId: string) => {
        let textToCopy = content;
         try {
            const parsed = JSON.parse(content);
            if (Array.isArray(parsed) && parsed.every(item => item.day && item.location && item.activities)) {
                textToCopy = parsed.map((day: any) => 
                    `### Day ${day.day}: ${day.location}\n\n` +
                    day.activities.map((activity: string) => `- ${activity}`).join('\n')
                ).join('\n\n');
            }
        } catch (e) {
            // Not a special JSON, copy as is
        }

        navigator.clipboard.writeText(textToCopy);
        setCopiedMessageId(messageId);
        setTimeout(() => setCopiedMessageId(null), 2000);
    };

    const scrollToBottom = () => {
         if (scrollAreaRef.current) {
            const scrollableNode = scrollAreaRef.current.querySelector(':first-child') as HTMLElement;
            if(scrollableNode) {
                scrollableNode.scrollTo({
                    top: scrollableNode.scrollHeight,
                });
            }
        }
    }

     useEffect(() => {
        scrollToBottom();
    }, [conversation.messages, isLoading]);

    const MemoizedLastMessage = useMemo(() => {
        if (conversation.messages.length === 0) return null;
        const lastMessage = conversation.messages[conversation.messages.length - 1];
        if (lastMessage.role === 'model') {
            return <TypingEffect text={lastMessage.content} />;
        }
        return <MessageContent content={lastMessage.content} />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conversation.messages[conversation.messages.length - 1]?.content]);
    
    useEffect(() => {
        if(conversation.messages.length) {
          const lastMessage = conversation.messages[conversation.messages.length-1]
          if (lastMessage.role === 'model') {
             scrollToBottom()
          }
        }
    }, [MemoizedLastMessage, conversation.messages]);

    return (
        <ScrollArea className="flex-1" ref={scrollAreaRef}>
            <div className="space-y-6 p-4 md:p-8 max-w-3xl mx-auto">
                <AnimatePresence initial={false}>
                {conversation.messages.slice(0, -1).map((message) => (
                    <motion.div 
                      key={message.id} 
                      className={cn("group flex items-start gap-4 relative")}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                        {message.role === 'model' && (
                            <Avatar className="w-8 h-8 border border-primary/50 bg-primary/20 text-primary">
                                <AvatarFallback className="bg-transparent"><Sparkles size={20} /></AvatarFallback>
                            </Avatar>
                        )}
                        <div className={cn(
                            "max-w-2xl p-4 rounded-xl prose prose-sm prose-invert", 
                            message.role === 'user' 
                            ? 'ml-auto bg-gradient-to-br from-primary to-accent/80 text-primary-foreground' 
                            : 'bg-secondary text-secondary-foreground',
                            'prose-headings:text-foreground prose-p:text-foreground prose-a:text-primary prose-strong:text-foreground prose-blockquote:text-muted-foreground prose-table:text-foreground'
                        )}>
                           <MessageContent content={message.content} />
                        </div>
                        {message.role === 'user' && (
                            <Avatar className="w-8 h-8 border border-border">
                                <AvatarFallback><User size={20} /></AvatarFallback>
                            </Avatar>
                        )}
                        <Button
                            size="icon"
                            variant="ghost"
                            className="absolute bottom-2 right-12 h-7 w-7 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleCopy(message.content, message.id)}
                        >
                            {copiedMessageId === message.id ? <Check size={16} className="text-primary" /> : <Copy size={16} />}
                        </Button>
                    </motion.div>
                ))}
                </AnimatePresence>
                 {conversation.messages.length > 0 && (
                      <motion.div 
                        key={conversation.messages[conversation.messages.length - 1].id}
                        className={cn("group flex items-start gap-4 relative")}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                         {conversation.messages[conversation.messages.length - 1].role === 'model' && (
                            <Avatar className="w-8 h-8 border border-primary/50 bg-primary/20 text-primary">
                                <AvatarFallback className="bg-transparent"><Sparkles size={20} /></AvatarFallback>
                            </Avatar>
                        )}
                        <div className={cn(
                            "max-w-2xl p-4 rounded-xl prose prose-sm prose-invert", 
                            conversation.messages[conversation.messages.length - 1].role === 'user'
                            ? 'ml-auto bg-gradient-to-br from-primary to-accent/80 text-primary-foreground' 
                            : 'bg-secondary text-secondary-foreground',
                            'prose-headings:text-foreground prose-p:text-foreground prose-a:text-primary prose-strong:text-foreground prose-blockquote:text-muted-foreground prose-table:text-foreground'
                        )}>
                           {MemoizedLastMessage}
                        </div>
                         {conversation.messages[conversation.messages.length - 1].role === 'user' && (
                            <Avatar className="w-8 h-8 border border-border">
                                <AvatarFallback><User size={20} /></AvatarFallback>
                            </Avatar>
                        )}
                         <Button
                            size="icon"
                            variant="ghost"
                            className="absolute bottom-2 right-12 h-7 w-7 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleCopy(conversation.messages[conversation.messages.length - 1].content, conversation.messages[conversation.messages.length - 1].id)}
                        >
                            {copiedMessageId === conversation.messages[conversation.messages.length - 1].id ? <Check size={16} className="text-primary" /> : <Copy size={16} />}
                        </Button>
                    </motion.div>
                 )}
                {isLoading && (
                    <div className="flex items-start gap-4 justify-center">
                        <div className="loader-wrapper">
                          <span className="loader-letter">G</span>
                          <span className="loader-letter">e</span>
                          <span className="loader-letter">n</span>
                          <span className="loader-letter">e</span>
                          <span className="loader-letter">r</span>
                          <span className="loader-letter">a</span>
                          <span className="loader-letter">t</span>
                          <span className="loader-letter">i</span>
                          <span className="loader-letter">n</span>
                          <span className="loader-letter">g</span>
                          <div className="loader"></div>
                        </div>
                    </div>
                )}
            </div>
        </ScrollArea>
    );
}

export default function ChatWindow({ activeConversation, isLoading, onSendMessage }: ChatWindowProps) {
    const [input, setInput] = useState('');

    const handleSendMessageSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        
        const messageToSend = input;
        setInput('');
        await onSendMessage(messageToSend, !activeConversation);
    };

    const handlePromptClick = (prompt: string) => {
        if (isLoading) return;
        setInput(prompt);
        // We need a small delay to allow React to update the input's value
        // before we programmatically submit the form.
        setTimeout(() => {
            const form = document.getElementById('chat-form') as HTMLFormElement;
            form?.requestSubmit();
        }, 100);
    }

    return (
        <div className="flex flex-col h-full bg-background">
            <div className="flex-1 flex flex-col overflow-hidden">
                {activeConversation && activeConversation.messages.length > 0 ? (
                    <ActiveChat conversation={activeConversation} isLoading={isLoading} />
                ) : (
                    <WelcomeScreen onPromptClick={handlePromptClick} />
                )}
            </div>
            <div className="p-4 border-t border-border/10 bg-transparent">
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
