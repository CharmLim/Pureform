import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

interface DrLimChatProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuiz?: () => void;
}

export const DrLimChat: React.FC<DrLimChatProps> = ({ isOpen, onClose, onOpenQuiz }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      role: 'model',
      content: "Hello! I'm Dr. Lim, Chief Scientific Officer at PureForm Health. I'm here to answer your questions regarding botanical medicine, cycle phase optimization, adaptogens, and personalized ingredient research. How can I guide your wellness protocol today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  const quickPrompts = [
    "Which formula helps with PMS & stress?",
    "How does Ashwagandha KSM-66 lower cortisol?",
    "Explain hormone balance in the Luteal Phase",
    "What ingredients are in the Botanical Sleep Reset?",
  ];

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      // Prepare history payload for API
      const payloadMessages = newMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: payloadMessages }),
      });

      const data = await res.json();

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: data.reply || "I apologize, but I couldn't process that request right now.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Chat request failed:", err);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: "I'm having a brief connection delay. Please feel free to re-submit your question or explore our Interactive Formulation Quiz!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: 'model',
        content: "Chat history cleared. Feel free to ask me anything about our botanical formulas, cycle phase support, or specific clinical herbs!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-center sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#F5F2ED] w-full sm:max-w-xl h-[85vh] sm:h-[680px] border border-black/20 shadow-2xl flex flex-col justify-between overflow-hidden relative">
        {/* Chat Window Header */}
        <div className="bg-[#EAE6DF] p-4 sm:p-5 border-b border-black/15 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-11 h-11 bg-[#1A1A1A] text-[#F5F2ED] flex items-center justify-center font-serif text-base font-bold border border-black/20">
                DL
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-600 border-2 border-[#EAE6DF] rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif text-lg font-normal text-[#1A1A1A]">Dr. Lim</h3>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] bg-[#1A1A1A] text-[#F5F2ED] px-1.5 py-0.5">
                  AI Advisor
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/60">
                Chief Scientific Officer • Live Botanical Consultation
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleClearChat}
              title="Clear Conversation"
              className="text-[#1A1A1A]/60 hover:text-black p-1.5 transition-colors text-[10px] uppercase font-bold tracking-widest hidden sm:inline-block"
            >
              Reset
            </button>
            <button
              onClick={onClose}
              className="text-[#1A1A1A] hover:opacity-50 p-2 transition-opacity"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>

        {/* Message Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#F5F2ED]">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/60">
                    {isUser ? 'You' : 'Dr. Lim'}
                  </span>
                  <span className="text-[9px] font-mono text-[#1A1A1A]/40">
                    {msg.timestamp}
                  </span>
                </div>

                <div
                  className={`p-4 max-w-[88%] text-xs leading-relaxed font-sans ${
                    isUser
                      ? 'bg-[#1A1A1A] text-[#F5F2ED] border border-black'
                      : 'bg-[#EAE6DF] text-[#1A1A1A] border border-black/15 shadow-2xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>
                </div>
              </div>
            );
          })}

          {/* Loading Dots */}
          {isLoading && (
            <div className="flex flex-col items-start">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/60 mb-1">
                Dr. Lim is formulating...
              </span>
              <div className="p-3 bg-[#EAE6DF] border border-black/15 flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#1A1A1A] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#1A1A1A] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-[#1A1A1A] rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        {messages.length <= 2 && (
          <div className="px-4 sm:px-6 py-2 bg-[#EAE6DF]/60 border-t border-black/10">
            <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/60 block mb-2">
              Suggested Questions for Dr. Lim:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="text-[10px] text-[#1A1A1A] bg-[#F5F2ED] border border-black/15 hover:border-black px-2.5 py-1 text-left transition-all hover:bg-black/5"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Bar */}
        <div className="p-4 bg-[#EAE6DF] border-t border-black/15">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Dr. Lim about herbs, formulas, or cycle phases..."
              className="flex-1 bg-[#F5F2ED] border border-black/20 p-3 text-xs text-[#1A1A1A] placeholder-[#1A1A1A]/40 focus:outline-none focus:border-black font-sans"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-[#1A1A1A] text-[#F5F2ED] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-colors disabled:opacity-40 flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-base">send</span>
            </button>
          </form>

          <div className="flex items-center justify-between mt-2 pt-1 border-t border-black/5">
            <span className="text-[9px] uppercase tracking-wider text-[#1A1A1A]/50 font-mono">
              PureForm Scientific AI Engine
            </span>
            {onOpenQuiz && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenQuiz();
                }}
                className="text-[9px] uppercase tracking-wider font-bold text-[#1A1A1A] border-b border-black pb-0.5 hover:opacity-60"
              >
                Or Take Full Formulation Quiz →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface FloatingChatWidgetProps {
  onOpenChat: () => void;
}

export const FloatingChatWidget: React.FC<FloatingChatWidgetProps> = ({ onOpenChat }) => {
  return (
    <div className="fixed bottom-20 sm:bottom-8 right-4 sm:right-8 z-40">
      <button
        onClick={onOpenChat}
        className="bg-[#1A1A1A] text-[#F5F2ED] p-3 sm:px-5 sm:py-3.5 shadow-2xl hover:bg-black transition-all flex items-center space-x-3 border border-[#F5F2ED]/20 group"
      >
        <div className="relative flex-shrink-0">
          <div className="w-8 h-8 bg-[#EAE6DF] text-[#1A1A1A] flex items-center justify-center font-serif text-xs font-bold">
            DL
          </div>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#1A1A1A] rounded-full animate-pulse"></span>
        </div>
        <div className="text-left hidden sm:block">
          <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#F5F2ED]/70 block leading-none mb-1">
            Live AI Consultation
          </span>
          <span className="font-serif text-sm block leading-none font-normal text-[#F5F2ED]">
            Chat with Dr. Lim
          </span>
        </div>
        <span className="material-symbols-outlined text-lg sm:text-base text-[#F5F2ED] group-hover:translate-x-0.5 transition-transform">
          chat
        </span>
      </button>
    </div>
  );
};
