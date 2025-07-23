import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { userAuthStore } from "../store/useAuthStore";
import { getUser } from "../actions/get-user.actions";

export const useAuth = () => {
  const setUser = userAuthStore((state) => state.setUser);
  const { data, isError, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  return { data, isError, isLoading };
};
