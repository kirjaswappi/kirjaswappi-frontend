import { Controller, useFormContext } from "react-hook-form";
import InputLabel from "../../../components/shared/InputLabel";
import ControlledInputField from "../../../components/shared/ControllerField";
import Button from "../../../components/shared/Button";
import Image from "../../../components/shared/Image";
import closeIcon from "../../../assets/close.svg";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setOpen } from "../../../redux/feature/open/openSlice";
import ImageFileInput from "./ImageControllerField";
import BookIcon from "../../../assets/bookIcon.svg"

export default function ConditionsStep({ errors }: { errors: any }) {
  const dispatch = useAppDispatch();
  const { open } = useAppSelector((state) => state.open);
  const { control, getValues, watch } = useFormContext();
  const conditionType = watch("conditionType");
  const favGenres = getValues("favGenres");

  return (
    <div>
      <div className="pt-4">
      <InputLabel label="Condition Type" required />
      </div>
      <div className="flex flex-col gap-2">
        <Controller
          name="conditionType"
          control={control}
          defaultValue="byBook"
          render={({ field }) => {
            return (
              <div className="flex flex-col gap-4 mt-2">
                <div className="px-4 py-4 bg-white border border-[#E6E6E6] rounded-lg">
                  <label className="flex items-center gap-2 w-full cursor-pointer">
                    <input
                      type="radio"
                      value="openToOffer"
                      checked={field.value === "openToOffer"}
                      onChange={field.onChange}
                      className="w-4 h-4"
                    />
                    Open to Offer
                  </label>
                </div>
                <div className="px-4 py-4 bg-white border border-[#E6E6E6] rounded-lg ">
                  <label className="flex items-center gap-2 w-full cursor-pointer">
                    <input
                      type="radio"
                      value="byBook"
                      checked={field.value === "byBook"}
                      onChange={field.onChange}
                      className="w-4 h-4"
                    />
                    By Book
                  </label>
                </div>
                <div className="px-4 py-4 bg-white border border-[#E6E6E6] rounded-lg">
                  <label className="flex items-center gap-2 w-full cursor-pointer">
                    <input
                      type="radio"
                      value="byGenre"
                      checked={field.value === "byGenre"}
                      onChange={field.onChange}
                      className="w-4 h-4"
                    />
                    By Genre
                  </label>
                </div>
              </div>
            );
          }}
        />
      </div>
      {conditionType === "byBook" && (
        <div>
          <div className="pt-4">
          <InputLabel label="Book Cover" required />
          <ImageFileInput name="byBookCover" />
        </div>
          <div className="mt-4 pb-4 border-b border-[#E4E4E4]">
            <InputLabel label="Book Title" required />
            <ControlledInputField
              name="bookTitle"
              placeholder="Enter your title"
              className="rounded-md"
            />
          </div>
          <div className="mt-4 pb-4 border-b border-[#E4E4E4]">
            <InputLabel label="Author Name" required />
            <ControlledInputField
              name="authorName"
              placeholder="Enter your author"
              className="rounded-md"
            />
          </div>
        </div>
      )}
      {conditionType === "byGenre" && (
        <div>
          <div className="flex items-center justify-between py-4">
            <InputLabel label="Genre" required />
            < Button
              type="button"
              onClick={() => dispatch(setOpen(!open))}
              className="text-[#3879E9] font-poppins font-medium text-sm leading-none underline"
            >
              Add
            </Button>
          </div>
          {favGenres && favGenres.length > 0 && (
            <div className="flex flex-col gap-2 pb-4">
              {favGenres.map((favItem: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-4 py-4 bg-white border border-[#E6E6E6] rounded-lg"
                >
                  <h3 className="font-poppins text-sm font-light">{favItem}</h3>
                  <Button>
                    <Image src={closeIcon} alt="close" className="h-2" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          {errors && errors["favGenres"] && (
            <div className="text-rose-500 text-xs mt-1 pl-2">
              {errors["favGenres"]?.message}
            </div>
          )}
        </div>
      )}
      {conditionType === "openToOffer" && (<div className="h-[200px] border-t border-[#E4E4E4] mt-4 flex flex-col items-center justify-center gap-2">
        <Image src={BookIcon} alt="book icon" />
        <p className="text-center font-poppins font-normal text-sm">You will receive offers<br/> of all sorts of books</p>
      </div>)}
    </div>
  );
}
