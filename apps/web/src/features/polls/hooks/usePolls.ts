import {useQuery} from "@tanstack/react-query";
import {getPolls} from "../api/pollsApi";
export function usePolls(userId: string | undefined) {
  return useQuery({
    queryKey: ["polls", userId],
    queryFn: getPolls,
    enabled: Boolean(userId),
  });
}
