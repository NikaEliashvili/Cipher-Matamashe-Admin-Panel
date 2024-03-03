import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import signOut from "../services/signOut";
import { authToken } from "../redux/authSlice";

const useSignOut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const token = useSelector(authToken);

  const handleSignOut = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await signOut(token, dispatch);
      setIsLoading(false);
      return data;
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  return [handleSignOut, isLoading, error];
};

export default useSignOut;
