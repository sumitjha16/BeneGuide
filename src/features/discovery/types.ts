export type Category = "Dental" | "Mental_Health" | "Vision" | "OPD" | "Cardiology" | "Dermatology" | "Orthopedics" | "Radiology" | "Laboratory" | "Pharmacy" | "Emergency" | "Pediatrics" | "Obstetrics_Gynecology" | "Neurology" | "Gastroenterology";

export interface ClassificationResult {
  category: Category;
  confidence: number; // 0..1
  warnings?: string[];
  processing_ms: number;
  source: string;
  reasoning?: string;
  needs_clarification?: boolean;
}

export interface Benefit {
  id: string;
  title: string;
  coverage: string;
  description: string;
  annual_limit: string;
  network: string;
  category: Category;
}

export interface ActionPlanStep {
  step: number;
  title: string;
  description: string;
  estimated_time: string;
}

export interface ActionPlan {
  steps: ActionPlanStep[]; // 3-4 steps
  total_estimated_time: string;
  seed?: string; // to support deterministic regenerate
  source: string;
  benefitId?: string; // to associate plans with specific benefits
}

// Context types for state management
export interface DiscoveryState {
  userQuery: string;
  classification?: ClassificationResult;
  selectedBenefit?: Benefit;
  planHistory: ActionPlan[];
}