import { useState } from "react";

export function useActive(){
    const [active, setActive] = useState<boolean>(false);

    const handleToggle = () => setActive((prev)=> !prev)

    return {active, setActive, handleToggle}
}