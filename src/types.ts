import { Timestamp } from "firebase/firestore";

export interface Message {
  id: string;
  user: string;
  userId: string;
  text: string;
  image: string | null;
  timestamp: Timestamp | null;
}
