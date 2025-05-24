import { MessageBubbleProps } from '../interface';

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.senderId === 'user';

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
      <div
        className={`max-w-[85%] pl-[20px] pr-4 py-2 ${
          isUser ? 'bg-blue-500 text-white rounded-xl' : 'bg-white text-gray-800 rounded-xl'
        }`}
      >
        <p>{message.text}</p>
      </div>
      <span className="text-xs pr-4 pl-4 mt-1 text-[#818D90]">{message.timestamp}</span>
    </div>
  );
};

export default MessageBubble;
