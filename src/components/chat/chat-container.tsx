
'use client';

import { useState, useEffect, useCallback } from 'react';
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
    isAutoTitled?: boolean; 
}

export default function ChatContainer() {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
    const [editingConversationId, setEditingConversationId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        const savedConversations = localStorage.getItem('chatConversations');
        if (savedConversations) {
            const parsedConversations: Conversation[] = JSON.parse(savedConversations);
            setConversations(parsedConversations);
             if (parsedConversations.length > 0 && !activeConversationId) {
                const lastActiveId = localStorage.getItem('lastActiveConversationId');
                if (lastActiveId && parsedConversations.some(c => c.id === lastActiveId)) {
                    setActiveConversationId(lastActiveId);
                } else if(parsedConversations.length > 0) {
                     setActiveConversationId(parsedConversations[0].id);
                }
            }
        }
    }, []);

    useEffect(() => {
        if (conversations.length > 0) {
            localStorage.setItem('chatConversations', JSON.stringify(conversations));
        } else {
            localStorage.removeItem('chatConversations');
            localStorage.removeItem('lastActiveConversationId');
        }
    }, [conversations]);

     useEffect(() => {
        if (activeConversationId) {
            localStorage.setItem('lastActiveConversationId', activeConversationId);
        }
     }, [activeConversationId]);
    
    const createNewConversation = useCallback(() => {
        const newConversation: Conversation = {
            id: Date.now().toString(),
            title: 'New Chat',
            messages: [],
            isAutoTitled: true,
        };
        setConversations(prev => [newConversation, ...prev]);
        setActiveConversationId(newConversation.id);
        return newConversation;
    }, []);

    const handleInitialPrompt = useCallback((prompt: string) => {
        if (conversations.length === 0) {
             handleSendMessage(prompt, true);
        }
    }, [conversations.length]);

    useEffect(() => {
        const initialPrompt = searchParams.get('prompt');
        if (initialPrompt && conversations.length === 0) {
             handleInitialPrompt(initialPrompt);
        }
    }, [searchParams, conversations.length, handleInitialPrompt]);

    const handleSendMessage = async (message: string, isNewChat: boolean = false) => {
        let currentConversationId = activeConversationId;
        
        if (isNewChat || !currentConversationId) {
            const newConversation = createNewConversation();
            currentConversationId = newConversation.id;
        }

        if (!currentConversationId) return;

        const userMessage: Message = { id: Date.now().toString(), role: 'user', content: message };
        
        const currentConvo = conversations.find(c => c.id === currentConversationId);
        const isFirstMessage = !currentConvo || currentConvo.messages.length === 0;

        setConversations(prev =>
            prev.map(c =>
                c.id === currentConversationId ? { ...c, messages: [...c.messages, userMessage] } : c
            )
        );
        setIsLoading(true);

        const updatedHistory = [...(currentConvo?.messages || []), userMessage];
        const historyForApi = updatedHistory.map(msg => ({ role: msg.role, content: msg.content }));
        
        const chatPromise = handleChat({ messages: historyForApi });
        
        const shouldSummarize = isFirstMessage && currentConvo?.isAutoTitled;
        
        const summaryPromise = shouldSummarize
            ? handleSummarize({ message: message })
            : Promise.resolve(null);

        try {
            const [response, summaryResponse] = await Promise.all([chatPromise, summaryPromise]);
            
            if (summaryResponse && summaryResponse.success && summaryResponse.data) {
                 setConversations(prev => prev.map(c => 
                    c.id === currentConversationId ? { ...c, title: summaryResponse.data.title, isAutoTitled: true } : c
                ));
            }
            
            if (response.success && response.data) {
                const botMessage: Message = { id: (Date.now() + 1).toString(), role: 'model', content: response.data.response };
                setConversations(prev =>
                    prev.map(c =>
                        c.id === currentConversationId ? { ...c, messages: [...c.messages, botMessage] } : c
                    )
                );
            } else {
                const errorMessage: Message = { id: (Date.now() + 1).toString(), role: 'model', content: response.error || "Sorry, something went wrong." };
                setConversations(prev =>
                    prev.map(c =>
                        c.id === currentConversationId ? { ...c, messages: [...c.messages, errorMessage] } : c
                    )
                );
            }
        } catch (error) {
            console.error("Error handling message:", error);
            const errorMessage: Message = { id: (Date.now() + 1).toString(), role: 'model', content: "An unexpected error occurred." };
            setConversations(prev =>
                prev.map(c =>
                    c.id === currentConversationId ? { ...c, messages: [...c.messages, errorMessage] } : c
                )
            );
        } finally {
            setIsLoading(false);
        }
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
        setConversations(prev => prev.map(c => c.id === id ? { ...c, title: newTitle, isAutoTitled: false } : c));
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
                onSendMessage={(message) => handleSendMessage(message, !activeConversationId)}
                onNewChat={handleNewChat}
            />
        </ChatLayout>
    );
}
