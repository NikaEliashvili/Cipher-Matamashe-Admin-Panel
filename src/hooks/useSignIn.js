import { useState } from "react";
import { useDispatch } from "react-redux";
import logInService from "../services/authServices/logInService";

const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleSignIn = async (username, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const newToken = await logInService(
        username,
        password,
        dispatch
      );
      setIsLoading(false);
      return newToken;
    } catch (err) {
      console.log(err);
      const error = err.data.error;
      const errorStatus =
        error === "Username_invalid"
          ? "username"
          : error === "Password_invalid"
          ? "password"
          : "unknown_status";
      const errorMessage =
        error === "Username_invalid"
          ? "ლოგინი არასწორია"
          : error === "Password_invalid"
          ? "პაროლი არასწორია"
          : "დაფიქსირდა შეცდომა";
      setError({
        status: errorStatus,
        message: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return [handleSignIn, isLoading, error];
};

export default useSignIn;
