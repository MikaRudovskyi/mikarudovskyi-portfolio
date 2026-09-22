export type EducationItem = {
  title: string;
  institution: string;
  specialization?: string;
  location: string;
  period: string;
  current?: boolean;
};

export const education: EducationItem[] = [
  {
    title: "Information Systems and Technologies",
    institution: 'National Technical University "Kharkiv Polytechnic Institute"',
    location: "Kharkiv, Ukraine",
    period: "Sep 2025 – Present",
    current: true,
  },
  {
    title: "Information Technology and Telecommunications",
    institution: "A. Malignani Technical Institute",
    location: "Udine, Italy",
    period: "Sep 2023 – Jun 2025",
  },
  {
    title: "Diploma of Professional Junior Bachelor",
    institution: "Kharkiv Polytechnic Professional College",
    specialization: "Automation and Computer-Integrated Technologies",
    location: "Kharkiv, Ukraine",
    period: "Sep 2021 – Jun 2025",
  },
  {
    title: "Complete Secondary Education Certificate",
    institution: "Kharkiv Polytechnic Applied College",
    location: "Kharkiv, Ukraine",
    period: "Sep 2021 – Jun 2023",
  },
  {
    title: "Basic Secondary Education Certificate",
    institution: 'Municipal Institution "Gymnasium No. 86 of Kharkiv"',
    location: "Kharkiv, Ukraine",
    period: "Sep 2012 – Jun 2021",
  },
];