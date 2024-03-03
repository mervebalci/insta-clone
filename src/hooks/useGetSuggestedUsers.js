import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export default function useGetSuggestedUsers() {
  const [isLoading, setIsLoading] = useState(true);
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  const authUser = useAuthStore(state => state.user);

  const showToast = useShowToast();

  // To fetch users
  useEffect(() => {
    async function getSuggestedUsers() {
      setIsLoading(true);

      try {
        const userRef = collection(firestore, "users");
        const q = query(
          userRef,
          where("uid", "not-in", [authUser.uid, ...authUser.following]),
          orderBy("uid"),
          limit(3),
        );

        const querySnapshot = await getDocs(q);
        const users = [];

        querySnapshot.forEach((doc) => {
          users.push({...doc.data(), id: doc.id});
        });

        setSuggestedUsers(users);
      } catch (error) {
        showToast("Error", error.message, "error")
      } finally {
        setIsLoading(false);
      }
    };

    if (authUser) getSuggestedUsers();
  }, [authUser, showToast]);

  return {isLoading, suggestedUsers};
}