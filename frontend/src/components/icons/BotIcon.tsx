import React from 'react';

const BotIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM9.007 11.703a.75.75 0 00-1.06 1.06l1.5 1.5a.75.75 0 101.06-1.06l-1.5-1.5zm3.742 1.06a.75.75 0 10-1.06-1.06l-1.5 1.5a.75.75 0 101.06 1.06l1.5-1.5zm2.25-5.25a3 3 0 00-3-3h-1.5a3 3 0 00-3 3V9a.75.75 0 001.5 0v-.75a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5V9a.75.75 0 001.5 0v-.75z" clipRule="evenodd" />
  </svg>
);
export default BotIcon;