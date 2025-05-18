import PasswordInput from '../../../../components/shared/PasswordInput';

interface NewPasswordProps {
  userPass: {
    password: string;
    confirmPassword: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: {
    password?: string;
    confirmPassword?: string;
  };
  validateInput: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function NewPassword({
  userPass,
  handleChange,
  errors,
  validateInput,
}: NewPasswordProps) {
  return (
    <div>
      <PasswordInput
        id="password"
        name="password"
        value={userPass.password}
        onChange={handleChange}
        placeholder="Password"
        error={errors.password}
        className="rounded-t-lg"
        onBlur={validateInput}
      />

      <PasswordInput
        id="confirmPassword"
        name="confirmPassword"
        value={userPass.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm Password"
        error={errors.confirmPassword}
        className="rounded-b-lg"
        onBlur={validateInput}
        // className="border-none rounded-none mt-0 bg-white pl-6 shadow-none"
      />
    </div>
  );
}
