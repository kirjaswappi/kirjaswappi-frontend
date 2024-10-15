import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { PiEyeClosed } from "react-icons/pi";
import Input from "./Input";

interface PasswordInputProps {
    name: string;
    id: string;
    value?: string;
    placeholder?: string;
    error?: string | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
    name,
    id,
    value,
    placeholder,
    error,
    onChange,
    onBlur,
    className
}) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible((prevState) => !prevState);
    };

    return (
        <div className="relative">
            <Input
                type={isVisible ? "text" : "password"}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                error={error}
                className={`${className}`}
                onBlur={onBlur}
            />
            <div
                className="absolute right-4 top-[18px] flex items-center cursor-pointer"
                onClick={toggleVisibility}
            >
                {isVisible ? (
                    <PiEyeClosed className="text-grayDark" />
                ) : (
                    <AiOutlineEye className="text-grayDark" />
                )}
            </div>
        </div>
    );
};

export default PasswordInput;
