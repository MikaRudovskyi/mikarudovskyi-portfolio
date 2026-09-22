export type Project = {
  slug: string;
  name: string;
  description: string;
  github: string;
  live?: string;
  featured?: boolean;
  tech: string[];
  features: string[];
};

export const projects: Project[] = [
  {
    slug: "contractiq",
    name: "ContractIQ",
    description:
      "SaaS platform for managing contractors and subcontractors in construction and engineering companies — covering contracts, work orders, payments and compliance tracking end to end.",
    github: "https://github.com/MikaRudovskyi/contractiq",
    featured: true,
    tech: [
      "React",
      "TypeScript",
      "C#",
      ".NET 9",
      "ASP.NET Core",
      "Entity Framework Core",
      "PostgreSQL",
      "JWT",
    ],
    features: [
      "Contractor registry with categories, ratings and statuses",
      "Kanban-based work order approval workflow",
      "Business rules: contracts blocked on expired license/insurance, budget-checked work orders",
      "Role-based access (Admin, Manager, Finance, Viewer)",
      "Payment scheduling with overdue tracking",
      "Rate limiting, restricted CORS, bcrypt hardening",
    ],
  },
    {
    slug: "shizen",
    name: "SHIZEN",
    description:
      "A React + TypeScript web experience dedicated to exploring Japan's cities, culture and history, with a cinematic, research-driven design system.",
    github: "https://github.com/MikaRudovskyi/shizen",
    live: "https://shizen-ten.vercel.app/",
    tech: [
      "React",
      "TypeScript",
      "Tailwind CSS v4",
      "Vite",
      "Framer Motion",
      "React Three Fiber",
    ],
    features: [
      "12 cities and 12 culture topics with researched content",
      "Historical timeline from the Jōmon period to contemporary Japan",
      "7, 14 and 21-day interactive travel planners",
      "Command palette, global search and stylized interactive map",
      "SEO, OpenGraph, JSON-LD and reduced-motion / WebGL fallback support",
    ],
  },
  {
    slug: "navi-clothing-store",
    name: "NAVI Clothing Store",
    description:
      "Full-stack e-commerce application for NAVI-branded clothing and accessories, with a complete storefront and checkout flow.",
    github: "https://github.com/MikaRudovskyi/ClothingStore",
    live: "https://navi-clothingstore.netlify.app",
    tech: ["React", "styled-components", "i18next", "Node.js", "Express.js", "MongoDB"],
    features: [
      "Product catalog with detail views and image zoom",
      "Shopping cart and order placement with delivery form",
      "Language and currency switching",
      "Fully responsive storefront",
    ],
  },
  {
    slug: "finflow",
    name: "FinFlow",
    description:
      "Full-stack personal finance management application with budgets, savings goals, multi-currency support and financial reporting.",
    github: "https://github.com/MikaRudovskyi/finflow",
    tech: [
      "React 18",
      "Vite",
      "Zustand",
      "TanStack Query",
      "Node.js",
      "Express.js",
      "MongoDB Atlas",
      "JWT",
    ],
    features: [
      "Income, expense and transaction tracking with CSV export",
      "Budgets and savings goals with progress charts",
      "Multi-currency support (UAH, USD, EUR, GBP)",
      "JWT authentication with bcrypt and rate limiting",
    ],
  },
];