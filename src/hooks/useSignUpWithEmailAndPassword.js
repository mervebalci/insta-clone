import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from "../firebase/firebase";
import { doc, setDoc } from 'firebase/firestore';
import useShowToast from "./useShowToast";

export default function useSignUpWithEmailAndPassword() {
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  const showToast = useShowToast();

  const signup = async(inputs) => {
    if (!inputs.email || !inputs.fullName || !inputs.username || !inputs.password) {
      showToast("Error", "Please fill the required fields!", "error");
      return
    }

    try {
      const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password)
      if (!newUser && error) {
        showToast("Error", error.message, "error");
        return
      }
      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: inputs.email,
          fullName: inputs.fullName,
          username: inputs.username,
          bio: "",
          proflePicURL: "",
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        }
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        localStorage.setItem("user-info", JSON.stringify(userDoc));
      }
    } catch (error) {
      showToast("Error", error.message, "error")
    }
  }

  return {loading, error, signup}
}