# BeneGuide - AI-Powered Healthcare Benefits Navigator

> *Intelligently guide users through healthcare benefits discovery and action planning with AI-driven classification and tailored recommendations.*

![BeneGuide](https://img.shields.io/badge/Status-Active-brightgreen) ![Version](https://img.shields.io/badge/Version-1.0.0-blue) ![React](https://img.shields.io/badge/React-18.x-61dafb) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6)

**[🚀 Live Demo](https://beneguide.netlify.app/)**

## 🎯 Project Overview

BeneGuide is an intelligent healthcare benefits navigation system that helps users discover relevant benefits and create actionable plans. Using advanced AI classification and tailored content generation, it transforms vague health queries into specific, actionable guidance.

### 🌟 Key Features

- **AI-Powered Classification**: Automatically categorizes health queries into 15+ medical categories
- **Benefit Matching**: Intelligent matching of user needs to relevant healthcare benefits  
- **Dynamic Action Plans**: Context-aware, step-by-step plans tailored to specific benefits and user queries
- **Responsive Design**: Optimized for mobile-first experience with progressive enhancement
- **Real-time Generation**: Fast AI-powered content generation with intelligent fallbacks

### 📋 Table of Contents

- [🚀 Quick Start](#-quick-start)
- [🏗️ Architecture Deep Dive](#️-architecture-deep-dive)
- [🎨 User Experience Flow](#-user-experience-flow)
- [📱 Visual Overview & User Journey](#-visual-overview--user-journey)
- [🤖 AI Prompts & Refinements](#-ai-prompts--refinements)
- [🔧 State Management Architecture](#-state-management-architecture)
- [⚠️ Known Issues & Limitations](#️-known-issues--limitations)
- [🛠️ Development & Deployment](#️-development--deployment)

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Mistral AI API key (optional, has fallback)

### Installation & Setup

```bash
# Clone the repository
git clone https://github.com/sumitjha16/bene-navigator.git
cd bene-navigator

# Install dependencies
npm install

# Set up environment variables (optional)
cp .env.example .env
# Edit .env with your Mistral AI credentials

# Start development server
npm run dev
```

### Environment Variables

```bash
# Optional - AI Configuration (has mock fallback)
VITE_AI_API_URL=https://api.mistral.ai/v1
VITE_AI_API_KEY=your_mistral_api_key_here
VITE_AI_MODEL=mistral-small-latest
```

---

## 🏗️ Architecture Deep Dive

### 📁 Project Structure

```
src/
├── components/ui/           # Reusable UI components (shadcn/ui)
├── features/discovery/      # Main feature module
│   ├── api/                # AI integration & data layer
│   │   ├── hybridAi.ts     # Main AI orchestrator
│   │   ├── realAi.ts       # Mistral AI implementation
│   │   ├── mockAi.ts       # Fallback AI simulation
│   │   ├── schemas.ts      # JSON validation schemas
│   │   └── mockData.ts     # Static benefit data
│   ├── components/         # Feature-specific components
│   ├── hooks/              # Custom React hooks
│   ├── screens/            # Main screen components
│   └── types.ts           # TypeScript definitions
├── hooks/                  # Global hooks
├── lib/                   # Utilities
└── pages/                 # Route components
```

### 🧠 AI Integration Architecture

#### Three-Tier AI System

1. **Primary AI (Mistral AI)**
   - Few-shot prompting with detailed examples
   - Context-aware content generation
   - Benefit-specific tailoring

2. **Secondary AI (Enhanced Mock)**  
   - Deterministic fallback with benefit-specific templates
   - Context-aware personalization
   - Maintains quality when real AI fails

3. **Tertiary Fallback (Basic)**
   - Generic action plans as last resort
   - Ensures application never fails

#### AI Flow Diagram

```mermaid
graph TD
    A[User Query] --> B[Real AI Classification]
    B --> C{Validation Pass?}
    C -->|Yes| D[Real AI Plan Generation]
    C -->|No| E[Mock AI Classification]
    D --> F{Plan Valid?}
    F -->|Yes| G[Display Tailored Plan]
    F -->|No| H[Mock AI Plan Generation]
    E --> H
    H --> I{Mock Valid?}
    I -->|Yes| G
    I -->|No| J[Basic Fallback Plan]
    J --> G
```

---

## 🎨 User Experience Flow

### 🔄 Multi-Screen Discovery Process

1. **Input Screen** - Natural language query capture
2. **Classification Screen** - AI analysis and category display  
3. **Benefits Screen** - Matched benefits with smart cards
4. **Action Plan Screen** - Detailed, step-by-step guidance

### 📱 Responsive Design Strategy

- **Mobile-First**: Progressive enhancement from 320px
- **Breakpoints**: Tailored experiences for mobile/tablet/desktop
- **Performance**: Optimized loading states and micro-interactions

---

## 🤖 AI Prompts & Refinements

### Classification Prompt Engineering

#### Initial Approach
```
"Classify this health query into categories"
```

#### Refined Approach (Current)
```
You are a healthcare benefits classification AI. Analyze user queries and classify them into one of these categories:

Categories:
- "OPD": General outpatient visits, primary care, routine medical consultations
- "Dental": Dental care, teeth cleaning, oral health, dental procedures
[...detailed category descriptions...]

IMPORTANT: If the query is too vague, set confidence to 0.3 or lower and recommend clarification.

Respond with JSON in this exact format:
{
  "category": "CategoryName",
  "confidence": 0.85,
  "reasoning": "Brief explanation",
  "needs_clarification": false
}
```

### Action Plan Generation Prompts

#### Few-Shot Examples Implementation

```typescript
// Example for Dental Benefits
{
  "steps": [
    {
      "step": 1,
      "title": "Find Blue Cross dentist",
      "description": "Use the Blue Cross Blue Shield provider directory to locate an in-network dentist near you who offers preventive services. Verify they accept your specific plan.",
      "estimated_time": "10–15 minutes"
    },
    // ... more steps with specific benefit details
  ]
}
```

#### Key Refinements Made

1. **Benefit-Specific Context**: Plans now reference actual network names, coverage limits, and annual limits
2. **Few-Shot Learning**: Added detailed examples for each benefit category
3. **Validation Schema**: Flexible 3-4 steps instead of rigid 3-step requirement  
4. **Fallback Strategy**: Cascading AI system with multiple quality levels

---

## 🔧 State Management Architecture

### Context-Based State Management

#### Discovery Context Pattern
```typescript
interface DiscoveryState {
  userQuery: string;
  classification?: ClassificationResult;
  selectedBenefit?: Benefit;
  planHistory: ActionPlan[];
}
```

#### Why Context Over Redux/Zustand?

1. **Feature Scope**: State is localized to discovery flow
2. **Simplicity**: No global state complexity needed
3. **Performance**: Minimal re-renders with proper context splitting
4. **Persistence**: Session storage for user experience continuity

### Data Flow Architecture

```mermaid
graph LR
    A[User Input] --> B[Context State]
    B --> C[AI Classification]
    C --> D[Benefit Matching]  
    D --> E[Plan Generation]
    E --> F[Action Plan Display]
    
    B --> G[Session Storage]
    G --> B
```

### Custom Hooks Strategy

- **useDiscovery**: Main state management hook
- **useClassification**: AI classification with caching
- **useActionPlan**: Plan generation with React Query
- **Separation of Concerns**: Each hook handles specific domain logic

---

## 📱 Visual Overview & User Journey

> **Complete visual walkthrough of BeneGuide's AI-powered benefits discovery experience**

### 📁 Visual Assets Directory

All screenshots and recordings are stored in the `public` folder for easy access and deployment:

```
public/
├── screenshots/           # Desktop and mobile UI screenshots
│   ├── input.png         # Desktop input screen
│   ├── input_light_mode.png
│   ├── classification.png # AI analysis screen
│   ├── benefits.png      # Benefits discovery screen
│   ├── action_plan.png   # Generated action plans
│   ├── mobile_input.png  # Mobile input interface
│   └── mobile_benefits.png
└── screenrecording/       # Full demo videos
    └── BeneGuide - AI-Powered Benefits Discovery.mp4
```

### 🎬 Complete User Journey Demo

#### 📹 Screen Recording - Full Flow Walkthrough

**[🎥 Watch Full Demo Video](./public/screenrecording/BeneGuide%20-%20AI-Powered%20Benefits%20Discovery%20-%20Google%20Chrome%202025-09-28%2000-06-41.mp4)**

> *Complete demonstration of the AI-powered benefits discovery process from query input to actionable plan generation. Shows real AI classification, benefit matching, and personalized action plan creation.*

**Demo Highlights:**
- Natural language query processing ("I'm feeling anxious")
- Real-time AI classification with confidence scoring  
- Dynamic benefit matching and card generation
- AI-powered action plan creation with specific steps
- Mobile-responsive design demonstration

### Desktop Experience

#### 1. Input Screen - Natural Query Entry
![Input Screen](./public/screenshots/input.png)

**Features Shown:**
- 🖥️ Clean, centered input with helpful examples
- 📝 Natural language query processing
- 🔍 Smart suggestions and query refinement
- 🌙 Light mode variant available

![Input Screen Light Mode](./public/screenshots/input_light_mode.png)

#### 2. Classification Screen - AI Analysis  
![Classification Screen](./public/screenshots/classification.png)

**AI Processing Display:**
- 🧠 Real-time AI processing with loading states
- 📊 Confidence scoring and category explanation
- ⚡ "Mental Health (87% confidence)" with reasoning
- 🎯 Clear categorization with user-friendly descriptions

#### 3. Benefits Screen - Smart Matching
![Benefits Screen](./public/screenshots/benefits.png)

**Benefit Discovery Interface:**
- 📋 Responsive grid layout with benefit cards
- 💳 "Mental Health & Counseling - 12 sessions covered"  
- 🎯 Network details, limits, and coverage information
- 🔄 Loading states during AI plan generation

#### 4. Action Plan Screen - Tailored Guidance
![Action Plan Screen](./public/screenshots/action_plan.png)

**Personalized Action Plans:**
- ✅ Step-by-step actionable plan tailored to specific benefits
- 🏥 "Find Aetna therapist in your area" with specific instructions
- ⏱️ Realistic time estimates and progress tracking
- 📋 Expandable step details with comprehensive guidance

### 📱 Mobile Experience

#### Responsive Design Adaptations
- **Hidden Progress Bar**: More screen real estate on mobile devices
- **Stacked Layouts**: Single-column benefit cards optimized for touch
- **Touch Optimization**: Larger tap targets and improved spacing
- **Performance**: Optimized loading states and smooth animations

#### Mobile Screenshots

##### Mobile Input Screen
![Mobile Input](./public/screenshots/mobile_input.png)

**Mobile-First Features:**
- 📱 Full-width search optimized for mobile keyboards
- 👆 Touch-friendly input areas and button sizing
- 🎯 Simplified interface focusing on core functionality
- ⚡ Fast loading with progressive enhancement

##### Mobile Benefits Screen
![Mobile Benefits](./public/screenshots/mobile_benefits.png)

**Responsive Benefits Display:**
- 📱 Single column layout for optimal mobile viewing
- 🎯 Centered cards for 1-2 benefits with proper spacing
- � Large, touch-friendly "View Action Plan" buttons
- 📊 Condensed information hierarchy for mobile screens
- 🔄 Mobile-optimized loading states and interactions

---

## ⚠️ Known Issues & Limitations

### Current Known Issues

1. **AI Response Validation** ✅ **FIXED**
   - **Issue**: AI descriptions exceeding 240 character limit causing validation failures
   - **Root Cause**: Detailed AI responses were longer than schema allowed
   - **Solution**: Increased description limit from 240 to 400 characters
   - **Status**: Enhanced validation logging for better debugging



### Potential Improvements

#### Short-term (Next Sprint)

1. **Enhanced Personalization**
   - User preference storage
   - Location-based provider matching  
   - Previous query learning

2. **Advanced AI Features**
   - Multi-language support
   - Voice input integration
   - Sentiment analysis for better classification

3. **Performance Optimizations**
   - Component lazy loading
   - AI response caching
   - Background prefetching of common benefits

#### Medium-term (Next Quarter)

1. **Integration Capabilities**
   - Real insurance provider APIs
   - Electronic health records integration
   - Calendar scheduling for appointments

2. **Advanced Analytics**
   - User journey tracking  
   - AI accuracy monitoring
   - Benefit utilization insights

3. **Accessibility Enhancements**
   - Screen reader optimization
   - Keyboard navigation improvements
   - High contrast mode support

#### Long-term (Future Releases)

1. **Predictive Features**
   - Proactive benefit recommendations
   - Health trend analysis
   - Preventive care suggestions

2. **Enterprise Features**  
   - Multi-tenant architecture
   - Admin dashboard for benefit managers
   - Custom benefit configuration

3. **Advanced AI**
   - Custom model training on healthcare data
   - Multimodal input (text + images)
   - Real-time medical knowledge updates

---

## 🛠️ Development & Deployment

### Technology Stack

- **Frontend**: React 18, TypeScript 5.x
- **Styling**: Tailwind CSS 3.x, shadcn/ui
- **Build**: Vite 5.x for fast development and builds
- **AI Integration**: Mistral AI with custom prompting
- **State Management**: React Context + Custom Hooks
- **Validation**: AJV for JSON schema validation
- **HTTP**: Native fetch with React Query for caching

### Development Commands

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Development build (with source maps)  
npm run build:dev

# Code linting
npm run lint

# Preview production build
npm run preview
```

### Performance Metrics

- **Initial Load**: < 3s on 3G networks
- **AI Response Time**: 1-3s for classification, 2-5s for plans
- **Lighthouse Score**: 95+ Performance, 100 Accessibility
- **Bundle Size**: < 500KB gzipped

---

## 🤝 Contributing

### Development Workflow

1. **Fork & Clone**: Create your feature branch
2. **Setup**: Follow quick start guide
3. **Development**: Use TypeScript strict mode
4. **Testing**: Manual testing across devices
5. **PR**: Submit with detailed description

### Code Standards

- **TypeScript**: Strict mode enabled
- **Components**: Functional with hooks
- **Styling**: Tailwind CSS classes only
- **AI Integration**: Always include fallbacks
- **Mobile**: Mobile-first responsive design

---

## 📄 License & Acknowledgments

### License
MIT License - see LICENSE file for details

### Acknowledgments  
- **shadcn/ui** for beautiful, accessible components
- **Mistral AI** for powerful language model capabilities  
- **Tailwind CSS** for utility-first styling approach
- **React Query** for intelligent data fetching and caching

---

## 📞 Support & Contact

For questions, issues, or contributions:

- **GitHub Issues**: [Report bugs or request features](https://github.com/sumitjha16/bene-navigator/issues)
- **Documentation**: This README and inline code comments
- **AI Prompts**: See `/src/features/discovery/api/examples.ts` for detailed examples

---

*Built with ❤️ for better healthcare navigation*
