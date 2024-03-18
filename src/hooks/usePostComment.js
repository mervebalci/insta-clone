import { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import usePostStore from "../store/postStore";

export default function usePostComment() {
  const [isCommenting, setIsCommenting] = useState(false);
  const showToast = useShowToast();
  const authUser = useAuthStore((state) => state.user);

  // To update the newly added comment in the UI (in the post)
  const addComment = usePostStore((state) => state.addComment)

  async function handlePostComment(postId, comment) {
    if (isCommenting) return;
    if (!authUser) return showToast("Error", "You must be logged in to comment!", "error");
    
    setIsCommenting(true);

    const newComment = {
      comment,
      createdAt: Date.now(),
      createdBy: authUser.uid,
      postId,
    };

    try {
      // To update the newly added comment in the database
      await updateDoc(doc(firestore, "posts", postId), {
        comments: arrayUnion(newComment),
      });

      addComment(postId, newComment);

    } catch (error) {
      showToast("Error", error.message, "error");

    } finally {
      setIsCommenting(false);
    }
  }

  return {isCommenting, handlePostComment};
}