import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import MessageToastify from "../../../../components/shared/MessageToastify";
import Button from "../../../../components/shared/Button";

export default function ConfirmOTP({otp, errors}) { 

  return (
    <div className="bg-white absolute bottom-0 left-0 w-full rounded-t-3xl transition-all duration-500 ease-in-out transform translate-y-0 h-[80vh]">
      <div className="text-center py-6 border-b border-[#E6E6E6]">
        <h1>Confirm your Email</h1>
      </div>
      <div className="px-6">
        <p className="text-sm font-light text-grayDark font-poppins text-center pt-8 pb-10">
          Enter the code we've sent to your Email
        </p>

          <div className="flex gap-2 justify-between mb-5">
            <OTPInput
              value={otp.join("")}
              onChange={handleOTPChange}
              numInputs={6}
              shouldAutoFocus
              inputType="text"
              renderInput={(props) => (
                <input
                  {...props}
                  maxLength={1}
                  inputMode="numeric"
                  placeholder="-"
                  className={`max-w-10 h-10 mb-5 bg-[#E7E7E7] ${
                    errors.otp ? "border border-rose-500" : "border border-[#D9D9D9]"
                  } rounded-md text-center text-base font-normal focus:outline-none transition-all duration-150`}
                  style={{
                    backgroundColor: "#E7E7E7",
                  }}
                />
              )}
              containerStyle={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            />
          </div>
          {errors.otp && (
            <MessageToastify isShow type="ERROR" value={errors.otp.message} />
          )}
        
        <div className="flex items-center justify-center mt-10 gap-2 text-grayDark text-sm font-poppins">
          <p>Haven't received a code?</p>
          <Button className="underline text-sm">Send again</Button>
        </div>
      </div>
    </div>
  );
}