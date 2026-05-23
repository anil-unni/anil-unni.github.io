export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  href: string;
}

export const TECHS: string[] = [
  "React",
  "Next.js",
  "TypeScript",
  "Python",
  "Django",
  "FastAPI",
  "Node.js",
  "SQL",
  "PostgreSQL",
  "Docker",
  "Enterprise Architecture",
  "AI-Assisted Workflows",
];

export const SKILLS: SkillGroup[] = [
  {
    category: "Engineering",
    items: ["Full-Stack Architecture", "Scalable Backend Systems", "Responsive Frontends"],
  },
  {
    category: "Leadership",
    items: ["Technical Scoping", "Team Management", "Code Review & Quality"],
  },
  {
    category: "Toolkit",
    items: ["React, Python, Node.js, SQL", "AI-assisted workflows (Cursor, MCP, LLMs)"],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "01",
    title: "Enterprise Business Suite",
    category: "Management Suite",
    description:
      "End-to-end ERP, Accounting & HRMS platform with complex database architecture and unified module design.",
    tech: ["Full-Stack", "Architecture", "Lead"],
    href: "#",
  },
  {
    id: "02",
    title: "FinTech Compliance Platform",
    category: "Tax & Compliance",
    description:
      "Secure backend for regional tax compliance with government digital integrations and strict audit trails.",
    tech: ["Backend", "FinTech", "Integration"],
    href: "#",
  },
  {
    id: "03",
    title: "Global Travel Portal",
    category: "Travel Tech",
    description:
      "B2B/B2C travel booking platform with dynamic itinerary generation and end-to-end secure user flows.",
    tech: ["Portal", "UI/UX", "Scalability"],
    href: "#",
  },
];
