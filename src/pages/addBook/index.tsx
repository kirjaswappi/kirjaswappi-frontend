import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import leftArrowIcon from "../../assets/leftArrow.png";
import AddGenre from "../../components/shared/AddGenre";
import Button from "../../components/shared/Button";
import Image from "../../components/shared/Image";
import Loader from "../../components/shared/Loader";
import {
  useGetSupportConditionQuery,
  useGetSupportLanguageQuery
} from "../../redux/feature/book/bookApi";
import Stepper from "./_components/Stepper";
import BookDetailsStep from "./_components/BookDetailsStep";
import OtherDetailsStep from "./_components/OtherDetailsStep";
import ConditionsStep from "./_components/ConditionsStep";
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
//   const dispatch = useAppDispatch();
  // const [addBook, { isLoading }] = useAddBookMutation();
  const { isLoading: languageLoading } =
    useGetSupportLanguageQuery(undefined);
  const { isLoading: conditionLoading } =
    useGetSupportConditionQuery(undefined);
  // const {
  //   userInformation: { id }
  // } = useAppSelector((state) => state.auth);
  // const bookPicture = useRef<HTMLInputElement | null>(null);
//   const { open } = useAppSelector((state) => state.open);
  const [isEditValuesChanged, setEditValuesChanged] = useState<boolean>(false);
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
    favGenres: []
  });
  const [active, setActive] = useState<number>(0)
console.log(isEditValuesChanged, setActive )
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
      } else if (name === "author") {
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

  // Handle submit
  const handleSaveFn = () => {
    console.log('click on save button')
    // let allValid: boolean = false;
    if(active === 0){
      Object.keys(addBookInfo).forEach((key: any) => {
        const typedKey = key as keyof IAddBookInterface;
        const event = {
          target: {
            name: key,
            value: addBookInfo[typedKey]
          }
        };
        validateInput(event);
  
      });
    }
  };
// console.log(addBookInfo)
  const steps = [
    {
      label: "Book Details",
      isCompleted: false,
      isActive: true,
      content: <BookDetailsStep errors={errors} addBookInfo={addBookInfo} handleChange={handleChange} validateInput={validateInput} />
    },
    {
      label: "Other Details",
      isCompleted: false,
      isActive: false,
      content: <OtherDetailsStep />
    },
    {
      label: "Ex. Conditions",
      isCompleted: false,
      isActive: false,
      content: <ConditionsStep />
    }
  ]





  // Clear an error of genres
  useEffect(() => {
    if (addBookInfo.favGenres.length > 0)
      setErrors((prev) => ({ ...prev, genres: null }));
  }, [addBookInfo.favGenres]);

  // const options = (options: string[]) => {
  //   if (options && options?.length > 0) {
  //     const option = options?.map((item: string) => {
  //       return { label: item, value: item };
  //     });
  //     return option;
  //   }
  // };
  // const languages = options(languageDataOptions);
  // const conditions = options(conditionDataOptions);
  // const isSaveActive: boolean = isEditValuesChanged || !!bookFile;

  const loading = () => {
    if (languageLoading) return true;
    if (conditionLoading) return true;
    else return false;
  };
  
  if (loading()) return <Loader />;
  return (
    <div>
      {/* {isLoading && <Spinner />} */}
      <AddGenre
        editInfo={addBookInfo}
        setEditInfo={setAddBookInfo}
        setEditValuesChanged={setEditValuesChanged}
      />
      
      <div className="fixed left-0 top-0 w-full h-[48px] flex items-center justify-between px-4 border-b border-[#E4E4E4] bg-light z-30 ">
        <div className="flex items-center justify-center w-full relative">
          <div
            className="cursor-pointer w-5 absolute left-0 top-0"
            onClick={() => navigate("/profile/user-profile")}
          >
            <Image src={leftArrowIcon} alt="left" />
          </div>
          <h3 className="font-poppins text-base font-normal text-center ">
            Add Book
          </h3>
        </div>
      </div>
      
      <div className="container">
      <div className="pt-16 border-b border-[#E4E4E4] pb-4">
        <Stepper steps={steps} />
      </div>
        <form>
            {steps[active].content}
            <Button onClick={handleSaveFn} type="button" className="w-full bg-primary font-poppins font-medium text-base text-white py-3 mb-3 rounded-lg">{active === 2 ? "Confirm":"Next"}</Button>
          {/* <div className="mt-4 pb-4 border-b border-[#E4E4E4]">
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
          </div> */}
          {/* <div className="border-b border-[#E4E4E4] mt-4 pb-4">
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
                <div className={`flex flex-col items-center gap-2`}>
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
          </div> */}
          {/* <div className="mt-4 pb-4 border-b border-[#E4E4E4]">
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
          </div> */}
        </form>
        {/* <div className="flex items-center justify-between py-4">
          <h1 className="font-poppins text-sm font-medium leading-none">
            Genre
          </h1>
          <button
            onClick={() => dispatch(setOpen(!open))}
            className="text-[#3879E9] font-poppins font-medium text-sm leading-none underline"
          >
            Add
          </button>
        </div> */}
        {/* {addBookInfo.favGenres && addBookInfo.favGenres.length > 0 && (
          <div className="flex flex-col gap-2 pb-4">
            {addBookInfo.favGenres.map((favItem, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-4 py-4 bg-white border border-[#E6E6E6] rounded-lg"
              >
                <h3 className="font-poppins text-sm font-light">{favItem}</h3>
                <Button onClick={() => handleRemoveGenre(favItem)}>
                  <Image src={closeIcon} alt="close" className="h-2" />
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
              <Image src={locationIcon} alt="location" /> Dhaka bangladesh
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
}
