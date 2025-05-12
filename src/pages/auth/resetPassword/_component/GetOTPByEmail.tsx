import ControllerField from "../../../../components/shared/ControllerField";
import { FormProvider } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setMessages } from "../../../../redux/feature/notification/notificationSlice";
import type { IGetOTPByEmailProps } from "../interface";

export default function GetOTPByEmail({
  methods
}: Omit<IGetOTPByEmailProps, "register" | "errors"> & { methods: any }) {
  const dispatch = useDispatch();
  
  // Use useEffect to properly watch for email changes
  useEffect(() => {
    // Create a subscription to the email field
    const subscription = methods.watch((formValues: any, { name }: { name?: string }) => {
      if (name === "email" || name === undefined) {
        // Clear any errors and notifications when email changes
        dispatch(setMessages({ type: "", isShow: false, message: "" }));
        
        // If there's currently an error on the email field, clear it
        if (methods.formState.errors.email) {
          methods.clearErrors("email");
        }
      }
    });
    
    // Clean up subscription on unmount
    return () => subscription.unsubscribe();
  }, [methods, dispatch]);
  
  return (
    <FormProvider {...methods}>
      <div>
        <ControllerField
          name="email"
          type="input"
          placeholder="Enter email"
          className="rounded-lg"
          showErrorMessage={false}
        />
        <p className="mt-4 text-sm text-[#808080] font-light">
          An OTP will be sent to the email address
        </p>
      </div>
    </FormProvider>
  );
}
