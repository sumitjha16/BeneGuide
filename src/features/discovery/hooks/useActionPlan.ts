import { useMutation } from "@tanstack/react-query";
import { generatePlan } from "../api/hybridAi";
import { ActionPlan, Benefit } from "../types";
import { useDiscovery } from "./useDiscovery";

export function useActionPlan() {
  const { addPlanToHistory } = useDiscovery();

  return useMutation({
    mutationFn: ({ 
      benefit, 
      userQuery, 
      seed 
    }: { 
      benefit: Benefit; 
      userQuery: string; 
      seed?: string;
    }) => generatePlan(benefit, userQuery, seed),
    onSuccess: (plan: ActionPlan, { benefit }) => {
      // Add benefit ID to the plan for association
      const planWithBenefitId = {
        ...plan,
        benefitId: benefit.id
      };
      addPlanToHistory(planWithBenefitId);
    },
    retry: 1,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}