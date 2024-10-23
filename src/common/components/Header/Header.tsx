import React from 'react';
import {Button} from "../../ui";

export const Header = () => {
  return (
    <header className="flex align-middle justify-between max-w-5xl mx-auto p-3">
      <a href="/public" className="py-1">HEICformatter</a>
      <Button className="bg-btn--primary text-white hover:opacity-80"/>
    </header>
  );
};
