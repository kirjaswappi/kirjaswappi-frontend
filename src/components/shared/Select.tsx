interface ISelectProps {
    value?: string;
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string | null | undefined;
    placeholder?: string;
    className?: string;
    showErrorMessage?: boolean;
    options: {
        label: string;
        value: string;
    }[];
}
export default function Select({
    value,
    name,
    onChange,
    className,
    error,
    options,
    showErrorMessage = false,
}: ISelectProps) {
    return (
        <div className="flex flex-col">
            <select
                value={value}
                name={name}
                className={`w-full rounded-md px-[14px] py-4 outline-none text-sm text-[#31373D] ${
                    className && className
                }`}
                onChange={onChange}
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {showErrorMessage && error && (
                <div className="text-rose-500 text-xs mt-1 pl-2">{error}</div>
            )}
        </div>
    );
}
