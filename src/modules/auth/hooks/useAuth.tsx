import { useQuery } from "@tanstack/react-query";
import { type PropsWithChildren } from "react";
import { useAuthStore } from "../store/auth.store";
import { CustomFullScreenLoading } from "@/components/shared/CustomFullScreenLoading";

export const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  const { checkAuthStatus } = useAuthStore();
  const { isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuthStatus,
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <CustomFullScreenLoading />;

  return children;
};
