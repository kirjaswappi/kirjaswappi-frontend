import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/feature/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import Button from "../shared/Button";

export default function Header() {
  const navigate = useNavigate()
  const { userInformation } = useAppSelector((state) => state.auth);
  const isShowLogoutBtn = userInformation.email !== ''
  const dispatch = useDispatch()
  return (
    <header>
      <div className="bg-secondary">
        <div className="container">
          <div className="flex items-center justify-end h-[50px]">
            <div className="text-white flex gap-4 ">
              <FaFacebookF />
              <FaTwitter />
              <FaInstagram />
              <FaLinkedinIn />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md mb-4">
        <div className="container">
        <div className="flex items-center justify-end h-[70px]">
          {isShowLogoutBtn ? <Button onClick={() => dispatch(logout())}>Logout</Button> : <div className="w-[140px] h-[45px] border border-night rounded-5px flex items-center justify-center text-sm font-medium gap-1 text-night">
          <Button onClick={() => navigate("/auth/login")}>Sign in</Button> /
          <Button onClick={() => navigate("/auth/register")}>Sign Up</Button>
          </div>}
        </div>
        </div>
      </div>
    </header>
  );
}