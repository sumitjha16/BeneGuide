import { ClassificationResult, ActionPlan, Benefit, Category } from "../types";
import { validateClassification, validatePlan } from "./schemas";

// Environment variables for AI configuration - Using Mistral AI
const AI_API_URL = import.meta.env.VITE_AI_API_URL || "https://api.mistral.ai/v1";
const AI_API_KEY = import.meta.env.VITE_AI_API_KEY || "";
const AI_MODEL = import.meta.env.VITE_AI_MODEL || "mistral-small-latest";

// Fallback functions for when AI fails
function getFallbackClassification(): ClassificationResult {
  return {
    category: "OPD",
    confidence: 0.55,
    warnings: ["AI service unavailable - using fallback classification"],
    processing_ms: 100,
    source: "fallback-ai:v1",
    reasoning: "Unable to classify due to AI service unavailability",
    needs_clarification: false
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
    source: "fallback-ai:v1"
  };
}

// AI API call helper
async function callAI(messages: any[], maxTokens = 150): Promise<any> {
  if (!AI_API_KEY) {
    throw new Error("AI API key not configured");
  }

  const response = await fetch(`${AI_API_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${AI_API_KEY}`
    },
    body: JSON.stringify({
      model: AI_MODEL,
      messages,
      max_tokens: maxTokens,
      temperature: 0.1,
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`AI API error: ${response.status} ${error}`);
  }

  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
}

// Real AI classification
export async function classify(query: string, seed = "default"): Promise<ClassificationResult> {
  const start = performance.now();
  
  try {
    const messages = [
      {
        role: "system",
        content: `You are a healthcare benefits classification AI. Analyze user queries and classify them into one of these categories:
        
Categories:
- "OPD": General outpatient visits, primary care, routine medical consultations
- "Dental": Dental care, teeth cleaning, oral health, dental procedures, orthodontics
- "Vision": Eye care, vision exams, glasses, contacts, eye health, optometry
- "Mental_Health": Mental health services, therapy, counseling, psychological support, psychiatry
- "Cardiology": Heart conditions, cardiac screening, chest pain, heart disease, cardiovascular health
- "Dermatology": Skin conditions, rashes, moles, acne, dermatitis, skin cancer screening
- "Orthopedics": Bone, joint, muscle injuries, fractures, arthritis, sports injuries, back pain
- "Radiology": Medical imaging, X-rays, MRI, CT scans, ultrasounds, diagnostic imaging
- "Laboratory": Blood tests, lab work, urine analysis, diagnostic testing, lab panels
- "Pharmacy": Prescription medications, drug coverage, pharmacy benefits, medication refills
- "Emergency": Life-threatening conditions, emergency room visits, urgent trauma care
- "Pediatrics": Children's health, child wellness visits, pediatric care, vaccinations
- "Obstetrics_Gynecology": Women's health, pregnancy, gynecological exams, maternity care
- "Neurology": Brain, nerve conditions, headaches, seizures, neurological disorders
- "Gastroenterology": Digestive issues, stomach problems, colonoscopy, GI disorders

IMPORTANT: If the query is too vague, unclear, or doesn't clearly fit any medical category, set confidence to 0.3 or lower and recommend the user provide more specific symptoms or details.

Respond with JSON in this exact format:
{
  "category": "CategoryName",
  "confidence": 0.85,
  "reasoning": "Brief explanation of classification",
  "needs_clarification": false
}`
      },
      {
        role: "user",
        content: `Classify this healthcare query: "${query}"`
      }
    ];

    const aiResult = await callAI(messages);
    
    const result: ClassificationResult = {
      category: aiResult.category as Category,
      confidence: Math.min(0.99, Math.max(0.1, aiResult.confidence)),
      processing_ms: Math.round(performance.now() - start),
      source: `${AI_MODEL}:v1`,
      reasoning: aiResult.reasoning,
      needs_clarification: aiResult.needs_clarification || false
    };

    // Add warnings for low confidence or when clarification needed
    if (result.confidence < 0.4 || result.needs_clarification) {
      result.warnings = ["Please provide more specific details about your symptoms or health concern"];
    } else if (result.confidence < 0.7) {
      result.warnings = ["Low confidence classification - please verify result"];
    }

    // Validate output - if validation fails, use mock AI instead
    if (!validateClassification(result)) {
      console.warn("Classification validation failed, falling back to mock AI:", validateClassification.errors);
      // Import and use mock classification as fallback
      const { classify: mockClassify } = await import('./mockAi');
      return await mockClassify(query, seed);
    }

    return result;

  } catch (error) {
    console.error("AI classification error, falling back to mock AI:", error);
    // Import and use mock classification as fallback
    try {
      const { classify: mockClassify } = await import('./mockAi');
      return await mockClassify(query, seed);
    } catch (fallbackError) {
      console.error("Mock AI also failed:", fallbackError);
      return getFallbackClassification();
    }
  }
}

