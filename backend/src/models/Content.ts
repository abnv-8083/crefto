export interface IHeroContent {
  statusPill: string;
  statusPillSub: string;
  headlinePart1: string;
  headlinePart2: string;
  description: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  telemetry: Array<{
    value: string;
    label: string;
    desc: string;
  }>;
}

export interface IMarqueeContent {
  items: string[];
}

export interface IAboutContent {
  sectionTag: string;
  title: string;
  description1: string;
  description2: string;
  ctaText: string;
  values: Array<{
    title: string;
    description: string;
  }>;
  stats: Array<{
    value: string;
    label: string;
  }>;
}

export interface IServiceItem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  src: string;
  alt: string;
}

export interface IServicesContent {
  sectionTag: string;
  title: string;
  description: string;
  services: IServiceItem[];
}

export interface IProcessDeliverable {
  title: string;
  format: string;
}

export interface IProcessStep {
  num: string;
  phase: string;
  title: string;
  subtitle: string;
  duration: string;
  desc: string;
  quote: string;
  quoteAuthor: string;
  quoteRole: string;
  deliverables: string[];
  techPills: string[];
  backMission: string;
  backDeliverables: IProcessDeliverable[];
  backStack: string[];
  backKpi: string;
  backAxiom: string;
}

export interface IProcessContent {
  sectionTag: string;
  title: string;
  description: string;
  steps: IProcessStep[];
}

export interface IProjectItem {
  id: string;
  title: string;
  category: string;
  url: string;
  metric: string;
  image: string;
  description: string;
  fullCaseStudy: string;
  stats: Array<{ label: string; value: string }>;
  deliverables: string[];
  tech: string[];
}

export interface IProjectsContent {
  sectionTag: string;
  title: string;
  description: string;
  categories: string[];
  projects: IProjectItem[];
}

export interface IAdvantageCard {
  id: string;
  metric: string;
  title: string;
  description: string;
  tags: string[];
  isLarge?: boolean;
}

export interface IAdvantagesContent {
  sectionTag: string;
  title: string;
  description: string;
  cards: IAdvantageCard[];
}

export interface IContactContent {
  sectionTag: string;
  title: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  hours: string;
  responseBadge: string;
  servicesList: string[];
}

export interface IFooterContent {
  tagline: string;
  subtagline: string;
  copyright: string;
  socials: {
    twitter: string;
    linkedin: string;
    github: string;
    instagram: string;
  };
}

export interface ISiteContent {
  hero: IHeroContent;
  marquee: IMarqueeContent;
  about: IAboutContent;
  services: IServicesContent;
  process: IProcessContent;
  projects: IProjectsContent;
  advantages: IAdvantagesContent;
  contact: IContactContent;
  footer: IFooterContent;
}
