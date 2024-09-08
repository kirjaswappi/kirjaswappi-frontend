import React from "react";

// Input Interface
interface IInputFieldProps {
    id?: string;
    type: "text" | "password" | "email";
    value?: string;
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string | null | undefined;
    placeholder?: string;
    className?: string;
}

export default function Input({
    type = "text",
    id,
    value,
    name,
    onChange,
    placeholder,
    className,
    error,
}: IInputFieldProps) {
    return (
        <React.Fragment>
            <input
                type={type}
                id={id}
                value={value}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full h-[48px] px-[14px] py-2 mt-1 border ${
                    error ? "border-rose-500" : "border-grayDark"
                } bg-[#F2F2F2] rounded-md shadow-sm focus:outline-none focus:ring-grayDark focus:border-grayDark ${
                    className && className
                }`}
            />
            {error && (
                <div className="text-rose-500 text-xs mt-1 pl-2">{error}</div>
            )}
        </React.Fragment>
    );
}
