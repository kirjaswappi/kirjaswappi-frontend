import { useState } from "react";
import { useNavigate } from "react-router-dom";
import leftArrowIcon from "../../assets/leftArrow.png";
import Image from "../../components/shared/Image";
import Loader from "../../components/shared/Loader";
import {
  useGetSupportConditionQuery,
  useGetSupportLanguageQuery,
} from "../../redux/feature/book/bookApi";
import yup from "yup";
import Stepper from "./_components/Stepper";
import BookDetailsStep from "./_components/BookDetailsStep";
import OtherDetailsStep from "./_components/OtherDetailsStep";
import { options } from "../../utility/helper";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemas } from "./Schema";

import AddGenre from "../../components/shared/AddGenre";
import Button from "../../components/shared/Button";
import ConditionsStep from "./_components/ConditionsStep";

export default function AddBook() {
  const navigate = useNavigate();
  const [active, setActive] = useState<number>(0);
  const { data: languageDataOptions, isLoading: languageLoading } =
    useGetSupportLanguageQuery(undefined);
  const { data: conditionDataOptions, isLoading: conditionLoading } =
    useGetSupportConditionQuery(undefined);

  const methods = useForm({
    resolver: yupResolver(validationSchemas[active] as yup.ObjectSchema<any>),
    mode: "onBlur",
    defaultValues: {
      favGenres: [],
    },
  });
  const {
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
    getValues,
  } = methods;
  const favGenres = watch("favGenres");
  const languages = options(languageDataOptions);
  const conditions = options(conditionDataOptions);
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
  const content = [
    <BookDetailsStep
      languageOptions={languages}
      conditionOptions={conditions}
    />,
    <OtherDetailsStep errors={errors} getValues={getValues} setValue={setValue} />,
    <ConditionsStep />,
  ];

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

  

  const loading = () => {
    if (languageLoading) return true;
    if (conditionLoading) return true;
    else return false;
  };
  if (loading()) return <Loader />;
  return (
    <div>
      {/* {isLoading && <Spinner />} */}

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
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit((data) => console.log(data))}>
            <AddGenre
              genresValue={favGenres}
              setEditValuesChanged={() => console.log("Genres updated")}
              setValue={setValue}
            />
            {content[active]}
            <div className="mt-4 flex justify-between">
              {active < 2 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Submit
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
