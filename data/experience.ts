export type ExperienceItem = {
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  points: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Support Engineer L1",
    company: "VX Telecom",
    location: "Remote",
    period: "May 2026 – Present",
    current: true,
    points: [
      "Providing technical support and troubleshooting for telecom systems in production environments",
      "Investigating and resolving real-world technical incidents",
      "Working with communication-related technologies and telecommunications infrastructure",
      "Supporting APIs and backend services used across the platform",
    ],
  },
  {
    role: "Full-Stack Developer — Internship",
    company: "Ultroneo",
    location: "Udine, Italy",
    period: "Mar 2025 – Apr 2025, Jul 2025 – Aug 2025",
    points: [
      "Full-stack development internship focused on hands-on web application work",
    ],
  },
];