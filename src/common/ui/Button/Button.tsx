import React from 'react';

type ButtonPropsType = {
  className?: string;
}

export const Button = ({className}:ButtonPropsType) => {
  return (
    <>
      <button className={`text-white rounded-lg px-5 py-1 hover:bg-gray/50 ${className}`}>Help</button>
    </>
  );
};

