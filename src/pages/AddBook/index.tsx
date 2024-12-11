import { useNavigate } from "react-router-dom"
import Image from "../../components/shared/Image"
import Button from "../../components/shared/Button"
import leftArrowIcon from "../../assets/leftArrow.png"
export default function AddBook() {
  const navigate = useNavigate()
  return (
    <div>
      <div className="fixed left-0 top-0 w-full h-[48px] flex items-center justify-between px-4 border-b border-[#E4E4E4] bg-light z-30 ">
                <div className="flex items-center gap-2">
                    <div
                        className="cursor-pointer w-5"
                        onClick={() => navigate("/profile/user-profile")}
                    >
                        <Image src={leftArrowIcon} alt="left" />
                    </div>
                    <h3 className="font-sofia text-base font-medium ">
                        Edit Profile
                    </h3>
                </div>
                <div>
                    <Button
                    >
                        Save
                    </Button>
                </div>
            </div>
    </div>
  )
}
