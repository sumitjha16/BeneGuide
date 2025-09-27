import { useMutation } from "@tanstack/react-query";
import { classify } from "../api/hybridAi";
import { ClassificationResult } from "../types";
import { useDiscovery } from "./useDiscovery";

export function useClassification() {
  const { setClassification } = useDiscovery();

  return useMutation({
    mutationFn: ({ query, seed }: { query: string; seed?: string }) => 
      classify(query, seed),
    onSuccess: (result: ClassificationResult) => {
      setClassification(result);
    },
    retry: 1,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}