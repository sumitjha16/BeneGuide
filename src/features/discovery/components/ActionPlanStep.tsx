import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ActionPlanStep as ActionPlanStepType } from "../types";

interface ActionPlanStepProps {
  step: ActionPlanStepType;
}

export function ActionPlanStep({ step }: ActionPlanStepProps) {
  return (
  <Card className="hover:bg-elev-1 transition-colors duration-200 border-brand-600/20 dark:border-border">
      <CardContent className="flex gap-4 p-6">
        <div className="flex-shrink-0 w-10 h-10 bg-brand-600 rounded-full flex items-center justify-center shadow-sm">
          <span className="text-white font-bold text-lg">{step.step}</span>
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2 sm:gap-4">
            <h3 className="font-semibold text-brand-800 dark:text-text-strong text-lg leading-tight flex-1 min-w-0 pr-2">
              {step.title}
            </h3>
            <Badge variant="outline" className="text-xs bg-elev-2 text-brand-700 dark:text-text-muted border-border whitespace-nowrap">
              {step.estimated_time}
            </Badge>
          </div>
          
          <p className="text-brand-800 dark:text-text text-body leading-relaxed">
            {step.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}