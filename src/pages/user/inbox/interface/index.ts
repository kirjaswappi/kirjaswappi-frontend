export interface IChatUser {
  id: string;
  name: string;
  lastMessage: string;
  unread: number;
  time: string;
  avatar: string | null;
}
