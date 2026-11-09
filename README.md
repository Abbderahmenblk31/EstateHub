# EstateHub 🏢 | Prime Luxury Real Estate & Interactive CAD Floorplans SaaS

> **Tunisia’s Premier High-End Real Estate Marketplace, Architectural Blueprint Studio, and Broker Deal Pipeline CRM.**

![EstateHub Luxury Architecture](https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80)

---

## 🌟 Executive Summary

EstateHub is an enterprise-grade luxury real estate platform and asset management suite designed specifically for prime residential markets (Carthage, La Marsa, Gammarth Hills, Les Berges du Lac 2, and Hammamet). Rejecting generic dashboard templates, EstateHub introduces bespoke architectural design language, interactive 2D room-zone blueprints, Tunisian banking amortization models, and an investor deal pipeline.

EstateHub operates natively on **Port 3004**, running seamlessly alongside our other SaaS applications (DocuMind on 3000, TeamBoard on 3001, QuickCart on 3002, and MediSync on 3003).

---

## 🏛️ Core Architectural Innovations

### 1. Interactive 2D CAD Blueprint Studio (`/floorplans`)
- **Vector Space Layout:** Pure SVG architectural blueprint canvas with clickable room zones (Grand Salons, Master Suites, Infinity Terraces, Marble Bathrooms).
- **Spatial Inspector:** Live display of net square meterage, ceiling heights (3.60m - 4.20m), thermal/acoustic ratings (Classe A+), and materials schedule (Carrara Italian Marble, European Smoked Oak).
- **Blueprint Dossier:** Certified export-ready cadastral layout specifications.

### 2. Tunisian Mortgage & Amortization Engine (`/calculator`)
- **Amortization Formula:** Real-time compounding debt calculation:
  $$M = P \frac{r(1+r)^n}{(1+r)^n - 1}$$
- **Central Bank of Tunisia (BCT) Standards:** Automated 40% debt burden ratio threshold calculation and required monthly income qualification.
- **Top 3 Underwriters Comparison:** Instant switching between **BIAT Credit Prestige (7.25%)**, **BNA Dari Immo (7.50%)**, and **Attijari Maskani (7.40%)**.
- **Year-by-Year Schedule:** Complete yearly breakdown of principal paid, interest paid, and ending equity balances.

### 3. Broker Deal Pipeline & Lead Kanban CRM (`/crm`)
- **5-Stage Deal Pipeline:**
  1. `NEW` (Inbound high-net-worth inquiries)
  2. `CONTACTED` (Advisor qualification & vetting)
  3. `TOUR_SCHEDULED` (Private on-site property viewings)
  4. `OFFER_MADE` (Formal purchase & lease proposals)
  5. `CLOSED` (Notary deed execution & legal transfer)
- **Financial Velocity Metrics:** Live gross pipeline volume ($/TND), estimated 3% broker advisory commissions, closing rates, and average response times.
- **Lead Management:** Interactive modal to create new investor inquiries with direct `tel:` dialing and messaging.

### 4. Native Bilingual (العربية 🇹🇳 / English 🇬🇧) & Multi-Currency System
- **RTL & LTR Dynamics:** Complete right-to-left mirror layout with bespoke typography (Playfair, Tajawal, and Plus Jakarta Sans).
- **Dynamic Currencies:** Real-time switcher between **Tunisian Dinar (د.ت - TND)**, **US Dollar ($ - USD)**, and **Euro (€ - EUR)**.
- **Day (Alabaster) & Night (Obsidian) Modes:** Bespoke architectural color palettes with zero harsh contrast.

---

## ⚙️ Tech Stack & Engineering Specs

- **Framework:** Next.js 16.4.5 (Turbopack, App Router)
- **Language:** TypeScript 5.x (Strict mode, zero `any` leaks)
- **Styling:** Tailwind CSS with custom architectural grid backgrounds and luxury serif accents
- **State & Repository:** In-Memory Singleton Store with deep filter capabilities
- **Port:** `3004` (Isolated from Ports 3000, 3001, 3002, 3003)

---

## 🚀 Running the Project

```bash
# Clone the repository
git clone https://github.com/Abbderahmenblk31/estatehub.git
cd estatehub

# Install dependencies (or link existing node_modules)
npm install

# Run the production build
npm run build

# Start on Port 3004
npm run start -- -p 3004
```

Visit [http://localhost:3004](http://localhost:3004) in your browser.

---

## 📡 REST API Reference

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/properties` | `GET`, `POST` | Retrieve catalog with multi-criteria filters or submit new listing |
| `/api/properties/[id]` | `GET`, `PUT`, `DELETE` | Retrieve single property dossier, update specs or archive |
| `/api/leads` | `GET`, `POST` | Fetch all broker leads or create new investor inquiry |
| `/api/leads/[id]` | `GET`, `PATCH`, `DELETE` | Update lead status (`NEW` -> `CLOSED`), add notes |
| `/api/calculator` | `POST` | Calculate amortized mortgage with interest schedule |
| `/api/analytics` | `GET` | Retrieve aggregate estate metrics and portfolio valuation |

---

## 🛡️ License

Private Commercial SaaS License © 2026 EstateHub Inc. All rights reserved.
