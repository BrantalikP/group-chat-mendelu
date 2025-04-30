import { Timestamp } from "firebase/firestore";
import { IMessage } from "~/types";

export const dummyMessages: IMessage[] = [
  {
    id: "1",
    user: "Emily",
    text: "Hello everyone! 👋",
    timestamp: Timestamp.fromDate(new Date("2024-03-20T15:34:00")),
    image: null,
    userId: "122",
  },
  {
    id: "2",
    user: "John",
    text: "Hi Emily!",
    timestamp: Timestamp.fromDate(new Date("2024-03-20T15:34:00")),
    image:
      "https://preview.redd.it/how-did-jotaro-get-the-items-in-the-jail-cell-at-the-v0-nk9rqc60drgb1.jpg?width=640&crop=smart&auto=webp&s=70ee5d36d541697487a5a1f1b48c4dac32d8b11b",
    userId: "113",
  },
  {
    id: "3",
    user: "Lisa",
    text: "How’s it going?",
    timestamp: Timestamp.fromDate(new Date("2024-03-20T15:35:00")),
    image: null,
    userId: "148",
  },
  {
    id: "4",
    user: "You",
    text: "Hi there!",
    timestamp: Timestamp.fromDate(new Date("2024-03-20T15:36:00")),
    image: null,
    userId: "123",
  },
];
