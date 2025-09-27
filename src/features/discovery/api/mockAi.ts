import { ClassificationResult, ActionPlan, Benefit, Category } from "../types";
import { validateClassification, validatePlan } from "./schemas";

// Simple Linear Congruential Generator for seeded randomness
const createSeededRandom = (seed: string) => {
  let seedNum = [...seed].reduce((a, c) => a + c.charCodeAt(0), 0) || 1;
  return () => {
    seedNum = (seedNum * 1664525 + 1013904223) % 4294967296;
    return seedNum / 4294967296;
  };
};

// Simulate network latency
const simulateLatency = (min = 600, max = 900) => {
  const delay = min + Math.random() * (max - min);
  return new Promise(resolve => setTimeout(resolve, delay));
};

// Deterministic classification based on keywords
export async function classify(query: string, seed = "default"): Promise<ClassificationResult> {
  const start = performance.now();
  await simulateLatency();
  
  const q = query.toLowerCase().trim();
  let category: Category = "OPD";
  let confidence = 0.6;
  
  // Keyword-based classification with confidence scoring
  if (/(tooth|teeth|gum|oral|mouth|dental|cavity|filling|crown|root canal)/i.test(q)) {
    category = "Dental";
    confidence = 0.92;
  } else if (/(eye|vision|glasses|contacts|blurr?y|sight|see|optom|visual)/i.test(q)) {
    category = "Vision";
    confidence = 0.90;
  } else if (/(stress|anxiety|depress|mental|therapy|counsel|psycho|mood|emotional)/i.test(q)) {
    category = "Mental_Health";
    confidence = 0.88;
  } else if (/(heart|chest|cardiac|cardio|blood pressure|cardiovascular)/i.test(q)) {
    category = "Cardiology";
    confidence = 0.85;
  } else if (/(skin|rash|acne|mole|dermat|eczema|psoriasis)/i.test(q)) {
    category = "Dermatology";
    confidence = 0.87;
  } else if (/(bone|joint|muscle|fracture|arthritis|orthoped|back pain|knee|shoulder)/i.test(q)) {
    category = "Orthopedics";
    confidence = 0.86;
  } else if (/(x-?ray|mri|ct scan|ultrasound|imaging|radiol)/i.test(q)) {
    category = "Radiology";
    confidence = 0.89;
  } else if (/(blood test|lab work|urine|laboratory|blood draw)/i.test(q)) {
    category = "Laboratory";
    confidence = 0.91;
  } else if (/(prescription|medication|drug|pharmacy|refill|pill)/i.test(q)) {
    category = "Pharmacy";
    confidence = 0.93;
  } else if (/(emergency|urgent|life threatening|trauma|911)/i.test(q)) {
    category = "Emergency";
    confidence = 0.95;
  } else if (/(child|pediatric|baby|infant|vaccination|child)/i.test(q)) {
    category = "Pediatrics";
    confidence = 0.88;
  } else if (/(pregnancy|gynecolog|obstetric|women|maternity|pap smear)/i.test(q)) {
    category = "Obstetrics_Gynecology";
    confidence = 0.87;
  } else if (/(brain|nerve|neurolog|headache|seizure|migraine)/i.test(q)) {
    category = "Neurology";
    confidence = 0.84;
  } else if (/(stomach|digestive|gastro|colonoscopy|gi|intestin)/i.test(q)) {
    category = "Gastroenterology";
    confidence = 0.85;
  } else if (/(fever|cough|pain|injury|medicine|doctor|sick|ill|hurt|ache|symptom)/i.test(q)) {
    category = "OPD";
    confidence = 0.78;
  }
  
  // Add some variance based on seed for "regeneration" feel
  const rand = createSeededRandom(seed + q);
  confidence = Math.min(0.95, confidence + (rand() - 0.5) * 0.1);
  
  const result: ClassificationResult = {
    category,
    confidence: Math.round(confidence * 100) / 100,
    processing_ms: Math.round(performance.now() - start),
    source: "mock-ai:v1",
    reasoning: `Classified based on keywords related to ${category.replace('_', ' ').toLowerCase()}`,
    needs_clarification: confidence < 0.4
  };

  // Add warnings for low confidence
  if (confidence < 0.4) {
    result.warnings = ["Please provide more specific details about your symptoms or health concern"];
  } else if (confidence < 0.7) {
    result.warnings = ["Low confidence classification - using fallback category"];
  }  // Validate output
  if (!validateClassification(result)) {
    console.warn("Classification validation failed:", validateClassification.errors);
    return getFallbackClassification();
  }
  
  return result;
}

