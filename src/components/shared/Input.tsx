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
    showErrorMessage?: boolean
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
    showErrorMessage = false
}: IInputFieldProps) {
    return (
        <div className="flex flex-col">
            <input
                type={type}
                id={id}
                value={value}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full h-[48px] px-[14px] py-2  bg-white border border-[#E6E6E6] ${
                    error ? "border border-rose-500" : ""
                } bg-[#F2F2F2] focus:outline-none focus:ring-grayDark focus:border-grayDark placeholder:text-sm placeholder:text-grayDark ${
                    className && className
                }`}
            />
            {showErrorMessage && error && (
                <div className="text-rose-500 text-xs mt-1 pl-2">{error}</div>
            )}
        </div>
    );
}
