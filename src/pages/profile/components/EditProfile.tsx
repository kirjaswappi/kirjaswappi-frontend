import { useEffect, useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoCamera } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import bg from "../../../assets/bookdetailsbg.jpg";
import closeIcon from "../../../assets/close.svg";
import leftArrowIcon from "../../../assets/leftArrow.png";
import locationIcon from "../../../assets/location-icon.png";
import AddGenre from "../../../components/shared/AddGenre";
import AlertModal from "../../../components/shared/AlertModal";
import Button from "../../../components/shared/Button";
import Image from "../../../components/shared/Image";
import Input from "../../../components/shared/Input";
import InputLabel from "../../../components/shared/InputLabel";
import Spinner from "../../../components/shared/Spinner";
import TextArea from "../../../components/shared/TextArea";
import { useImageUpload } from "../../../hooks/useImageUpload";
import {
    useDeleteCoverImageMutation,
    useDeleteProfileImageMutation,
    useGetUserCoverImageQuery,
    useGetUserProfileImageQuery,
    useUpdateUserByIdMutation,
    useUploadCoverImageMutation,
    useUploadProfileImageMutation,
} from "../../../redux/feature/auth/authApi";
import { setAlert } from "../../../redux/feature/notification/notificationSlice";
import { setOpen } from "../../../redux/feature/open/openSlice";
import { useAppSelector } from "../../../redux/hooks";
import { IEditInfo } from "../interface/interface";

