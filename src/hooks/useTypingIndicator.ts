import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "~/lib/firebase";
import { debounce } from "lodash";
import { TYPING_STATUS_ID } from "~/hooks/presets";

export const useTypingIndicator = ({
  myID,
  myName,
}: {
  myID: string;
  myName: string;
}) => {
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, TYPING_STATUS_ID),
      (snapshot) => {
        const typing: string[] = [];
        snapshot.forEach((doc) => {
          if (doc.id !== myID && doc.data().isTyping) {
            typing.push(doc.data().userName);
          }
        });
        setTypingUsers(typing);
      },
    );

    return () => unsubscribe();
  }, []);

  const updateTypingStatus = useCallback(
    debounce((typing: boolean) => {
      setDoc(
        doc(db, TYPING_STATUS_ID, myID),
        {
          userName: myName,
          isTyping: typing,
          timestamp: serverTimestamp(),
        },
        { merge: true },
      );
    }, 500),
    [],
  );

  return { typingUsers, updateTypingStatus };
};
