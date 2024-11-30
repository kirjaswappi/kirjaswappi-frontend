import { useEffect, useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoCamera } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import bg from "../../../assets/bookdetailsbg.jpg";
import closeIcon from "../../../assets/close.svg";
import leftArrowIcon from "../../../assets/leftArrow.png";
import locationIcon from "../../../assets/location-icon.png";
import Button from "../../../components/shared/Button";
import Image from "../../../components/shared/Image";
import Input from "../../../components/shared/Input";
import InputLabel from "../../../components/shared/InputLabel";
import Loader from "../../../components/shared/Loader";
import TextArea from "../../../components/shared/TextArea";
import {
    useGetUserProfileImageQuery,
    useUploadProfileImageMutation
} from "../../../redux/feature/auth/authApi";
import { setOpen } from "../../../redux/feature/open/openSlice";
import { useAppSelector } from "../../../redux/hooks";
import AddGenre from "./AddGenre";

interface IEditInfo {
    firstName: string | undefined;
    lastName: string | undefined;
    aboutMe: string | undefined;
    streetName: string | undefined,
    houseNumber: string | undefined,
    zipCode: number | undefined,
    city: string | undefined,
    country: string | undefined,
    phoneNumber: string | undefined,
    favGenres: string[] | undefined
}

export default function EditProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const profileRef = useRef(null);
    const [profileModal, setProfileModal] = useState<boolean>(false)
    const [isEditValuesChanged, setEditValuesChanged] = useState<boolean>(false)
    const { open } = useAppSelector((state) => state.open);
    const { userInformation } = useAppSelector((state) => state.auth);
    const [uploadProfileImage] = useUploadProfileImageMutation()
    const { data: imageData, isLoading, isSuccess } = useGetUserProfileImageQuery(
        {
            userId: userInformation.id,
        },
        { skip: !userInformation.id }
    );
    const [editImage, setEditImage] = useState<string>("");
    const [profileFile, setProfileFile] = useState("");
    const [error, setError] = useState<string>('')
    const [editInfo, setEditInfo] = useState<IEditInfo>({
        firstName: "",
        lastName: "",
        aboutMe: "",
        streetName: "",
        houseNumber: "",
        zipCode: 0,
        city: "",
        country: "",
        phoneNumber: "",
        favGenres: []
    });

    const maxsize = 1024 * 1024 * 2;
    // const { clicked, reference, setClicked } = useMouseClick();
    const allowedTypes = ['image/jpeg', 'image/png']
    const handleChange = (e: { target: { name: any; value: any } }) => {
        setEditInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setEditValuesChanged(true)
    };

    const handleClick = () => {
        profileRef.current.click();
    };
    const uploadProfileImageHandler = (e: { target: { files: any } }) => {
        setProfileModal(false)
        const file = e.target.files[0]
        let errorMessage: string[] = [];
        // checking file type
        if (!allowedTypes.includes(file.type)) {
            errorMessage.push(`Please upload .jpeg or .png files. `)
        }
        // checking file size
        if (file.size > maxsize) {
            errorMessage.push(`File size limit ${maxsize / (1024 * 1024)}MB.`)
        }
        //  console.log(errorMessage)
        if (errorMessage.length > 0) {
            setError(errorMessage.join(' '))
            return
        }
        // reset error in state and store file in state
        setError('')
        setEditImage(URL.createObjectURL(file)); // preview image
        setProfileFile(file);
    };

    const handleEditSaveFn = async () => {
        // 1. if image change then hit the image an api
        if (profileFile !== "") {
            // request to api
            if (userInformation.id) {
                const formdata = new FormData();
                formdata.append("image", profileFile);
                await uploadProfileImage({ id: userInformation.id, image: formdata })
                    .then(() => setProfileFile(''))
                    .catch((error) => console.log(error));
            }
        }

        // 2. if users information has changed then hit the users api
        if (isEditValuesChanged) {
            
        }
        // 3. Genre is add
    };

    // Initialization in state
    useEffect(() => {
        if (userInformation) {
            setEditInfo((prev) => ({
                ...prev,
                firstName: userInformation.firstName,
                lastName: userInformation.lastName,
                aboutMe: userInformation.aboutMe ?? "",
            }));
        }
    }, [userInformation]);

    useEffect(() => {
        if (imageData !== undefined) {
            setEditImage(imageData as string);
        }
    }, [imageData, isSuccess]);

    if (isLoading) return <Loader />;
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
                    <Button
                        className="text-[#3879E9] font-sofia font-medium text-base"
                        onClick={handleEditSaveFn}
                    >
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
                        <div className="w-full h-full flex items-center justify-center overflow-hidden">
                            {editImage === "" ? (
                                <FaRegUser size={72} className="text-night" />
                            ) : (
                                <Image
                                    src={editImage}
                                    className="w-[120px] h-[120px] object-cover relative rounded-full"
                                />
                            )}
                            <div
                                className="w-7 h-7 bg-white cursor-pointer z-[99999999px] absolute bottom-0 right-2 rounded-full flex items-center justify-center shadow-sm"
                                // ref={reference}
                                onClick={() => setProfileModal(!profileModal)}
                            >
                                {/* <Image src={editIcon} alt="edit" /> */}
                                <IoCamera className="text-primary" />

                            </div>
                        </div>
                        <div
                            className={`${profileModal ? 'block' : "hidden"} w-[128px] max-w-auto bg-white text-center font-medium text-sm px-1 shadow-2xl rounded-lg`}
                        >
                            <button
                                className="border-b border-platinum py-2 font-sofia text-black flex items-center justify-center w-full "
                                onClick={handleClick}
                            >
                                Upload profile
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    ref={profileRef}
                                    onChange={uploadProfileImageHandler}
                                />
                            </button>
                            <button
                                className="border-b border-platinum py-2 font-sofia text-black flex items-center justify-center w-full "
                                onClick={() => setEditImage("")}
                            >
                                Remove profile
                            </button>
                        </div>
                    </div>
                    {error && <p className="text-center text-sm font-sofia text-rose-600 mb-2">{error}</p>}
                </div>
                <div className="border-b border-[#111010] pb-4">
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
                    <InputLabel label="First Name" />
                    <Input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        className="rounded-md"
                        value={editInfo.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="mt-4 pb-4 border-b border-[#E4E4E4]">
                    <InputLabel label="Last Name" />
                    <Input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className="rounded-md"
                        value={editInfo.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div className="mt-4 pb-4 border-b border-[#E4E4E4]">
                    <InputLabel label="Bio" />
                    <TextArea
                        placeholder="Write here..."
                    // value={editInfo.aboutMe}
                    />
                </div>
                <div>
                    <div className="flex items-center justify-between py-4">
                        <h1 className="font-sofia text-sm font-medium leading-none">
                            Genre
                        </h1>
                        <button
                            onClick={() => dispatch(setOpen(!open))}
                            className="text-[#3879E9] font-sofia font-medium text-sm leading-none underline"
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex flex-col gap-2 pb-4">
                        {Array.from({ length: 6 }, (_, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between px-4 py-4 bg-white border border-[#E6E6E6] rounded-lg"
                            >
                                <h3 className="font-sofia text-sm font-light">
                                    Biography
                                </h3>
                                <button>
                                    <Image
                                        src={closeIcon}
                                        alt="close"
                                        className="h-2"
                                    />
                                </button>
                            </div>
                        ))}
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
                        <p className="flex items-center font-sofia font-normal text-xs gap-1">
                            <Image src={locationIcon} alt="location" /> Dhaka
                            bangladesh
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
