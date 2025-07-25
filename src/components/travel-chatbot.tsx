'use client';

import { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { travelAssistantAction } from '@/app/actions';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export function TravelChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await travelAssistantAction(input);
      if (result.error) {
        const errorMessage: Message = {
          role: 'assistant',
          content: result.error,
        };
        setMessages((prev) => [...prev, errorMessage]);
      } else if (result.response) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: result.response,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: 'An unexpected error occurred. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glassmorphic rounded-2xl w-full max-w-3xl mx-auto shadow-2xl shadow-primary/10">
      <div className="p-6">
        <ScrollArea className="h-[450px] w-full pr-4">
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-start gap-4',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'assistant' && (
                  <Avatar className="w-8 h-8 border-2 border-primary">
                    <AvatarFallback className="bg-primary/20 text-primary">
                      <Bot className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-md rounded-xl p-4 text-sm whitespace-pre-wrap',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary'
                  )}
                >
                  {message.content}
                </div>
                 {message.role === 'user' && (
                  <Avatar className="w-8 h-8 border-2 border-gray-400">
                    <AvatarFallback className="bg-gray-700 text-gray-200">
                      <User className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
             {isLoading && (
                <div className="flex items-start gap-4 justify-start">
                   <Avatar className="w-8 h-8 border-2 border-primary">
                    <AvatarFallback className="bg-primary/20 text-primary">
                      <Bot className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="max-w-md rounded-xl p-4 bg-secondary">
                      <div className="flex items-center gap-2 text-sm">
                          <Sparkles className="w-4 h-4 animate-spin" />
                          <span>Thinking...</span>
                      </div>
                  </div>
                </div>
            )}
          </div>
        </ScrollArea>
      </div>
      <div className="p-6 pt-0">
        <form
          onSubmit={handleSendMessage}
          className="flex items-center gap-3"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about hotels, flights, safety, and more..."
            className="flex-1 bg-white/5 border-white/20 focus-visible:ring-primary h-12 text-base"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" className="h-12 w-12" disabled={isLoading}>
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
