import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../../../components/shared/Button';
import Input from '../../../../components/shared/Input';
import { useLazySentOTPQuery } from '../../../../redux/feature/auth/authApi';
import { setResetEmail } from '../../../../redux/feature/auth/authSlice';
import { setStep } from '../../../../redux/feature/step/stepSlice';
import { useAppSelector } from '../../../../redux/hooks';


export default function GetOTPByEmail() {
    const { success, loading, resetEmail } = useAppSelector(state => state.auth)
    const [error, setError] = useState<string | null | undefined>('')
    const { step } = useAppSelector(state => state.step)
    const dispatch = useDispatch()
    
    const [sentOTP] = useLazySentOTPQuery()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setResetEmail(e.target.value.trim()))
    };

    const validation = () => {
        let error: {
            email: string | null | undefined;
        } = {
            email: undefined,
        };
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!resetEmail.trim()) {
            error.email = "E-mail is required";
        } else if (!emailRegex.test(resetEmail)) {
            error.email = "Please enter a valid email address";
        }
        if(error){
            setError(error?.email)
        }
        const hasErrors = Object.values(error).some(
            (error) => error !== undefined
        );
        return !hasErrors;
    }

    const getOTPHandler = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        if(validation()){
            await sentOTP({email: resetEmail})
        }
        
    }

    useEffect(() => {
        if(success){
            dispatch(setStep(step + 1))
        }
    }, [success])
    return (
        <form onSubmit={getOTPHandler}>
            <Input
                type='email'
                id="email"
                value={resetEmail}
                name="email"
                onChange={handleChange}
                placeholder="E-mail"
                error={error}
            />
            <Button
                type="submit"
                className="w-full px-4 py-2 font-bold text-white bg-primary rounded-md mt-3"
            >
                {loading ? "Loading..." : "Get OTP"}
               
            </Button>
        </form>
    )
}
