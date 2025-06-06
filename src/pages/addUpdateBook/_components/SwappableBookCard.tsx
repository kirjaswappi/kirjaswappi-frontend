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
      className="bg-white sm:p-4 lg:p-0 rounded-xl flex lg:flex-col gap-4 lg:gap-3 mt-3 lg:mt-0 shadow-sm lg:max-w-[400px] relative"
    >
      <PiDotsThreeBold
        size={24}
        className="absolute lg:bg-white lg:rounded-md right-4 top-4 cursor-pointer z-20"
        onClick={handleClickDots}
      />

      <div className="w-3/12 h-20 max-h-20 lg:w-full lg:h-32">
        <Image
          src={coverPhotoUrl}
          alt="Cover"
          className="w-20 h-20 object-cover rounded-md lg:w-full lg:h-32"
        />
      </div>

      <div className="w-3/4 pr-7 lg:pr-0 lg:mb-3 lg:pr-2 lg:pl-2 lg:w-full lg:mt-11">
        <h3 className="text-sm font-poppins font-medium text-[12px]">{title}</h3>
        <h3 className="text-xs font-poppins font-light mt-2">by {author}</h3>
      </div>

      {swappableBookIndex === index && clicked && (
        <div
          ref={reference}
          className="absolute right-4 top-12 w-[138px] bg-white shadow-lg rounded-md z-10"
        >
          <Button
            onClick={() => editAnotherBook(index)}
            onKeyDown={(e) => e.key === 'Enter' && editAnotherBook(index)}
            className="flex items-center gap-2 p-2 border-b border-[#D3D3D3] w-full cursor-pointer"
            type="button"
          >
            <Image src={editIcon} alt="edit" className="h-[18px]" />
            <p className="font-poppins font-normal text-sm">Edit</p>
          </Button>
          <Button
            onClick={() => deleteSwappableBookByIndex(index)}
            onKeyDown={(e) => e.key === 'Enter' && deleteSwappableBookByIndex(index)}
            className="flex items-center gap-2 p-2 w-full"
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
