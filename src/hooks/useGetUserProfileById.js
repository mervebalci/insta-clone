import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export default function useGetUserProfileById(userId) {
  const [isLoading, setIsLoading] = useState(true);
  // State is initially true, because we will call it within useEffect.

  const [userProfile, setUserProfile] = useState(null);

  const showToast = useShowToast();

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      setUserProfile(null);   // It is null, because it has not been fetched yet.

      try {
        const userRef = await getDoc(doc(firestore, "users", userId));
        if (userRef.exists()) {
          setUserProfile(userRef.data());
        }
        
      } catch (error) {
        showToast("Error", error.message, "error");
        
      } finally {
        setIsLoading(false);
      }
    };
    
    getUserProfile();
    
  }, [showToast, setUserProfile, userId]);  
  // Whenever this userId changes, it will run the useEffect to fetch the user profile.
  
  return {isLoading, userProfile, setUserProfile};
}

// It will be called inside the comment.jsx