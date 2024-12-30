import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import closeIcon from "../../assets/close.svg";
import leftArrowIcon from "../../assets/leftArrow.png";
import locationIcon from "../../assets/location-icon.png";
import plusIcon from "../../assets/plus.png";
import AddGenre from "../../components/shared/AddGenre";
import Button from "../../components/shared/Button";
import Image from "../../components/shared/Image";
import Input from "../../components/shared/Input";
import InputLabel from "../../components/shared/InputLabel";
import Loader from "../../components/shared/Loader";
import Select from "../../components/shared/Select";
import Spinner from "../../components/shared/Spinner";
import TextArea from "../../components/shared/TextArea";
import { useImageUpload } from "../../hooks/useImageUpload";
import { useAddBookMutation, useGetSupportConditionQuery, useGetSupportLanguageQuery } from "../../redux/feature/book/bookApi";
import { setOpen } from "../../redux/feature/open/openSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
interface IAddBookInterface {
    ownerId?: string;
    title?: string | undefined | null;
    author?: string | undefined | null;
    description?: string | undefined | null;
    language?: string | undefined | null;
    favGenres: string[];
    condition?: string;
}

export default function AddBook() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [addBook, {isLoading}] = useAddBookMutation()
    const { data: languageDataOptions, isLoading: languageLoading } = useGetSupportLanguageQuery(undefined)
    const { data: conditionDataOptions, isLoading: conditionLoading } = useGetSupportConditionQuery(undefined)
    const { userInformation: { id } } = useAppSelector(state => state.auth)
    const bookPicture = useRef<HTMLInputElement | null>(null);
    const { open } = useAppSelector((state) => state.open);
    const [isEditValuesChanged, setEditValuesChanged] =
        useState<boolean>(false);
    const [errors, setErrors] = useState<{
        [key: string]: string | null | undefined;
    }>({});
    const [addBookInfo, setAddBookInfo] = useState<IAddBookInterface>({
        ownerId: "",
        title: "",
        author: "",
        description: "",
        condition: "",
        language: "",
        favGenres: [],
    });
    const {
        handleImageFile: uploadImageImageHandler,
        previewImage,
        imageFile: bookFile,
        error,
        setError
    } = useImageUpload();
    const handleRemoveGenre = (genreValue: string) => {
        setAddBookInfo((prev) => ({
            ...prev,
            favGenres: prev?.favGenres?.filter(
                (favGen) => favGen !== genreValue
            ),
        }));
        setEditValuesChanged(true);
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
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

            if (name === "title") {
                if (!value) {
                    stateObj[name] = "Please enter book title.";
                }
            }else if (name === "author") {
                if (!value) {
                    stateObj[name] = "Please enter description.";
                }
            } else if (name === "description") {
                if (!value) {
                    stateObj[name] = "Please enter description.";
                }
            } else if (name === "condition") {
                if (!value) {
                    stateObj[name] = "Please select book condition.";
                }
            } else if (name === "language") {
                if (!value) {
                    stateObj[name] = "Please enter book language.";
                }
            }

            return stateObj;
        });
    };

    const handleClick = () => {
        if (bookPicture.current) {
            bookPicture.current.click();
        }
    };

    // Handle submit
    const handleSaveFn = () => {
        let allValid: boolean = false;
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
        if (!bookFile) {
            setError("Book Image is required.")
            setEditValuesChanged(false)
            // allValid = false;
        }        
        if (addBookInfo.favGenres.length <= 0) {
            // allValid = false;
            setErrors((prev) => ({ ...prev, genres: "At least one genre is required" }))
            setEditValuesChanged(false)
        }else{
            setErrors((prev) => ({ ...prev, genres: null }))
        }

        if(bookFile && addBookInfo.favGenres.length > 0){
            setEditValuesChanged(true)
            allValid = true
        }
        
        // final all valid 
        if (allValid) {
            try {
                const genres = addBookInfo.favGenres;
                const form = new FormData()
                form.append('ownerId', id!)
                form.append('title', addBookInfo.title!)
                form.append('author', addBookInfo.author!)
                form.append('description', addBookInfo.description!)
                form.append('condition', addBookInfo.condition!)
                form.append('language', addBookInfo.language!)
                form.append('coverPhoto', bookFile!)
                form.append('genres', genres.join(", "));
                addBook(form).unwrap().then(res => {
                    if (!res.error) {
                        const timer = setTimeout(() => {
                            navigate("/profile/user-profile");
                        }, 0);
                        return () => clearTimeout(timer);
                    }
                })

            } catch (error) {
                console.log("Error", error);
            }
        }
    };
    // Clear an error of genres
    useEffect(() => {
        if (addBookInfo.favGenres.length > 0) setErrors((prev) => ({ ...prev, genres: null }))
    }, [addBookInfo.favGenres])

    const options = (options: string[]) => {
        if(options && options?.length > 0){
            const option = options?.map((item: string)=> {
                return { label: item, value: item }
            })
            return option
        }
    }
    const languages = options(languageDataOptions)
    const conditions = options(conditionDataOptions)
    const isSaveActive: boolean = isEditValuesChanged || !!bookFile;

    const loading = () => {
        if (languageLoading) return true;
        if (conditionLoading) return true;
        else return false;
    };
    if (loading()) return <Loader />;
    return (
        <div>
            {isLoading && <Spinner />}
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
                    <h3 className="font-poppins text-base font-medium ">
                        Add Book
                    </h3>
                </div>
                <div>
                    <Button
                        disabled={!isSaveActive}
                        className={` ${isSaveActive
                                ? " text-[#3879E9] cursor-pointer"
                                : "text-[#3879e985]"
                            } font-poppins font-medium text-base`}
                        onClick={handleSaveFn}
                    >
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
                            name="title"
                            placeholder="Book Title"
                            className="rounded-md"
                            error={errors.title}
                            showErrorMessage={!!errors.title}
                            // value={editInfo.firstName}
                            onChange={handleChange}
                            onBlur={validateInput}
                        />
                    </div>
                    <div className="mt-4 pb-4 border-b border-[#E4E4E4]">
                        <InputLabel label="Author Name" />
                        <Input
                            type="text"
                            name="author"
                            placeholder="Author Name"
                            className="rounded-md"
                            // value={editInfo.firstName}
                            onChange={handleChange}
                            onBlur={validateInput}
                            error={errors.author}
                            showErrorMessage={!!errors.author}
                        />
                    </div>
                    <div className="border-b border-[#E4E4E4] mt-4 pb-4">
                        <h1 className="font-medium font-poppins text-sm leading-none">
                            Book Cover<span className="text-red-600">*</span>
                        </h1>
                        <div
                            className="mx-auto w-[126px] h-[150px] my-4 relative border border-grayDark border-dashed flex items-center justify-center rounded-lg overflow-hidden"
                            onClick={handleClick}
                        >
                            {previewImage && previewImage ? (
                                <div className="w-[126px] h-[150px] ">
                                    <Image
                                        src={previewImage}
                                        alt="Book"
                                        className="object-cover  w-full h-full"
                                    />
                                </div>
                            ) : (
                                <div
                                    className={`flex flex-col items-center gap-2`}
                                >
                                    <Image src={plusIcon} alt="Plus" />
                                    <button
                                        type="button"
                                        className=" font-poppins font-medium text-xs text-grayDark flex items-center justify-center w-full "
                                    >
                                        Upload Picture
                                        <input
                                            type="file"
                                            ref={bookPicture}
                                            accept="image/*"
                                            className="hidden"
                                            onChange={uploadImageImageHandler}
                                        />
                                    </button>
                                </div>
                            )}
                        </div>
                        {error && (
                            <p className="text-center text-sm font-poppins text-rose-600 mb-2">
                                {error}
                            </p>
                        )}
                    </div>
                    <div className="mt-4 pb-4 border-b border-[#E4E4E4]">
                        <InputLabel label="Short Description" required />
                        <TextArea
                            name="description"
                            placeholder="Write here..."
                            // value={editInfo.aboutMe}
                            onBlur={validateInput}
                            onChange={handleChange}
                            error={errors.description}
                            showErrorMessage={!!errors.description}
                            className="rounded-md h-[83px]"
                        />
                    </div>
                    <div className="mt-4 pb-4 border-b border-[#E4E4E4]">
                        <InputLabel label="Book Language" required />
                        <Select
                            onChange={handleChange}
                            onBlur={validateInput}
                            name="language"
                            // value={addBookInfo.language}
                            options={languages || []}
                            className="bg-white"
                            error={errors.language}
                            showErrorMessage={!!errors.language}
                        />
                    </div>
                    <div className="mt-4 pb-4 border-b border-[#E4E4E4]">
                        <InputLabel label="Book Condition" />
                        <Select
                            onChange={handleChange}
                            onBlur={validateInput}
                            name="condition"
                            options={conditions || []}
                            className="bg-white"
                            error={errors.condition}
                            showErrorMessage={!!errors.condition}
                            value={addBookInfo.condition}
                        />
                    </div>
                </form>
                <div className="flex items-center justify-between py-4">
                    <h1 className="font-poppins text-sm font-medium leading-none">
                        Genre
                    </h1>
                    <button
                        onClick={() => dispatch(setOpen(!open))}
                        className="text-[#3879E9] font-poppins font-medium text-sm leading-none underline"
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
                                <h3 className="font-poppins text-sm font-light">
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
                {errors?.genres && (
                    <p className="text-left text-sm font-poppins text-rose-600 mb-2">
                        {errors.genres}
                    </p>
                )}
                <div className="pb-8">
                    <div className="flex items-center justify-between py-4">
                        <h1 className="font-poppins text-sm font-medium leading-none">
                            Location
                        </h1>
                        <Button className="text-[#3879E9] font-poppins font-medium text-sm leading-none underline">
                            Change
                        </Button>
                    </div>
                    <div>
                        <p className="flex items-center font-poppins font-normal text-xs gap-1">
                            <Image src={locationIcon} alt="location" /> Dhaka
                            bangladesh
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
