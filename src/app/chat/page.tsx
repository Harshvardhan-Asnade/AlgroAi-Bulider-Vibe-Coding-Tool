import ChatContainer from '@/components/chat/chat-container';
import { Suspense } from 'react';

function ChatContent() {
  return <ChatContainer />;
}

export default function ChatPage() {
  return (
    <Suspense>
      <ChatContent />
    </Suspense>
  );
}