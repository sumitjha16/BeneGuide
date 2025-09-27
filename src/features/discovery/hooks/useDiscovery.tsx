import React, { createContext, useContext, useState, useEffect } from "react";
import { DiscoveryState, ClassificationResult, Benefit, ActionPlan } from "../types";

interface DiscoveryContextType extends DiscoveryState {
  setUserQuery: (query: string) => void;
  setClassification: (result: ClassificationResult) => void;
  setSelectedBenefit: (benefit: Benefit) => void;
  addPlanToHistory: (plan: ActionPlan) => void;
  clearState: () => void;
}

const DiscoveryContext = createContext<DiscoveryContextType | undefined>(undefined);

const STORAGE_KEY = "beneguide_discovery_state";

export function DiscoveryProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DiscoveryState>(() => {
    // Load from sessionStorage on init
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          userQuery: parsed.userQuery || "",
          classification: parsed.classification,
          selectedBenefit: parsed.selectedBenefit,
          planHistory: parsed.planHistory || [],
        };
      }
    } catch (error) {
      console.warn("Failed to load discovery state from storage:", error);
    }
    
    return {
      userQuery: "",
      planHistory: [],
    };
  });

  // Persist to sessionStorage when state changes
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.warn("Failed to save discovery state to storage:", error);
    }
  }, [state]);

  const setUserQuery = (query: string) => {
    setState(prev => ({ ...prev, userQuery: query }));
  };

  const setClassification = (result: ClassificationResult) => {
    setState(prev => ({ ...prev, classification: result }));
  };

  const setSelectedBenefit = (benefit: Benefit) => {
    setState(prev => ({ ...prev, selectedBenefit: benefit }));
  };

  const addPlanToHistory = (plan: ActionPlan) => {
    setState(prev => ({
      ...prev,
      planHistory: [plan, ...prev.planHistory.slice(0, 2)], // Keep last 3
    }));
  };

  const clearState = () => {
    setState({
      userQuery: "",
      planHistory: [],
    });
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn("Failed to clear discovery state:", error);
    }
  };

  const contextValue: DiscoveryContextType = {
    ...state,
    setUserQuery,
    setClassification,
    setSelectedBenefit,
    addPlanToHistory,
    clearState,
  };

  return (
    <DiscoveryContext.Provider value={contextValue}>
      {children}
    </DiscoveryContext.Provider>
  );
}

export function useDiscovery() {
  const context = useContext(DiscoveryContext);
  if (context === undefined) {
    throw new Error("useDiscovery must be used within a DiscoveryProvider");
  }
  return context;
}