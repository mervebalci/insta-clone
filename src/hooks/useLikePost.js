import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export default function useLikePost(post) {
  const [isUpdating, setIsUpdating] = useState(false);
	const authUser = useAuthStore((state) => state.user);

  const [likes, setLikes] = useState(post.likes.length);

  // If the post is already liked
  const [isLiked, setIsLiked] = useState(post.likes.includes(authUser?.uid));
  // With "?", it will be checked if the user is authenticated

  const showToast = useShowToast();

  async function handleLikePost() {
		if (isUpdating) return;
		if (!authUser) return showToast("Error", "You must be logged in to like a post!", "error");
		setIsUpdating(true);

    try {
      // To get the post, which is to be updated:
			const postRef = doc(firestore, "posts", post.id);
			await updateDoc(postRef, {
				likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
			});

			setIsLiked(!isLiked);
			isLiked ? setLikes(likes - 1) : setLikes(likes + 1);

		} catch (error) {
			showToast("Error", error.message, "error");

		} finally {
			setIsUpdating(false);
		}
	};

	return { isLiked, likes, handleLikePost, isUpdating };
};