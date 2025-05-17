
/* ========== CHAT HEADER ========== */
export interface ChatHeaderProps {
    userName: string;
  }
  
  /* ========== CHAT INPUT ========== */
  export interface ChatInputProps {
    onSendMessage: (message: string) => void;
  }
  
  /* ========== MESSAGE TYPES ========== */
  export interface Message {
    id: string;
    senderId: string;
    text: string;
    timestamp: string;
  }
  
  /* ========== MESSAGE BUBBLE ========== */
  export interface MessageBubbleProps {
    message: Message;
  }
  
  /* ========== MESSAGES LIST ========== */
  export interface MessagesListProps {
    messages: Message[];
  }
  
