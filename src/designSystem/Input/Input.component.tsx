import React, {memo} from "react";

interface InputProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    id?: string;
}

function InputComponent({ label, value, onChange, type = "text", id }: InputProps) {
    console.log("Input component rendered with id:", id, "and type:", type);
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-black">
                {label}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
        </div>
    );
}

export const Input = memo(InputComponent);