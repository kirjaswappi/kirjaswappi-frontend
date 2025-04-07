import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import leftArrowIcon from "../../assets/leftArrow.png";
import Image from "../../components/shared/Image";
import Loader from "../../components/shared/Loader";
import {
  useAddBookMutation,
  useGetBookByIdQuery,
  useGetSupportConditionQuery,
  useGetSupportLanguageQuery,
} from "../../redux/feature/book/bookApi";
import yup from "yup";
import Stepper from "./_components/Stepper";
import BookDetailsStep from "./_components/BookDetailsStep";
import OtherDetailsStep from "./_components/OtherDetailsStep";
import { blobToBase64, options } from "../../utility/helper";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemas } from "./Schema";

import AddGenre from "../../components/shared/AddGenre";
import Button from "../../components/shared/Button";
import ConditionsStep from "./_components/ConditionsStep";
import { useAppSelector } from "../../redux/hooks";

interface IBook {
  bookTitle: string;
  authorName: string;
  byBookCover: string | File;
}

interface IAddUpdateBookData {
  books: IBook[];
  favGenres: string[];
  conditionType: string;
  language: string;
  title: string;
  genres: string[];
  condition: string;
  description: string;
  author: string;
  bookCover: string | File;
}

export default function AddUpdateBook() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [active, setActive] = useState<number>(0);
  const { userInformation } = useAppSelector((state) => state.auth);
  const { data: languageDataOptions, isLoading: languageLoading } =
    useGetSupportLanguageQuery(undefined);
  const { data: conditionDataOptions, isLoading: conditionLoading } =
    useGetSupportConditionQuery(undefined);
  const { data: bookData, isLoading: bookLoading } = useGetBookByIdQuery(
    { id: id },
    { skip: !id }
  );
  const [addBook, { isLoading }] = useAddBookMutation();
  const defaultValues = {
    books: [{ bookTitle: "", authorName: "", byBookCover: null }],
    favGenres: bookData?.genres || [],
    conditionType: "byBook",
    language: bookData?.language || "",
    title: bookData?.title || "",
    genres: bookData?.genre || [],
    condition: bookData?.condition || "",
    description: bookData?.description || "",
  };

  const methods = useForm({
    resolver: yupResolver(validationSchemas[active] as yup.ObjectSchema<any>),
    mode: "onChange",
    defaultValues: defaultValues,
  });
  const {
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = methods;
  const languages = options(languageDataOptions);
  const conditions = options(conditionDataOptions);

  // useEffect(() => {
  //   if (bookData) {
  //     reset({
  //       favGenres: bookData.genres || [],
  //       conditionType: "byBook",
  //       language: bookData.language || "",
  //       title: bookData.title || "",
  //       genres: bookData?.genres || [],
  //       condition: bookData?.condition || '',
  //       description: bookData?.description || "",
  //       author: bookData?.author || "",
  //       bookCover: bookData?.coverPhotoUrl || ""
  //     });
  //   }
  // }, [bookData, reset]);
  const [steps, setSteps] = useState([
    {
      label: "Book Details",
      isCompleted: false,
      isActive: true,
    },
    {
      label: "Other Details",
      isCompleted: false,
      isActive: false,
    },
    {
      label: "Ex. Conditions",
      isCompleted: false,
      isActive: false,
    },
  ]);

  const handleNext = async () => {
    const valid = await trigger();
    if (valid) {
      setSteps((prevStep) =>
        prevStep.map((step, index) => {
          if (index === active) {
            return { ...step, isActive: false, isCompleted: true };
          } else if (index === active + 1) {
            return { ...step, isActive: true };
          }
          return step;
        })
      );
      setActive((prev) => prev + 1);
    }
  };
  // console.log(getValues());
  // const handleBack = () => {
  //   if (active > 0) {
  //     setSteps((prevSteps) =>
  //       prevSteps.map((step, index) => {
  //         if (index === active) {
  //           return { ...step, isActive: false, isCompleted: false };
  //         } else if (index === active - 1) {
  //           return { ...step, isActive: true, isCompleted: false };
  //         }
  //         return step;
  //       })
  //     );
  //     setActive((prev) => prev - 1);
  //   }
  // };
  // console.log({errors})
  const handleAddUpdateBookFn = async <T extends IAddUpdateBookData>(
    data: T
  ) => {
    console.log(data);
    const formData = new FormData();
    if (userInformation.id) formData.append("ownerId", userInformation.id);
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("description", data.description);
    formData.append("genres", data.favGenres.join(","));
    formData.append("language", data.language);
    formData.append("condition", data.condition);
    formData.append("coverPhoto", data.bookCover);

    if (data.conditionType === "byBook") {
      const exchangeCondition: {
        openForOffers: boolean;
        genres: null;
        books: {
          title: string;
          author: string;
          coverPhoto: File | string;
        }[];
      } = {
        openForOffers: false,
        genres: null,
        books: await Promise.all(data.books.map(async(book) => {
          const bookData: any = {
            title: book.bookTitle,
            author: book.authorName,
          };
          if (book.byBookCover instanceof File) {
            bookData.coverPhoto = await blobToBase64(book.byBookCover);
          } 
          return bookData
        })),
      };
      // data.books.forEach((book) => {
      //   const bookData: any = {
      //     title: book.bookTitle,
      //     author: book.authorName,
      //   };
      //   if (book.byBookCover instanceof File) {
      //     bookData.coverPhoto = book.byBookCover;
      //   }
      //   exchangeCondition.books.push(bookData);
      // });

      formData.append("exchangeCondition", JSON.stringify(exchangeCondition));
    } else if (data.conditionType === "openToOffer") {
      formData.append(
        "exchangeCondition",
        JSON.stringify({
          openForOffers: true,
          genres: null,
          books: null,
        })
      );
    } else if (data.conditionType === "byGenre") {
      formData.append(
        "exchangeCondition",
        JSON.stringify({
          openForOffers: false,
          genres: data.genres.join(","),
          books: null,
        })
      );
    }

    try {
      await addBook(formData).then((res) => {
        if(res?.data){
          reset()
          navigate(`/profile/user-profile`)
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const loading = () => {
    if (languageLoading) return true;
    if (conditionLoading) return true;
    if (bookLoading) return true;
    else return false;
  };
  if (loading()) return <Loader />;
  return (
    <div className="min-h-screen">
      <div className="fixed left-0 top-0 w-full h-[48px] flex items-center justify-between px-4 border-b border-[#E4E4E4] bg-white z-30 ">
        <div className="flex items-center justify-center w-full relative">
          <div
            className="cursor-pointer w-5 absolute left-0 top-0"
            onClick={() => navigate("/profile/user-profile")}
          >
            <Image src={leftArrowIcon} alt="left" />
          </div>
          <h3 className="font-poppins text-base font-normal text-center ">
            {id ? "Update" : "Add"} Book
          </h3>
        </div>
      </div>
      <div className="container">
        <div className="pt-16 border-b border-[#E4E4E4] pb-4">
          <Stepper steps={steps} />
        </div>
        <FormProvider {...methods}>
          <AddGenre
            genresValue={active === 1 ? watch("favGenres") : watch("genres")}
            setEditValuesChanged={() => console.log("favGenres updated")}
            setValue={setValue}
            trigger={trigger}
            addGenreName={active === 1 ? "favGenres" : "genres"}
          />
          <form onSubmit={handleSubmit((data) => handleAddUpdateBookFn(data))}>
            {active === 0 && (
              <BookDetailsStep
                languageOptions={languages}
                conditionOptions={conditions}
              />
            )}
            {active === 1 && <OtherDetailsStep errors={errors} />}
            {active === 2 && <ConditionsStep errors={errors} />}
            <div className="mt-4 flex justify-between pb-4">
              {active <= 1 && (
                <Button
                  onClick={handleNext}
                  type="button"
                  className="bg-primary text-white w-full py-4 rounded-lg"
                >
                  Next
                </Button>
              )}
              {active === 2 && (
                <Button
                  disabled={isLoading}
                  type="submit"
                  className="bg-primary text-white w-full py-4 rounded-lg"
                >
                  {" "}
                  {isLoading ? "Loading..." : "Confirm"}
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
