import { useNavigate } from "react-router-dom";
import bg from "../../../assets/bookdetailsbg.jpg";
import editIcon from "../../../assets/editBlue.png";
import leftArrowIcon from "../../../assets/leftArrow.png";
import userprofile from "../../../assets/userprofile.png";
import Button from "../../../components/shared/Button";
import Image from '../../../components/shared/Image';
import Input from "../../../components/shared/Input";
import InputLabel from "../../../components/shared/InputLabel";
import TextArea from "../../../components/shared/TextArea";

export default function EditProfile() {
    const navigate = useNavigate()
    return (
        <div>
            <div className="absolute left-0 top-4 w-full flex justify-between px-4 border-b border-[#E4E4E4] pb-3">
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
                    <Button className="text-[#3879E9] font-sofia font-medium text-base">Save</Button>
                </div>
            </div>
            <div className="container pt-16">
                <div className="border-b border-[#E4E4E4]">
                    <h1 className="font-medium font-sofia text-sm leading-none">Profile Picture</h1>
                    <div className="mx-auto w-[120px] h-[120px] rounded-full  bg-white my-4 relative">
                        <Image src={userprofile} className="w-full h-full object-fill relative rounded-full" />
                        <div className="w-7 h-7 bg-white cursor-pointer z-[99999999px] absolute bottom-0 right-2 rounded-full flex items-center justify-center">
                            <Image src={editIcon} alt="edit" />
                        </div>
                    </div>
                </div>
                <div className="border-b border-[#E4E4E4] pb-4">
                    <div className="flex items-center justify-between py-4">
                        <h1 className="font-sofia text-sm font-medium leading-none">Cover Picture</h1>
                        <button className="text-[#3879E9] font-sofia font-medium text-sm leading-none underline">Change</button>
                    </div>
                    <div className="h-[124px] w-full">
                        <Image src={bg} alt="edit" className="w-full h-full bg-cover" />
                    </div>
                </div>
                <div className="mt-4 pb-4 border-b border-[#E4E4E4]">
                    <InputLabel label="User Name" />
                    <Input type="text" name="username" placeholder="Username" className="rounded-md"  />
                </div>
                <div className="mt-4 pb-4 border-b border-[#E4E4E4]">
                    <InputLabel label="User Name" />
                    <TextArea />
                </div>
            </div>
        </div>
    )
}
