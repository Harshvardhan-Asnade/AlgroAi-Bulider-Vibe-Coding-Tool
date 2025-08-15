'use client';

import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Download, PlusCircle, Trash2, CodeXml, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import type { Conversation } from './chat-container';

interface ChatLayoutProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onNewChat: () => void;
  onSwitchConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  children: React.ReactNode;
}

export default function ChatLayout({
  conversations,
  activeConversationId,
  onNewChat,
  onSwitchConversation,
  onDeleteConversation,
  children,
}: ChatLayoutProps) {
  
  const activeConversation = conversations.find(c => c.id === activeConversationId);

  return (
    <SidebarProvider>
      <Sidebar side="left" collapsible="icon" variant="sidebar">
        <SidebarHeader className="border-b border-sidebar-border">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold p-2">
            <CodeXml className="h-6 w-6 text-primary glow-shadow-primary" />
            <span className="text-white group-data-[collapsible=icon]:hidden">AlgroAI</span>
          </Link>
        </SidebarHeader>
        <SidebarContent className="p-2">
           <Button variant="ghost" size="sm" className="w-full justify-start gap-2 mb-2" onClick={onNewChat}>
                <PlusCircle /> <span className="group-data-[collapsible=icon]:hidden">New Chat</span>
           </Button>
            <SidebarMenu>
                {conversations.map((convo) => (
                  <SidebarMenuItem key={convo.id}>
                    <SidebarMenuButton 
                      isActive={convo.id === activeConversationId}
                      onClick={() => onSwitchConversation(convo.id)}
                      className="group/item"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span className="truncate flex-1">{convo.title}</span>
                       <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 group-hover/item:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteConversation(convo.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col h-screen bg-background">
            <header className="flex items-center justify-between p-3 border-b border-border/10">
                <div className="flex items-center gap-2">
                    <SidebarTrigger />
                    <h1 className="text-lg font-semibold font-headline">{activeConversation?.title || "AlgroAI Chat"}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" disabled={!activeConversationId}><Download className="h-4 w-4 mr-2" /> Export</Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-destructive hover:text-destructive" 
                      disabled={!activeConversationId}
                      onClick={() => activeConversationId && onDeleteConversation(activeConversationId)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" /> Delete
                    </Button>
                </div>
            </header>
            {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
