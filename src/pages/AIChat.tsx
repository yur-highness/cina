import React, { useState, useRef, useEffect } from 'react';
import { generateChatResponse } from '../services/geminiService';
import type{ ChatMessage } from '../../types';
import { Send, Bot, User, Sparkles } from 'lucide-react';

const AIChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: "Hello! I'm CineBot. I can help you find the perfect movie, tell you about what's playing, or discuss cinema history. What's on your mind?",
      timestamp: Date.now()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Convert internal message format to history format expected by service
    const history = messages.map(m => ({ role: m.role, text: m.text }));

    try {
      const responseText = await generateChatResponse(userMsg.text, history);
      
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-brand-900 pt-20 pb-8 px-4 flex flex-col">
      <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col bg-brand-800 rounded-2xl border border-brand-700 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-brand-700 bg-brand-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-brand-500 to-brand-accent flex items-center justify-center">
            <Sparkles className="text-white" size={20} />
          </div>
          <div>
            <h2 className="text-white font-bold">CineBot AI</h2>
            <p className="text-xs text-brand-400">Powered by Gemini 2.5</p>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.role === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user' ? 'bg-gray-700' : 'bg-brand-600'
              }`}>
                {msg.role === 'user' ? <User size={16} className="text-gray-300"/> : <Bot size={16} className="text-white"/>}
              </div>
              
              <div className={`max-w-[80%] p-3 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-brand-600 text-white rounded-tr-none' 
                  : 'bg-brand-900/50 text-gray-200 border border-brand-700 rounded-tl-none'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center">
                  <Bot size={16} className="text-white"/>
                </div>
                <div className="bg-brand-900/50 p-4 rounded-2xl rounded-tl-none border border-brand-700">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-brand-800 border-t border-brand-700">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask for a recommendation..."
              className="w-full bg-brand-900 text-white placeholder-gray-500 border border-brand-700 rounded-xl pl-4 pr-12 py-3 resize-none focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all h-[50px]"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-brand-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-center text-[10px] text-gray-600 mt-2">
            AI responses may vary. Check movie details for accurate booking info.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIChat;