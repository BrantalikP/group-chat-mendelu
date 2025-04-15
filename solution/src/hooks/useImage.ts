import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadImageAsync = async (uri: string): Promise<string> => {
  const storage = getStorage();
  const response = await fetch(uri);
  const blob = await response.blob();
  const filename = uri.substring(uri.lastIndexOf("/") + 1);
  const storageRef = ref(storage, `images/${filename}`);
  await uploadBytes(storageRef, blob);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};
