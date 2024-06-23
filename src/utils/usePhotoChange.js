import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { fireDB, storage } from "../AFS Panel/firebase/FirebaseConfig";
import { fetchBranches } from "../AFS Panel/redux/admin/branchSlice";

const usePhotoChange = () => {
  const dispatch = useDispatch();

  const handlePhotoSubmit = async (userName, centerId, newPhotoFile) => {
    try {
      const photoRef = ref(storage, `franchise/${userName}/logo`);
      await uploadBytes(photoRef, newPhotoFile);
      const newPhotoUrl = await getDownloadURL(photoRef);
      const studentRef = doc(fireDB, "franchiseData", centerId);
      await updateDoc(studentRef, { photoUrl: newPhotoUrl });
      dispatch(fetchBranches());
      toast.success("Photo updated successfully");
    } catch (error) {
      console.error("Error updating photo: ", error);
      toast.error("Failed to update photo");
    }
  };

  const handlePhotoChange = async (userName, userId, e) => {
    const newPhotoFile = e.target.files[0];
    if (newPhotoFile.size > 60 * 1024) {
      toast.error("Please select a photo less than 60kb in size.");
      return;
    }
    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target.result;
      const img = document.createElement("img");
      img.onload = async () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        if (newPhotoFile.size > 60 * 1024) {
          const scaleFactor = (60 * 1024) / newPhotoFile.size;
          canvas.width *= scaleFactor;
          canvas.height *= scaleFactor;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const resizedDataUrl = canvas.toDataURL("image/jpeg");
        const byteString = atob(resizedDataUrl.split(",")[1]);
        const mimeString = resizedDataUrl.split(",")[0].split(":")[1].split(";")[0];
        let ab = new ArrayBuffer(byteString.length);
        let ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const resizedFile = new Blob([ab], { type: mimeString });
        handlePhotoSubmit(userName, userId, resizedFile);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(newPhotoFile);
  };

  return { handlePhotoChange };
};

export default usePhotoChange;
