
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { handleChat, handleSummarize } from '@/app/actions';
import ChatLayout from './chat-layout';
import ChatWindow from './chat-window';

export interface Message {
    id: string;
    role: 'user' | 'model';
    content: string;
}

export interface Conversation {
    id: string;
    title: string;
    messages: Message[];
    isAutoTitled?: boolean; // Track if the title was set by AI
}

export default function ChatContainer() {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
    const [editingConversationId, setEditingConversationId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();

    // Load conversations from local storage on initial render
    useEffect(() => {
        const savedConversations = localStorage.getItem('chatConversations');
        if (savedConversations) {
            const parsedConversations = JSON.parse(savedConversations);
            setConversations(parsedConversations);
            if (parsedConversations.length > 0 && !activeConversationId) {
                setActiveConversationId(parsedConversations[0].id);
            }
        }
    }, []);

    // Save conversations to local storage whenever they change
    useEffect(() => {
        if (conversations.length > 0) {
            localStorage.setItem('chatConversations', JSON.stringify(conversations));
        } else {
            localStorage.removeItem('chatConversations');
        }
    }, [conversations]);
    
    const createNewConversation = (title: string = 'New Chat', initialMessage?: Message) => {
        const newConversation: Conversation = {
            id: Date.now().toString(),
            title: title,
            messages: initialMessage ? [initialMessage] : [],
            isAutoTitled: false,
        };
        setConversations(prev => [newConversation, ...prev]);
        setActiveConversationId(newConversation.id);
        return newConversation;
    };

    const handleInitialPrompt = async (prompt: string) => {
        setIsLoading(true);
        const userMessage: Message = { id: Date.now().toString(), role: 'user', content: prompt };
        
        const newConversation = createNewConversation('New Chat', userMessage);

        const historyForApi = [{ role: 'user' as const, content: prompt }];
        const [response, summaryResponse] = await Promise.all([
            handleChat({ messages: historyForApi }),
            handleSummarize({ message: prompt })
        ]);

        if (summaryResponse.success && summaryResponse.data) {
            setConversations(prev => prev.map(c => 
                c.id === newConversation.id ? { ...c, title: summaryResponse.data.title, isAutoTitled: true } : c
            ));
        }

        if (response.success && response.data) {
            const botMessage: Message = { id: (Date.now() + 1).toString(), role: 'model', content: response.data.response };
            setConversations(prev => prev.map(c => 
                c.id === newConversation.id ? { ...c, messages: [...c.messages, botMessage] } : c
            ));
        } else {
            const errorMessage: Message = { id: (Date.now() + 1).toString(), role: 'model', content: response.error || "Sorry, something went wrong." };
            setConversations(prev => prev.map(c => 
                c.id === newConversation.id ? { ...c, messages: [...c.messages, errorMessage] } : c
            ));
        }
        setIsLoading(false);
    };

    useEffect(() => {
        const initialPrompt = searchParams.get('prompt');
        // Only trigger if there's a prompt and no conversations have started.
        if (initialPrompt && conversations.length === 0) {
             handleInitialPrompt(initialPrompt);
        }
    }, [searchParams]);

    const handleSendMessage = async (message: string) => {
        if (!activeConversationId) return;

        const userMessage: Message = { id: Date.now().toString(), role: 'user', content: message };

        const currentConversation = conversations.find(c => c.id === activeConversationId);
        const isFirstMessage = currentConversation?.messages.length === 0;

        // Update conversation with the new user message first
        setConversations(prev =>
            prev.map(c =>
                c.id === activeConversationId ? { ...c, messages: [...c.messages, userMessage] } : c
            )
        );
        setIsLoading(true);

        const updatedConversation = conversations.find(c => c.id === activeConversationId);
        const historyForApi = [...(updatedConversation?.messages || []), userMessage].map(msg => ({ role: msg.role, content: msg.content }));

        const chatPromise = handleChat({ messages: historyForApi });
        
        // Only summarize if it's the first message and the title hasn't been manually set
        const summaryPromise = (isFirstMessage && !currentConversation?.isAutoTitled)
            ? handleSummarize({ message: message })
            : Promise.resolve(null);

        const [response, summaryResponse] = await Promise.all([chatPromise, summaryPromise]);

        if (summaryResponse && summaryResponse.success && summaryResponse.data) {
             setConversations(prev => prev.map(c => 
                c.id === activeConversationId ? { ...c, title: summaryResponse.data.title, isAutoTitled: true } : c
            ));
        }
        
        if (response.success && response.data) {
            const botMessage: Message = { id: (Date.now() + 1).toString(), role: 'model', content: response.data.response };
            setConversations(prev =>
                prev.map(c =>
                    c.id === activeConversationId ? { ...c, messages: [...c.messages, botMessage] } : c
                )
            );
        } else {
            const errorMessage: Message = { id: (Date.now() + 1).toString(), role: 'model', content: response.error || "Sorry, something went wrong." };
            setConversations(prev =>
                prev.map(c =>
                    c.id === activeConversationId ? { ...c, messages: [...c.messages, errorMessage] } : c
                )
            );
        }
        setIsLoading(false);
    };

    const handleNewChat = () => {
        createNewConversation();
    };

    const handleSwitchConversation = (id: string) => {
        setEditingConversationId(null);
        setActiveConversationId(id);
    };

    const handleDeleteConversation = (id: string) => {
        setConversations(prev => {
            const newConversations = prev.filter(c => c.id !== id);
            if (activeConversationId === id) {
                setActiveConversationId(newConversations.length > 0 ? newConversations[0].id : null);
            }
            return newConversations;
        });
    };

    const handleRenameConversation = (id: string, newTitle: string) => {
        setConversations(prev => prev.map(c => c.id === id ? { ...c, title: newTitle, isAutoTitled: false } : c)); // Set isAutoTitled to false on manual rename
        setEditingConversationId(null);
    }
    
    const activeConversation = conversations.find(c => c.id === activeConversationId) || null;

    return (
        <ChatLayout
            conversations={conversations}
            activeConversationId={activeConversationId}
            editingConversationId={editingConversationId}
            onNewChat={handleNewChat}
            onSwitchConversation={handleSwitchConversation}
            onDeleteConversation={handleDeleteConversation}
            onStartRename={setEditingConversationId}
            onRenameConversation={handleRenameConversation}
        >
            <ChatWindow 
                activeConversation={activeConversation}
                isLoading={isLoading}
                onSendMessage={handleSendMessage}
                onNewChat={handleNewChat}
            />
        </ChatLayout>
    );
}
