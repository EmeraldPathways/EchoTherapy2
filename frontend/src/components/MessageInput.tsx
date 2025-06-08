import React, { useState, useRef, useEffect } from "react";

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

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "48px"; // Reset to minimum height
      const scrollHeight = textareaRef.current.scrollHeight;
      // Max height for textarea, equivalent to about 4-5 lines
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
      // Reset textarea height immediately after clearing
      if (textareaRef.current) {
        textareaRef.current.style.height = "48px";
        textareaRef.current.focus(); // Keep focus on input after sending
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      handleSubmit();
    }
    // Allow Shift+Enter for new lines by not doing anything special
  };  return (    <form
      onSubmit={handleSubmit}
      className="p-2 bg-gradient-to-r from-primary/8 to-secondary/8 rounded-b-xl backdrop-blur-sm flex-shrink-0"
    ><div className="flex items-center gap-3">
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            rows={1}
            className="w-full px-3 py-2 bg-white/95 border-2 border-gray-200/60 rounded-lg resize-none overflow-y-auto custom-scrollbar text-base transition-all duration-200 focus:outline-none placeholder-gray-400 message-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            disabled={isLoading}
            aria-label="Chat message input"
            maxLength={1000}
            style={{ 
              maxHeight: '120px',
              minHeight: '48px'
            }}
          />
          
          {/* Character counter for long messages */}
          {input.length > 200 && (
            <div className="absolute -bottom-5 right-2 text-xs text-gray-400">
              {input.length}/1000
            </div>
          )}
        </div>        <div className="flex-shrink-0">
          <button
            type="submit"
            className={`w-12 h-12 rounded-lg transition-all duration-200 flex items-center justify-center send-button ${
              isLoading 
                ? "bg-gray-300 cursor-not-allowed"
                : input.trim()
                  ? "btn-primary hover:scale-105"
                  : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
            }`}
            aria-label={isLoading ? "Sending message" : "Send message"}
          ><svg 
              className={`w-5 h-5 transition-colors duration-200 ${
                isLoading 
                  ? 'text-gray-400'
                  : input.trim() 
                    ? 'text-white' 
                    : 'text-gray-500'
              }`}
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Helpful hint text */}
      <div className="mt-2.5 text-xs text-gray-500/90 text-center font-medium">
        Press <span className="px-1.5 py-0.5 bg-primary/10 text-primary-700 rounded font-semibold">Enter</span> to send • <span className="px-1.5 py-0.5 bg-primary/10 text-primary-700 rounded font-semibold">Shift + Enter</span> for new line
      </div>
    </form>
  );
};

export default MessageInput;