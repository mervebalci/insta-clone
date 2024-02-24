import { useState } from 'react';
import useShowToast from "./useShowToast";

export default function usePreviewImg() {
  const [selectedFile, setSelectedFile] = useState(null);

  // For possible errors
  const showToast = useShowToast();

  // To limit the size of uploaded images as 2MB
  const maxFileSizeInBytes = 2 * 1024 * 1024; // 2MB

  // To take the chosen file from your pc/tablet/phone
  function handleImageChange(e) {
    const file = e.target.files[0];

    // To check if the chosen file is an image file
    if (file && file.type.startsWith("image/")) {
      // Another check for the size of the image file
      if (file.size > maxFileSizeInBytes) {
        showToast("Error", "File size must be less than 2MB!", "error");
        setSelectedFile(null);
        return;
      }
      
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedFile(reader.result);
      }

      reader.readAsDataURL(file);

    } else {
      showToast("Error", "Please select an image file!", "error");
      setSelectedFile(null);
    }
  }

  return { handleImageChange, selectedFile, setSelectedFile };
}