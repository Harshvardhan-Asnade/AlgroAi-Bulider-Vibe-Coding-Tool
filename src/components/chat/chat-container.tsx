
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
            if (parsedConversations.length > 0) {
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
        };
        setConversations(prev => [newConversation, ...prev]);
        setActiveConversationId(newConversation.id);
        return newConversation;
    };

    const handleInitialPrompt = async (prompt: string) => {
        setIsLoading(true);
        const userMessage: Message = { id: Date.now().toString(), role: 'user', content: prompt };
        
        // Create a new conversation with a temporary title
        const newConversation = createNewConversation('New Chat', userMessage);

        const historyForApi = [{ role: 'user' as const, content: prompt }];
        const [response, summaryResponse] = await Promise.all([
            handleChat({ messages: historyForApi }),
            handleSummarize({ message: prompt })
        ]);

        if (summaryResponse.success && summaryResponse.data) {
            setConversations(prev => prev.map(c => 
                c.id === newConversation.id ? { ...c, title: summaryResponse.data.title } : c
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
        // Only trigger if there's a prompt and no conversations have started from it yet.
        if (initialPrompt && conversations.length === 0) {
             handleInitialPrompt(initialPrompt);
        }
    }, [searchParams]);

    const handleSendMessage = async (message: string) => {
        if (!activeConversationId) return;

        const userMessage: Message = { id: Date.now().toString(), role: 'user', content: message };

        setConversations(prev =>
            prev.map(c =>
                c.id === activeConversationId ? { ...c, messages: [...c.messages, userMessage] } : c
            )
        );
        setIsLoading(true);

        const currentConversation = conversations.find(c => c.id === activeConversationId);
        const historyForApi = [...(currentConversation?.messages || []), userMessage].map(msg => ({ role: msg.role, content: msg.content }));

        const response = await handleChat({ messages: historyForApi });

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
        const newConversation = createNewConversation();
    };

    const handleSwitchConversation = (id: string) => {
        setEditingConversationId(null);
        setActiveConversationId(id);
    };

    const handleDeleteConversation = (id: string) => {
        setConversations(prev => prev.filter(c => c.id !== id));
        if (activeConversationId === id) {
            setActiveConversationId(conversations.length > 1 ? conversations.filter(c => c.id !== id)[0].id : null);
        }
    };

    const handleRenameConversation = (id: string, newTitle: string) => {
        setConversations(prev => prev.map(c => c.id === id ? { ...c, title: newTitle } : c));
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
            />
        </ChatLayout>
    );
}
