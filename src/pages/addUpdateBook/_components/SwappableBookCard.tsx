import React from 'react';
import { PiDotsThreeBold } from 'react-icons/pi';
import deleteIcon from '../../../assets/deleteIconRed.png';
import editIcon from '../../../assets/editBlack.png';
import Button from '../../../components/shared/Button';
import Image from '../../../components/shared/Image';

interface ISwappableBookCard {
  id: string;
  index: number;
  title: string;
  author: string;
  coverPhotoUrl: string;
  swappableBookIndex: number | null;
  clicked: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reference: React.RefObject<any>;
  setSwappableBookIndex: (index: number | null) => void;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
  editAnotherBook: (index: number) => void;
  deleteSwappableBookByIndex: (index: number) => void;
}

function SwappableBookCard({
  id,
  index,
  title,
  author,
  coverPhotoUrl,
  swappableBookIndex,
  clicked,
  reference,
  setSwappableBookIndex,
  setClicked,
  editAnotherBook,
  deleteSwappableBookByIndex,
}: ISwappableBookCard) {
  const handleClickDots = () => {
    const isSame = swappableBookIndex === index && clicked;
    setSwappableBookIndex(isSame ? null : index);
    setClicked(!isSame);
  };

  return (
    <div
      id={`swappableBook-${id}`}
      className="bg-white lg:bg-transparent lg:shadow-none p-4 lg:p-0 lg:pb-3 rounded-xl flex lg:flex-col gap-4 lg:gap-3 mt-3 lg:mt-0 shadow-sm lg:max-w-[400px] relative"
    >
      <PiDotsThreeBold
        size={24}
        className="absolute lg:bg-white lg:rounded-md lg:p-1 right-4 top-4 cursor-pointer z-20 hover:bg-gray-100 lg:hover:bg-gray-100"
        onClick={handleClickDots}
      />

      {/* Image container */}
      <div className="w-3/12 lg:w-full flex-shrink-0">
        <Image
          src={coverPhotoUrl}
          alt="Cover"
          className="w-20 h-20 lg:w-full lg:h-48 object-cover rounded-md"
        />
      </div>

      {/* Content container */}
      <div className="w-3/4 lg:w-full pr-8 lg:pr-4 lg:pl-3 flex flex-col justify-center lg:pt-0">
        <h3 className="text-sm lg:text-base font-poppins font-medium text-[12px] lg:text-sm line-clamp-2">
          {title}
        </h3>
        <h3 className="text-xs lg:text-sm font-poppins font-light mt-2 text-gray-600">
          by {author}
        </h3>
      </div>

      {/* Dropdown menu */}
      {swappableBookIndex === index && clicked && (
        <div
          ref={reference}
          className="absolute right-4 top-12 lg:top-14 w-[138px] bg-white shadow-lg rounded-md z-10 border border-gray-100"
        >
          <Button
            onClick={() => editAnotherBook(index)}
            onKeyDown={(e) => e.key === 'Enter' && editAnotherBook(index)}
            className="flex items-center gap-2 p-3 border-b border-[#D3D3D3] w-full cursor-pointer hover:bg-gray-50 transition-colors"
            type="button"
          >
            <Image src={editIcon} alt="edit" className="h-[18px]" />
            <p className="font-poppins font-normal text-sm">Edit</p>
          </Button>
          <Button
            onClick={() => deleteSwappableBookByIndex(index)}
            onKeyDown={(e) => e.key === 'Enter' && deleteSwappableBookByIndex(index)}
            className="flex items-center gap-2 p-3 w-full hover:bg-gray-50 transition-colors"
            type="button"
          >
            <Image src={deleteIcon} alt="delete" className="h-[18px]" />
            <p className="font-poppins font-normal text-sm text-[#EA244E] cursor-pointer">Delete</p>
          </Button>
        </div>
      )}
    </div>
  );
}

export default React.memo(SwappableBookCard);
