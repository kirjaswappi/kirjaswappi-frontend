import { useEffect, useState } from "react"
import { ERROR, SUCCESS } from "../constant/MESSAGETYPE"

export const useNotification = () => {
    const [isShow, setIsShow] = useState<boolean>(false)
    const [messageType, setMessageType] = useState<string>('')
    const [message, setMessage] = useState<string | null | undefined>('')

    useEffect(() => {
        if (isShow) {
            if(messageType !== ERROR){
                const timer = setTimeout(() => {
                    setIsShow(false)
                    setMessageType('')
                    setMessage('')
                }, 2000);
                
                return () => clearInterval(timer)
            }
        }
    }, [isShow])

    return { isShow, setIsShow, messageType, setMessageType, message, setMessage }
}