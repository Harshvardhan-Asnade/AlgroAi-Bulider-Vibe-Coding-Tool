
'use client';

import { useState, useRef, useEffect } from 'react';
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarInset } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Download, PlusCircle, Trash2, CodeXml, MessageSquare, Pencil, Check } from 'lucide-react';
import Link from 'next/link';
import type { Conversation } from './chat-container';
import { Input } from '../ui/input';
import jsPDF from 'jspdf';
import { cn } from '@/lib/utils';

interface ChatLayoutProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  editingConversationId: string | null;
  onNewChat: () => void;
  onSwitchConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  onStartRename: (id: string) => void;
  onRenameConversation: (id: string, newTitle: string) => void;
  children: React.ReactNode;
}

export default function ChatLayout({
  conversations,
  activeConversationId,
  editingConversationId,
  onNewChat,
  onSwitchConversation,
  onDeleteConversation,
  onStartRename,
  onRenameConversation,
  children,
}: ChatLayoutProps) {
  
  const activeConversation = conversations.find(c => c.id === activeConversationId);
  const [renameInput, setRenameInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingConversationId && inputRef.current) {
      const convo = conversations.find(c => c.id === editingConversationId);
      setRenameInput(convo?.title || '');
      inputRef.current.focus();
    }
  }, [editingConversationId, conversations]);

  const handleRenameSubmit = (id: string) => {
    if (renameInput.trim()) {
      onRenameConversation(id, renameInput.trim());
    }
  };

  const generateChatString = () => {
    if (!activeConversation) return '';
    return activeConversation.messages.map(m => {
        const prefix = m.role === 'user' ? 'You:' : 'AlgroAI:';
        return `${prefix} ${m.content}`;
    }).join('\n\n');
  };

  const handleExportToTxt = () => {
    const chatContent = generateChatString();
    if (!chatContent) return;

    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat-history.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportToPdf = () => {
    if (!activeConversation) return;

    const doc = new jsPDF();
    const margin = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const usableWidth = pageWidth - margin * 2;
    let y = margin;
    
    doc.setFontSize(16);
    doc.text(activeConversation.title, pageWidth / 2, y, { align: 'center' });
    y += 10;
    
    doc.setFontSize(12);

    activeConversation.messages.forEach(message => {
        if (y > pageHeight - margin) {
            doc.addPage();
            y = margin;
        }

        const prefix = message.role === 'user' ? 'You:' : 'AlgroAI:';
        const textLines = doc.splitTextToSize(`${prefix} ${message.content}`, usableWidth);
        
        doc.text(textLines, margin, y);
        y += textLines.length * 7; // Approximate line height
    });

    doc.save('chat-history.pdf');
  };

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
                    {editingConversationId === convo.id ? (
                      <div className="flex items-center gap-1 w-full">
                        <MessageSquare className="h-4 w-4 ml-2 flex-shrink-0" />
                        <Input
                          ref={inputRef}
                          value={renameInput}
                          onChange={(e) => setRenameInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleRenameSubmit(convo.id);
                            if (e.key === 'Escape') onStartRename('');
                          }}
                          onBlur={() => handleRenameSubmit(convo.id)}
                          className="h-8 flex-1"
                        />
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleRenameSubmit(convo.id)}>
                            <Check className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div
                        className={cn(
                          'group/item relative flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50',
                          convo.id === activeConversationId &&
                            'bg-sidebar-accent font-medium text-sidebar-accent-foreground'
                        )}
                      >
                        <button
                          onClick={() => onSwitchConversation(convo.id)}
                          className="flex items-center gap-2 flex-1 truncate"
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span className="truncate flex-1">{convo.title}</span>
                        </button>
                         <div className="flex items-center opacity-0 group-hover/item:opacity-100 absolute right-1 bg-sidebar-accent">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={(e) => {
                              e.stopPropagation();
                              onStartRename(convo.id);
                            }}
                          >
                            <Pencil className="h-4 w-4 text-muted-foreground" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteConversation(convo.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                         </div>
                      </div>
                    )}
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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" disabled={!activeConversationId}><Download className="h-4 w-4 mr-2" /> Export</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={handleExportToPdf}>Export as PDF</DropdownMenuItem>
                            <DropdownMenuItem onClick={handleExportToTxt}>Export as TXT</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
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
