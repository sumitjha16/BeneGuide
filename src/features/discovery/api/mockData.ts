import { Benefit, Category } from "../types";

export const MOCK_BENEFITS: Record<Category, Benefit[]> = {
  Dental: [
    {
      id: "dental_001",
      title: "Comprehensive Dental Coverage",
      coverage: "100% preventive, 80% basic, 50% major",
      description: "Cleanings, fillings, crowns, limited orthodontics.",
      annual_limit: "$2,000",
      network: "DeltaDental Network",
      category: "Dental"
    },
    {
      id: "dental_002",
      title: "Preventive Dental Plus",
      coverage: "100% preventive, 60% basic",
      description: "Routine exams, x-rays, and basic procedures.",
      annual_limit: "$1,200",
      network: "SmileCare PPO",
      category: "Dental"
    },
    {
      id: "dental_003",
      title: "Emergency Dental Support",
      coverage: "70% emergency care",
      description: "After-hours dental emergencies and urgent procedures.",
      annual_limit: "$800",
      network: "24/7 Dental Emergency",
      category: "Dental"
    }
  ],
  Mental_Health: [
    {
      id: "mh_001",
      title: "Employee Assistance Program (EAP)",
      coverage: "6 free sessions",
      description: "Short-term counseling and referrals.",
      annual_limit: "N/A",
      network: "MindfulCare",
      category: "Mental_Health"
    },
    {
      id: "mh_002",
      title: "Therapy Reimbursement",
      coverage: "70% up to $800/yr",
      description: "Out-of-network licensed therapists.",
      annual_limit: "$800",
      network: "Any Licensed Provider",
      category: "Mental_Health"
    },
    {
      id: "mh_003",
      title: "Crisis Support Hotline",
      coverage: "24/7 access",
      description: "Immediate crisis intervention and support.",
      annual_limit: "Unlimited",
      network: "National Crisis Network",
      category: "Mental_Health"
    }
  ],
  Vision: [
    {
      id: "vision_001",
      title: "Vision Essentials",
      coverage: "$10 exam, $150 frames",
      description: "Eye exams, frames, contacts allowance.",
      annual_limit: "$300",
      network: "VSP Network",
      category: "Vision"
    },
    {
      id: "vision_002",
      title: "Premium Vision Care",
      coverage: "Free exam, $250 frames",
      description: "Comprehensive eye care with designer frame options.",
      annual_limit: "$500",
      network: "EyeMed Plus",
      category: "Vision"
    }
  ],
  OPD: [
    {
      id: "opd_001",
      title: "Primary Care Visit",
      coverage: "$20 copay",
      description: "General consultation and basic labs.",
      annual_limit: "$500",
      network: "In-Network PCPs",
      category: "OPD"
    },
    {
      id: "opd_002",
      title: "Urgent Care",
      coverage: "$40 copay",
      description: "After-hours care for minor injuries/illness.",
      annual_limit: "N/A",
      network: "Citywide Urgent Clinics",
      category: "OPD"
    },
    {
      id: "opd_003",
      title: "Specialist Consultation",
      coverage: "$60 copay",
      description: "Referral-based specialist appointments.",
      annual_limit: "$1,500",
      network: "Preferred Specialists",
      category: "OPD"
    },
    {
      id: "opd_004",
      title: "Diagnostic Testing",
      coverage: "80% after deductible",
      description: "Lab work, imaging, and diagnostic procedures.",
      annual_limit: "$3,000",
      network: "LabCorp & Quest",
      category: "OPD"
    }
  ],
  Cardiology: [
    {
      id: "cardio_001",
      title: "Cardiac Screening",
      coverage: "$50 copay",
      description: "EKG, stress tests, and heart health assessments.",
      annual_limit: "$2,000",
      network: "CardioMax Partners",
      category: "Cardiology"
    },
    {
      id: "cardio_002",
      title: "Heart Surgery Coverage",
      coverage: "90% after deductible",
      description: "Bypass, valve repair, and cardiac procedures.",
      annual_limit: "$50,000",
      network: "Premier Cardiac Centers",
      category: "Cardiology"
    }
  ],
  Dermatology: [
    {
      id: "derm_001",
      title: "Dermatology Consultation",
      coverage: "$40 copay",
      description: "Skin condition diagnosis and treatment.",
      annual_limit: "$1,000",
      network: "DermCare Network",
      category: "Dermatology"
    },
    {
      id: "derm_002",
      title: "Skin Cancer Screening",
      coverage: "100% preventive",
      description: "Annual skin cancer screening and mole checks.",
      annual_limit: "No limit",
      network: "Skin Health Alliance",
      category: "Dermatology"
    }
  ],
  Orthopedics: [
    {
      id: "ortho_001",
      title: "Orthopedic Consultation",
      coverage: "$60 copay",
      description: "Bone, joint, and muscle injury treatment.",
      annual_limit: "$3,000",
      network: "SportsMed Orthopedics",
      category: "Orthopedics"
    },
    {
      id: "ortho_002",
      title: "Physical Therapy",
      coverage: "$25 copay per session",
      description: "Post-injury rehabilitation and mobility training.",
      annual_limit: "$1,500",
      network: "RehabPlus Centers",
      category: "Orthopedics"
    }
  ],
  Radiology: [
    {
      id: "radio_001",
      title: "Imaging Services",
      coverage: "80% after deductible",
      description: "X-rays, MRI, CT scans, and ultrasounds.",
      annual_limit: "$5,000",
      network: "Advanced Imaging Centers",
      category: "Radiology"
    },
    {
      id: "radio_002",
      title: "Emergency Imaging",
      coverage: "90% coverage",
      description: "Urgent diagnostic imaging for emergencies.",
      annual_limit: "$10,000",
      network: "24/7 Emergency Radiology",
      category: "Radiology"
    }
  ],
  Laboratory: [
    {
      id: "lab_001",
      title: "Routine Lab Work",
      coverage: "$15 copay",
      description: "Blood tests, urine analysis, basic lab panels.",
      annual_limit: "$800",
      network: "LabCorp & Quest",
      category: "Laboratory"
    },
    {
      id: "lab_002",
      title: "Specialized Testing",
      coverage: "70% after deductible",
      description: "Genetic testing, specialty markers, advanced panels.",
      annual_limit: "$2,500",
      network: "Specialty Lab Network",
      category: "Laboratory"
    }
  ],
  Pharmacy: [
    {
      id: "pharm_001",
      title: "Prescription Drug Coverage",
      coverage: "$10/$30/$60 copays",
      description: "Generic, preferred brand, and specialty medications.",
      annual_limit: "$3,000",
      network: "National Pharmacy Network",
      category: "Pharmacy"
    },
    {
      id: "pharm_002",
      title: "Mail Order Pharmacy",
      coverage: "90-day supply discounts",
      description: "Convenient home delivery for chronic medications.",
      annual_limit: "$4,000",
      network: "ExpressScripts Mail",
      category: "Pharmacy"
    }
  ],
  Emergency: [
    {
      id: "emerg_001",
      title: "Emergency Room Visit",
      coverage: "$200 copay",
      description: "Life-threatening emergencies and trauma care.",
      annual_limit: "No limit",
      network: "All Emergency Hospitals",
      category: "Emergency"
    },
    {
      id: "emerg_002",
      title: "Ambulance Service",
      coverage: "80% coverage",
      description: "Emergency ground and air ambulance transport.",
      annual_limit: "$10,000",
      network: "Emergency Medical Services",
      category: "Emergency"
    }
  ],
  Pediatrics: [
    {
      id: "ped_001",
      title: "Child Wellness Visits",
      coverage: "100% preventive",
      description: "Regular check-ups, vaccinations, development tracking.",
      annual_limit: "No limit",
      network: "Pediatric Care Alliance",
      category: "Pediatrics"
    },
    {
      id: "ped_002",
      title: "Child Specialist Care",
      coverage: "$40 copay",
      description: "Pediatric specialists and developmental services.",
      annual_limit: "$2,000",
      network: "Children's Medical Network",
      category: "Pediatrics"
    }
  ],
  Obstetrics_Gynecology: [
    {
      id: "obgyn_001",
      title: "Women's Health Exams",
      coverage: "100% preventive",
      description: "Annual exams, pap smears, breast health screenings.",
      annual_limit: "No limit",
      network: "Women's Health Partners",
      category: "Obstetrics_Gynecology"
    },
    {
      id: "obgyn_002",
      title: "Maternity Care",
      coverage: "90% coverage",
      description: "Prenatal care, delivery, and postpartum support.",
      annual_limit: "$15,000",
      network: "Maternity Care Network",
      category: "Obstetrics_Gynecology"
    }
  ],
  Neurology: [
    {
      id: "neuro_001",
      title: "Neurological Consultation",
      coverage: "$70 copay",
      description: "Brain, nerve, and neurological condition treatment.",
      annual_limit: "$4,000",
      network: "NeuroHealth Specialists",
      category: "Neurology"
    },
    {
      id: "neuro_002",
      title: "Neurological Testing",
      coverage: "80% after deductible",
      description: "EEG, nerve conduction studies, brain imaging.",
      annual_limit: "$6,000",
      network: "Advanced Neurology Centers",
      category: "Neurology"
    }
  ],
  Gastroenterology: [
    {
      id: "gastro_001",
      title: "GI Consultation",
      coverage: "$60 copay",
      description: "Digestive system disorders and treatment.",
      annual_limit: "$2,500",
      network: "Digestive Health Network",
      category: "Gastroenterology"
    },
    {
      id: "gastro_002",
      title: "Colonoscopy Screening",
      coverage: "100% preventive",
      description: "Routine colonoscopies and GI cancer screening.",
      annual_limit: "No limit",
      network: "GI Prevention Centers",
      category: "Gastroenterology"
    }
  ]
};

// Helper function to get benefits by category
export const getBenefitsByCategory = (category: Category): Benefit[] => {
  return MOCK_BENEFITS[category] || [];
};

// Helper function to get a specific benefit by ID
export const getBenefitById = (id: string): Benefit | undefined => {
  for (const categoryBenefits of Object.values(MOCK_BENEFITS)) {
    const benefit = categoryBenefits.find(b => b.id === id);
    if (benefit) return benefit;
  }
  return undefined;
};