/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { SwapType } from '../../../../types/enum';
import close from '../../../assets/close.svg';
import genre from '../../../assets/genre.png';
import giveaway from '../../../assets/giveaway.png';
import givewayIcon from '../../../assets/givewayIcon.png';
import library from '../../../assets/library.png';
import openToOffer from '../../../assets/openToOffer.png';
import sendMessageIcon from '../../../assets/sendMessageIcon.png';
import swap from '../../../assets/swap.png';
import { setSwapModal } from '../../../redux/feature/swap/swapSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import Button from '../Button';
import ControlledInputField from '../ControllerField';
import Image from '../Image';
import InputLabel from '../InputLabel';
import SwapBookCarousels from './_components/SwapBookCarousels';
import SwapBookInformation from './_components/SwapBookInformation';
import { swapRequestDefaultValues } from './helper';

export default function SwapModal() {
  const dispatch = useAppDispatch();
  const { swapModalOpen, swapBookInformation } = useAppSelector((state) => state.swapBook);
  const {
    userInformation: { books },
  } = useAppSelector((state) => state.auth);
  const {
    swapCondition: { swapType, swappableBooks },
  } = swapBookInformation;
  type SwapRequestForm = {
    swapType: SwapType;
    selectedBook?: any;
    note: string;
  };

  const methods = useForm<SwapRequestForm>({
    mode: 'onChange',
    defaultValues: swapRequestDefaultValues(),
  });
  const { control, watch, setValue, handleSubmit } = methods;

  const conditionList: Record<string, { image: string; label: string }> = {
    [SwapType.BYGENRES]: {
      image: genre,
      label: 'By Genre',
    },
    [SwapType.BYBOOKS]: {
      image: swap,
      label: 'By Books',
    },
    [SwapType.OPENTOOFFERS]: {
      image: openToOffer,
      label: 'Open To Offer',
    },
    [SwapType.GIVEAWAY]: {
      image: givewayIcon,
      label: 'Giveaway',
    },
  };
  const conditionItem = conditionList[swapType];
  const selectedBook = watch('selectedBook');
  const currentSwapType = watch('swapType');
  useEffect(() => {
    if (currentSwapType !== SwapType.BYBOOKS && selectedBook) {
      setValue('selectedBook', null);
    }
  }, [currentSwapType]);

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
          <SwapBookInformation />
          <div className="flex items-center gap-2 mt-5 mb-4">
            <Image src={conditionItem.image} alt={conditionItem.label} className="w-[14px]" />
            <h3>{conditionItem.label}</h3>
          </div>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit((data) => console.log(data))}>
              <div>
                <Controller
                  name="swapType"
                  control={control}
                  render={({ field }) => {
                    return (
                      <>
                        <Button
                          type="button"
                          onClick={() => field.onChange(SwapType.BYBOOKS)}
                          aria-pressed={field.value === SwapType.BYBOOKS}
                          className="w-full"
                        >
                          <input type="radio" value={SwapType.BYBOOKS} readOnly hidden />
                          <SwapBookCarousels swapBook={swappableBooks} />
                        </Button>
                      </>
                    );
                  }}
                />
                {swapType === SwapType.BYGENRES && (
                  <Controller
                    name="swapType"
                    control={control}
                    render={({ field }) => {
                      return (
                        <>
                          <Button
                            type="button"
                            onClick={() => field.onChange(SwapType.BYGENRES)}
                            aria-pressed={field.value === SwapType.BYGENRES}
                            className="w-full"
                          >
                            <label
                              className={`bg-[#DBEDFF] border border-primary w-full h-[80px] flex items-center rounded-xl px-[18px] gap-2 mt-2`}
                              aria-label="Ask for giveaway"
                            >
                              <div className="w-2/12">
                                <div className="w-10 h-10 flex items-center justify-center bg-primary rounded-full">
                                  <Image src={library} alt="library" className="w-4 h-4" />
                                </div>
                              </div>
                              <div className="w-8/12 text-left">
                                <h3 className="text-sm font-poppins font-normal text-smokyBlack">
                                  Select from your library
                                </h3>
                                <p className="text-xs font-poppins font-normal text-[#8C8C8C]">
                                  You can offer from your library or, ask for genres
                                </p>
                              </div>
                              <div className="w-1/12 flex items-end justify-end">
                                <input
                                  type="radio"
                                  value={SwapType.BYGENRES}
                                  checked={field.value === SwapType.BYGENRES}
                                  onChange={field.onChange}
                                  className="w-4 h-4"
                                />
                              </div>
                            </label>
                            {currentSwapType === SwapType.BYGENRES && (
                              <SwapBookCarousels swapBook={books} />
                            )}
                          </Button>
                        </>
                      );
                    }}
                  />
                )}
                {swapType === SwapType.OPENTOOFFERS && (
                  <Controller
                    name="swapType"
                    control={control}
                    render={({ field }) => {
                      return (
                        <>
                          <Button
                            type="button"
                            onClick={() => field.onChange(SwapType.OPENTOOFFERS)}
                            aria-pressed={field.value === SwapType.OPENTOOFFERS}
                            className="w-full"
                          >
                            <label
                              className={`bg-[#DBEDFF] border border-primary w-full h-[80px] flex items-center rounded-xl px-[18px] gap-2 mt-2`}
                              aria-label="Ask for giveaway"
                            >
                              <div className="w-2/12">
                                <div className="w-10 h-10 flex items-center justify-center bg-primary rounded-full">
                                  <Image src={library} alt="library" className="w-4 h-4" />
                                </div>
                              </div>
                              <div className="w-8/12 text-left">
                                <h3 className="text-sm font-poppins font-normal text-smokyBlack">
                                  Select from your library
                                </h3>
                                <p className="text-xs font-poppins font-normal text-[#8C8C8C]">
                                  You can offer from your library or, ask for open to offer
                                </p>
                              </div>
                              <div className="w-1/12 flex items-end justify-end">
                                <input
                                  type="radio"
                                  value={SwapType.OPENTOOFFERS}
                                  checked={field.value === SwapType.OPENTOOFFERS}
                                  onChange={field.onChange}
                                  className="w-4 h-4"
                                />
                              </div>
                            </label>
                            {currentSwapType === SwapType.OPENTOOFFERS && (
                              <SwapBookCarousels swapBook={books} />
                            )}
                          </Button>
                        </>
                      );
                    }}
                  />
                )}
                <Controller
                  name="swapType"
                  control={control}
                  render={({ field }) => {
                    return (
                      <label
                        className={`bg-[#E5E5E5] border border-[#E5E5E5] w-full h-[80px] flex items-center rounded-xl px-[18px] gap-2 mt-2`}
                        aria-label="Ask for giveaway"
                      >
                        <div className="w-2/12">
                          <div className="w-10 h-10 flex items-center justify-center bg-yellow rounded-full">
                            <Image src={giveaway} alt="Giveaway" className="w-4 h-4" />
                          </div>
                        </div>
                        <div className="w-8/12">
                          <h3 className="text-sm font-poppins font-normal text-smokyBlack">
                            Ask for giveaway
                          </h3>
                          <p className="text-xs font-poppins font-normal text-[#8C8C8C]">
                            You can offer from your library or, ask for giveaway
                          </p>
                        </div>
                        <div className="w-1/12 flex items-end justify-end">
                          <input
                            type="radio"
                            value={SwapType.GIVEAWAY}
                            checked={field.value === SwapType.GIVEAWAY}
                            onChange={field.onChange}
                            className="w-4 h-4"
                          />
                        </div>
                      </label>
                    );
                  }}
                />
              </div>
              <div>
                <InputLabel label="Short Note" className="mt-5" />
                <ControlledInputField
                  type="textarea"
                  name="note"
                  placeholder="Write a short note"
                  className="rounded-md h-[83px] bg-white"
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
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
