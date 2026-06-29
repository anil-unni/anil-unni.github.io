export interface ERPTileData {
  id: string;
  title: string;
  descriptor: string;
  metric?: string;
  icon: string;
  span?: "wide" | "tall" | "default";
}

export const erpTiles: ERPTileData[] = [
  {
    id: "inventory",
    title: "Inventory Control",
    descriptor: "Real-time stock visibility with multi-warehouse valuation",
    metric: "99.8% accuracy",
    icon: "package",
    span: "wide",
  },
  {
    id: "reporting",
    title: "Financial Reporting",
    descriptor: "Consolidated P&L, balance sheet, and cash flow in seconds",
    metric: "3s generation",
    icon: "bar-chart",
  },
  {
    id: "workflow",
    title: "Workflow Automation",
    descriptor: "Multi-level approval chains with conditional routing and SLA tracking",
    metric: "60% faster sign-off",
    icon: "git-branch",
    span: "tall",
  },
  {
    id: "integrations",
    title: "System Integrations",
    descriptor: "REST & webhook bridges across payment gateways, logistics, and CRMs",
    metric: "40+ connectors",
    icon: "plug",
  },
  {
    id: "hr",
    title: "HR & Payroll",
    descriptor: "Employee lifecycle, attendance, and statutory compliance modules",
    icon: "users",
  },
  {
    id: "sop",
    title: "SOP Codification",
    descriptor: "Digital standard operating procedures with audit trails and versioning",
    metric: "ISO-aligned",
    icon: "clipboard-list",
    span: "wide",
  },
  {
    id: "procurement",
    title: "Procurement",
    descriptor: "Purchase requisition to payment with vendor scorecards",
    icon: "shopping-cart",
  },
  {
    id: "analytics",
    title: "Business Analytics",
    descriptor: "Custom KPI dashboards with drill-down from summary to transaction",
    metric: "Live data",
    icon: "trending-up",
  },
];

export interface HobbyModule {
  id: string;
  title: string;
  descriptor: string;
  icon: string;
}

export const hobbyModules: HobbyModule[] = [
  {
    id: "detailing",
    title: "Automotive Detailing",
    descriptor: "Paint correction, ceramic coating, and PPF application on daily drivers",
    icon: "car",
  },
  {
    id: "hardware",
    title: "Hardware Modding",
    descriptor: "Custom PC builds, thermal management, and bespoke cable sleeving",
    icon: "cpu",
  },
  {
    id: "keyboards",
    title: "Mechanical Keyboards",
    descriptor: "Hand-lubed switches, custom PCB layouts, and acoustic foam dampening",
    icon: "keyboard",
  },
  {
    id: "audio",
    title: "Hi-Fi Audio",
    descriptor: "Tube amplifier restoration and vinyl playback chain optimization",
    icon: "headphones",
  },
];

export const socialLinks = {
  github: "https://github.com/anil-unni",
  linkedin: "https://linkedin.com/in/anil-unni",
  instagram: "https://instagram.com/anilunni_",
};

export const heroProjects = [
  {
    id: "uae-mumbai",
    title: "UAE → Mumbai Server Recovery",
    outcome: "Full data recovery with zero loss across a 72-hour critical incident",
    metric: "0 data loss",
    tags: ["Incident Response", "Infrastructure"],
  },
  {
    id: "sop-implementation",
    title: "Enterprise SOP Implementation",
    outcome: "Digitised 200+ SOPs across 8 departments, reducing onboarding time by 40%",
    metric: "40% faster onboarding",
    tags: ["Process Design", "ERP"],
  },
];
