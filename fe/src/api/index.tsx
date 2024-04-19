import { useQuery } from "@tanstack/react-query";
import { Instance } from "../utils/Instance";
import { GenericFormData } from "axios";

export const useFetchData = (
  url: string,
  page: number = 1,
  limit: number = 20
) => {
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

export const usePostData = (url: string, body: GenericFormData) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      Instance.post(url, body).then((res) => {
        return res.data.data;
      }),
  });

  return { isPending, error, data };
};
