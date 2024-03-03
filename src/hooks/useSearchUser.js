import { useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase"

export default function useSearchUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const showToast = useShowToast();

  async function getUserProfile(username) {
    setIsLoading(true);
    setUser(null);
    
    try {
      const q = query(collection(firestore, "users"), where("username", "==", username));

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) return showToast("Error", "User not found", "error");

      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });

    } catch (error) {
      showToast("Error", error.message, "error");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  return {isLoading, user, getUserProfile, setUser};
}