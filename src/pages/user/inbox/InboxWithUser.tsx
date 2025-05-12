import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Info, Camera } from "lucide-react";
import messagesData from '../../../data/messages.json';
import BottomNav from "../../../components/Footer/_components/BottomNav";

const SendIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const InboxChat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
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
      senderId: 'user',
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages([...chatMessages, newMessage]);
    setMessage('');
  };

  if (!user) return null;

  return (
    <div className="flex flex-col h-screen bg-[#f2f4f8] font-poppins">
      <div className="px-4 py-3 flex items-center bg-white">
        <ArrowLeft className="h-6 w-6 mr-2" onClick={() => navigate('/inbox')} />
        <h2 className="text-lg flex-1">{user.name}</h2>
        <Info className="h-6 w-6" />
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {chatMessages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.senderId === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[85%] px-4 py-2 ${
                msg.senderId === 'user' 
                  ? 'bg-blue-500 text-white rounded-[20px] rounded-br-md' 
                  : 'bg-white text-gray-800 rounded-[20px] rounded-bl-md'
              }`}>
                <p>{msg.text}</p>
              </div>
              <span className={`text-xs mt-1 ${
                msg.senderId === 'user' 
                  ? 'text-gray-400 pr-1' 
                  : 'text-gray-400 pl-1'
              }`}>
                {msg.timestamp}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="flex items-center z-40 px-3 py-2 bg-white sticky bottom-0">
        <Camera className="h-6 w-6 text-gray-400 mr-3" />
        <input
          type="text"
          className="flex-1 outline-none"
          placeholder="Okai"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage} className="ml-3">
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default InboxChat;