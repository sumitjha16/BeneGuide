// Test examples showing improved AI action plan generation
// This demonstrates how the AI now generates tailored plans based on benefit content

import { Benefit, ActionPlan } from '../types';

// Example benefit cards that would be used
export const exampleBenefits: Benefit[] = [
  {
    id: "dental-preventive",
    title: "Preventive Dental Care",
    coverage: "100% for cleanings, 80% for basic procedures",
    description: "Annual cleanings, exams, and basic preventive care",
    annual_limit: "$1,500",
    network: "Blue Cross Blue Shield",
    category: "Dental"
  },
  {
    id: "vision-comprehensive",
    title: "Comprehensive Vision Care",
    coverage: "Annual eye exam covered, $300 frame allowance",
    description: "Eye exams, glasses, contacts, and vision correction",
    annual_limit: "$500 total benefit",
    network: "VSP Vision Care",
    category: "Vision"
  },
  {
    id: "mental-health-counseling", 
    title: "Mental Health & Counseling",
    coverage: "12 sessions covered annually",
    description: "Individual therapy, counseling, and mental health support",
    annual_limit: "$2,000 per year",
    network: "Aetna Better Health",
    category: "Mental_Health"
  }
];

// Example user queries that would trigger action plan generation
export const exampleQueries = [
  "I need a teeth cleaning for my 6-month checkup",
  "My glasses are broken and I need new ones urgently", 
  "I'm feeling very stressed at work and need someone to talk to",
  "I think I need dental work but I'm worried about the cost",
  "Can I get contact lenses with my vision benefits?"
];

// Expected improved outputs (what the AI should now generate)
export const expectedImprovedPlans: Record<string, ActionPlan> = {
  "dental-cleaning": {
    steps: [
      {
        step: 1,
        title: "Find Blue Cross dentist",
        description: "Use the Blue Cross Blue Shield provider directory to locate an in-network dentist near you who offers preventive services. Verify they accept your specific plan and have good reviews.",
        estimated_time: "10–15 minutes"
      },
      {
        step: 2,
        title: "Schedule cleaning appointment",
        description: "Call the dental office to schedule your routine cleaning. Mention you have Blue Cross coverage and confirm the cleaning is covered at 100% with no copay under your preventive benefits.",
        estimated_time: "5–10 minutes"
      },
      {
        step: 3,
        title: "Prepare for your visit",
        description: "Bring your member ID card and list any dental concerns or changes since your last visit. Arrive 15 minutes early for paperwork. Your cleaning should be fully covered under your $1,500 annual limit.",
        estimated_time: "30 minutes"
      }
    ],
    total_estimated_time: "1–2 weeks",
    source: "mistral-small-latest:v1"
  },

  "vision-glasses": {
    steps: [
      {
        step: 1,
        title: "Schedule urgent eye exam",
        description: "Contact a VSP Vision Care provider immediately to schedule an eye exam. Explain your glasses are broken and you need urgent service. The annual exam is covered under your benefits.",
        estimated_time: "15 minutes"
      },
      {
        step: 2,
        title: "Select replacement glasses",
        description: "During your appointment, choose new frames within your $300 allowance. Ask about rush orders or temporary glasses if you need them immediately. VSP often provides discounts on upgrades.",
        estimated_time: "45 minutes"
      },
      {
        step: 3,
        title: "Arrange quick pickup",
        description: "Request expedited processing for your glasses order. Most urgent orders can be ready in 24-48 hours for an additional fee. Verify your $500 total benefit coverage was applied correctly.",
        estimated_time: "10 minutes"
      }
    ],
    total_estimated_time: "3–5 days",
    source: "mistral-small-latest:v1"
  }
};
