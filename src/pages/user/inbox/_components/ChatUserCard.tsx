import { useNavigate } from "react-router-dom";
import { IChatUser } from "../interface";

export default function ChatUserCard({
  id,
  name,
  time,
  lastMessage,
  unread,
}: IChatUser) {
  const navigate = useNavigate();
  return (
    <div
      key={id}
      className="flex items-center px-4 py-3 border-b border-[#F0F1F3] hover:bg-[#e5e9f2]"
      onClick={() => navigate(`/user/inbox/chat/${id}`)}
    >
      <div className="h-11 w-11 rounded-full bg-[#D9D9D9] flex-shrink-0 flex items-center justify-center" />
      <div className="ml-3 flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-[15px] truncate">{name}</span>
          <span className="text-xs text-[#8B8B8B]">{time}</span>
        </div>
        <p className="text-sm text-[#8B8B8B] truncate mt-0.5">{lastMessage}</p>
      </div>
      {unread > 0 && (
        <div className="ml-2 bg-[#2563EB] text-white text-xs rounded-lg px-2 py-0.5 min-w-[22px] h-6 flex items-center justify-center">
          {unread}
        </div>
      )}
    </div>
  );
}
