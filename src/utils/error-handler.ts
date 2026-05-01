import { showGlobalToast } from "~/context/toast-context";

export const handleError = (error: any) => {
  console.error("App Error:", error);

  let message = "Something went wrong. Please try again.";

  if (error?.code) {
    switch (error.code) {
      case "auth/invalid-credential":
      case "auth/user-not-found":
      case "auth/wrong-password":
        message = "Incorrect email or password.";
        break;
      case "auth/email-already-in-use":
        message = "This email is already registered. Please sign in.";
        break;
      case "auth/too-many-requests":
        message =
          "Too many login attempts. Please wait a bit and try again.";
        break;
      case "auth/invalid-email":
        message = "Incorrect email format.";
        break;
    }
  } else if (error?.message) {
    message = error.message;
  }

  showGlobalToast(message, "error");
};
