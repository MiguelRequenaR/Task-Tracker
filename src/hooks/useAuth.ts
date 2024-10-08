import { getUser } from "@/api/AuthApi";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: 1,
        refetchOnWindowFocus: false,
    })

    return {
        data,
        isLoading,
        isError,
    }
}