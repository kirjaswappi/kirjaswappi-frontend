import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import bg from "../../../assets/bookdetailsbg.jpg";
import closeIcon from "../../../assets/close.svg";
import editIcon from "../../../assets/editBlue.png";
import leftArrowIcon from "../../../assets/leftArrow.png";
import locationIcon from "../../../assets/location-icon.png";
import userprofile from "../../../assets/userprofile.png";
import Button from "../../../components/shared/Button";
import Image from "../../../components/shared/Image";
import Input from "../../../components/shared/Input";
import InputLabel from "../../../components/shared/InputLabel";
import TextArea from "../../../components/shared/TextArea";
import { setOpen } from "../../../redux/feature/open/openSlice";
import { useAppSelector } from "../../../redux/hooks";
import AddGenre from "./AddGenre";
export default function EditProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { open } = useAppSelector(state => state.open)
    return (
        <div>
            {/* ADD Genre Modal */}
            <AddGenre />
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
                    <Button className="text-[#3879E9] font-sofia font-medium text-base">
                        Save
                    </Button>
                </div>
            </div>

            <div className="container pt-16">
                <div className="border-b border-[#E4E4E4]">
                    <h1 className="font-medium font-sofia text-sm leading-none">
                        Profile Picture
                    </h1>
                    <div className="mx-auto w-[120px] h-[120px] rounded-full  bg-white my-4 relative">
                        <Image
                            src={userprofile}
                            className="w-full h-full object-fill relative rounded-full"
                        />
                        <div className="w-7 h-7 bg-white cursor-pointer z-[99999999px] absolute bottom-0 right-2 rounded-full flex items-center justify-center">
                            <Image src={editIcon} alt="edit" />
                        </div>
                    </div>
                </div>
                <div className="border-b border-[#E4E4E4] pb-4">
                    <div className="flex items-center justify-between py-4">
                        <h1 className="font-sofia text-sm font-medium leading-none">
                            Cover Picture
                        </h1>
                        <Button className="text-[#3879E9] font-sofia font-medium text-sm leading-none underline">
                            Change
                        </Button>
                    </div>
                    <div className="h-[124px] w-full">
                        <Image
                            src={bg}
                            alt="edit"
                            className="w-full h-full bg-cover"
                        />
                    </div>
                </div>
                <div className="mt-4 pb-4 border-b border-[#E4E4E4]">
                    <InputLabel label="User Name" />
                    <Input
                        type="text"
                        name="u sername"
                        placeholder="Username"
                        className="rounded-md"
                    />
                </div>
                <div className="mt-4 pb-4 border-b border-[#E4E4E4]">
                    <InputLabel label="Bio" />
                    <TextArea placeholder="Write here..." />
                </div>
                <div>
                    <div className="flex items-center justify-between py-4">
                        <h1 className="font-sofia text-sm font-medium leading-none">
                            Genre
                        </h1>
                        <button onClick={() => dispatch(setOpen(!open))} className="text-[#3879E9] font-sofia font-medium text-sm leading-none underline" >
                            Add
                        </button>
                    </div>
                    <div className="flex flex-col gap-2 pb-4">
                        {Array.from({ length: 6 }, (_, index) => <div key={index} className="flex items-center justify-between px-4 py-4 bg-white border border-[#E6E6E6] rounded-lg">
                            <h3 className="font-sofia text-sm font-light">Biography</h3>
                            <button>
                                <Image src={closeIcon} alt="close" className="h-2" />
                            </button>
                        </div>)}
                    </div>
                </div>
                <div className="pb-8">
                    <div className="flex items-center justify-between py-4">
                        <h1 className="font-sofia text-sm font-medium leading-none">
                            Location
                        </h1>
                        <Button className="text-[#3879E9] font-sofia font-medium text-sm leading-none underline">
                            Change
                        </Button>
                    </div>
                    <div>
                        <p className="flex items-center font-sofia font-normal text-xs gap-1"><Image src={locationIcon} alt="location" /> Dhaka bangladesh</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
