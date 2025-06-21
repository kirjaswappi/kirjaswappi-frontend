import { useNavigate, useParams } from 'react-router-dom';
import bookIcon2 from '../../assets/bookIcon2.png';
import lng from '../../assets/EN.png';
import bookDetailsBg from '../../assets/bookdetailsbg.jpg';
import BookMarkIcon from '../../assets/icon_bookmark.png';
import leftArrowIcon from '../../assets/leftArrow.png';
import editIcon from '../../assets/editBlack.png';
import locationIcon from '../../assets/location-icon.png';
import exchangeIcon from '../../assets/exchange.png';
import profileIcon from '../../assets/profileIcon.png';
import shareIcon from '../../assets/share-icon.png';
import upArrowIcon from '../../assets/upArrow.png';
import Button from '../../components/shared/Button';
import Image from '../../components/shared/Image';
import { goToTop } from '../../utility/helper';
import { useGetBookByIdQuery } from '../../redux/feature/book/bookApi';
import Loader from '../../components/shared/Loader';
import { useEffect, useState } from 'react';
import Exchanges from './components/Exchanges';
import { useGetUserProfileImageQuery } from '../../redux/feature/auth/authApi';
import SwapModal from '../../components/shared/SwapModal';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setSwapModal } from '../../redux/feature/open/openSlice';
import { FormProvider, useForm } from 'react-hook-form';
import BookSkeleton from '../../components/shared/skeleton/BookSkeleton';
import { useTranslation } from 'react-i18next';

