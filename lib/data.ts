/**
 * @file data.ts
 * @description Decoupled static data configurations for the portfolio application.
 * This structure enables clean code separation and eases content modifications
 * for developers and LLMs alike.
 */

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
    items: ["Technical Scoping", "Team Management", "Code Review & Quality Assurance"],
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
      "Architected and led the development of a comprehensive management suite featuring unified modules for ERP, Accounting, and HRMS with complex database logic.",
    tech: ["Full-Stack", "Architecture", "Lead"],
    href: "#",
  },
  {
    id: "02",
    title: "FinTech Compliance Platform",
    category: "Tax & Compliance",
    description:
      "Engineered secure web and backend solutions tailored for strict regional tax requirements, featuring secure government digital integrations.",
    tech: ["Backend", "FinTech", "Integration"],
    href: "#",
  },
  {
    id: "03",
    title: "Global Travel Portal",
    category: "Travel Tech",
    description:
      "Developed a dynamic travel platform supporting complex itinerary generation, secure settings, and end-to-end user workflows.",
    tech: ["Portal", "UI/UX", "Scalability"],
    href: "#",
  },
];
