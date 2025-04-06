// auth.js

import { auth } from "./firebase.js";
import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";

const actionCodeSettings = {
  url: "https://lms.marinex-learn.com", // Replace with your custom domain
  handleCodeInApp: true,
};

export const sendEmailLink = async (email) => {
  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem("emailForSignIn", email);
    console.log("Email link sent to:", email);
  } catch (error) {
    console.error("Error sending email link:", error.message);
  }
};

export const completeSignIn = async () => {
  const email = window.localStorage.getItem("emailForSignIn");
  if (isSignInWithEmailLink(auth, window.location.href)) {
    try {
      const userCredential = await signInWithEmailLink(auth, email, window.location.href);
      console.log("Successfully signed in:", userCredential.user);
      window.localStorage.removeItem("emailForSignIn");
    } catch (error) {
      console.error("Error signing in with email link:", error.message);
    }
  }
};
