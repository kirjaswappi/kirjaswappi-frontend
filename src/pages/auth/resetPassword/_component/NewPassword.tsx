import { useState, useEffect } from "react";
import PasswordInput from "../../../../components/shared/PasswordInput";
import { useDispatch } from "react-redux";
import { setMessages } from "../../../../redux/feature/notification/notificationSlice";
import type { INewPasswordProps } from "../interface";

export default function NewPassword({ register, errors, updateValues }: INewPasswordProps) {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Notify parent component when values change
  useEffect(() => {
    if (updateValues) {
      updateValues(password, confirmPassword);
    }
  }, [password, confirmPassword, updateValues]);
  
  return (
    <div>
      <div>
        <PasswordInput
          id="password"
          {...register("password")}
          placeholder="Password"
          error={errors.password?.message}
          className="rounded-t-lg"
          value={password}
          onChange={(e) => {
            const newValue = e.target.value;
            setPassword(newValue);
            dispatch(setMessages({ type: "", isShow: false, message: "" }));
          }}
        />
      </div>

      <PasswordInput
        id="confirmPassword"
        {...register("confirmPassword")}
        placeholder="Confirm Password"
        error={errors.confirmPassword?.message}
        className="rounded-b-lg"
        value={confirmPassword}
        onChange={(e) => {
          const newValue = e.target.value;
          setConfirmPassword(newValue);
          dispatch(setMessages({ type: "", isShow: false, message: "" }));
        }}
      />
    </div>
  );
}
