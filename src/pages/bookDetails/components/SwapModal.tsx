import book3 from "../../../assets/book3.png";
import close from "../../../assets/close.svg";
import giveWayIcon from "../../../assets/givewayIcon.png";
import library from "../../../assets/library.png";
import swap from "../../../assets/swap.png";
import openToOffer from "../../../assets/openToOffer.png";
import genre from "../../../assets/genre.png";
import giveaway from "../../../assets/giveaway.png";
import sendMessageIcon from "../../../assets/sendMessageIcon.png";
import { setSwapModal } from "../../../redux/feature/open/openSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Button from "../../../components/shared/Button";
import Image from "../../../components/shared/Image";
import TextArea from "../../../components/shared/TextArea";
import { useFormContext } from "react-hook-form";
import { IBook } from "../interface";
import {
  BYBOOKS,
  BYGENRES,
  GIVEAWAY,
  OPENTOOFFERS,
} from "../../../utility/ADDBOOKCONDITIONTYPE";
import SwapBookInformation from "./SwapBookInformation";
import SwapBookCarousels from "./SwapBookCarousels";

export default function SwapModal({ bookData }: { bookData: IBook }) {
  const context = useFormContext();
  if (!context || !bookData) {
    return null;
  }
  const dispatch = useAppDispatch();
  const { watch, register } = context;
  const { swapModal } = useAppSelector((state) => state.open);

  const {
    title,
    author,
    coverPhotoUrl,
    genres,
    condition,
    swapCondition: {
      conditionType,
      giveAway,
      swappableBooks,
      openForOffers,
      swappableGenres,
    },
  } = bookData;

  const conditionList: Record<string, { image: string; label: string }> = {
    [BYGENRES]: {
      image: genre,
      label: "By Genre",
    },
    [BYBOOKS]: {
      image: swap,
      label: "By Books",
    },
    [OPENTOOFFERS]: {
      image: openToOffer,
      label: "Open To Offer",
    },
    [GIVEAWAY]: {
      image: giveWayIcon,
      label: "Giveaway",
    },
  };

  const conditionItem = conditionList[conditionType];

  return (
    <div
      className={`${
        swapModal ? "block" : "hidden"
      } bg-black bg-opacity-50 inset-0 w-full h-screen fixed top-0 left-0 z-50 flex items-center justify-center`}
    >
      <div className="w-11/12 max-h-[90vh] bg-white rounded-md overflow-y-auto">
        <div className="py-4 border-b border-platinum relative">
          <h3 className="font-poppins font-normal text-base text-center leading-none">
            Swap Request
          </h3>
          <Button
            onClick={() => dispatch(setSwapModal(false))}
            className="border border-platinum rounded-full p-2 absolute right-4 top-3"
          >
            <Image src={close} alt="close" />
          </Button>
        </div>
        <div className="px-[14px] pb-2 mt-4">
          <SwapBookInformation
            title={title}
            author={author}
            coverPhotoUrl={coverPhotoUrl}
            genres={genres}
            condition={condition}
          />
          <div className="flex items-center gap-2 my-5">
            <Image
              src={conditionItem.image}
              alt={conditionItem.label}
              className="w-[14px]"
            />
            <h3>{conditionItem.label}</h3>
          </div>
          <div>
            {conditionType !== BYBOOKS && (
              <label className="flex items-center justify-between h-20 bg-[#E5E5E5] border border-[#E5E5E5] px-4 py-3 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-[40px] h-[40px] rounded-[50%] bg-primary flex items-center justify-center ">
                    <Image src={library} alt="library" className="w-[18px]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-poppins text-[#0D0D0D]">
                      Select from your library
                    </h4>
                    <p className="text-[#8C8C8C] text-[10px] mt-1">
                      You can offer from your library or, ask for giveaway
                    </p>
                  </div>
                </div>
                <input type="radio" value="swap" {...register("radio")} />
              </label>
            )}
            <div>
              <SwapBookCarousels swapBook={swappableBooks} />
              {/* <div className={`grid grid-cols-2 mt-3`}>
                <div className="max-w-[120px] rounded-[8px] p-2 border">
                  <div className=" object-cover bg-cover">
                    <Image
                      className="mx-auto w-[104px] h-[120px] object-cover rounded-lg"
                      src={book3}
                      alt={`'Your favorite book'`}
                    />
                  </div>
                  <div>
                    <h1 className="font-medium text-black text-sm leading-none mb-1 font-poppins truncate ">
                      {"Man’s Search for Meaning Man’s Search for Meaning"}
                    </h1>
                    <p className="text-black font-light text-xs font-poppins">
                      by {"Viktor Frankl's"}
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
            <label className="flex items-center justify-between h-20 bg-[#E5E5E5] border border-[#E5E5E5] px-4 py-3 rounded-lg mt-2">
              <div className="flex items-center gap-4">
                <div className="w-[40px] h-[40px] rounded-[50%] bg-yellow flex items-center justify-center ">
                  <Image src={giveaway} alt="library" className="w-[18px]" />
                </div>
                <div>
                  <h4 className="text-sm font-poppins text-[#0D0D0D]">
                    Ask for giveaway
                  </h4>
                  <p className="text-[#8C8C8C] text-[10px] mt-1">
                    You can offer from your library or, ask for giveaway
                  </p>
                </div>
              </div>
              <input type="radio" value="giveaway" {...register("radio")} />
            </label>
          </div>
          <div>
            <h1 className="text-left font-poppins text-sm font-medium mb-2 mt-3">
              Short Note
            </h1>
            <TextArea
              onChange={(e) => console.log(e.target.value)}
              placeholder="Write a short note"
              className="h-[100px] rounded-lg border border-gray"
            />
          </div>
          <div className="flex justify-center pt-2 mt-5">
            <Button
              type="submit"
              className="bg-primary text-white font-medium text-xs py-2 w-full h-[48px] rounded-[8px] font-poppins flex justify-center items-center gap-2 "
            >
              <Image src={sendMessageIcon} alt="Book" /> Send Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
