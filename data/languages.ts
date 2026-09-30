export type LanguageItem = {
  name: string;
  level: "Native" | "Intermediate" | "Upper-Intermediate";
};

export const languages: LanguageItem[] = [
  { name: "Ukrainian", level: "Native" },
  { name: "Russian", level: "Native" },
  { name: "English", level: "Upper-Intermediate" },
  { name: "Italian", level: "Intermediate" },
];