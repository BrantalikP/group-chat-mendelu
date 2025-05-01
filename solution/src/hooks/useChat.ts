import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  orderBy,
  query,
  DocumentData,
} from "firebase/firestore";
import { db } from "~/lib/firebase";
import { useEffect, useState } from "react";
import { uuid } from "expo-modules-core";
import { MESSAGES_ID } from "~/hooks/presets";
import { IMessage } from "~/types";

export const myID: string = uuid.v4();
// export const myID: string = "pecan-123456"; // TODO: Arbitrary ID
export const myName: string = "Pecan";

export const sendMessageToFirestore = async ({
  text,
  image = "",
}: {
  text: string;
  image?: string;
}) => {
  const newMessage: Omit<IMessage, "id"> = {
    user: myName,
    userId: myID,
    text,
    image,
    timestamp: serverTimestamp(),
  };

  try {
    await addDoc(collection(db, MESSAGES_ID), newMessage);
  } catch (e) {
    console.log("Error sending message: ", e);
  }
};

export const useRealtimeMessages = (): IMessage[] => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const q = query(collection(db, MESSAGES_ID), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs: IMessage[] = snapshot.docs.map((doc) => {
        const data = doc.data() as DocumentData;
        return {
          id: doc.id,
          user: data.user,
          userId: data.userId,
          text: data.text,
          image: data.image,
          timestamp: data.timestamp,
        };
      });
      setMessages(docs);
    });

    return () => unsubscribe();
  }, []);

  return messages;
};
