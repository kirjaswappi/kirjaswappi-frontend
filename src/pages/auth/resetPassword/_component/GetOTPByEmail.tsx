import Input from '../../../../components/shared/Input';


export default function GetOTPByEmail({userInfo, error, handleChange, validateInput}: any) {    
    return (
        <div>
            <Input
                type='email'
                id="email"
                value={userInfo.email}
                name="email"
                onChange={handleChange}
                placeholder="Enter email"
                error={error}
                className='rounded-lg'
                onBlur={validateInput}
            />
            <p className='mt-4 text-sm text-[#808080] font-light'>An OTP will be sent to the email address</p>
        </div>
    )
}
