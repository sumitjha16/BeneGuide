// Test script to verify schema validation
import { validatePlan } from './schemas';

// Test the AI response that was failing
const testPlan = {
  "steps": [
    {
      "step": 1,
      "title": "Access MindfulCare portal",
      "description": "Log in to your employer's benefits portal or visit the MindfulCare website to access the EAP services. You may need your employee ID or member number.",
      "estimated_time": "5–10 minutes"
    },
    {
      "step": 2,
      "title": "Find a counselor",
      "description": "Use the MindfulCare provider directory to find a counselor who specializes in anxiety. Filter by location, availability, and expertise to find the best fit.",
      "estimated_time": "15–20 minutes"
    },
    {
      "step": 3,
      "title": "Schedule initial session",
      "description": "Contact the counselor to schedule your first session. Confirm that the session is covered under your 6 free sessions benefit. Prepare to discuss your anxiety and treatment goals.",
      "estimated_time": "10–15 minutes"
    },
    {
      "step": 4,
      "title": "Prepare for session",
      "description": "Write down any specific concerns or symptoms you want to discuss. Bring your member ID card and any relevant medical history. Arrive 10 minutes early for paperwork.",
      "estimated_time": "15 minutes"
    }
  ],
  "total_estimated_time": "1–2 weeks"
};

console.log('Testing plan validation...');
const isValid = validatePlan(testPlan);
console.log('Is valid:', isValid);
if (!isValid) {
  console.log('Validation errors:', validatePlan.errors);
}

export { testPlan };