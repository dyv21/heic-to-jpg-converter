import {ButtonHTMLAttributes} from "react"

type ButtonPropsType = ButtonHTMLAttributes<HTMLButtonElement> &
  {
    label: string
  }

export const Button = ({label, className}: ButtonPropsType) => {
  return (
    <button className={`rounded-lg px-5 py-1 ${className}`}>{label}</button>
  );
};

