import Button from "../../../components/shared/Button";
import Image from "../../../components/shared/Image";
import { setOpen } from "../../../redux/feature/open/openSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import closeIcon from "../../../assets/close.svg";
import { useFormContext } from "react-hook-form";
import ImageFileInput from "./ImageControllerField";
import { useEffect, useState } from "react";
import Modal from "../../../components/shared/Modal";
export default function OtherDetailsStep({ errors }: { errors: any }) {
  const [selectedColor, setSelectedColor] = useState("");
  const { open } = useAppSelector((state) => state.open);
  const dispatch = useAppDispatch();
  const { getValues, setValue } = useFormContext();
  const favGenres = getValues("favGenres");

  const colors = [
    { id: 3, color: "#7433ff" },
    { id: 2, color: "#33c1ff" },
    { id: 1, color: "#ff5733" },
    // Add more colors as needed
  ];

  const handleRemoveGenre = (genreValue: string) => {
    if (!genreValue) return;
    const favGenres = getValues("favGenres");
    setValue(
      "favGenres",
      favGenres?.filter((favGen: string) => favGen !== genreValue)
    );
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

   
  useEffect(() => {
    setSelectedColor(colors[0].color);
  }, []);
  return (
    <div>
      <div>
        <div className="py-4 border-b border-platinumDark">
          <h1 className="font-poppins text-sm font-medium leading-none pb-4">
            Book Cover
          </h1>
          <ImageFileInput name="bookCover" />
        </div>
        <div className="py-4">
          <div className="flex items-center justify-between pb-4">
          <h1 className="font-poppins text-sm font-medium leading-none">
            Cover Picture
          </h1>
          <button type="button" className="text-primary">Change</button>
          </div>
          <div
            style={{
              background: selectedColor,
            }}
            className="h-[124px] w-full rounded-lg"
          ></div>
          
          {/* {colors.map(({color}) => (
        <div
          key={color}
          style={{
            background: color
          }}
          className={`relative w-16 h-16 rounded-full cursor-pointer flex items-center justify-center ${
            selectedColor === color ? "ring-4 ring-white" : ""
          }`}
          onClick={() => handleColorSelect(color)}
        >
         
        </div>
      ))} */}
        </div>
        <div className="flex items-center justify-between py-4 border-b border-platinumDark">
          <h1 className="font-poppins text-sm font-medium leading-none">
            Genre
          </h1>
          <button
            type="button"
            onClick={() => dispatch(setOpen(!open))}
            className="text-[#3879E9] font-poppins font-medium text-sm leading-none underline"
          >
            Add
          </button>
        </div>
        <div>
          {favGenres && favGenres.length > 0 ? (
            <div className="flex flex-col gap-2 pt-4">
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
          ) : (
            <div className="h-[50px] bg-white  mt-3 flex items-center justify-center rounded-md">
              <p className="text-xs text-grayDark">Not Found Genre</p>
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
