import { useState } from 'react';
import graySearchIcon from '../../../assets/GraysearchIcon.png';
import conversationsData from '../../../data/conversations.json';
import Image from '../../../components/shared/Image';
import Input from '../../../components/shared/Input';
import ChatUserCard from './_components/ChatUserCard';
const Inbox = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = searchQuery
    ? conversationsData.conversations.filter(
        (conversation) =>
          conversation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : conversationsData.conversations;

  return (
    <div className="flex flex-col h-screen bg-[#f2f4f8] font-poppins">
      <div className="bg-white w-full py-4 px-4">
        <h2 className="text-center text-lg">Messages</h2>
      </div>

      <div className="px-4 py-2 bg-[#F5F6FA]">
        <div className="relative">
          <Image
            src={graySearchIcon}
            alt="Search"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-[18px] w-[18px] object-contain"
          />
          <Input
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
          <ChatUserCard key={conversation.id} {...conversation} />
        ))}
      </div>
    </div>
  );
};

export default Inbox;
