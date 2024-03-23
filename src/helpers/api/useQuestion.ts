import axiosInstance from '@/helpers/axiosConfig';
import { useUrls } from '@/helpers/useUrls';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetQuestions = () => {
  const { questions } = useUrls();
  const { isLoading, isError, error, data, refetch } = useQuery({
    queryKey: ['get-questions'],
    queryFn: async () => {
      const response = await axiosInstance.get(`${questions}`);
      return response.data;
    },
    refetchOnWindowFocus: true,
  });

  return {
    isLoading,
    isError,
    data,
    error,
    refetch,
  };
};

export const useCreateQuestions = () => {
  const { questions } = useUrls();
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationKey: ['create-question'],
    mutationFn: (payload: any) => {
      return axiosInstance.post(`${questions}`, payload);
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

export const useDeleteQuestion = (id: string) => {
  const { questions } = useUrls();
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: async (data: any) =>
      axiosInstance.delete(`${questions}/${id}`, data),
  });

  return {
    mutate,
    isLoading: isPending,
    isSuccess,
    isError,
    error,
  };
};

export const useUpdateQuestion = (id: string) => {
  const { questions } = useUrls();
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: (payload: any) => {
      return axiosInstance.put(`${questions}/${id}`, payload);
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
