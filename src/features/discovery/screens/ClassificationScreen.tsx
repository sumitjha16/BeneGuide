import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ClassificationSkeleton } from "@/components/ui/loading";
import { CategoryChip } from "../components/CategoryChip";
import { useDiscovery } from "../hooks/useDiscovery";
import { Category } from "../types";

interface ClassificationScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

const ALL_CATEGORIES: Category[] = ["Dental", "Mental_Health", "Vision", "OPD", "Cardiology", "Dermatology", "Orthopedics", "Radiology", "Laboratory", "Pharmacy", "Emergency", "Pediatrics", "Obstetrics_Gynecology", "Neurology", "Gastroenterology"];

export function ClassificationScreen({ onComplete, onBack }: ClassificationScreenProps) {
  const { classification, userQuery } = useDiscovery();


  if (!classification) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="app-container max-w-2xl text-center">
          <ClassificationSkeleton />
          <p className="text-text-muted mt-4" aria-live="polite">
            Analyzing your request...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="app-container max-w-2xl text-center space-y-8 animate-fade-in">
        {/* Result */}
        <div className="space-y-6" aria-live="polite">
          <div className="space-y-2">
            {classification.confidence >= 0.7 && !classification.needs_clarification ? (
              <h1 className="text-h1 text-text-strong">
                We think this fits{" "}
                <span className="text-accent font-bold">
                  {classification.category.replace("_", " ")}
                </span>
              </h1>
            ) : (
              <div className="space-y-4">
                <h1 className="text-h1 text-orange-600">
                  Need More Information
                </h1>
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-orange-800 font-medium mb-2">
                    Your query is a bit unclear. Could you please provide more specific details?
                  </p>
                  <p className="text-orange-700 text-sm">
                    Try mentioning specific symptoms, body parts, or medical concerns to help us better understand your needs.
                  </p>
                </div>
              </div>
            )}
            <p className="text-text-muted">
              Based on your query: "{userQuery}"
            </p>
          </div>

          {/* Category visualization */}
          <div className="flex flex-wrap gap-3 justify-center">
            {ALL_CATEGORIES.map((category) => (
              <CategoryChip
                key={category}
                category={category}
                isSelected={category === classification.category}
                confidence={category === classification.category ? classification.confidence : undefined}
              />
            ))}
          </div>

          {/* Warnings if any */}
          {classification.warnings && classification.warnings.length > 0 && (
            <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <p className="text-sm text-warning">
                {classification.warnings[0]}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="secondary"
            onClick={onBack}
            className="px-6"
          >
            {classification.confidence < 0.4 || classification.needs_clarification ? "Provide More Details" : "Edit Query"}
          </Button>
          
          {(classification.confidence >= 0.4 && !classification.needs_clarification) && (
            <Button
              variant="hero"
              size="lg"
              onClick={onComplete}
              className="px-6 bg-brand-600 text-white hover:bg-brand-700"
            >
              See Benefits
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}