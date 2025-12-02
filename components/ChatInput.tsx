import React, { useState, useRef, useEffect } from 'react';
import { SendIcon, PaperclipIcon } from './Icons';

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-6 pt-2">
      <div className="relative input-glass rounded-2xl p-2 flex items-end gap-2 backdrop-blur-md">
        
        {/* Attachment Button */}
        <button 
          className="mb-1 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          title="Attach file"
          disabled={disabled}
        >
           <PaperclipIcon className="w-5 h-5" />
        </button>

        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Jarvis about SAR DIGITAL WORLD..."
          disabled={disabled}
          rows={1}
          className="w-full bg-transparent text-white placeholder-gray-500 px-2 py-3 rounded-xl resize-none focus:outline-none max-h-[120px] disabled:opacity-50"
          style={{ minHeight: '44px' }}
        />
        <button
          onClick={() => handleSubmit()}
          disabled={!input.trim() || disabled}
          className={`
            mb-1 mr-1 p-2.5 rounded-xl flex items-center justify-center transition-all duration-200
            ${input.trim() && !disabled 
              ? 'btn-primary' 
              : 'bg-white/5 text-gray-600 cursor-not-allowed'}
          `}
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </div>
      <p className="text-center text-[10px] text-gray-600 mt-3 font-medium">
        SAR AI can make mistakes. Please verify important details.
      </p>
    </div>
  );
};

export default ChatInput;