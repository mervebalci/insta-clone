import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";

export default function useLogin() {
  const showToast = useShowToast();

  const [
    signInWithEmailAndPassword,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const loginUser = useAuthStore((state) => state.login);

  const login = async (inputs) => {
    // First, checking if the fields are empty or not
    if (!inputs.email || !inputs.password) {
      return showToast("Error", "Please fill the required fields", "error");
    }

    try {
      const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);
      
      // Second, checking if the email and the password is correct
      if (userCred) {
        const docRef = doc(firestore, "users", userCred.user.uid);
        const docSnap = await getDoc(docRef);
        localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
        console.log(docSnap.data())
        loginUser(docSnap.data());
      }

    } catch (error) {
      showToast("Error", error.message, "error");
      console.log(error.message)
    }
  }

  return {loading, error, login};
}