import book2 from "../../assets/book2.png";
import book3 from "../../assets/book3.png";
import bookIcon from "../../assets/bookIcon.png";
import close from "../../assets/close.svg";
import giveWayIcon from "../../assets/givewayIcon.png";
import sendMessageIcon from "../../assets/sendMessageIcon.png";
import { setSwapModal } from "../../redux/feature/open/openSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Button from "./Button";
import Image from "./Image";
import TextArea from "./TextArea";
import { useFormContext } from "react-hook-form";
export default function SwapModal() {
  const dispatch = useAppDispatch();
  const context = useFormContext();
  const { swapModal } = useAppSelector((state) => state.open);
  if (!context) {
    return null;
  }
  const { watch, register } = context

  return (
    <div
      className={`${
        swapModal ? "block" : "hidden"
      } bg-black bg-opacity-50 inset-0 w-full h-screen fixed top-0 left-0 z-50 flex items-center justify-center`}
    >
      <div className="w-11/12 bg-white rounded-md ">
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
          <div className="flex gap-4">
            <div className="max-w-[100px] max-h-[120px] flex items-center justify-center">
              <Image src={book2} alt="Book" />
            </div>
            <div>
              <h1 className="font-medium text-smokyBlack text-sm leading-none mb-1 font-poppins">
                Man’s Search for Meaning'
              </h1>
              <p className="text-smokyBlack font-normal text-xs font-poppins">
                by Viktor Frankl's
              </p>
              <p className="text-smokyBlack font-light text-xs font-poppins mt-1">
                Biography | Autobiography | Personal narrative
              </p>
              <p className="text-smokyBlack font-normal text-xs font-poppins mt-1">
                <span className="font-light">Book Conditions:</span> Used Like
                New
              </p>
            </div>
          </div>
          <div className="mt-4">
            <label className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image src={bookIcon} alt="Book" />
                <h4 className="text-sm font-poppins text-[#1A1A1A]">
                  Swap with
                </h4>
              </div>
              <input type="radio" value="swap" {...register("radio")} />
            </label>
            {watch('radio') === 'swap' && <div className={`grid grid-cols-2 mt-3`}>
              <div className="max-w-[100px] max-h-[160px] rounded-[8px] mb-2">
                <div className="mb-2">
                  <Image
                    className="mx-auto"
                    src={book3}
                    alt={`'Your favorite book'`}
                  />
                </div>
                <div>
                  <h1 className="font-medium text-black text-sm leading-none mb-1 font-poppins">
                    {"Man’s Search for Meaning"}
                  </h1>
                  <p className="text-black font-light text-xs font-poppins">
                    by {"Viktor Frankl's"}
                  </p>
                </div>
              </div>
              <div className="max-w-[100px] max-h-[160px] rounded-[8px] mb-2">
                <div className="mb-2">
                  <Image
                    className="mx-auto"
                    src={book3}
                    alt={`'Your favorite book'`}
                  />
                </div>
                <div>
                  <h1 className="font-medium text-black text-sm leading-none mb-1 font-poppins">
                    {"Man’s Search for Meaning"}
                  </h1>
                  <p className="text-black font-light text-xs font-poppins">
                    by {"Viktor Frankl's"}
                  </p>
                </div>
              </div>
            </div>}
            <label className="flex items-center justify-between mt-5">
              <div className="flex items-center gap-4">
                <Image src={giveWayIcon} alt="Book" />
                <h4 className="text-sm font-poppins text-[#1A1A1A]">
                  Ask to giveaway for free
                </h4>
              </div>
              <input
                type="radio"
                value="giveaway"
                {...register("radio")}
              />
            </label>
          </div>

          <div>
            <h1 className="text-center font-poppins text-sm font-medium mb-2 mt-3">
              Note
            </h1>
            <TextArea
              onChange={(e) => console.log(e.target.value)}
              placeholder="Write a short note"
            />
          </div>
          <div className="flex justify-center border-t border-platinum pt-2">
            <Button
              type="submit"
              className="bg-primary text-white font-medium text-xs py-2 w-7/12 h-[30px] rounded-[8px] font-poppins flex justify-center items-center gap-2 "
            >
              <Image src={sendMessageIcon} alt="Book" /> Send Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
