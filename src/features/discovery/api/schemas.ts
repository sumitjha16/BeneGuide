import Ajv from "ajv";

export const ajv = new Ajv({ allErrors: true });

// Schema for classification results
export const classificationSchema = {
  type: "object",
  required: ["category", "confidence"],
  properties: {
    category: { 
      enum: [
        "Dental", "Mental_Health", "Vision", "OPD", 
        "Cardiology", "Dermatology", "Orthopedics", 
        "Radiology", "Laboratory", "Pharmacy", 
        "Emergency", "Pediatrics", "Obstetrics_Gynecology", 
        "Neurology", "Gastroenterology"
      ] 
    },
    confidence: { 
      type: "number", 
      minimum: 0, 
      maximum: 1 
    },
    warnings: {
      type: "array",
      items: { type: "string" }
    },
    processing_ms: {
      type: "number",
      minimum: 0
    },
    source: {
      type: "string"
    },
    reasoning: {
      type: "string"
    },
    needs_clarification: {
      type: "boolean"
    }
  },
  additionalProperties: false
};

// Schema for action plan results
export const planSchema = {
  type: "object",
  required: ["steps", "total_estimated_time"],
  properties: {
    steps: {
      type: "array",
      minItems: 3,
      maxItems: 4,
      items: {
        type: "object",
        required: ["step", "title", "description", "estimated_time"],
        properties: {
          step: { 
            type: "integer", 
            minimum: 1, 
            maximum: 5
          },
          title: { 
            type: "string", 
            minLength: 3, 
            maxLength: 60 
          },
          description: { 
            type: "string", 
            minLength: 10, 
            maxLength: 500 
          },
          estimated_time: { 
            type: "string", 
            minLength: 2, 
            maxLength: 40 
          }
        },
        additionalProperties: false
      }
    },
    total_estimated_time: { 
      type: "string", 
      minLength: 3, 
      maxLength: 40 
    },
    seed: {
      type: "string"
    },
    source: {
      type: "string"
    },
    benefitId: {
      type: "string"
    }
  },
  additionalProperties: false
};

export const validateClassification = ajv.compile(classificationSchema);
export const validatePlan = ajv.compile(planSchema);