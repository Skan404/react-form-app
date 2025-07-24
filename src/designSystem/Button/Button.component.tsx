import React, {memo} from "react";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}

function ButtonComponent({ children, onClick, disabled }: ButtonProps) {
    console.log("Button component rendered with children:", children);
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-blue-600 transition-colors"
        >
            {children}
        </button>
    );
}

export const Button = memo(ButtonComponent)