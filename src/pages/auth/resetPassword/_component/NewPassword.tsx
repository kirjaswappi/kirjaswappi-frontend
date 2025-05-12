import { useEffect } from "react";
import ControllerFieldPassword from "../../../../components/shared/ControllerFieldPassword";
import { FormProvider } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setMessages } from "../../../../redux/feature/notification/notificationSlice";
import type { INewPasswordProps } from "../interface";

export default function NewPassword({ methods, updateValues }: Omit<INewPasswordProps, "register" | "errors"> & { methods: any }) {
  const dispatch = useDispatch();
  
  // Watch the password fields to notify parent component when values change
  useEffect(() => {
    if (updateValues) {
      const password = methods.watch("password") || "";
      const confirmPassword = methods.watch("confirmPassword") || "";
      updateValues(password, confirmPassword);
    }
  }, [methods, updateValues]);
  
  // Add effect to clear error messages when password fields change
  useEffect(() => {
    const subscription = methods.watch((value: any, { name }: { name?: string }) => {
      if (name === "password" || name === "confirmPassword" || !name) {
        // Clear error messages when passwords change
        dispatch(setMessages({ type: "", isShow: false, message: "" }));
      }
    });
    
    return () => subscription.unsubscribe();
  }, [methods, dispatch]);
  
  return (
    <FormProvider {...methods}>
      <div>
        <div>
          <ControllerFieldPassword
            name="password"
            placeholder="Password"
            className="rounded-t-lg"
            showErrorMessage={false}
          />
        </div>

        <ControllerFieldPassword
          name="confirmPassword"
          placeholder="Confirm Password"
          className="rounded-b-lg"
          showErrorMessage={false}
        />
      </div>
    </FormProvider>
  );
}
