import PasswordInput from '../../../../components/shared/PasswordInput';

export default function NewPassword({ userPass, handleChange, errors }:any) {
    return (
        <div
            // onSubmit={handleSubmit}
            className="flex flex-col gap-4"
        >
            <PasswordInput
                id="password"
                name="password"
                value={userPass.password}
                onChange={handleChange}
                placeholder="Password"
                error={errors.password}
            />
            <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                value={userPass.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                error={errors.confirmPassword}
            />
        </div>
    )
}
