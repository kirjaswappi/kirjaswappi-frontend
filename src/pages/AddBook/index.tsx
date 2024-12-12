import { useState } from "react";
import { useNavigate } from "react-router-dom";
import closeIcon from "../../assets/close.svg";
import leftArrowIcon from "../../assets/leftArrow.png";
import locationIcon from "../../assets/location-icon.png";
import AddGenre from "../../components/shared/AddGenre";
import Button from "../../components/shared/Button";
import Image from "../../components/shared/Image";
import Input from "../../components/shared/Input";
import InputLabel from "../../components/shared/InputLabel";
import Select from "../../components/shared/Select";
import TextArea from "../../components/shared/TextArea";
import { setOpen } from "../../redux/feature/open/openSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { options } from "./constant";

interface IAddBookInterface {
    bookTitle?: string | undefined | null;
    authorName?: string | undefined | null;
    description?: string | undefined | null;
    favGenres: string[];
}

export default function AddBook() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { open } = useAppSelector((state) => state.open);
    const [isEditValuesChanged, setEditValuesChanged] =
        useState<boolean>(false);
    const [errors, setErrors] = useState<{
        [key: string]: string | null | undefined;
    }>({});
    const [addBookInfo, setAddBookInfo] = useState<IAddBookInterface>({
        bookTitle: "",
        authorName: "",
        description: "",
        favGenres: [],
    });
    const handleRemoveGenre = (genreValue: string) => {
        setAddBookInfo((prev) => ({
            ...prev,
            favGenres: prev?.favGenres?.filter(
                (favGen) => favGen !== genreValue
            ) ,
        }));
        setEditValuesChanged(true);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setAddBookInfo((prev) => ({ ...prev, [name]: value }));
        setErrors({ ...errors, [name]: "" });
        setEditValuesChanged(true);
    };
    const validateInput = (e: any) => {
        const { name, value } = e.target;

        setErrors((prev: any) => {
            const stateObj = { ...prev, [name]: "" };

            if (name === "bookTitle") {
                if (!value) {
                    stateObj[name] = "Please enter book title.";
                }
            } else if (name === "description") {
                if (!value) {
                    stateObj[name] = "Please enter description.";
                }
            }

            return stateObj;
        });
    };

    // Handle submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let allValid = true;
        Object.keys(addBookInfo).forEach((key: any) => {
            const typedKey = key as keyof IAddBookInterface;
            const event = {
                target: {
                    name: key,
                    value: addBookInfo[typedKey],
                },
            };
            validateInput(event);

            if (!addBookInfo[typedKey]) {
                allValid = false;
            }
        });
        if (allValid) {
            try {
                //
            } catch (error) {
                console.log("Error", error);
            }
        }
    };

    return (
        <div>
            <AddGenre
                editInfo={addBookInfo}
                setEditInfo={setAddBookInfo}
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
                        Add Book
                    </h3>
                </div>
                <div>
                    <Button className="text-[#3879E9] font-sofia font-medium text-base leading-none">
                        Save
                    </Button>
                </div>
            </div>

            <div className="container">
                <form>
                    <div className="mt-4 pb-4 border-b border-[#E4E4E4] pt-[48px]">
                        <InputLabel label="Book Title" required />
                        <Input
                            type="text"
                            name="bookTitle"
                            placeholder="Book Title"
                            className="rounded-md"
                            // value={editInfo.firstName}
                            // onChange={handleChange}
                        />
                    </div>
                    <div className="mt-4 pb-4 border-b border-[#E4E4E4]">
                        <InputLabel label="Author Name" />
                        <Input
                            type="text"
                            name="authorName"
                            placeholder="Author Name"
                            className="rounded-md"
                            // value={editInfo.firstName}
                            // onChange={handleChange}
                        />
                    </div>
                    <div className="mt-4 pb-4 border-b border-[#E4E4E4]">
                        <InputLabel label="Short Description" required />
                        <TextArea
                            name="description"
                            placeholder="Write here..."
                            // value={editInfo.aboutMe}
                            // onChange={handleChange}
                        />
                    </div>
                    <div className="mt-4 pb-4 border-b border-[#E4E4E4]">
                        <InputLabel label="Book Language" />
                        <Input
                            type="text"
                            name="authorName"
                            placeholder="Enter Book Language"
                            className="rounded-md"
                            // value={editInfo.firstName}
                            // onChange={handleChange}
                        />
                    </div>
                    <div className="mt-4 pb-4 border-b border-[#E4E4E4]">
                        <InputLabel label="Book Condition" />
                        <Select
                            name="bookCondition"
                            value="acceptable"
                            options={options}
                            className="bg-white"
                        />
                    </div>
                </form>
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
                {addBookInfo.favGenres && addBookInfo.favGenres.length > 0 && (
                    <div className="flex flex-col gap-2 pb-4">
                        {addBookInfo.favGenres.map((favItem, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between px-4 py-4 bg-white border border-[#E6E6E6] rounded-lg"
                            >
                                <h3 className="font-sofia text-sm font-light">
                                    {favItem}
                                </h3>
                                <Button
                                    onClick={() => handleRemoveGenre(favItem)}
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