// Generate deterministic action plan tailored to benefit content
export async function generatePlan(
  benefit: Benefit, 
  userQuery: string, 
  seed = "default"
): Promise<ActionPlan> {
  await simulateLatency(750, 950);
  
  const rand = createSeededRandom(seed + benefit.id + userQuery);
  
  // Tailored action plans based on benefit category and content
  const actionPlans = {
    Dental: [
      {
        steps: [
          {
            step: 1,
            title: `Find ${benefit.network} dentist`,
            description: `Use the ${benefit.network} provider directory to locate an in-network dentist. Verify they accept your specific plan and offer the services you need.`,
            estimated_time: "10–15 minutes"
          },
          {
            step: 2,
            title: "Schedule your appointment",
            description: `Call to book your visit. Mention your ${benefit.network} coverage and confirm costs. Your annual limit is ${benefit.annual_limit}.`,
            estimated_time: "5–10 minutes"
          },
          {
            step: 3,
            title: "Prepare for dental visit",
            description: `Bring your member ID card and list any concerns. Coverage: ${benefit.coverage}. Arrive early for any paperwork.`,
            estimated_time: "30 minutes"
          }
        ],
        total_estimated_time: "1–2 weeks"
      },
      {
        steps: [
          {
            step: 1,
            title: "Verify dental benefits",
            description: `Check your ${benefit.coverage} details and confirm what procedures are covered under your ${benefit.annual_limit} annual limit.`,
            estimated_time: "10 minutes"
          },
          {
            step: 2,
            title: `Book with ${benefit.network} provider`,
            description: `Schedule with an in-network dentist to maximize your benefits. Ask about payment plans if costs exceed your limit.`,
            estimated_time: "15 minutes"
          },
          {
            step: 3,
            title: "Complete dental treatment",
            description: `Attend your appointment with proper documentation. Follow up on any additional treatments needed within your benefit period.`,
            estimated_time: "1-2 hours"
          }
        ],
        total_estimated_time: "2–3 weeks"
      }
    ],
    Vision: [
      {
        steps: [
          {
            step: 1,
            title: "Schedule eye exam",
            description: `Book your annual eye exam with a ${benefit.network} provider. Exams are typically covered fully under ${benefit.coverage}.`,
            estimated_time: "10 minutes"
          },
          {
            step: 2,
            title: "Select frames/contacts",
            description: `Choose eyewear within your benefit allowance. Your ${benefit.annual_limit} covers frames and lenses annually.`,
            estimated_time: "45 minutes"
          },
          {
            step: 3,
            title: "Order and pickup",
            description: `Place your order and schedule pickup. Verify ${benefit.network} benefits were applied correctly to minimize out-of-pocket costs.`,
            estimated_time: "15 minutes"
          }
        ],
        total_estimated_time: "2–3 weeks"
      }
    ],
    Mental_Health: [
      {
        steps: [
          {
            step: 1,
            title: "Check EAP resources",
            description: `Access Employee Assistance Program if available for immediate support while finding a therapist in the ${benefit.network}.`,
            estimated_time: "15 minutes"
          },
          {
            step: 2,
            title: `Find ${benefit.network} therapist`,
            description: `Search for mental health providers who accept your insurance and specialize in your needs. Coverage: ${benefit.coverage}.`,
            estimated_time: "25 minutes"
          },
          {
            step: 3,
            title: "Schedule intake session",
            description: `Book your first appointment. Confirm copays and session limits under your ${benefit.annual_limit} benefit.`,
            estimated_time: "10 minutes"
          }
        ],
        total_estimated_time: "1–2 weeks"
      }
    ],
    OPD: [
      {
        steps: [
          {
            step: 1,
            title: `Find ${benefit.network} provider`,
            description: `Use your insurance directory to locate an in-network primary care or specialist provider for your condition.`,
            estimated_time: "15 minutes"
          },
          {
            step: 2,
            title: "Verify coverage details",
            description: `Confirm your ${benefit.coverage} and any copays. Check if referrals are needed. Annual limit: ${benefit.annual_limit}.`,
            estimated_time: "10 minutes"
          },
          {
            step: 3,
            title: "Schedule and prepare",
            description: `Book your appointment and prepare relevant medical history, symptoms list, and insurance cards for your visit.`,
            estimated_time: "20 minutes"
          }
        ],
        total_estimated_time: "1–2 weeks"
      }
    ]
  };
  
  // Get category-specific plans or fall back to OPD
  const categoryPlans = actionPlans[benefit.category as keyof typeof actionPlans] || actionPlans.OPD;
  const selectedPlan = categoryPlans[Math.floor(rand() * categoryPlans.length)];
  
  // Add some variation to the selected plan based on user query
  const steps = selectedPlan.steps.map(step => ({
    ...step,
    description: personalizeStepDescription(step.description, benefit, userQuery)
  }));
  
  const plan: ActionPlan = {
    steps,
    total_estimated_time: selectedPlan.total_estimated_time,
    source: "mock-ai:v1"
  };
  
  // Validate output
  if (!validatePlan(plan)) {
    console.warn("Plan validation failed:", validatePlan.errors);
    return getFallbackPlan(benefit);
  }
  
  return plan;
}

