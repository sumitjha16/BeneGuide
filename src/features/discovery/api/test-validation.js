// Test validation with actual AI response
import { validatePlan } from './schemas';

// This is the exact response that was failing validation
const testAIResponse = {
  "steps": [
    {
      "step": 1,
      "title": "Find licensed therapist",
      "description": "Search for licensed therapists in your area who specialize in anxiety treatment. Use directories like Psychology Today, GoodTherapy, or your local psychological association's referral service. Ensure they are licensed and accepting new patients.",
      "estimated_time": "30–45 minutes"
    },
    {
      "step": 2,
      "title": "Verify coverage details",
      "description": "Contact your insurance provider to confirm the 70% reimbursement up to $800 annual limit. Ask about any pre-authorization requirements and how to submit claims for out-of-network therapy sessions.",
      "estimated_time": "15–20 minutes"
    },
    {
      "step": 3,
      "title": "Schedule initial session",
      "description": "Call or email the therapist to schedule your first appointment. Discuss their fees and confirm they accept out-of-network insurance reimbursement. Ask about any intake forms or information you need to provide before your session.",
      "estimated_time": "15–20 minutes"
    },
    {
      "step": 4,
      "title": "Prepare for reimbursement",
      "description": "After your session, request an itemized receipt from the therapist. Submit the receipt to your insurance provider for reimbursement. Keep track of your sessions and expenses to ensure you stay within your $800 annual limit.",
      "estimated_time": "10–15 minutes"
    }
  ],
  "total_estimated_time": "1–2 weeks",
  "source": "mistral-small-latest:v1"
};

// Test validation
console.log('Testing AI response validation...');
const isValid = validatePlan(testAIResponse);
console.log('Is valid:', isValid);

if (!isValid) {
  console.log('Validation errors:', validatePlan.errors);
  
  // Check specific field lengths
  testAIResponse.steps.forEach((step, index) => {
    console.log(`Step ${index + 1}:`);
    console.log(`  Title length: ${step.title.length} (max 60)`);
    console.log(`  Description length: ${step.description.length} (max 400)`);
    console.log(`  Estimated time length: ${step.estimated_time.length} (max 40)`);
  });
}

export { testAIResponse };