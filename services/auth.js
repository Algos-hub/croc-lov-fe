import { db, app, auth } from "../config";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
export const signup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await emailVerification();
    const user = userCredential.user;
    console.log("User Registered: ", user);
    return user;
  } catch (err) {
    throw err;
  }
};

export const emailVerification = async () => {
  const user = auth.currentUser;
  try {
    await sendEmailVerification(auth.currentUser, {
      handleCodeInApp: true,
      url: "https://croc-lov-db5c5.firebaseapp.com",
    }).then(() => {
      showEmailAlert(user.email);
    });
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Email verification error: ", errorCode, errorMessage);
    throw error;
  }
};
