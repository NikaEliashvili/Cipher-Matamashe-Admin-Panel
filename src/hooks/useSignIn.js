import { useState } from "react";
import { useDispatch } from "react-redux";
import logInService from "../services/logInService";

const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    status: null,
    message: null,
  });
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
      setError({
        status: err.status,
        message: err.data.message,
      });
      setIsLoading(false);
    }
  };

  return [handleSignIn, isLoading, error];
};

export default useSignIn;
