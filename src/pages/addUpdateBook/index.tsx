import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import leftArrowIcon from "../../assets/leftArrow.png";
import NextArrowIcon from "../../assets/arrow1.png";
import PrevArrowIcon from "../../assets/arrow2.png";
import Image from "../../components/shared/Image";
import Loader from "../../components/shared/Loader";
import {
  useAddBookMutation,
  useGetBookByIdQuery,
  useGetSupportConditionQuery,
  useGetSupportLanguageQuery,
  useUpdateBookMutation,
} from "../../redux/feature/book/bookApi";
import yup from "yup";
import Stepper from "./_components/Stepper";
import BookDetailsStep from "./_components/BookDetailsStep";
import OtherDetailsStep from "./_components/OtherDetailsStep";
import {
  blobToBase64,
  convertedURLToFile,
  isString,
  options,
  urlToDataUrl,
} from "../../utility/helper";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemas } from "./Schema";

import AddGenre from "../../components/shared/AddGenre";
import Button from "../../components/shared/Button";
import ConditionsStep from "./_components/ConditionsStep";
import { useAppSelector } from "../../redux/hooks";
import { BYBOOKS, BYGENRES, GIVEAWAY, OPENTOOFFERS } from "../../utility/ADDBOOKCONDITIONTYPE";

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
  const [updateBook] = useUpdateBookMutation();

  const defaultValues = {
    books:
      bookData?.swapCondition?.swappableBooks?.length > 0
        ? bookData.swapCondition.swappableBooks.map(
            (book: {
              title: string;
              author: string;
              coverPhotoUrl: string;
            }) => ({
              bookTitle: book.title || "",
              authorName: book.author || "",
              byBookCover: book.coverPhotoUrl || null,
            })
          )
        : [{ bookTitle: "", authorName: "", byBookCover: null }],
    favGenres: bookData?.genres || [],
    conditionType: bookData?.swapCondition?.conditionType || BYBOOKS,
    language: bookData?.language || "",
    title: bookData?.title || "",
    genres:
      bookData?.exchangeCondition?.exchangeableGenres?.length > 0
        ? bookData?.exchangeCondition?.exchangeableGenres?.map(
            (genre: { name: string }) => genre?.name
          )
        : [],
    condition: bookData?.condition || "",
    description: bookData?.description || "",
    author: bookData?.author || "",
    bookCover: bookData?.coverPhotoUrl || "",
  };

  const methods = useForm({
    resolver: yupResolver(validationSchemas[active] as yup.ObjectSchema<any>),
    mode: "onChange",
    defaultValues: defaultValues,
  });
  console.log({ defaultValues });
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

  useEffect(() => {
    if (bookData) {
      reset({
        books:
          bookData?.swapCondition?.swappableBooks?.length > 0
            ? bookData.swapCondition.swappableBooks.map(
                (book: {
                  title: string;
                  author: string;
                  coverPhotoUrl: string;
                }) => ({
                  bookTitle: book.title || "",
                  authorName: book.author || "",
                  byBookCover: book.coverPhotoUrl || null,
                })
              )
            : [{ bookTitle: "", authorName: "", byBookCover: null }],
        favGenres: bookData?.genres || [],
        conditionType: bookData?.swapCondition?.conditionType || BYBOOKS,
        language: bookData?.language || "",
        title: bookData?.title || "",
        genres:
          bookData?.swapCondition?.swappableGenres?.length > 0
            ? bookData?.swapCondition?.swappableGenres?.map(
                (genre: { name: string }) => genre?.name
              )
            : [],
        condition: bookData?.condition || "",
        description: bookData?.description || "",
        author: bookData?.author || "",
        bookCover: bookData?.coverPhotoUrl || "",
      });
    }
  }, [bookData, reset]);

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
  const handlePrev = async () => {
    setSteps((prevStep) =>
      prevStep.map((step, index) => {
        if (index === active) return step;
        if (index === active - 1) {
          return { ...step, isActive: false };
        }
        return step;
      })
    );
    if (active === 0) return;
    setActive((prev) => prev - 1);
  };
  const handleAddUpdateBookFn = async <T extends IAddUpdateBookData>(
    data: T
  ) => {
    const formData = new FormData();
    if (userInformation.id) formData.append("ownerId", userInformation.id);
    if (bookData?.id) formData.append("id", bookData?.id);
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("description", data.description);
    formData.append("genres", data.favGenres.join(","));
    formData.append("language", data.language);
    formData.append("condition", data.condition);

    // <========== If book cover type is URL we need to convert URL to File ==========>
    if (!isString(data.bookCover)) {
      formData.append("coverPhoto", data.bookCover);
    } else {
      const file = await convertedURLToFile(bookData?.coverPhotoUrl);
      if (file) {
        formData.append("coverPhoto", file);
      }
    }

    if (data.conditionType === BYBOOKS) {
      const exchangeCondition: {
        openForOffers: boolean;
        genres: null;
        conditionType: string;
        giveAway: boolean;
        books: {
          title: string;
          author: string;
          coverPhoto: File | string;
        }[];
      } = {
        openForOffers: false,
        conditionType: data.conditionType,
        giveAway: false,
        genres: null,
        books: await Promise.all(
          data.books.map(async (book) => {
            const bookData: any = {
              title: book.bookTitle,
              author: book.authorName,
            };
            if (book.byBookCover instanceof File) {
              bookData.coverPhoto = await blobToBase64(book.byBookCover);
            } else {
              bookData.coverPhoto = await urlToDataUrl(book.byBookCover);
            }
            return bookData;
          })
        ),
      };
      formData.append("swapCondition", JSON.stringify(exchangeCondition));
    } else if (data.conditionType === OPENTOOFFERS) {
      formData.append(
        "swapCondition",
        JSON.stringify({
          openForOffers: true,
          genres: null,
          books: null,
          conditionType: data.conditionType,
          giveAway: false,
        })
      );
    } else if (data.conditionType === BYGENRES) {
      formData.append(
        "swapCondition",
        JSON.stringify({
          openForOffers: false,
          conditionType: data.conditionType,
          giveAway: false,
          genres: data.genres.join(","),
          books: null,
        })
      );
    } else if (data.conditionType === GIVEAWAY) {
      formData.append(
        "swapCondition",
        JSON.stringify({
          openForOffers: false,
          genres: null,
          books: null,
          conditionType: data.conditionType,
          giveAway: true,
        })
      );
    }

    try {
      if (!bookData?.id) {
        await addBook(formData).then((res) => {
          if (res?.data) {
            reset();
            navigate(`/profile/user-profile`);
          }
        });
      } else {
        await updateBook({ data: formData, id: bookData?.id }).then((res) => {
          if (res?.data) {
            reset();
            navigate(`/profile/user-profile`);
          }
        });
      }
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

            <div className="mt-4 flex justify-between gap-3 pb-4">
              {active > 0 && (
                <Button
                  onClick={handlePrev}
                  type="button"
                  className="bg-primary-light text-primary w-full py-4 rounded-lg border border-primary flex items-center justify-center font-poppins text-base font-medium"
                >
                  <Image src={PrevArrowIcon} alt="Next" className="w-4" /> Back
                </Button>
              )}
              {active <= 1 && (
                <Button
                  onClick={handleNext}
                  type="button"
                  className="bg-primary text-white w-full py-4 rounded-lg flex items-center justify-center  font-poppins text-base font-medium"
                >
                  Next <Image src={NextArrowIcon} alt="Next" className="w-4" />
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
