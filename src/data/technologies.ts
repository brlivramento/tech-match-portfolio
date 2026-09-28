export type TechnologyLevel =
  | "professional"
  | "practical"
  | "knowledge";

export type Technology = {
  id: string;
  name: string;
  category: string;
  level: TechnologyLevel;
};

export const technologies: Technology[] = [];