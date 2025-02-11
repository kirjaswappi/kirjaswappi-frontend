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
    mode: "onChange",
    defaultValues: {
      favGenres: [],
      conditionType: "byBook",
    },
  });
  const {
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
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

  const loading = () => {
    if (languageLoading) return true;
    if (conditionLoading) return true;
    else return false;
  };
  if (loading()) return <Loader />;
  return (
    <div  className="min-h-screen">
      {/* {isLoading && <Spinner />} */}
      <AddGenre
        genresValue={favGenres}
        setEditValuesChanged={() => console.log("Genres updated")}
        setValue={setValue}
        trigger={trigger}
      />
      <div className="fixed left-0 top-0 w-full h-[48px] flex items-center justify-between px-4 border-b border-[#E4E4E4] bg-white z-30 ">
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
          <form onSubmit={handleSubmit((data) => console.log({data}))}>
            {active === 0 && (
              <BookDetailsStep
                languageOptions={languages}
                conditionOptions={conditions}
              />
            )}
            {active === 1 && <OtherDetailsStep errors={errors} />}
            {active === 2 && <ConditionsStep errors={errors} />}
            <div className="mt-4 flex justify-between pb-4">
              {active <= 1 && <Button
                onClick={handleNext}
                type="button"
                className="bg-primary text-white w-full py-4 rounded-lg"
              >
                Next
              </Button>}
              {
                  active === 2 && <Button
                  type="submit"
                  className="bg-primary text-white w-full py-4 rounded-lg"
                >
                  Confirm
                </Button>
                }
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
