import PasswordInput from '../../../../components/shared/PasswordInput';

export default function NewPassword({ userPass, handleChange, errors, validateInput }:any) {
    return (
        <div>
            <div>
            <PasswordInput
                id="password"
                name="password"
                value={userPass.password}
                onChange={handleChange}
                placeholder="Password"
                error={errors.password}
                className='rounded-t-lg'
                onBlur={validateInput}
            />
            </div>
            
            <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                value={userPass.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                error={errors.confirmPassword}
                className='rounded-b-lg'
                onBlur={validateInput}
                // className="border-none rounded-none mt-0 bg-white pl-6 shadow-none"
            />
        </div>
    )
}
