import React from "react";
import { Button } from "@/components/ui/button";
import { BenefitCardSkeleton } from "@/components/ui/loading";
import { BenefitCard } from "../components/BenefitCard";
import { useDiscovery } from "../hooks/useDiscovery";
import { useActionPlan } from "../hooks/useActionPlan";
import { getBenefitsByCategory } from "../api/mockData";
import { Benefit } from "../types";
import { useToast } from "@/hooks/use-toast";

interface BenefitsScreenProps {
  onBenefitSelect: (benefit: Benefit) => void;
  onBack: () => void;
}

export function BenefitsScreen({ onBenefitSelect, onBack }: BenefitsScreenProps) {
  const { classification, setSelectedBenefit, userQuery, planHistory } = useDiscovery();
  const generatePlanMutation = useActionPlan();
  const { toast } = useToast();

  if (!classification) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="app-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <BenefitCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const benefits = getBenefitsByCategory(classification.category);
  
  const handleBenefitSelect = async (benefit: Benefit) => {
    setSelectedBenefit(benefit);
    
    // Always generate a fresh plan using real AI
    if (userQuery) {
      try {
        await generatePlanMutation.mutateAsync({
          benefit,
          userQuery,
          seed: "default",
        });
      } catch (error) {
        toast({
          title: "Plan Generation Failed",
          description: "Could not generate action plan. Please try again.",
          variant: "destructive",
        });
        return;
      }
    }
    
    onBenefitSelect(benefit);
  };



  // Fallback to OPD benefits if none found for the classified category
  const displayBenefits = benefits.length > 0 ? benefits : getBenefitsByCategory("OPD");
  const isUsingFallback = benefits.length === 0;

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="app-container space-y-8">
        {/* Header */}
        <div className="space-y-4 animate-fade-in">
          <div className="flex justify-start">
            <Button
              variant="ghost"
              onClick={onBack}
              className="mb-2 text-brand-700 hover:text-brand-800 dark:text-text-muted dark:hover:text-text"
            >
              ← Back to Classification
            </Button>
          </div>

          <h1 className="text-h1 text-brand-900 dark:text-text-strong text-center">
            Recommended Benefits
          </h1>
          
          <p className="max-w-2xl mx-auto text-brand-700 dark:text-text-muted text-center">
            {isUsingFallback ? (
              <>
                <span className="text-warning">No specialized benefits found.</span>{" "}
                Here are general care options to help with your needs.
              </>
            ) : (
              `Found ${displayBenefits.length} benefit${displayBenefits.length === 1 ? '' : 's'} for ${classification.category.replace("_", " ").toLowerCase()}.`
            )}
          </p>
        </div>

        {/* Benefits grid */}
        <div className={`grid gap-6 animate-slide-up items-stretch ${
          displayBenefits.length === 1 
            ? 'grid-cols-1 justify-items-center max-w-md mx-auto'
            : displayBenefits.length === 2
            ? 'grid-cols-1 md:grid-cols-2 justify-items-center max-w-4xl mx-auto'
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center'
        }`}>
          {displayBenefits.map((benefit, index) => (
            <div
              key={benefit.id}
              className="animate-fade-in w-full h-full max-w-[28rem]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <BenefitCard
                benefit={benefit}
                onSelect={handleBenefitSelect}
                isGeneratingPlan={generatePlanMutation.isPending}
              />
            </div>
          ))}
        </div>

        {/* Empty state (shouldn't happen due to fallback, but good to have) */}
        {displayBenefits.length === 0 && (
          <div className="text-center py-12">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-surface rounded-full flex items-center justify-center">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-h3 text-text-strong">
                No benefits found
              </h3>
              <p className="text-text-muted max-w-md mx-auto">
                We couldn't find any benefits for this category. Please try a different query.
              </p>
              <Button
                variant="secondary"
                onClick={onBack}
              >
                Try Different Query
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}