// utils/fileUpload.js
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const uploadFile = async (storage, file, filePath) => {
  const fileRef = ref(storage, filePath);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
};