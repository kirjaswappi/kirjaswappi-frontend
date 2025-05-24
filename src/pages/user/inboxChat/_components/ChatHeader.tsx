import { useNavigate } from 'react-router-dom';
import leftArrow from '../../../../assets/leftArrow.png';
import infoIcon from '../../../../assets/infoIcon.png';
import { ChatHeaderProps } from '../interface';

const ChatHeader = ({ userName }: ChatHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-3 flex items-center bg-white">
      <button
        onClick={() => navigate('/user/inbox')}
        className="mr-2 cursor-pointer"
        aria-label="Go back"
      >
        <img src={leftArrow} alt="Back" className="w-[13px] h-[19px]" />
      </button>
      <h2 className="text-lg flex-1 text-center">{userName}</h2>
      <img src={infoIcon} alt="Info" className="w-[19.5px] h-[19.5px]" />
    </div>
  );
};

export default ChatHeader;
