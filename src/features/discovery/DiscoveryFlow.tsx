import React, { useState } from "react";
import { InputScreen } from "./screens/InputScreen";
import { ClassificationScreen } from "./screens/ClassificationScreen";
import { BenefitsScreen } from "./screens/BenefitsScreen";
import { ActionPlanScreen } from "./screens/ActionPlanScreen";
import { DiscoveryProvider } from "./hooks/useDiscovery";
import { Benefit } from "./types";

type FlowStep = "input" | "classification" | "benefits" | "plan";

export function DiscoveryFlow() {
  const [currentStep, setCurrentStep] = useState<FlowStep>("input");

  const handleInputComplete = () => {
    setCurrentStep("classification");
  };

  const handleClassificationComplete = () => {
    setCurrentStep("benefits");
  };

  const handleBenefitSelect = (benefit: Benefit) => {
    setCurrentStep("plan");
  };

  const handleBackToInput = () => {
    setCurrentStep("input");
  };

  const handleBackToClassification = () => {
    setCurrentStep("classification");
  };

  const handleBackToBenefits = () => {
    setCurrentStep("benefits");
  };

  return (
    <DiscoveryProvider>
      <div className="min-h-screen bg-background">
        {/* App Header */}
        <header className="border-b border-border bg-surface/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="app-container py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-text-strong">
                BeneGuide
              </h1>
              
              {/* Step indicator */}
              <div className="hidden md:flex items-center gap-2">
                {[
                  { id: "input", label: "Query" },
                  { id: "classification", label: "Analysis" },
                  { id: "benefits", label: "Benefits" },
                  { id: "plan", label: "Plan" }
                ].map((step, index) => {
                  const stepIndex = ["input", "classification", "benefits", "plan"].indexOf(currentStep);
                  const isActive = step.id === currentStep;
                  const isCompleted = index < stepIndex;
                  
                  return (
                    <div key={step.id} className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors duration-200 ${
                          isActive
                            ? "bg-brand-600 text-white"
                            : isCompleted
                            ? "bg-success text-background"
                            : "bg-surface text-text-muted border border-border"
                        }`}
                      >
                        {index + 1}
                      </div>
                      {index < 3 && (
                        <div
                          className={`w-8 h-0.5 mx-1 transition-colors duration-200 ${
                            isCompleted ? "bg-success" : "bg-border"
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main>
          {currentStep === "input" && (
            <InputScreen onComplete={handleInputComplete} />
          )}
          
          {currentStep === "classification" && (
            <ClassificationScreen
              onComplete={handleClassificationComplete}
              onBack={handleBackToInput}
            />
          )}
          
          {currentStep === "benefits" && (
            <BenefitsScreen
              onBenefitSelect={handleBenefitSelect}
              onBack={handleBackToClassification}
            />
          )}
          
          {currentStep === "plan" && (
            <ActionPlanScreen
              onBack={handleBackToBenefits}
            />
          )}
        </main>
      </div>
    </DiscoveryProvider>
  );
}