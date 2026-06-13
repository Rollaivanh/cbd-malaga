# The Cannabis Store • Exclusive CBD Boutique (Málaga Centro)

An e-commerce platform and premium digital catalog built for **The Cannabis Store**, located in Málaga Centro. The application features a strict age-verification gate, real-time localized product filtering, and a direct conversion tunnel powered by automated instant messaging workflows.

🔗 **Live Demo:** [https://cbd-malaga.vercel.app](https://cbd-malaga.vercel.app)

---

## 🚀 Architecture & Tech Stack

This project is built using a modern **Headless CMS / Decoupled Architecture**, ensuring ultra-fast load times, solid security, and maximum scalability by isolating the content lake from the presentation layer:

- **Frontend Framework:** Next.js 15+ (App Router) utilizing Turbopack for lightning-fast compilation and optimized page delivery.
- **Styling & UI:** Tailwind CSS, featuring a bespoke, minimal "Total Black" visual language with desaturated gold accents (`#c0a97a`), premium serif typography, and cohesive component-level hover interactions.
- **Headless Backend:** Sanity CMS (Content Lake), structured with localized query parameters and strict schema schemas with data validation.
- **Data Querying:** GROQ (Graph-Relational Object Queries) to fetch clean, lightweight payloads directly from the CMS edge.
- **Deployment & Hosting:** Vercel Cloud Platform, fully integrated with Next.js Edge Network for asset optimization and global caching.

---

## 📦 Repository Structure & Key Modules

The repository's directory layout follows Clean Architecture conventions for Next.js and Sanity:

```text
cbd-malaga/
├── app/
│   ├── catalogo/
│   │   └── [slug]/         # Dynamic routing for detailed, SEO-friendly product views
│   ├── components/
│   │   ├── CatalogSection  # React client component managing active states & unmapped category filters
│   │   └── WhatsAppBtn     # High-conversion CTA utilizing encoded URI parameters for order processing
│   ├── page.tsx            # Server-side entry point fetching content from Sanity Content Lake
│   └── layout.tsx          # App Shell, global style injections, and metadata configuration
├── sanity/
│   ├── schemaTypes/
│   │   ├── index.ts        # Content Studio core schema registry
│   │   └── producto.ts     # Document schema defining validation constraints, image hotspots, and price mins
│   ├── env.ts              # Decoupled dataset configuration layer
│   └── structure.ts        # Custom Sanity Desk Studio layout hierarchy
├── next.config.ts          # Core framework settings, including remotePatterns security policies for media CDNs
└── .env.example            # Blueprint for environment variables declaration