# NexaSphere Clean 🧼✨

**NexaSphere Clean** is an AI-powered SaaS platform designed for luxury house cleaning services. It combines high-conversion marketing, intelligent pricing, and robust CRM capabilities into a single, production-ready ecosystem.

## 🚀 Quick Start

### 1. Local Development
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start the dev server
npm run dev
```

### 2. Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d --build

# VPS Access
# Host: 72.62.162.228
# User: root
```

## 🏗 Tech Stack
- **Frontend**: Next.js 15 (App Router), Tailwind CSS 4, Framer Motion, ShadCN UI.
- **Backend**: Supabase (PostgreSQL, Auth, RLS, Edge Functions).
- **AI**: OpenRouter (Gemini/GPT-4) for marketing automation.
- **Payments**: Stripe.
- **Communication**: Resend (Email), Twilio (SMS).
- **Infrastructure**: Docker, NGINX Reverse Proxy, GitHub Actions.

## 🧠 Key Features
- **Intelligent Estimate Calculator**: Dynamic pricing based on property type, size, rooms, and AI-driven multipliers.
- **Conversion-Focused Landing Page**: Premium design with glassmorphism and smooth animations.
- **Admin CRM Dashboard**: Real-time revenue analytics, lead tracking, and job management.
- **AI Marketing Engine**: Automated generation of ads (Google, FB, Craigslist) and email nurturing.
- **Local SEO Engine**: Programmatic page structure for city-specific targeting.

## 🗺 Roadmaps

### Phase 1: MVP (Complete)
- [x] High-fidelity landing page.
- [x] Intelligent pricing engine.
- [x] Database schema & RLS.
- [x] Docker & CI/CD scaffolding.

### Phase 2: Growth
- [ ] Stripe Connect integration for cleaner payouts.
- [ ] Programmatic SEO page generation for 100+ cities.
- [ ] AI-driven lead scoring and automated drip campaigns.
- [ ] Cleaner Mobile PWA for schedule management.

### Phase 3: Scale
- [ ] Multi-region expansion logic.
- [ ] AI Customer Support Bot (Voice + Text).
- [ ] Advanced predictive analytics for revenue forecasting.

## 🛡 License
MIT © NexaSphere Clean