// Real AI action plan generation
export async function generatePlan(
  benefit: Benefit, 
  userQuery: string, 
  seed = "default"
): Promise<ActionPlan> {
  try {
    const messages = [
      {
        role: "system",
        content: `You are a healthcare benefits action plan AI. Create tailored, step-by-step action plans for using specific healthcare benefits based on the benefit details and user needs.

ALWAYS respond with JSON in this exact structure:
{
  "steps": [
    {
      "step": 1,
      "title": "Step title (3-7 words)",
      "description": "Detailed, specific description with actionable instructions",
      "estimated_time": "5–10 minutes"
    }
  ],
  "total_estimated_time": "1–2 days"
}

Key Guidelines:
- Create 3-4 specific steps tailored to the benefit type and coverage details
- Include network-specific information (e.g., "Find a Blue Cross provider")
- Reference actual benefit limits and coverage details
- Make descriptions actionable with specific next steps
- Adjust time estimates based on benefit complexity
- Consider the user's specific query when tailoring steps

Here are example action plans for different benefit types:

EXAMPLE 1 - Dental Benefit:
User Query: "I need a teeth cleaning"
Benefit: Preventive Dental Care, Blue Cross Network, $1,500 annual limit, 100% coverage for cleanings

Response:
{
  "steps": [
    {
      "step": 1,
      "title": "Find Blue Cross dentist",
      "description": "Use the Blue Cross provider directory to locate an in-network dentist near you who offers preventive services. Verify they accept your specific plan.",
      "estimated_time": "10–15 minutes"
    },
    {
      "step": 2,
      "title": "Schedule cleaning appointment",
      "description": "Call the dental office to schedule your routine cleaning. Mention you have Blue Cross coverage and confirm the cleaning is covered at 100% with no copay.",
      "estimated_time": "5–10 minutes"
    },
    {
      "step": 3,
      "title": "Prepare for visit",
      "description": "Bring your member ID card and list any dental concerns. Arrive 15 minutes early for paperwork. Your cleaning should be fully covered under your $1,500 annual limit.",
      "estimated_time": "30 minutes"
    }
  ],
  "total_estimated_time": "1–2 weeks"
}

EXAMPLE 2 - Vision Benefit:
User Query: "I need new glasses"
Benefit: Vision Care, VSP Network, $300 frame allowance, Annual eye exam included

Response:
{
  "steps": [
    {
      "step": 1,
      "title": "Schedule eye exam",
      "description": "Book your annual eye exam with a VSP network provider. The exam is fully covered and required before getting new glasses.",
      "estimated_time": "10 minutes"
    },
    {
      "step": 2,
      "title": "Select frames within allowance",
      "description": "During your visit, choose frames within your $300 allowance. Ask about additional discounts for frames over the allowance limit.",
      "estimated_time": "30–45 minutes"
    },
    {
      "step": 3,
      "title": "Order and schedule pickup",
      "description": "Place your order and schedule pickup. Most glasses are ready in 7–10 days. Verify your VSP benefits were applied correctly.",
      "estimated_time": "15 minutes"
    }
  ],
  "total_estimated_time": "2–3 weeks"
}

EXAMPLE 3 - Mental Health Benefit:
User Query: "I'm feeling stressed and need counseling"
Benefit: Mental Health Services, Aetna Network, 12 sessions covered, $25 copay

Response:
{
  "steps": [
    {
      "step": 1,
      "title": "Access EAP resources",
      "description": "Check if your employer offers Employee Assistance Program (EAP) services for immediate support while you find a therapist.",
      "estimated_time": "15 minutes"
    },
    {
      "step": 2,
      "title": "Find Aetna therapist",
      "description": "Use Aetna's provider directory to find mental health professionals who specialize in stress management. Verify they're accepting new patients.",
      "estimated_time": "20–30 minutes"
    },
    {
      "step": 3,
      "title": "Schedule intake session",
      "description": "Book your first appointment. Confirm the $25 copay and that you have 12 covered sessions. Prepare to discuss your stress triggers and goals.",
      "estimated_time": "10 minutes"
    }
  ],
  "total_estimated_time": "1–2 weeks"
}`
      },
      {
        role: "user",
        content: `Create a tailored action plan for this specific benefit and user need:

BENEFIT DETAILS:
- Title: ${benefit.title}
- Category: ${benefit.category}
- Network: ${benefit.network}
- Annual Limit: ${benefit.annual_limit}
- Coverage: ${benefit.coverage}
- Description: ${benefit.description}

USER QUERY: "${userQuery}"

Generate a specific, actionable plan that references the exact benefit details (network, limits, coverage) and addresses the user's specific need.`
      }
    ];

    const aiResult = await callAI(messages, 400);
    
    const plan: ActionPlan = {
      steps: aiResult.steps,
      total_estimated_time: aiResult.total_estimated_time,
      source: `${AI_MODEL}:v1`
    };

    // Validate output
    if (!validatePlan(plan)) {
      console.warn("Plan validation failed, using mock AI fallback:");
      console.warn("Validation errors:", validatePlan.errors);
      console.warn("Failed plan data:", JSON.stringify(plan, null, 2));
      
      // Log specific validation issues for debugging
      validatePlan.errors?.forEach((error, index) => {
        console.warn(`Validation Error ${index + 1}:`, {
          field: error.instancePath || error.schemaPath,
          message: error.message,
          value: error.data
        });
      });
      
      // Use mock AI as fallback instead of basic fallback
      const { generatePlan: mockGeneratePlan } = await import('./mockAi');
      return await mockGeneratePlan(benefit, userQuery, seed);
    }

    return plan;

  } catch (error) {
    console.error("AI plan generation error, using mock AI fallback:", error);
    // Use mock AI as fallback instead of basic fallback
    try {
      const { generatePlan: mockGeneratePlan } = await import('./mockAi');
      return await mockGeneratePlan(benefit, userQuery, seed);
    } catch (mockError) {
      console.error("Mock AI also failed, using basic fallback:", mockError);
      return getFallbackPlan(benefit);
    }
  }
}