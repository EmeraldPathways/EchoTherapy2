import React from "react";
import { Message } from "../types";
import BotIcon from "./icons/BotIcon";
import UserIcon from "./icons/UserIcon";

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === "user";
  
  // Check if message text indicates an error to style it differently
  const isErrorMessage = message.sender === "bot" && message.text.toLowerCase().startsWith("error:");
  
  return (
    <div className={`flex items-end gap-3 animate-fadeIn ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="avatar-bot self-end">
          <BotIcon className="w-5 h-5 text-white" />
        </div>
      )}

      <div        
        className={`px-4 py-3 rounded-xl shadow-lg max-w-[75%] transition-all duration-200 hover:shadow-xl
          ${ isUser
            ? "message-bubble-user rounded-br-none"
            : isErrorMessage
              ? "bg-red-100 text-red-700 border border-red-200 rounded-bl-none shadow-red-500/20"
              : "message-bubble-bot rounded-bl-none ai-message"
        }`}
      >
        <div 
          className={`text-base leading-relaxed whitespace-pre-wrap break-words ${isUser ? "" : (isErrorMessage ? "font-medium" : "text-gray-700")}`}
        >
          {message.text}
        </div>

        {!isUser && message.explanation && !isErrorMessage && (
          <p className="text-sm mt-2 opacity-80 italic border-t border-gray-200 pt-2 text-primary/90 font-normal">
            {message.explanation}
          </p>
        )}
      </div>

      {isUser && (
        <div className="avatar-user self-end">
          <UserIcon className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;