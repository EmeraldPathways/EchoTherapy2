import React, { useState, useRef, useEffect } from "react";
import { sendMessageToAssistant } from "../services/api";
import { Message } from "../types";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentThreadId, setCurrentThreadId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    // Scroll to bottom when new messages arrive, but instantly if user is already near bottom
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100; // If within 100px of bottom
      scrollToBottom(isNearBottom ? "smooth" : "auto");
    } else {
      scrollToBottom("auto"); // Initial load
    }
  }, [messages]);

  useEffect(() => {
    const savedThreadId = localStorage.getItem('aiCompanionThreadId');
    if (savedThreadId) {
      // setCurrentThreadId(savedThreadId); // Option to resume
      // For this example, we start fresh
      localStorage.removeItem('aiCompanionThreadId');
      setCurrentThreadId(null);
    }
    // Send a default welcome message from AI if messages are empty
    // This can be done after a short delay or based on some condition
    // For now, we'll rely on the "Welcome!" placeholder.
    // To add an actual first message:
    // setMessages([{ id: 'initial-ai-greet', text: "Hello! I'm ready to assist you. How can I help today?", sender: 'bot', model:'AI Companion' }]);
  }, []);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setIsLoading(true);

    try {
      const assistantResponse = await sendMessageToAssistant(text, currentThreadId);

      if (assistantResponse.new_thread_id) {
        setCurrentThreadId(assistantResponse.new_thread_id);
        // localStorage.setItem('aiCompanionThreadId', assistantResponse.new_thread_id);
      }

      const newBotMessage: Message = {
        id: (Date.now() + Math.random()).toString(), // Unique ID
        text: assistantResponse.result,
        sender: "bot",
        model: "AI Companion",
        explanation: assistantResponse.explanation || undefined, // Pass undefined if empty
      };
      setMessages((prevMessages) => [...prevMessages, newBotMessage]);

    } catch (error) {
      console.error("Failed to get AI response in ChatWindow:", error);
      const errorMessageText = error instanceof Error ? error.message : "An unexpected error occurred.";
      const errorMessage: Message = {
        id: (Date.now() + Math.random()).toString(),
        text: `Error: ${errorMessageText}`,
        sender: "bot",
        model: "AI Companion",
        explanation: "An error occurred while fetching the response.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };  return (
    <div className="card w-full max-w-[600px] h-[calc(100vh-200px)] min-h-[500px] max-h-[700px] shadow-2xl flex flex-col overflow-hidden transition-all duration-300 hover:shadow-glow mx-auto border-2 border-primary/20">      {/* Chat Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-4 rounded-t-xl shadow-lg relative overflow-hidden flex-shrink-0">
        {/* Header background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/5"></div>
        <div className="relative z-10 text-center">
          <h3 className="font-bold text-xl tracking-wide mb-1 text-gray-600">AI Companion</h3>
          <p className="text-gray-500 text-sm">Ready to assist you</p>
        </div>
      </div>{/* Messages Area */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-1 space-y-3 bg-gradient-to-b from-primary/5 to-white/95 custom-scrollbar"
      >
        {messages.length === 0 && !isLoading && (
          <div className="text-center text-gray-500 flex flex-col items-center justify-center h-full animate-fadeInUp">
            <div className="mb-4 bg-gradient-to-br from-primary to-secondary w-20 h-20 rounded-full flex items-center justify-center shadow-xl glow-primary border-2 border-white/70">
              <span className="text-white text-3xl">✨</span>
            </div>
            <p className="text-2xl font-semibold mb-2 text-gradient">
              Welcome!
            </p>
            <p className="text-gray-600 text-base max-w-sm px-4">
              Type a message below to start chatting with your AI Companion.
            </p>
          </div>
        )}
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} className="h-1" /> {/* Scroll anchor */}
      </div>      {/* Loading Indicator */}
      {isLoading && (
        <div className="px-4 py-3 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center justify-center">
            <div className="flex space-x-2">
              <div className="loading-dot" style={{ animationDelay: "0ms" }}></div>
              <div className="loading-dot" style={{ animationDelay: "150ms" }}></div>
              <div className="loading-dot" style={{ animationDelay: "300ms" }}></div>
            </div>
            <span className="text-sm ml-3 font-medium text-gradient">
              AI is thinking...
            </span>
          </div>
        </div>
      )}
      
      {/* Message Input */}
      <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatWindow;