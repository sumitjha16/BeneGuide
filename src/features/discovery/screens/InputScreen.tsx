import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { LinearProgress } from "@/components/ui/loading";
import Squares from "@/components/ui/Squares";
import { useTheme } from "@/components/ui/theme-provider";
import { useDiscovery } from "../hooks/useDiscovery";
import { useClassification } from "../hooks/useClassification";

interface InputScreenProps {
  onComplete: () => void;
}

const EXAMPLE_QUERIES = [
  "I have tooth pain and need a dental cleaning",
  "Feeling anxious and need therapy sessions",
  "Blurry vision and need new glasses",
  "Chest pain and want heart screening"
  
];

const ADDITIONAL_QUERIES = [
  "Rash on my arms that won't go away",
  "Knee pain after sports injury",
  "Need blood work and lab tests",
  "Stomach pain and digestive issues",
  "Severe headaches and neurological symptoms"
];

export function InputScreen({ onComplete }: InputScreenProps) {
  const { userQuery, setUserQuery } = useDiscovery();
  const [localQuery, setLocalQuery] = useState(userQuery);
  const [showMoreExamples, setShowMoreExamples] = useState(false);
  const classifyMutation = useClassification();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (localQuery.trim().length < 3) return;
    
    setUserQuery(localQuery.trim());
    
    try {
      await classifyMutation.mutateAsync({ 
        query: localQuery.trim() 
      });
      onComplete();
    } catch (error) {
      console.error("Classification failed:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleExampleClick = (example: string) => {
    setLocalQuery(example);
  };

  const isValid = localQuery.trim().length >= 3;
  const isLoading = classifyMutation.isPending;

  return (
  <div className="min-h-screen bg-brand-100/40 dark:bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Squares Background */}
      <div className="absolute inset-0 opacity-50">
        <Squares
          speed={0.5}
          squareSize={60}
          direction='diagonal'
          borderColor={isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(16, 94, 54, 0.35)'}
          hoverFillColor={isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(16, 94, 54, 0.06)'}
          borderWidth={isDark ? 1.5 : 1.25}
        />
      </div>

      {/* Top progress bar when loading */}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full z-50">
          <LinearProgress />
        </div>
      )}

      <div className="app-container max-w-2xl relative z-10">
        <div className="text-center space-y-8 animate-fade-in">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-display text-brand-900 dark:text-text-strong">
              What do you need help with today?
            </h1>
            <p className="text-body text-brand-700 dark:text-text-muted max-w-md mx-auto">
              We'll suggest benefits and a quick action plan.
            </p>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="query" className="sr-only">
                Describe your health or benefits question
              </Label>
              <Textarea
                id="query"
                placeholder="e.g., I have tooth pain, what can I do?"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className="min-h-[120px] text-base bg-surface border-border focus:border-brand-600 focus:ring-brand-600/20 resize-none text-brand-900 dark:text-text-strong"
                aria-describedby="query-help"
              />
              <div id="query-help" className="text-caption text-text-muted text-left">
                <span className="inline-block">Shift+Enter for newline</span>
                {!isValid && localQuery.length > 0 && (
                  <span className="block text-warning mt-1">
                    Please add a bit more detail.
                  </span>
                )}
              </div>
            </div>

            <Button
              type="submit"
              variant="hero"
              size="lg"
              disabled={!isValid}
              loading={isLoading}
              className="w-full sm:w-auto px-12 text-white"
            >
              {isLoading ? "Analyzing your request..." : "Find Benefits"}
            </Button>
          </form>

          {/* Example queries */}
          <div className="space-y-4">
            <p className="text-sm text-brand-700 dark:text-text-muted">Or try one of these examples:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {EXAMPLE_QUERIES.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(example)}
                  disabled={isLoading}
                  className="text-xs px-3 py-2 rounded-full bg-surface border border-border text-brand-700 dark:text-text-muted hover:bg-elev-1 hover:text-accent hover:border-brand-600/30 transition-all duration-200 focus-ring disabled:opacity-50"
                >
                  "{example}"
                </button>
              ))}
              
              {/* Show More Button */}
              <button
                onClick={() => setShowMoreExamples(!showMoreExamples)}
                disabled={isLoading}
                className="text-xs px-4 py-2 rounded-full bg-white border-2 border-white text-brand-700 hover:bg-white/90 hover:border-white/90 transition-all duration-200 focus-ring disabled:opacity-50 font-medium shadow-lg dark:bg-surface dark:border-border dark:text-text-muted dark:hover:bg-elev-1 dark:hover:text-accent dark:hover:border-brand-600/30"
              >
                {showMoreExamples ? "Show Less" : "+5 More"}
              </button>
            </div>
            
            {/* Additional Examples with Smooth Animation */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
              showMoreExamples ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="flex flex-wrap gap-2 justify-center pt-2">
                {ADDITIONAL_QUERIES.map((example, index) => (
                  <button
                    key={`additional-${index}`}
                    onClick={() => handleExampleClick(example)}
                    disabled={isLoading}
                    className="text-xs px-3 py-2 rounded-full bg-surface border border-border text-brand-700 dark:text-text-muted hover:bg-elev-1 hover:text-accent hover:border-brand-600/30 transition-all duration-200 focus-ring disabled:opacity-50"
                  >
                    "{example}"
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Error handling */}
          {classifyMutation.isError && (
            <div className="p-4 bg-danger/10 border border-danger/20 rounded-lg text-center">
              <p className="text-sm text-danger">
                Something went off track. Please try again.
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => classifyMutation.reset()}
                className="mt-2"
              >
                Try Again
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}