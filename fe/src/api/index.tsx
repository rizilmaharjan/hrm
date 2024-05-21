import { useMutation, useQuery } from "@tanstack/react-query";
import { Instance } from "../utils/Instance";

type FetchDataOptions = {
  page?: number;
  limit?: number;
};
export const useFetchData = (url: string, options: FetchDataOptions = {}) => {
  const { page, limit } = options;
  console.log("page", page);
  console.log("limit", limit);
  const { isPending, error, data, refetch } = useQuery({
    queryKey: [url, page, limit],
    queryFn: () =>
      Instance.get(url, {
        params: {
          page,
          limit,
        },
      }).then((res) => res.data),
  });

  return { isPending, error, data, refetch };
};

// export const useFetchData = (url: string) => {
//   const { isPending, error, data } = useQuery({
//     queryKey: ["repoData"],
//     queryFn: () => Instance.get(url).then((res) => res.data.data),
//   });

//   return { isPending, error, data };
// };

export const useCreateServices = (url: string) => {
  return useMutation({
    mutationFn: (data: any) => Instance.post(url, data),
    onMutate: () => {
      console.log("mutate");
    },
    onError: () => {
      console.log("Something went wrong");
    },
    onSuccess: () => {
      console.log("Service created successfully");
    },
    onSettled: () => {
      console.log("settled");
    },
  });
};
