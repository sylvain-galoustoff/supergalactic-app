import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.ts";
import { response } from "./response.ts";

export const logUser = async (usermail: string, userpass: string) => {
  try {
    const user = await signInWithEmailAndPassword(auth, usermail, userpass);
    const currentUser = {
      uid: user.user.uid,
      email: user.user.email,
      displayName: user.user.displayName,
    };
    return response(true, currentUser, "");
  } catch (error) {
    console.error(error);
  }
};
