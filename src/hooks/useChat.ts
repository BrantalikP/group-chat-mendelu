import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  DocumentData,
} from "firebase/firestore";
import { db } from "~/lib/firebase";
import { useEffect, useState } from "react";
import { uuid } from "expo-modules-core";
import { MESSAGES_ID } from "~/hooks/presets";

export const myID: string = uuid.v4();
// export const myID: string = "pecan-123456"; // TODO: Arbitrary ID
export const myName: string = "Pecan";

export interface Message {
  id: string;
  user: string;
  userId: string;
  text: string;
  image: string | null;
  timestamp: Timestamp | null;
}

export const sendMessageToFirestore = async ({
  text,
  image,
}: {
  text: string;
  image?: string;
}): Promise<void> => {
  try {
    await addDoc(collection(db, MESSAGES_ID), {
      user: myName,
      userId: myID,
      text,
      image: image || null,
      timestamp: serverTimestamp(),
    });
  } catch (e) {
    console.error("Error sending message: ", e);
  }
};

export const useRealtimeMessages = (): Message[] => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const q = query(collection(db, MESSAGES_ID), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs: Message[] = snapshot.docs.map((doc) => {
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
