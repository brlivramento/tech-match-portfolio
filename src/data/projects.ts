export type Project = {
  id: string;
  name: string;
  company: string;
  startYear?: number;
  endYear?: number;
  description: string;
  segment: string;
  website: string;
  coverImageUrl?: string;
  technologyIds: string[];
};