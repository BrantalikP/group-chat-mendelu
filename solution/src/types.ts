import { FieldValue } from "firebase/firestore";

export interface IMessage {
  id: string;
  user: string;
  userId: string;
  text: string;
  image?: string;
  timestamp?: FieldValue;
}
