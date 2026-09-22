export type TechCategory = {
  title: string;
  items: string[];
};

export const techStack: TechCategory[] = [
  {
    title: "Frontend",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Vite",
      "Tailwind CSS",
      "Bootstrap",
      "Angular",
    ],
  },
  {
    title: "Backend",
    items: ["Node.js", "Python", "PHP", "Laravel", "C#", ".NET"],
  },
  {
    title: "Databases",
    items: ["PostgreSQL", "MongoDB", "MySQL", "SQLite"],
  },
  {
    title: "Tools & DevOps",
    items: ["Git", "GitHub", "Docker", "Postman", "VS Code"],
  },
  {
    title: "Telecom & APIs",
    items: ["SIP", "RTP", "SMPP", "VoIP", "REST API"],
  },
];

export const designTools: TechCategory = {
  title: "Tools / Design",
  items: ["Photoshop"],
};