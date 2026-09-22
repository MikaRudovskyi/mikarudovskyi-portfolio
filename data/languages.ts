export type LanguageItem = {
  name: string;
  level: "Native" | "Intermediate";
};

export const languages: LanguageItem[] = [
  { name: "Ukrainian", level: "Native" },
  { name: "Russian", level: "Native" },
  { name: "English", level: "Intermediate" },
  { name: "Italian", level: "Intermediate" },
];