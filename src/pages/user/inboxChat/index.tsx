import { useState } from "react";
import { useParams } from "react-router-dom";
import messagesData from "../../../data/messages.json";
import ChatInput from "./_components/ChatInput";
import ChatHeader from "./_components/ChatHeader";
import MessagesList from "./_components/MessageList";

export const Index = () => {
  const { id } = useParams();
  const [chatMessages, setChatMessages] = useState(messagesData.messages);

  const user = id && messagesData.users[id as keyof typeof messagesData.users];

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    const newMessage = {
      id: String(Date.now()),
      senderId: "user",
      text: message,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChatMessages([...chatMessages, newMessage]);
  };

  if (!user) return null;

  return (
    <div className="flex flex-col h-screen bg-[#f2f4f8] font-poppins">
      <ChatHeader userName={user.name} />
      <MessagesList messages={chatMessages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};
