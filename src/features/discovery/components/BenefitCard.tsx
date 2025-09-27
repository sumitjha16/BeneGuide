import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading";
import { Benefit } from "../types";

interface BenefitCardProps {
  benefit: Benefit;
  onSelect: (benefit: Benefit) => void;
  isGeneratingPlan?: boolean;
}

export function BenefitCard({ 
  benefit, 
  onSelect, 
  isGeneratingPlan = false
}: BenefitCardProps) {
  return (
    <Card className="h-full flex flex-col transition-all duration-200 hover:shadow-lg hover:bg-elev-1 hover:border-brand-600/30 border-brand-600/20 dark:border-border">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-lg font-semibold leading-tight text-brand-900 dark:text-text-strong break-words flex-1 min-w-0">
            {benefit.title}
          </CardTitle>
          
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-brand-700 mb-1">Coverage</h4>
          <p className="text-sm text-brand-800 dark:text-text">{benefit.coverage}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold text-brand-700 mb-1">Description</h4>
          <p className="text-sm leading-relaxed text-brand-700 dark:text-text-muted">{benefit.description}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <h4 className="text-xs font-semibold text-brand-700 mb-1">Annual Limit</h4>
            <p className="text-sm text-brand-800 dark:text-text font-medium">{benefit.annual_limit}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-brand-700 mb-1">Network</h4>
            <p className="text-sm text-brand-800 dark:text-text font-medium">{benefit.network}</p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-4 mt-auto">
        <Button 
          variant="hero" 
          size="lg" 
          className="w-full text-white"
          onClick={() => onSelect(benefit)}
          disabled={isGeneratingPlan}
        >
          {isGeneratingPlan ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Generating Plan...
            </>
          ) : (
            "View Action Plan"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}