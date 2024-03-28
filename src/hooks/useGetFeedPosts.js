import { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export default function useGetFeedPosts() {
  const [isLoading, setIsLoading] = useState(true);
  // State can be initially true, because we will use useEffect

  const { posts, setPosts } = usePostStore();
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();
  const { setUserProfile } = useUserProfileStore();

  useEffect(() => {
    async function getFeedPosts() {
      setIsLoading(true);

      // If user doesn`t follow anyone: 
      if (authUser.following.length === 0) {
        setIsLoading(false);
        setPosts([]);
        return;
      }

      // If user follows the other users:
      // Then, this query will give us the POSTS of other USERS that WE FOLLOW
      const q = query(collection(firestore, "posts"), where("createdBy", "in", authUser.following))

      try {
        const querySnapshot = await getDocs(q);

        // Pushing the posts into the "feedPosts" array
        const feedPosts = [];
        querySnapshot.forEach((doc) => {
          feedPosts.push({id: doc.id, ...doc.data()});
        });

        // To sort the post by "createdAt" (the latest created post will be shown above)
        feedPosts.sort((a, b) => b.createdAt - a.createdAt);

        setPosts(feedPosts);

      } catch (error) {
        showToast("Error", error.message, "error");

      } finally {
        setIsLoading(false);
      }
    }

    // Calling this function only if the user is authenticated
    if (authUser) getFeedPosts();

  }, [authUser, showToast, setPosts, setUserProfile]);

  return { isLoading, posts };
}