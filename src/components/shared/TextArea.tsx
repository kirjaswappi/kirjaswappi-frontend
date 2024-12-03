import React from "react";

export default function TextArea({
    name,
    onChange,
    value,
    placeholder,
}: {
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    value?: string | undefined;
    placeholder?: string;
    max?: number
}) {
    return (
        <textarea
            name={name}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            className="w-full border border-[#E6E6E6] focus:border-grayDark outline-none p-4 text-sm font-sofia font-light rounded-lg text-grayDark"
        ></textarea>
    );
}
