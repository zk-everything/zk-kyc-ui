import React, { FC, ReactNode } from "react";

type DefaultButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type ButtonProps = {
  children: ReactNode;
  fullWidth?: boolean;
  variant?: "primary" | "secondary";
} & DefaultButtonProps;

const Button: FC<ButtonProps> = ({
  fullWidth = false,
  children,
  className,
  variant = "primary",
  ...buttonProps
}) => {
  const fullWidthStyle = fullWidth ? "w-full" : "";
  const getVariant = () => {
    switch (variant) {
      case "primary": {
        return "text-white bg-brand-500 hover:bg-brand-400 active:bg-brand-500";
      }
      case "secondary": {
        return "text-white bg-accent-500 hover:bg-accent-400 active:bg-accent-500";
      }
      default: {
        return "text-white bg-brand-500 hover:bg-brand-400 active:bg-brand-500";
      }
    }
  };

  return (
    <button
      {...buttonProps}
      className={`py-2 md:p-4 select-none focus:outline-none text-sm font-medium rounded-md ${fullWidthStyle} border border-transparent focus:border-white disabled:bg-zinc-600 ${getVariant()} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
