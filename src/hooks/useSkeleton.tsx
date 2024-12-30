import { useEffect, useState } from "react";

export const useSkeleton = () => {
    const [showSkeleton, setShowSkeleton] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setShowSkeleton(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    return {showSkeleton}
};
