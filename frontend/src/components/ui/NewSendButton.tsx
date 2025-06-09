import React from 'react';

interface NewSendButtonProps {
  onClick: () => void;
  disabled: boolean;
  hasInput: boolean;
}

const NewSendButton: React.FC<NewSendButtonProps> = ({
  onClick,
  disabled,
  hasInput,
}) => {
  console.log("NewSendButton hasInput:", hasInput);
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled}
      aria-label="Send message"
      className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-400 ${hasInput ? "shadow-lg hover:shadow-xl hover:scale-105" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
      style={hasInput ? { backgroundColor: '#6db3bd', color: 'white' } : {}}
    >
      <svg
        width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
        className={`transition-colors duration-200 ${hasInput ? "text-white" : "text-gray-500"}`}
      >
        <path
          d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
};

export default NewSendButton; 