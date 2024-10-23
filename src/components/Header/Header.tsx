import React from 'react';

export const Header = () => {
  return (
    <header className="flex align-middle justify-between max-w-5xl mx-auto p-3">
      <a href="/" className="py-1">HEICformatter</a>
      <button className="bg-btn--primary text-white rounded-lg px-5 py-1 hover:bg-gray/50">Help</button>
    </header>
  );
};
