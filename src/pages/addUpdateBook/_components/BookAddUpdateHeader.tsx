import Image from '../../../components/shared/Image';
import leftArrowIcon from '../../../assets/leftArrow.png';

const BookAddUpdateHeader = ({ title, onBack }: { title: string; onBack: () => void }) => (
  <div className="fixed left-0 top-0 w-full h-[48px] flex items-center justify-between px-4 border-b border-[#E4E4E4] bg-white z-30">
    <div className="flex items-center justify-center w-full relative">
      <button
        className="w-5 absolute left-0 top-0"
        onClick={onBack}
        onKeyDown={(e) => e.key === 'Enter' && onBack()}
        aria-label="Go back"
      >
        <Image src={leftArrowIcon} alt="left" />
      </button>
      <h3 className="font-poppins text-base font-normal text-center">{title}</h3>
    </div>
  </div>
);

export default BookAddUpdateHeader;
