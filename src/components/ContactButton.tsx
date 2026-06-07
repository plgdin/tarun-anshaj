import React from 'react';

interface ContactButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({ 
  label = 'Contact Me', 
  className = '', 
  ...props 
}) => {
  return (
    <button
      className={`rounded-full uppercase tracking-widest font-medium text-white transition-transform active:scale-95 duration-200 cursor-pointer ${className}`}
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
        outline: '2px solid white',
        outlineOffset: '-3px',
      }}
      {...props}
    >
      {label}
    </button>
  );
};
