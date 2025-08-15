'use client';

import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Download, PlusCircle, Trash2, CodeXml } from 'lucide-react';
import ChatWindow from './chat-window';
import Link from 'next/link';

export default function ChatLayout() {
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
           <Button variant="ghost" size="sm" className="w-full justify-start gap-2 mb-2">
                <PlusCircle /> <span className="group-data-[collapsible=icon]:hidden">New Chat</span>
           </Button>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton isActive>
                      My First Chat
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton>
                      Another Conversation
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col h-screen bg-background">
            <header className="flex items-center justify-between p-3 border-b border-border/10">
                <div className="flex items-center gap-2">
                    <SidebarTrigger />
                    <h1 className="text-lg font-semibold font-headline">AlgroAI Chat</h1>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm"><Download className="h-4 w-4 mr-2" /> Export</Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4 mr-2" /> Delete</Button>
                </div>
            </header>
            <ChatWindow />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
