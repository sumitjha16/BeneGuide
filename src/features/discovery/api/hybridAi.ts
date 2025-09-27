import { ClassificationResult } from "../types";
import { classify as realClassify, generatePlan as realGeneratePlan } from "./realAi";

// Export real AI classification
export const classify = realClassify;

// Export real AI action plan generation
export const generatePlan = realGeneratePlan;