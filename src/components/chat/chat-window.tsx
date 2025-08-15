'use client';

import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { handleChat } from '@/app/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, User, Sparkles } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface Message {
    id: string;
    role: 'user' | 'model';
    content: string;
}

export default function ChatWindow() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const handleInitialPrompt = async (prompt: string) => {
        setIsLoading(true);
        const userMessage: Message = { id: Date.now().toString(), role: 'user', content: prompt };
        setMessages([userMessage]);

        const historyForApi = [{ role: 'user' as const, content: prompt }];
        const response = await handleChat({ messages: historyForApi });

        if (response.success && response.data) {
            const botMessage: Message = { id: (Date.now() + 1).toString(), role: 'model', content: response.data.response };
            setMessages(prev => [...prev, botMessage]);
        } else {
            const errorMessage: Message = { id: (Date.now() + 1).toString(), role: 'model', content: response.error || "Sorry, something went wrong." };
            setMessages(prev => [...prev, errorMessage]);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        const initialPrompt = searchParams.get('prompt');
        if (initialPrompt && messages.length === 0) {
            handleInitialPrompt(initialPrompt);
        }
    }, [searchParams]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        const historyForApi = newMessages.map(msg => ({ role: msg.role, content: msg.content }));
        const response = await handleChat({ messages: historyForApi });

        if (response.success && response.data) {
            const botMessage: Message = { id: (Date.now() + 1).toString(), role: 'model', content: response.data.response };
            setMessages(prev => [...prev, botMessage]);
        } else {
            const errorMessage: Message = { id: (Date.now() + 1).toString(), role: 'model', content: response.error || "Sorry, something went wrong." };
            setMessages(prev => [...prev, errorMessage]);
        }
        setIsLoading(false);
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
    }, [messages]);

    return (
        <div className="flex flex-col h-full">
            <ScrollArea className="flex-1" ref={scrollAreaRef}>
                <div className="space-y-6 p-4">
                    {messages.map((message) => (
                        <div key={message.id} className={cn("flex items-start gap-4", message.role === 'user' ? 'justify-end' : '')}>
                            {message.role === 'model' && (
                                <Avatar className="w-8 h-8 border border-primary/50 bg-primary/20 text-primary">
                                    <AvatarFallback className="bg-transparent"><Sparkles size={20} /></AvatarFallback>
                                </Avatar>
                            )}
                            <div className={cn(
                                "max-w-xl p-4 rounded-2xl", 
                                message.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-secondary text-secondary-foreground rounded-bl-none'
                            )}>
                               <p className="whitespace-pre-wrap">{message.content}</p>
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
                <form onSubmit={handleSendMessage} className="relative">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask AlgroAI anything..."
                        className="pr-12 bg-secondary border-border focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:ring-2 rounded-xl"
                        disabled={isLoading}
                    />
                    <Button type="submit" size="icon" className="absolute top-1/2 right-2 -translate-y-1/2 h-8 w-8 bg-primary hover:bg-primary/90 rounded-full glow-shadow-primary transition-all hover:scale-110" disabled={isLoading}>
                        <ArrowRight size={20} />
                    </Button>
                </form>
                 <p className="text-xs text-center text-muted-foreground mt-2">AlgroAI can make mistakes. Consider checking important information.</p>
            </div>
        </div>
    );
}
