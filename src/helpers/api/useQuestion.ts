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

// export const useDeleteExitWorkflow = (id: string) => {
//   const { exit } = useUrls();
//   const { mutate, isPending, isSuccess, isError, error } = useMutation({
//     mutationFn: async (data: any) =>
//       axiosInstance.delete(`${exit}/remove/work/flow/${id}`, data),
//   });

//   const typedError = error as unknown as IErrorResponseType;
//   const errorObject = typedError?.response?.data?.errors;
//   const errorKeys = errorObject && Object.keys(errorObject)[0];

//   // Get the first error message
//   const firstError =
//     errorKeys && typeof errorObject === 'object' && errorObject !== null
//       ? errorObject?.[errorKeys][0]
//       : null;
//   // If errors exist, show the first one
//   const errorString = typedError?.response?.data?.errors
//     ? firstError
//     : typedError?.response?.data?.message.length > 0
//     ? typedError?.response?.data?.message
//     : errorConnection;

//   return {
//     mutate,
//     isLoading: isPending,
//     isSuccess,
//     isError,
//     errorMessage: errorString,
//   };
// };

// export const useUpdateExitWorkflow = (id: string) => {
//   const { exit } = useUrls();
//   const { mutate, isPending, isSuccess, isError, error } = useMutation({
//     mutationFn: (payload: any) => {
//       return axiosInstance.put(`${exit}/work/flow/update/${id}`, payload);
//     },
//   });

//   const typedError = error as unknown as IErrorResponseType;
//   const errorObject = typedError?.response?.data?.errors;
//   const errorKeys = errorObject && Object.keys(errorObject)[0];

//   // Get the first error message
//   const firstError =
//     errorKeys && typeof errorObject === 'object' && errorObject !== null
//       ? errorObject?.[errorKeys][0]
//       : null;
//   // If errors exist, show the first one
//   const errorString = typedError?.response?.data?.errors
//     ? firstError
//     : typedError?.response?.data?.message.length > 0
//     ? typedError?.response?.data?.message
//     : errorConnection;

//   return {
//     mutate,
//     isLoading: isPending,
//     isSuccess,
//     isError,
//     errorMessage: errorString,
//   };
// };

// export const useGetExit = (page: number = 1) => {
//   const { exit } = useUrls();
//   const { isLoading, isError, error, data, refetch, isPlaceholderData } =
//     useQuery({
//       queryKey: ['get-exit', `${page}`],
//       queryFn: async () => {
//         const response = await axiosInstance.get(
//           `${exit}/settings?page=${page}`
//         );
//         return response.data;
//       },
//       refetchOnWindowFocus: true,
//       placeholderData: keepPreviousData,
//     });

//   const typedError = error as unknown as IErrorResponseType;
//   const errorString = Array.isArray(typedError?.response?.data?.message)
//     ? typedError?.response?.data?.message[0]
//     : typedError?.response?.data?.message || errorConnection;
//   return {
//     isLoading,
//     isError,
//     data,
//     errorMessage: errorString,
//     refetch,
//     isPlaceholderData,
//   };
// };
