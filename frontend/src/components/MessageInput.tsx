import React, { useState, useRef, useEffect } from "react";
import NewSendButton from './ui/NewSendButton';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  isLoading,
}) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const prevIsLoadingRef = useRef<boolean>(isLoading);

  useEffect(() => {
    prevIsLoadingRef.current = isLoading;
  });

  useEffect(() => {
    if (prevIsLoadingRef.current === true && !isLoading) {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  }, [isLoading]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "48px";
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 120;
      const minHeight = 48;
      const newHeight = Math.max(minHeight, Math.min(scrollHeight, maxHeight));
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "48px";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      handleSubmit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-2 bg-gradient-to-r from-primary/8 to-secondary/8 rounded-b-xl backdrop-blur-sm flex-shrink-0"
    >
      <div className="flex items-center gap-3">
        <div className="relative flex-1 ml-2">
          <textarea
            ref={textareaRef}
            rows={1}
            className="w-full px-3 py-2 bg-white/95 border-2 border-gray-200/60 rounded-lg resize-none overflow-y-auto custom-scrollbar text-base transition-all duration-200 focus:outline-none placeholder-gray-400 message-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message to start talking with Echo"
            disabled={isLoading}
            aria-label="Chat message input"
            maxLength={1000}
            style={{ 
              maxHeight: '120px',
              minHeight: '48px'
            }}
          />
          
          {input.length > 200 && (
            <div className="absolute -bottom-5 right-2 text-xs text-gray-400">
              {input.length}/1000
            </div>
          )}
        </div>
        <NewSendButton
          onClick={handleSubmit}
          disabled={isLoading || !input.trim()}
          hasInput={!!input.trim()}
        />
      </div>
    </form>
  );
};

export default MessageInput;