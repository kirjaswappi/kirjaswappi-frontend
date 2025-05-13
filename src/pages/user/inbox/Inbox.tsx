import { useState } from "react";
import { useNavigate } from "react-router-dom";
import graySearchIcon from "../../../assets/GraysearchIcon.png";
import conversationsData from "../../../data/conversations.json";

const Inbox = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = searchQuery
    ? conversationsData.conversations.filter(
        (conv) =>
          conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversationsData.conversations;

  return (
    <div className="flex flex-col h-screen bg-[#f2f4f8] font-poppins">
      <div className="bg-white w-full py-4 px-4">
        <h2 className="text-center text-lg">Messages</h2>
      </div>

      <div className="px-4 py-2 bg-[#F5F6FA]">
        <div className="relative">
          <img
            src={graySearchIcon}
            alt="Search"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-[18px] w-[18px] object-contain"
          />
          <input
            type="text"
            className="w-full pl-10 pr-3 py-2 rounded-full border border-[#E4E6EC] bg-white text-sm focus:outline-none"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conversation) => (
          <div
            key={conversation.id}
            className="flex items-center px-4 py-3 border-b border-[#F0F1F3] hover:bg-[#e5e9f2]"
            onClick={() => navigate(`/inbox/chat/${conversation.id}`)}
          >
            <div className="h-11 w-11 rounded-full bg-[#D9D9D9] flex-shrink-0 flex items-center justify-center" />
            <div className="ml-3 flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-[15px] truncate">
                  {conversation.name}
                </span>
                <span className="text-xs text-[#8B8B8B]">
                  {conversation.time}
                </span>
              </div>
              <p className="text-sm text-[#8B8B8B] truncate mt-0.5">
                {conversation.lastMessage}
              </p>
            </div>
            {conversation.unread > 0 && (
              <div className="ml-2 bg-[#2563EB] text-white text-xs rounded-lg px-2 py-0.5 min-w-[22px] h-6 flex items-center justify-center">
                {conversation.unread}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inbox;
