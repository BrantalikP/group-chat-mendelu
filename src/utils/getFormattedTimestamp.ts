import { Timestamp } from "firebase/firestore";

export const getFormattedTimestamp = (timestamp: Timestamp | null) =>
  timestamp
    ? timestamp
        .toDate()
        .toLocaleTimeString("cs-CZ", { hour: "2-digit", minute: "2-digit" })
    : "";
