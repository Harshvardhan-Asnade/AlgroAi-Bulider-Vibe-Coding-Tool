"use client";

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2, ShieldCheck, Wand2, Mic, Link as LinkIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { handlePrompt } from '@/app/actions';

const formSchema = z.object({
  prompt: z.string().min(1, { message: "Please describe your idea." }),
});

type FormValues = z.infer<typeof formSchema>;

interface GenerationResult {
    code: string;
    securitySuggestions: string[];
    reasoning: string;
}

export default function PromptForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: "" },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    const response = await handlePrompt(data);

    if (response.success && response.data) {
      setResult(response.data);
    } else {
      setError(response.error || "An unknown error occurred.");
    }
    setIsLoading(false);
  };

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="relative group">
          <Textarea
            {...form.register('prompt')}
            placeholder="Describe your app idea... e.g., 'a photo sharing app with user profiles and comments'"
            className="min-h-[100px] text-base bg-foreground/5 border-2 border-border/10 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:ring-2 backdrop-blur-sm transition-all duration-300 group-hover:border-primary/50 pl-12 pr-12 rounded-2xl"
            rows={4}
          />
           <div className="absolute bottom-4 left-4 flex gap-2 text-muted-foreground">
             <button type="button" className="hover:text-primary transition-colors"><LinkIcon className="h-5 w-5"/></button>
             <button type="button" className="hover:text-primary transition-colors"><Mic className="h-5 w-5"/></button>
           </div>
           <Button type="submit" disabled={isLoading} size="icon" className="absolute bottom-3 right-3 h-8 w-8 bg-primary hover:bg-primary/90 rounded-full glow-shadow-primary transition-all hover:scale-110">
                {isLoading ? <Loader2 className="animate-spin" /> : <ArrowRight className="h-5 w-5"/>}
           </Button>
        </div>
        
        {form.formState.errors.prompt && (
            <p className="text-sm text-destructive">{form.formState.errors.prompt.message}</p>
        )}

      </form>

      <Dialog open={!!result || !!error} onOpenChange={() => { setResult(null); setError(null); }}>
        <DialogContent className="max-w-4xl bg-background/80 backdrop-blur-md border-primary/30">
          <DialogHeader>
            <DialogTitle className="text-gradient">
              {error ? 'An Error Occurred' : 'Generation Complete!'}
            </DialogTitle>
            <DialogDescription>
              {error ? 'Please try again later.' : 'Here is the generated code and security analysis for your idea.'}
            </DialogDescription>
          </DialogHeader>
          {error && (
             <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {result && (
            <div className="grid md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto mt-4 p-1">
                <div>
                    <Card className="bg-transparent border-none shadow-none">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Wand2 className="text-accent glow-shadow-accent"/> Generated Code</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto text-sm font-code">
                                <code>{result.code}</code>
                            </pre>
                        </CardContent>
                    </Card>
                </div>
                 <div>
                    <Card className="bg-transparent border-none shadow-none">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><ShieldCheck className="text-primary glow-shadow-primary"/> Security Analysis</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <Alert className="bg-primary/5 border-primary/20">
                                <AlertTitle>Reasoning</AlertTitle>
                                <AlertDescription>{result.reasoning}</AlertDescription>
                            </Alert>
                             <h4 className="font-semibold">Suggested Features:</h4>
                             <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                {result.securitySuggestions.map((suggestion, index) => (
                                    <li key={index}>{suggestion}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
