import React from "react";

export default function Modal({
    open,
    children,
}: {
    open: boolean;
    children: React.ReactNode;
}) {
    return (
        <div
            className={`${
                open ? "block" : "hidden"
            } bg-white bg-opacity-100 inset-0 w-10/12 h-[80%] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 shadow-md`}
        >
            {children}
        </div>
    );
}
