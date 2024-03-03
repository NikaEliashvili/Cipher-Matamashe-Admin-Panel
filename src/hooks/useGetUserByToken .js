import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getUserByToken from "../services/getUserByToken";
import { authToken } from "../redux/authSlice";

const useGetUserByToken = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const token = useSelector(authToken);
  useEffect(() => {
    const handleGetUserByToken = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const userData = await getUserByToken(token, dispatch);
        setIsLoading(false);
        setData(userData);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    handleGetUserByToken();
  }, [dispatch, token]);
  return [data, isLoading, error];
};

export default useGetUserByToken;
