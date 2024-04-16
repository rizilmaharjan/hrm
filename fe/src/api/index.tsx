import { useQuery } from "@tanstack/react-query";
import { Instance } from "../utils/Instance";
import { GenericFormData } from "axios";

export const useFetchData = (url: string) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      Instance.get(url).then((res) => {
        return res.data.data;
      }),
  });

  return { isPending, error, data };
};

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
