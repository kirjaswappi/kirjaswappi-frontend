import React from "react";

export default function TextArea({
    name,
    onChange,
    value,
    placeholder,
    error,
    showErrorMessage,
    className,
    onBlur
}: {
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    value?: string | undefined;
    placeholder?: string;
    max?: number;
    error?: string | null | undefined;
    showErrorMessage?: boolean;
    className?: string;
    onBlur?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
    return (
        <div className="flex flex-col">
            <textarea
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder={placeholder}
                className={`w-full h-[48px] px-[14px] py-2  bg-white border border-[#E6E6E6] ${
                    error
                        ? "border border-rose-500"
                        : "focus:ring-grayDark focus:border-grayDark"
                } bg-[#F2F2F2] focus:outline-none  placeholder:text-sm placeholder:text-grayDark ${
                    className && className
                }`}
            ></textarea>
            {showErrorMessage && error && (
                <div className="text-rose-500 text-xs mt-1 pl-2">{error}</div>
            )}
        </div>
    );
}