// Generate contextual step descriptions
function generateStepDescription(benefit: Benefit, stepIndex: number, title: string): string {
  const network = benefit.network;
  const limit = benefit.annual_limit;
  
  switch (stepIndex) {
    case 0:
      return `Use the ${network} portal or directory to find an in-network provider and book the earliest available appointment slot.`;
    case 1:
      return `Verify coverage details including copays, deductibles, and your annual limit of ${limit}. Confirm what services are covered.`;
    case 2:
      return `Bring your member ID card, list any symptoms or medications, and arrange transportation if needed for your appointment.`;
    default:
      return "Complete this step to move forward with your benefit usage.";
  }
}

// Personalize step descriptions based on user query and benefit details
function personalizeStepDescription(description: string, benefit: Benefit, userQuery: string): string {
  let personalizedDesc = description;
  
  // Add query-specific context
  const queryLower = userQuery.toLowerCase();
  
  if (queryLower.includes('emergency') || queryLower.includes('urgent')) {
    personalizedDesc += " Note: For urgent needs, contact your provider immediately or visit an emergency room.";
  } else if (queryLower.includes('pain') || queryLower.includes('hurt')) {
    personalizedDesc += " Mention your pain levels and symptoms when scheduling.";
  } else if (queryLower.includes('routine') || queryLower.includes('checkup')) {
    personalizedDesc += " Schedule in advance as routine appointments often have longer wait times.";
  } else if (queryLower.includes('cost') || queryLower.includes('expensive')) {
    personalizedDesc += ` Ask about cost estimates and payment options given your ${benefit.annual_limit} limit.`;
  }
  
  return personalizedDesc;
}

// Fallback functions for validation failures
function getFallbackClassification(): ClassificationResult {
  return {
    category: "OPD",
    confidence: 0.55,
    warnings: ["Fallback classification used due to processing error"],
    processing_ms: 500,
    source: "mock-ai:v1",
    reasoning: "Default fallback classification",
    needs_clarification: true
  };
}

function getFallbackPlan(benefit: Benefit): ActionPlan {
  return {
    steps: [
      {
        step: 1,
        title: "Contact your provider",
        description: "Reach out to schedule an appointment with an in-network provider.",
        estimated_time: "5–10 minutes"
      },
      {
        step: 2,
        title: "Verify your coverage",
        description: "Check your benefit details and any applicable copays or limits.",
        estimated_time: "10 minutes"
      },
      {
        step: 3,
        title: "Prepare for your visit",
        description: "Gather necessary documents and prepare for your appointment.",
        estimated_time: "15 minutes"
      }
    ],
    total_estimated_time: "1–2 days",
    source: "mock-ai:v1"
  };
}