export default function BookDetails() {
  const MAX_LENGTH = 95;
  const { id } = useParams();
  const navigate = useNavigate();
  const [isProfile, setProfile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useAppDispatch();
  const { userInformation } = useAppSelector((state) => state.auth);
  const { data: bookData, isLoading: bookLoading } = useGetBookByIdQuery({ id: id }, { skip: !id });
  const { data: userProfile } = useGetUserProfileImageQuery(
    { userId: bookData?.owner?.id },
    {
      skip: !bookData?.owner?.id,
    },
  );
  const methods = useForm({
    mode: 'onChange',
    defaultValues: { radio: 'swap' },
  });
  const { handleSubmit } = methods;
  const { t } = useTranslation();

  useEffect(() => {
    if (userInformation?.id === bookData?.owner?.id) {
      setProfile(true);
    }
  }, [bookData?.owner?.id]);

  const navigateToEditBook = () => {
    if (isProfile) {
      navigate(`/profile/update-book/${id}`);
    }
  };

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  if (bookLoading) return <Loader />;
  goToTop();
  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit((data) => console.log({ data }))}>
          <SwapModal />
        </form>
      </FormProvider>

      <div className="absolute left-0 top-0 w-full flex justify-between px-4 bg-white h-14">
        <div className="flex items-center gap-4">
          <Image
            src={leftArrowIcon}
            alt="icon"
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h2 className="text-black text-base font-medium leading-none mt-[3px]">
            {t('bookDetails.title')}
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <Image src={shareIcon} alt="icon" />
          <Image
            src={isProfile ? editIcon : BookMarkIcon}
            alt="icon"
            onClick={navigateToEditBook}
          />
        </div>
      </div>
      <div className="w-full h-[172px] mt-14">
        <Image src={bookDetailsBg} className="w-full h-full" />
      </div>
      <div className="mx-auto w-[160px] h-[190px] -mt-32">
        <Image src={bookData?.coverPhotoUrls[0]} className="w-full h-full rounded-lg" />
      </div>
      <div className=" pb-32">
        <div className="container text-center my-5 ">
          <h1 className="font-medium text-black text-sm leading-none mb-1 font-poppins">
            {bookData?.title}
          </h1>
          <div className="flex items-center justify-center flex-wrap">
            {bookData?.genres?.map((favItem: string[], index: number) => (
              <div key={index} className="flex items-center">
                <p className="text-black font-light text-xs font-poppins">{favItem}</p>
                <span
                  className={`${
                    bookData?.genres.length - 1 === index ? 'hidden' : 'block'
                  } inline-block mx-2 font-poppins font-light text-sm`}
                >
                  |
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center mt-9 mb-3">
            <Image src={exchangeIcon} alt="exchangeIcon" />
            <h3 className="font-poppins font-normal text-sm text-[#404040]">
              {t('bookDetails.exchangeCondition')}
            </h3>
            <p className="text-[10px] text-[#404040]">{t('bookDetails.eitherOneOfThese')}</p>
          </div>
        </div>
        {/* ================== START Exchanges Condition ==================  */}
        <div className="pl-4">
          <Exchanges swapCondition={bookData?.swapCondition} />
        </div>
        {/* ================== END Exchanges Condition ==================  */}
        <div className="container text-left mb-5">
          <h3 className="text-sm font-normal font-poppins text-smokyBlack mt-5 mb-2 ">
            {t('bookDetails.bookDescription')}
          </h3>
          <p className="text-xs font-light font-poppins text-grayDark">
            {isExpanded || bookData?.description?.length <= MAX_LENGTH
              ? bookData?.description
              : `${bookData?.description.substring(0, MAX_LENGTH)}...`}
            {bookData?.description.length > MAX_LENGTH && (
              <button
                onClick={toggleReadMore}
                className="text-primary ml-1 text-sm font-normal font-poppins"
              >
                {isExpanded ? t('moreLess') : t('more')}
              </button>
            )}
          </p>
        </div>
        <div className="bg-white py-6 grid grid-cols-3">
          <div className="flex flex-col items-center border-r border-platinumDark px-1">
            <p className="text-grayDark text-xs font-poppins font-light">
              {t('bookDetails.bookCondition')}
            </p>
            <Image src={bookIcon2} alt="book" className="mt-2 mb-1" />
            <h3 className="text-black text-xs font-normal font-poppins">
              {bookData?.condition || '-'}
            </h3>
          </div>
          <div className="flex flex-col items-center border-r border-platinumDark px-1">
            <p className="text-grayDark text-xs font-poppins font-normal">
              {t('bookDetails.language')}
            </p>
            <Image src={lng} alt="book" className="mt-2 mb-1" />
            <h3 className="text-black text-xs font-normal font-poppins">English</h3>
          </div>
          <div className="flex flex-col items-center border-r border-platinumDark px-1">
            <p className="text-grayDark text-xs font-poppins font-normal">
              {t('bookDetails.length')}
            </p>
            <p className="text-xl font-semibold text-smokyBlack">-</p>
            <h3 className="text-black text-xs font-normal font-poppins flex items-center gap-1">
              {t('bookDetails.pages')}
            </h3>
          </div>
        </div>
        <div className="container">
          <div className=" flex items-center gap-1 my-5">
            <Image src={locationIcon} alt="location" />
            <p className="text-xs font-poppins font-normal">Senate Square, Helsinki</p>
          </div>
          <div>
            <h3 className="text-xs font-normal font-poppins text-grayDark mb-2">
              {t('bookDetails.offeredBy')}
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Image
                  className="w-4 h-4 rounded-full"
                  src={(userProfile?.imageUrl && userProfile?.imageUrl) || profileIcon}
                  alt="profile"
                />
                <p className="text-xs font-normal font-poppins text-black">
                  {bookData?.owner?.name}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Image src={upArrowIcon} alt="profile" />
                <p className="text-xs font-normal font-poppins text-black">
                  {t('bookDetails.positiveSwaps')}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#E4E4E4] w-full h-[1px] my-5"></div>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-base text-black font-medium font-poppins">
              {t('bookDetails.moreFromThisUser')}
            </h1>
            <Button className="text-primary underline font-poppins font-normal text-sm">
              {t('bookDetails.seeAll')}
            </Button>
          </div>
        </div>

        <div className="container grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {Array.from({ length: 4 }, (_, index) => (
            <BookSkeleton key={index} />
          ))}
        </div>
      </div>
      {!isProfile && (
        <div
          className="h-16 flex items-center gap-1 justify-between text-xs font-normal px-6 fixed bottom-0  bg-white w-full"
          style={{
            boxShadow: '0px 0px 1px 0px #33333345',
          }}
        >
          <div>
            <p className="text-[8px] font-poppins ">{t('bookDetails.offeredBy')}</p>
            <h3 className="text-sm font-poppins font-normal">{bookData?.owner?.name}</h3>
          </div>
          <div>
            <Button
              onClick={() => dispatch(setSwapModal(true))}
              className="bg-primary text-white w-[130px] sm:w-[150px] py-2 text-sm font-poppins font-normal rounded-md"
            >
              {t('bookDetails.requestSwap')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
