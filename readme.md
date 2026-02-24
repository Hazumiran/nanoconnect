
# NanoConnect - SME & Nano Influencer Matching Platform

## Project Overview

**Concept**: "Tinder for UMKM & Nano Influencers"
Platform untuk mencocokkan UMKM/SME dengan nano influencers lokal berdasarkan budget, niche, dan target audience.

## Business Requirements
### Core Features
- **Matching Algorithm**: Budget-based, niche-specific, location-aware matching
- **Target Users**: SMEs and local nano influencers
- **Low Latency**: Real-time data using edge computing

## Tech Stack & Infrastructure

### Frontend
- **Framework**: React.js + Vite
- **Deployment**: Tencent EdgeOne Pages
- **Development**: VS Code, Edgeone CLI, IDE Plugin

### Tools
- **Code Editor**: VS Code
- **AI Assist**: Copilot
- **LLM Model**: GPT/Claude
- **Others**: EdgeOne CLI


### Backend & Storage **Database**: Supabase.
- **Edge Storage**: KV Storage (Cache)
- **Serverless**: Node Functions for business logic 
- **AI Integration**: OpenAI for smart matching


### Authentication
**Auth Service**: Supabase Auth
**Method**: Third-party login integration

### Deployments 
EdgeOne Pages

## Application Architecture
### Pages & Components
```
- Homepage 
- About
- Influencer Listing 
- Influencer Detail 
- Order/Booking System
- AI Recommendations
- Terms & Conditions
- Authentication Pages
```

### Data Models
- **Influencer Profile**: Niche, rates, location, portfolio 
- ***SME Profile**: Budget, target audience, campaign requirements 
- **Matching Score**: AI-calculated compatibility rating