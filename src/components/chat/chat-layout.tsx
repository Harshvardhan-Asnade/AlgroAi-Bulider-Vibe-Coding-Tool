'use client';

import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Download, PlusCircle, Trash2 } from 'lucide-react';
import ChatWindow from './chat-window';

export default function ChatLayout() {
  return (
    <SidebarProvider>
      <Sidebar side="left" collapsible="icon">
        <SidebarHeader>
           <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                <PlusCircle /> New Chat
           </Button>
        </SidebarHeader>
        <SidebarContent className="p-2">
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton isActive>My First Chat</SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col h-screen">
            <header className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                    <SidebarTrigger />
                    <h1 className="text-lg font-semibold">AlgroAI Chat</h1>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" /> Export</Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4 mr-2" /> Delete</Button>
                </div>
            </header>
            <ChatWindow />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
