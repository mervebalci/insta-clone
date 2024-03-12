import { useState, useEffect } from "react";
import usePostStore from "../store/postStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export default function useGetUserPosts() {
  const [isLoading, setIsLoading] = useState(true);
  // Loading state is set as true, because it'll run immidiately within useEffect

  const { posts, setPosts } = usePostStore();

  const showToast = useShowToast();

  // To update the user profile
  const userProfile = useUserProfileStore((state) => state.userProfile);

  useEffect(() => {
    async function getPosts() {
      if (!userProfile) return;
      // if it's not user profile, post can't be fetched. Because user not found.

      setIsLoading(true);
      setPosts([]);

      try {
        const q = query(collection(firestore, "posts"), where("createdBy", "==", userProfile.uid));
        const querySnapshot = await getDocs(q);

        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({...doc.data(), id: doc.id});
        });

        posts.sort((a, b) => b.createdAt - a.createdAt);
        setPosts(posts);

      } catch (error) {
        showToast("Error", error.message, "error");
        setPosts([]);

      } finally {
        setIsLoading(false);
      }
    };
    getPosts();
  }, [setPosts, userProfile, showToast]);

  return {isLoading, posts};
}