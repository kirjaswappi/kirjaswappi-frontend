import Button from "../../../components/shared/Button";
import Image from "../../../components/shared/Image";
import { setOpen } from "../../../redux/feature/open/openSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import closeIcon from "../../../assets/close.svg";
import { FieldErrors, UseFormGetValues, UseFormSetValue } from "react-hook-form";
export default function OtherDetailsStep({
  errors,
  getValues,
  setValue,
}: { errors: FieldErrors<any>; getValues: UseFormGetValues<any>; setValue: UseFormSetValue<any>; }) {
  const { open } = useAppSelector((state) => state.open);
  const dispatch = useAppDispatch();
  console.log(getValues("favGenres"));
  const favGenres = getValues("favGenres");
  const handleRemoveGenre = (genreValue: string) => {
    if (!genreValue) return;
    const favGenres = getValues("favGenres");
    setValue(
      "favGenres",
      favGenres?.filter((favGen: string) => favGen !== genreValue)
    );
  };
  return (
    <div>
      <div>
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
        <div>
          {favGenres && favGenres.length > 0 && (
            <div className="flex flex-col gap-2 pb-4">
              {favGenres.map((favItem: string, index: number) => (
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
          {errors && errors["favGenres"] && (
            <div className="text-rose-500 text-xs mt-1 pl-2">
              {errors["favGenres"]?.message}
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
