
"use client";

import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';

const formSchema = z.object({
  prompt: z.string().min(1, { message: "Please describe your idea." }),
});

type FormValues = z.infer<typeof formSchema>;

const examplePrompts = [
    "AI travel agent",
    "Code-generation bot",
    "Customer support chatbot",
    "AI-powered personal tutor"
];

export default function PromptForm() {
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: "" },
  });

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    form.setValue('prompt', event.target.value);
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if(!data.prompt.trim()) return;
    setIsLoading(true);
    router.push(`/chat?prompt=${encodeURIComponent(data.prompt)}`);
  };

  const handleExampleClick = (prompt: string) => {
    form.setValue('prompt', prompt);
    // Manually trigger form submission
    form.handleSubmit(onSubmit)();
  };
  
  useEffect(() => {
    const textarea = textareaRef.current;
    if(textarea) {
        textarea.style.height = 'auto';
    }
  }, []);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [form.watch('prompt')]);
  
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  };

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="relative group">
          <Textarea
            {...form.register('prompt')}
            ref={textareaRef}
            placeholder="Type your idea and we'll bring it to life..."
            className="text-base bg-foreground/5 border-2 border-border/10 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:ring-2 backdrop-blur-sm transition-all duration-300 group-hover:border-primary/50 pr-12 rounded-2xl resize-none overflow-hidden"
            rows={1}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
          />
           <Button type="submit" disabled={isLoading} size="icon" className="absolute bottom-3 right-3 h-8 w-8 bg-primary hover:bg-primary/90 rounded-full glow-shadow-primary transition-all hover:scale-110">
                {isLoading ? <Loader2 className="animate-spin" /> : <ArrowRight className="h-5 w-5"/>}
           </Button>
        </div>
        
        {form.formState.errors.prompt && (
            <p className="text-sm text-destructive">{form.formState.errors.prompt.message}</p>
        )}
      </form>
       <div className="mt-8 flex flex-wrap justify-center items-center gap-2 max-w-3xl">
          <span className="text-sm text-muted-foreground mr-2">Examples:</span>
          {examplePrompts.map((prompt) => (
            <button
                key={prompt}
                onClick={() => handleExampleClick(prompt)}
                disabled={isLoading}
                className="text-sm text-muted-foreground hover:text-primary hover:border-primary/50 border border-muted-foreground/20 rounded-full px-3 py-1 transition-colors disabled:opacity-50 disabled:pointer-events-none"
            >
                {prompt}
            </button>
          ))}
      </div>
    </>
  );
}
