import Input from '../../../../components/shared/Input';
import { useAppSelector } from '../../../../redux/hooks';


export default function GetOTPByEmail({error, handleChange}: any) {
    const { resetEmail } = useAppSelector(state => state.auth)
    
    return (
        <div>
            <Input
                type='email'
                id="email"
                value={resetEmail}
                name="email"
                onChange={handleChange}
                placeholder="Enter email"
                error={error}
            />
            <p className='mt-4 text-sm text-[#808080] font-light'>An OTP will be sent to the email address</p>
        </div>
    )
}
