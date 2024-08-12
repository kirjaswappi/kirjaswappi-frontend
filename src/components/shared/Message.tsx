import { useEffect, useState } from "react";
import "./style.css";
export default function Message({ message }: { message: string }) {
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        if (message) {
            setShowMessage(true);
        } else {
            setShowMessage(false);
        }
    }, [message]);
    return (
        <div
            className={`bg-rose-200 text-rose-600 py-2 text-center text-sm rounded-sm ${
                showMessage ? "message-enter-active" : "message-exit-active"
            }`}
        >
            {message}
        </div>
    );
}
