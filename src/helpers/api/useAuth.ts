import axiosInstance from '@/helpers/axiosConfig';
import { useUrls } from '@/helpers/useUrls';
import { useCookies } from '@/hooks/useCookies';
import { URL } from '@/lib/routes';
import { TOKEN } from '@/lib/utils';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { QueryCache } from '@tanstack/react-query';

export const useLogin = () => {
  const router = useRouter();
  const { loginUrl } = useUrls();
  const { setCookie } = useCookies();
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: (payload: { email: string }) => {
      return axiosInstance.post(loginUrl, payload);
    },
    onSuccess: (res: any) => {
      const loginDetails = res?.data;
      setCookie(TOKEN.ACCESS, loginDetails.token);
      router.push(`${URL.DASHBOARD}`);
    },
  });

  return {
    mutate,
    isLoading: isPending,
    isSuccess,
    isError,
    error,
  };
};

export const useLogout = () => {
  const router = useRouter();
  const { removeCookie } = useCookies();
  const queryClient = new QueryClient();
  const queryCache = new QueryCache();

  const clearUserData = () => {
    removeCookie(TOKEN.ACCESS);
  };

  const logoutUser = async () => {
    clearUserData();
    await queryClient.invalidateQueries();
    queryCache.clear();
    queryClient.clear();
    await queryClient.resetQueries();
    router.push('/');
    router.refresh();
  };

  return { logoutUser };
};
