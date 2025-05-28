/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormContext } from 'react-hook-form';
import close from '../../../assets/close.png';
import giveaway from '../../../assets/giveaway.png';
import sendMessageIcon from '../../../assets/sendMessageIcon.png';
import { setSwapModal } from '../../../redux/feature/swap/swapSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import Button from '../Button';
import Image from '../Image';
import TextArea from '../TextArea';

export default function SwapModal() {
  const context = useFormContext();
  const dispatch = useAppDispatch();
  const { swapModalOpen } = useAppSelector((state) => state.swapBook);
  // const { userInformation } = useAppSelector((state) => state.auth);

  if (!context) {
    return null;
  }
  const { register } = context;

  // const {
  //   title,
  //   author,
  //   coverPhotoUrl,
  //   genres,
  //   condition,
  //   swapCondition: { conditionType, swappableBooks },
  // } = bookData;

  //   const conditionList: Record<string, { image: string; label: string }> = {
  //     [BYGENRES]: {
  //       image: genre,
  //       label: 'By Genre',
  //     },
  //     [BYBOOKS]: {
  //       image: swap,
  //       label: 'By Books',
  //     },
  //     [OPENTOOFFERS]: {
  //       image: openToOffer,
  //       label: 'Open To Offer',
  //     },
  //     [GIVEAWAY]: {
  //       image: giveWayIcon,
  //       label: 'Giveaway',
  //     },
  //   };
  //   const conditionItem = conditionList[conditionType];
  // const handleSelectBookForSwapRequest = (item: any) => {
  //   console.log('item', item);
  // };
  return (
    <div
      className={`${
        swapModalOpen ? 'block' : 'hidden'
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
          {/* <SwapBookInformation
            title={title}
            author={author}
            coverPhotoUrl={coverPhotoUrl}
            genres={genres}
            condition={condition}
          /> */}
          <div className="flex items-center gap-2 my-5">
            {/* <Image
              src={conditionItem.image}
              alt={conditionItem.label}
              className="w-[14px]"
            /> */}
            {/* <h3>{conditionItem.label}</h3> */}
          </div>
          <div>
            {/* ========= If not by books then show the library from user books ========= */}
            {/* {conditionType !== BYBOOKS && (
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
                <input type="radio" value="swap" {...register('radio')} />
              </label>
            )} */}
            {/* ========= If by books exist then show the books ========= */}
            {/* {conditionType === SwapType.BYBOOKS && (
              <label>
                <SwapBookCarousels
                  swapBook={swappableBooks}
                  handleSelectBookForSwapRequest={handleSelectBookForSwapRequest}
                />
                <input hidden type="radio" value={'ByBooks'} {...register('radio')} />
              </label>
            )}
            {conditionType === SwapType.OPENTOOFFERS && (
              <label>
                <SwapBookCarousels
                  swapBook={userInformation.books}
                  handleSelectBookForSwapRequest={handleSelectBookForSwapRequest}
                />
                <input hidden type="radio" value={'OpenForOffers'} {...register('radio')} />
              </label>
            )} */}
            <label className="flex items-center justify-between h-20 bg-[#E5E5E5] border border-[#E5E5E5] px-4 py-3 rounded-lg mt-2">
              <div className="flex items-center gap-4">
                <div className="w-[40px] h-[40px] rounded-[50%] bg-yellow flex items-center justify-center ">
                  <Image src={giveaway} alt="library" className="w-[18px]" />
                </div>
                <div>
                  <h4 className="text-sm font-poppins text-[#0D0D0D]">Ask for giveaway</h4>
                  <p className="text-[#8C8C8C] text-[10px] mt-1">
                    You can offer from your library or, ask for giveaway
                  </p>
                </div>
              </div>
              <input type="radio" value="giveaway" {...register('radio')} />
            </label>
          </div>
          <div>
            <h1 className="text-left font-poppins text-sm font-medium mb-2 mt-3">Short Note</h1>
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
