import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.ts";

export const logUser = async (usermail: string, userpass: string) => {
  try {
    const user = await signInWithEmailAndPassword(auth, usermail, userpass);

    const currentUser = {
      uid: user.user.uid,
      email: user.user.email,
      displayName: user.user.displayName,
    };
    return {
      success: true,
      payload: currentUser,
    };
  } catch (error) {
    return {
      success: false,
      payload: error,
    };
  }
};
