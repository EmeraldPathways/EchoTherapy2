import React, { useState, useEffect, useRef, useCallback } from 'react';
import { demoScenarios, DemoScenario, DemoOption } from '@/lib/demoScenarios';
import { useRouter } from 'next/router';
import Link from 'next/link'; // For the Sign Up / Log In button

interface DemoMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

const InteractiveDemo: React.FC = () => {
  const [currentScenario, setCurrentScenario] = useState<DemoScenario | null>(null);
  const [currentOptions, setCurrentOptions] = useState<DemoOption[] | null>(null);
  const [currentAiPrompt, setCurrentAiPrompt] = useState<string | null>(null); // The AI's question/prompt to the user
  const [conversation, setConversation] = useState<DemoMessage[]>([]);
  const [showTerminalMessage, setShowTerminalMessage] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null); // For smart scrolling
  const router = useRouter();

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 150; 
      scrollToBottom(isNearBottom ? "smooth" : "auto");
    } else {
      scrollToBottom("auto");
    }
  }, [conversation, scrollToBottom]);

  const initializeScenario = useCallback((scenario: DemoScenario) => {
    setCurrentScenario(scenario);
    setCurrentAiPrompt(scenario.initialPrompt);
    setCurrentOptions(scenario.initialOptions);
    setConversation([]);
    setShowTerminalMessage(false);
  }, []);

  const startRandomScenario = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * demoScenarios.length);
    initializeScenario(demoScenarios[randomIndex]);
  }, [initializeScenario]);
  
  useEffect(() => {
    startRandomScenario(); // Start with a random scenario on component mount
  }, [startRandomScenario]);

  const handleOptionClick = (option: DemoOption) => {
    const userMsg: DemoMessage = { id: `user-${Date.now()}`, text: option.text, sender: 'user' };
    const aiMsg: DemoMessage = { id: `ai-${Date.now()}`, text: option.aiResponse, sender: 'ai' };
    
    setConversation(prev => [...prev, userMsg, aiMsg]);

    if (option.isTerminal || !option.nextOptions || option.nextOptions.length === 0) {
      setCurrentAiPrompt(null); // No more AI prompts
      setCurrentOptions(null); // No more user options
      setShowTerminalMessage(true);
    } else {
      setCurrentAiPrompt(option.nextPrompt || "What are your thoughts on that?");
      setCurrentOptions(option.nextOptions);
      setShowTerminalMessage(false);
    }
  };

  if (!currentScenario) {
    return (
      <div className="flex flex-col h-[calc(100vh-220px)] sm:h-[calc(100vh-240px)] max-w-xl w-full mx-auto glass shadow-xl rounded-lg overflow-hidden items-center justify-center">
        <p className="text-gray-600">Loading demo...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-220px)] sm:h-[calc(100vh-240px)] max-w-xl w-full mx-auto glass shadow-xl rounded-lg overflow-hidden">
      {/* Demo Chat Header (Optional, can be simpler than main chat) */}
      <div className="bg-gradient-to-r from-primary to-secondary p-4 rounded-t-xl shadow-lg relative overflow-hidden flex-shrink-0">
        {/* Header background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/5"></div>
        <div className="relative z-10 text-center">
          <h3 className="font-bold text-xl tracking-wide mb-1 text-gradient">ECHO</h3>
          <p className="text-gray-500 text-sm">Navigating your thoughts with a caring AI companion</p>
        </div>
      </div>

      {/* Messages Area - Styled like MessageBubble */}
      <div 
        ref={chatContainerRef}
        className="flex-grow p-4 overflow-y-auto space-y-3 bg-gray-50 custom-scrollbar"
      >
        {/* Initial AI Prompt if conversation is empty */}
        {conversation.length === 0 && currentAiPrompt && (
            <div className="flex w-full justify-start animate-message-slide-in">
                 <div className="message-bubble-bot">
                    <p className="text-sm whitespace-pre-wrap">{currentAiPrompt}</p>
                </div>
            </div>
        )}
        {conversation.map((msg) => (
          // Reusing MessageBubble-like styling
          <div key={msg.id} className={`flex w-full ${msg.sender === 'user' ? "justify-end" : "justify-start"} animate-message-slide-in`}>
            <div
              className={`${
                msg.sender === 'user'
                  ? "message-bubble-user"
                  : "message-bubble-bot"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {/* AI's next prompt after its response, if not terminal */}
        {conversation.length > 0 && !showTerminalMessage && currentAiPrompt && conversation[conversation.length - 1].sender === 'ai' && (
             <div className="flex w-full justify-start animate-message-slide-in">
                 <div className="message-bubble-bot">
                    <p className="text-sm whitespace-pre-wrap italic">{currentAiPrompt}</p>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} className="h-px" /> {/* Scroll anchor */}
      </div>
      
      {/* User Options Area - Styled like MessageInput */}
      <div className="p-3 sm:p-4 border-t border-gray-300 bg-white flex-shrink-0">
        {currentOptions && currentOptions.length > 0 ? (
          <div className="space-y-2">
            {currentOptions.map(option => (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option)}
                className="btn-primary w-full text-left focus:ring-offset-0"
              >
                {option.text}
              </button>
            ))}
          </div>
        ) : showTerminalMessage ? (
          <div className="text-center space-y-3">
            <p className="text-sm text-gray-700 bg-green-50 p-3 rounded-md">
              This is a glimpse of how I listen. To continue this conversation, explore your feelings further, and save your history, please sign up or log in!
            </p>
            <Link href="/login" legacyBehavior>
              <a className="btn-primary inline-block px-6 py-2.5 shadow-md text-sm sm:text-base">
                Sign Up / Log In to Chat
              </a>
            </Link>
            <button
              onClick={startRandomScenario}
              className="block w-full mt-2 text-sm text-blue-600 hover:underline"
            >
              Try Another Demo Scenario
            </button>
          </div>
        ) : (
            <div className="text-center text-gray-500 p-3">
                Loading next step or demo ended.
            </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveDemo; 