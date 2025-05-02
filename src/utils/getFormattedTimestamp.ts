import { FieldValue, Timestamp } from "firebase/firestore";

export const getFormattedTimestamp = (
  timestamp: Timestamp | FieldValue | undefined,
) =>
  timestamp && "toDate" in timestamp
    ? timestamp
        .toDate()
        .toLocaleTimeString("cs-CZ", { hour: "2-digit", minute: "2-digit" })
    : "";
