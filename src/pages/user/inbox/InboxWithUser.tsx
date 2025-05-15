import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import messagesData from "../../../data/messages.json";
import infoIcon from "../../../assets/infoIcon.png";
import leftArrow from "../../../assets/leftArrow.png";
import cameraIcon from "../../../assets/solar_camera-bold.png";
import sendIcon from "../../../assets/sendIcon.png";

const InboxChat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState(messagesData.messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const user = id && messagesData.users[id as keyof typeof messagesData.users];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSendMessage = () => {
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
    setMessage("");
  };

  if (!user) return null;

  return (
    <div className="flex flex-col h-screen bg-[#f2f4f8] font-poppins">
      <div className="px-4 py-3 flex items-center bg-white">
        <img
          src={leftArrow}
          alt="Back"
          className="w-[13px] h-[19px] mr-2 cursor-pointer"
          onClick={() => navigate("/inbox")}
        />
        <h2 className="text-lg flex-1 text-center">{user.name}</h2>
        <img src={infoIcon} alt="Info" className="w-[19.5px] h-[19.5px]" />
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.senderId === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-[85%] pl-[20px] pr-4 py-2 ${
                  msg.senderId === "user"
                    ? "bg-blue-500 text-white rounded-xl"
                    : "bg-white text-gray-800 rounded-xl"
                }`}
              >
                <p>{msg.text}</p>
              </div>

              <span
                className="text-xs pr-4 pl-4 mt-1"
                style={{ color: "#818D90" }}
              >
                {msg.timestamp}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Bottom Chat Input */}
      <div className="sticky bottom-0 w-full px-4 py-3 z-40 lg:pr-5 lg:pl-5">
        <div className="flex items-center gap-2 px-3 py-2 border border-[#E5E5E5] bg-[#FFFFFF] rounded-[29px] shadow-sm">
          {/* Camera Icon */}
          <button className="flex items-center justify-center min-w-[36px] min-h-[36px] bg-black rounded-full">
            <img src={cameraIcon} alt="Camera" className="h-5 w-5" />
          </button>

          {/* Input */}
          <input
            type="text"
            className="flex-1 outline-none bg-transparent text-base px-2"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            style={{ lineHeight: "24px" }}
          />

          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            className="flex items-center justify-center min-w-[36px] min-h-[36px] rounded-full"
          >
            <img src={sendIcon} alt="Send" className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InboxChat;