export default function EditProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const profileRef = useRef<HTMLInputElement | null>(null);
    const coverRef = useRef<HTMLInputElement | null>(null);
    const [isEditValuesChanged, setEditValuesChanged] =
        useState<boolean>(false);
    const { open } = useAppSelector((state) => state.open);
    const { alertType } = useAppSelector((state) => state.notification);
    const { userInformation } = useAppSelector((state) => state.auth);
    const [uploadProfileImage, { isLoading: profileLoading }] =
        useUploadProfileImageMutation();
    const [uploadCoverImage, { isLoading: coverLoading }] =
        useUploadCoverImageMutation();
    const [updateUserById, { isLoading: updateUserLoading }] =
        useUpdateUserByIdMutation();
    const [_deleteProfileImage, { isLoading: deleteLoading }] =
        useDeleteProfileImageMutation();
    const [_deleteCoverImage] = useDeleteCoverImageMutation()
    const { data: coverImageData, isSuccess: coverSuccess } =
        useGetUserCoverImageQuery(
            {
                userId: userInformation.id,
            },
            { skip: !userInformation.id }
        );
    const { data: imageData, isSuccess } = useGetUserProfileImageQuery(
        {
            userId: userInformation.id,
        },
        { skip: !userInformation.id }
    );
    const {
        imageFile: profileFile,
        handleImageFile: uploadProfileImageHandler,
        error,
        previewImage: editImage,
        handleRemove: handleRemoveProfile,
        handleSetPreviewImage: setPreviewProfileImage,
        handleClearState: clearProfileState,
        isShowModal: profileModal,
        handleShowModal: handleProfileToggle,
        setShowModal: setProfileToggle,
    } = useImageUpload();
    const {
        imageFile: coverFile,
        handleImageFile: uploadCoverImageHandler,
        error: coverError,
        previewImage: editCoverImage,
        handleRemove: handleRemoveCover,
        handleSetPreviewImage: setPreviewCoverImage,
        handleClearState: clearCoverState,
        isShowModal: coverModal,
        handleShowModal: handleCoverToggle,
        setShowModal: setCoverToggle,
    } = useImageUpload();
    const [editInfo, setEditInfo] = useState<IEditInfo>({
        id: userInformation.id,
        firstName: "",
        lastName: "",
        aboutMe: "",
        streetName: "",
        houseNumber: "",
        zipCode: 0,
        city: "",
        country: "",
        phoneNumber: "",
        favGenres: [],
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setEditInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setEditValuesChanged(true);
    };

    const handleRemoveGenre = (genreValue: string) => {
        setEditInfo((prev) => ({
            ...prev,
            favGenres: prev?.favGenres?.filter(
                (favGen) => favGen !== genreValue
            ),
        }));
        setEditValuesChanged(true);
    };

    const handleClick = () => {
        if (profileRef.current) {
            profileRef.current.click();
        }
    };
    const handleCoverClick = () => {
        if (coverRef.current) {
            coverRef.current.click();
        }
    };

    const isLoading = () => {
        if (profileLoading) return true;
        if (coverLoading) return true;
        if (updateUserLoading) return true;
        else return false;
    };

    const handleEditSaveFn = async () => {
        try {
            const requests = [];
            // 1. if image is not empty then hit the image an api
            if (profileFile && profileFile !== "") {
                // request to api
                if (userInformation.id) {
                    const formdata = new FormData();
                    formdata.append("image", profileFile);
                    const profileRequest = uploadProfileImage({
                        id: userInformation.id,
                        image: formdata,
                    }).unwrap();
                    requests.push(profileRequest);
                }
            }
            // 2. if cover image is not empty then hit the image an api
            if (coverFile && coverFile !== "") {
                // request to api
                if (userInformation.id) {
                    const formdata = new FormData();
                    formdata.append("image", coverFile);
                    const coverRequest = uploadCoverImage({
                        id: userInformation.id,
                        image: formdata,
                    }).unwrap();
                    requests.push(coverRequest);
                }
            }
            // 3. if users information has changed then hit the users api
            if (isEditValuesChanged) {
                const updateRequest = updateUserById({
                    id: userInformation.id,
                    data: editInfo,
                }).unwrap();
                requests.push(updateRequest);
            }
            const results = await Promise.allSettled(requests);

            results.forEach((result, index) => {
                if (result.status === "rejected") {
                    console.error(`Request ${index} failed:`, result.reason);
                }
            });

            clearProfileState();
            clearCoverState();
            navigate("/profile/user-profile");
        } catch (error) {
            console.log(error);
        }
    };


    const handleShowDeleteModalProfilePicture = (isProfileOrCover: string) => {
        setProfileToggle(false);
        setCoverToggle(false);
        dispatch(
            setAlert({
                showAlert: true,
                message: `Do you want to delete ${isProfileOrCover} picture?`,
                alertType: isProfileOrCover,
            })
        );
    };
    const handleDeleteFn = () => {
        const alert = alertType?.toLocaleLowerCase();
        if (alert === "profile") {
            // deleteProfileImage({ id: userInformation.id }).unwrap()
            handleRemoveProfile();
            dispatch(setAlert({showAlert: false,message: ``,alertType: "",}));
        } else if (alert === "cover") {
            handleRemoveCover();
                dispatch(
                    setAlert({
                        showAlert: false,
                        message: ``,
                        alertType: "",
                    })
                );
        }
    };

    // Initialization in state
    useEffect(() => {
        if (userInformation) {
            setEditInfo((prev) => ({
                ...prev,
                firstName: userInformation.firstName,
                lastName: userInformation.lastName,
                aboutMe: userInformation.aboutMe ?? "",
                favGenres: userInformation.favGenres?? [],
            }));
        }
    }, [userInformation]);

    useEffect(() => {
        if (imageData !== undefined) {
            setPreviewProfileImage(imageData as string);
        }else{
            setPreviewProfileImage("")
        }
    }, [imageData, isSuccess]);
    useEffect(() => {
        if (coverImageData !== undefined) {
            setPreviewCoverImage(coverImageData as string);
        }else{
            setPreviewCoverImage("")
        }
    }, [coverImageData, coverSuccess]);

    const isSaveActive: boolean =
        coverLoading ||
        profileLoading ||
        updateUserLoading ||
        isEditValuesChanged ||
        !!profileFile ||
        !!coverFile;

    return (
        <div>
            {isLoading() && <Spinner />}
            <AlertModal
                yes={handleDeleteFn}
                yesBtnValue="Yes"
                noBtnValue="No"
                no={() => dispatch(setAlert({ showAlert: false, message: "" }))}
                loading={deleteLoading}
            />
            <AddGenre
                editInfo={editInfo}
                setEditInfo={setEditInfo}
                setEditValuesChanged={setEditValuesChanged}
            />
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
                        disabled={!isSaveActive}
                        className={` ${
                            isSaveActive
                                ? " text-[#3879E9] cursor-pointer"
                                : "text-[#3879e985]"
                        } font-sofia font-medium text-base`}
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
                                onClick={() => {
                                    handleProfileToggle();
                                    setCoverToggle(false);
                                }}
                            >
                                <IoCamera className="text-primary" />
                            </div>
                        </div>
                        <div
                            className={`${
                                profileModal ? "block" : "hidden"
                            } w-[128px] max-w-auto bg-white text-center font-medium text-sm px-1 shadow-2xl rounded-lg absolute top-30 z-50`}
                        >
                            <button
                                className="border-b border-platinum py-2 font-sofia text-black flex items-center justify-center w-full "
                                onClick={handleClick}
                            >
                                Upload profile
                                <input
                                    type="file"
                                    ref={profileRef}
                                    accept="image/*"
                                    className="hidden"
                                    onChange={uploadProfileImageHandler}
                                />
                            </button>
                            <button
                                className="border-b border-platinum py-2 font-sofia text-black flex items-center justify-center w-full "
                                onClick={() =>
                                    handleShowDeleteModalProfilePicture(
                                        "profile"
                                    )
                                }
                            >
                                Remove profile
                            </button>
                        </div>
                    </div>
                    {error && (
                        <p className="text-center text-sm font-sofia text-rose-600 mb-2">
                            {error}
                        </p>
                    )}
                </div>
                <div className="border-b border-[#E4E4E4] pb-4">
                    <div className="flex items-center justify-between py-4 relative">
                        <h1 className="font-sofia text-sm font-medium leading-none">
                            Cover Picture
                        </h1>
                        <Button
                            onClick={() => {
                                handleCoverToggle();
                                setProfileToggle(false);
                            }}
                            className="text-[#3879E9] font-sofia font-medium text-sm leading-none underline relative"
                        >
                            Change
                        </Button>
                        <div
                            className={`${
                                coverModal ? "block" : "hidden"
                            }  absolute right-0 top-8 w-[128px] max-w-auto bg-white text-center font-medium text-sm px-1 shadow-2xl rounded-lg`}
                        >
                            <button
                                className="border-b border-platinum py-2 font-sofia text-black flex items-center justify-center w-full "
                                onClick={handleCoverClick}
                            >
                                Upload profile
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={coverRef}
                                    className="hidden"
                                    onChange={uploadCoverImageHandler}
                                />
                            </button>
                            <button
                                className="border-b border-platinum py-2 font-sofia text-black flex items-center justify-center w-full "
                                onClick={() =>
                                    handleShowDeleteModalProfilePicture("cover")
                                }
                            >
                                Remove profile
                            </button>
                        </div>
                    </div>
                    <div className="h-[124px] w-full">
                        {editCoverImage === "" ? (
                            <Image
                                src={bg}
                                alt="edit"
                                className="w-full h-full bg-cover"
                            />
                        ) : (
                            <Image
                                src={editCoverImage}
                                alt="edit"
                                className="w-full h-full bg-cover"
                            />
                        )}
                    </div>
                    {coverError && (
                        <p className="text-center text-sm font-sofia text-rose-600 mb-2">
                            {coverError}
                        </p>
                    )}
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
                        name="aboutMe"
                        placeholder="Write here..."
                        value={editInfo.aboutMe}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <div className="flex items-center justify-between py-4">
                        <h1 className="font-sofia text-sm font-medium leading-none">
                            Genre
                        </h1>
                        <Button
                            onClick={() => dispatch(setOpen(!open))}
                            className="text-[#3879E9] font-sofia font-medium text-sm leading-none underline"
                        >
                            Add
                        </Button>
                    </div>
                    {editInfo.favGenres && editInfo.favGenres.length > 0 && (
                        <div className="flex flex-col gap-2 pb-4">
                            {editInfo.favGenres.map((favItem, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between px-4 py-4 bg-white border border-[#E6E6E6] rounded-lg"
                                >
                                    <h3 className="font-sofia text-sm font-light">
                                        {favItem}
                                    </h3>
                                    <Button
                                        onClick={() =>
                                            handleRemoveGenre(favItem)
                                        }
                                    >
                                        <Image
                                            src={closeIcon}
                                            alt="close"
                                            className="h-2"
                                        />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
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
