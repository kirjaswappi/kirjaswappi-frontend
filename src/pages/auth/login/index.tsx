import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { PiEyeClosed } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import bookDetailsBg from "../../../assets/bookdetailsbg.jpg";
import profileIcon from "../../../assets/profileIcon.png";
import Image from "../../../components/shared/Image";
import Input from "../../../components/shared/Input";
import MessageToastify from "../../../components/shared/MessageToastify";
import { ERROR, SUCCESS } from "../../../constant/MESSAGETYPE";
import { useLoginMutation } from "../../../redux/feature/auth/authApi";
import {
  setAuthMessage,
  setAuthSuccess,
  setError,
} from "../../../redux/feature/auth/authSlice";
import { setMessages } from "../../../redux/feature/notification/notificationSlice";
import { useAppSelector } from "../../../redux/hooks";

interface ILoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { error, message } = useAppSelector((state) => state.auth);
  const {
    isShow,
    message: msg,
    messageType,
  } = useAppSelector((state) => state.notification);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    [key: string]: string | null | undefined;
  }>({});
  const [userInfo, setUserInfo] = useState<ILoginForm>({
    email: "",
    password: "",
  });

  // Filtered Error
  const fieldError = Object.keys(errors).map((key) => errors[key]);
  const filteredError = fieldError.filter((msg) => msg);

  const validateInput = (e: any) => {
    const { name, value } = e.target;

    setErrors((prev: any) => {
      const stateObj = { ...prev, [name]: "" };
      switch (name) {
        case "email":
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!value) {
            stateObj[name] = "Please enter email.";
          } else if (!emailRegex.test(value)) {
            stateObj[name] = "Please Enter your valid email";
          }
          break;
        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (value < 0) {
            errors.password = "Password must be at least 6 characters long";
          }
          break;
        default:
          break;
      }
      return stateObj;
    });
  };
  // handle Change function to take login information
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // login information store in state
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
    setErrors({ ...errors, [name]: "" });
    dispatch(setError(""));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let allValid = true;
    Object.keys(userInfo).forEach((key: any) => {
      const typedKey = key as keyof ILoginForm;

      const event = {
        target: {
          name: key,
          value: userInfo[typedKey],
        },
      };
      validateInput(event);

      if (!userInfo[typedKey]) {
        allValid = false;
      }
    });

    if (allValid) {
      try {
        await login(userInfo)
          .then(async (res) => {
            if (res?.data) {
              const timer = setTimeout(() => {
                dispatch(setMessages({ type: "", isShow: false, message: "" }));
                dispatch(setAuthMessage(""));
                dispatch(setAuthSuccess(false));
              }, 2000);
              return () => clearTimeout(timer);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log("login error", error);
      }
    }
  };

  // !Important message
  // Check it out. Is it a field error or an API error?  [type_off_error: [SUCCESS, 'ERROR]]
  const checkingFieldErrorOrApiError = () => {
    if (message && message !== null) {
      return {
        msg: message,
        type: SUCCESS,
        isShow: true,
      };
    }
    if ((error && error !== null) || filteredError.length > 0) {
      return {
        msg: error || filteredError[0],
        type: ERROR,
        isShow: true,
      };
    }
    return {
      isShow: false,
      msg: "",
      type: "",
    };
  };

  useEffect(() => {
    const { isShow, msg, type } = checkingFieldErrorOrApiError();
    if (isShow && msg) {
      dispatch(setMessages({ type, isShow, message: msg }));
    } else {
      dispatch(setMessages({ type: "", isShow: false, message: "" }));
    }
  }, [filteredError, error, message]);

  useEffect(() => {
    dispatch(setMessages({ type: "", isShow: false, message: "" }));
    dispatch(setError(""));
  }, [location.pathname, dispatch]);
  return (
    <div className="relative">
      {/* <div className="absolute left-0 top-4 w-full flex justify-between px-4">

                <div className="flex items-center gap-4">
                    <h2>My profile</h2>
                </div>
                <div className="flex items-center gap-4">
                    <Image src={rightMenu} alt="icon" />
                </div>
            </div> */}
      <div className="absolute top-[18%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full  bg-white flex items-center justify-center">
        <Image src={profileIcon} className=" " />
      </div>
      <div className="w-full h-[124px] z-0">
        <Image src={bookDetailsBg} className="w-full h-full" />
      </div>
      <div className="container h-[calc(80vh-128px)]">
        <div>
          <h2 className="text-black text-base font-poppins, font-normal text-center mt-24 mb-4">
            Sign In
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div>
              <div>
                <Input
                  type="email"
                  id="email"
                  value={userInfo.email}
                  name="email"
                  onChange={handleChange}
                  placeholder="E-mail"
                  error={errors.email}
                  className="rounded-t-lg"
                  onBlur={validateInput}
                />
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={userInfo.password}
                  name="password"
                  onChange={handleChange}
                  placeholder="Password"
                  error={errors.password}
                  className="rounded-b-lg border-t-0"
                  onBlur={validateInput}
                />
                <div
                  className="absolute right-4 top-[18px] flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <PiEyeClosed className=" text-grayDark" />
                  ) : (
                    <AiOutlineEye className=" text-grayDark" />
                  )}
                </div>
              </div>
            </div>

            {isShow && (
              <div className="mt-2">
                <MessageToastify
                  isShow={isShow}
                  type={messageType}
                  value={msg}
                />
              </div>
            )}
            <div className="flex items-center justify-between my-4">
              <div className="flex items-center gap-2 text-grayDark">
                <input
                  type="checkbox"
                  name=""
                  id="remember"
                  className="cursor-pointer"
                />
                <label
                  htmlFor="remember"
                  className="cursor-pointer text-sm font-light font-poppins text-grayDark"
                >
                  Remember me
                </label>
              </div>
              <Link
                to="/password/reset"
                className="text-black font-light text-sm underline font-poppins"
              >
                Forgot Password ?
              </Link>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[48px] px-4 font-normal text-white bg-primary rounded-2xl text-sm"
            >
              {isLoading ? "Loading..." : "Continue"}
            </button>
            <div className=" flex items-center justify-center gap-1 mt-4">
              <p className="text-black text-sm font-light font-poppins">
                Don’t have an account?
              </p>
              <button
                className="text-black text-sm font-light font-poppins underline"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/auth/register");
                }}
              >
                Create an account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
