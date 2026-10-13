import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

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
  category: 'Business Website' | 'Web Application' | 'E-Commerce';
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

export const defaultSiteContent: ISiteContent = {
  hero: {
    statusPill: 'AVAILABLE FOR NEW PROJECTS • WORLDWIDE',
    statusPillSub: 'CHARGEEASE PARTNER',
    headlinePart1: 'Modern Websites.',
    headlinePart2: 'Stronger Businesses.',
    description:
      'CREFTO is the Website Development Service under ChargeEase, engineered to help ambitious businesses craft a dominant digital presence through high-performance websites and bespoke web applications.',
    primaryCtaText: 'Connect With Us',
    secondaryCtaText: 'Explore Work',
    telemetry: [
      { value: '99.9%+', label: 'UPTIME SLA', desc: 'CHARGEEASE RELIABILITY' },
      { value: '< 1.2s', label: 'GLOBAL SPEED', desc: 'SUB-SECOND FCP' },
      { value: '100%', label: 'BESPOKE CODE', desc: 'ZERO TEMPLATES' },
    ],
  },
  marquee: {
    items: [
      'BESPOKE WEB APPS',
      'HIGH-CONVERTING DESIGN',
      'THREE.JS 3D EXPERIENCES',
      'SUB-SECOND PERFORMANCE',
      'ENTERPRISE ARCHITECTURE',
      'ECOMMERCE EXCELLENCE',
      'FULL-STACK ENGINEERING',
      'RESPONSIVE INTERFACES',
    ],
  },
  about: {
    sectionTag: '01 / ABOUT CREFTO',
    title: 'Where Aesthetic Finesse Meets High-Performance Engineering.',
    description1:
      'CREFTO is the specialized Website Development Service under ChargeEase. We exist to eliminate the compromise between striking visual design and lightning-fast engineering.',
    description2:
      'From sleek corporate showcases to complex database-driven web applications, our team combines Three.js WebGL graphics, GSAP choreography, and clean TypeScript code to elevate your brand into an authoritative market leader.',
    ctaText: 'Discover Our Services',
    values: [
      {
        title: 'Our Mission',
        description:
          'To engineer elite, high-conversion web solutions that give ambitious businesses an undeniable digital edge.',
      },
      {
        title: 'Our Vision',
        description:
          'To stand as the premier web engineering agency recognized globally for aesthetic elegance and technical brilliance.',
      },
      {
        title: 'Powered by ChargeEase',
        description:
          'CREFTO operates as the dedicated Website Development Division under ChargeEase, backed by enterprise-grade infrastructure.',
      },
    ],
    stats: [
      { value: '50+', label: 'Projects Delivered' },
      { value: '99%', label: 'Client Satisfaction' },
      { value: '< 1.2s', label: 'Average Page Speed' },
      { value: '24/7', label: 'Uptime & Maintenance' },
    ],
  },
  services: {
    sectionTag: '02 / SERVICES',
    title: 'Engineering the Next Generation of Digital Flagships',
    description:
      'From bespoke corporate websites to scalable enterprise SaaS portals, every Crefto build is architected for unyielding speed, security, and measurable ROI.',
    services: [
      {
        id: 'web-design',
        num: '01',
        title: 'Bespoke Web Design',
        subtitle: 'Development',
        description:
          'Modern, responsive, and user-centric websites crafted from scratch to establish unshakeable digital authority.',
        tags: ['Design System', 'Custom Motion', 'Responsive UI'],
        src: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=900&q=80&auto=format&fit=max',
        alt: 'Web design workspace',
      },
      {
        id: 'business-websites',
        num: '02',
        title: 'Business Websites',
        subtitle: 'Lead Conversion',
        description:
          'Turn clicks into customers. Built for service providers, agencies, and brands requiring continuous lead conversion.',
        tags: ['Lead Funnels', 'Local & Global SEO', 'Speed Optimization'],
        src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&auto=format&fit=max',
        alt: 'Business office environment',
      },
      {
        id: 'web-apps',
        num: '03',
        title: 'Web Applications',
        subtitle: 'Cloud & SaaS',
        description:
          'Complex SaaS portals, admin dashboards, and custom cloud tools tailored to automate and accelerate your operations.',
        tags: ['Database Architecture', 'Secure Auth', 'REST & GraphQL'],
        src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80&auto=format&fit=max',
        alt: 'Cloud computing centre',
      },
      {
        id: 'website-redesign',
        num: '04',
        title: 'Website Redesign',
        subtitle: 'Modernization',
        description:
          'Transform dated interfaces into cutting-edge, fluid WebGL and GSAP powered experiences without losing SEO rankings.',
        tags: ['Legacy Migration', 'UI/UX Refresh', 'Performance Boost'],
        src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900&q=80&auto=format&fit=max',
        alt: 'Modern architectural redesign',
      },
      {
        id: 'maintenance-support',
        num: '05',
        title: 'Maintenance & Support',
        subtitle: '24/7 SLA',
        description:
          'Keep your digital flagship secure, updated, and lightning-fast. Backed by ChargeEase institutional reliability.',
        tags: ['Automated Backups', 'Security Audits', 'Zero Downtime'],
        src: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=900&q=80&auto=format&fit=max',
        alt: 'Security shield concept',
      },
      {
        id: 'customized-solutions',
        num: '06',
        title: 'Custom Engineering',
        subtitle: 'Solutions',
        description:
          'Tailored payment gateway integrations, headless CMS architectures, and custom workflows for unique requirements.',
        tags: ['Payment Stripe/Razorpay', 'Headless CMS', 'Custom Integrations'],
        src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80&auto=format&fit=max',
        alt: 'Engineering and technology',
      },
    ],
  },
  process: {
    sectionTag: '03 / OUR PROCESS',
    title: 'The Engineering Lifecycle Behind Every Flagship',
    description:
      'We combine agile methodology, continuous client previews, and rigorous automated testing to deliver digital platforms on schedule and with surgical precision.',
    steps: [
      {
        num: '01',
        phase: 'PHASE 01',
        title: 'Discovery & Architecture',
        subtitle: 'Strategy & Technical Blueprint',
        duration: '1 - 2 WEEKS',
        desc: 'We analyze your business objectives, target audience, and architectural constraints to engineer an optimal technical framework and high-converting user journey.',
        quote: 'First, solve the problem. Then, write the code. Architecture turns ambition into certainty.',
        quoteAuthor: 'John Johnson',
        quoteRole: 'STRATEGY STANDARD',
        deliverables: [
          'Scope Specification & Product Requirements Document',
          'Information Architecture & Scalable Data Flow Schema',
          'Tech Stack & Cloud Infrastructure Roadmap',
        ],
        techPills: ['System Architecture', 'Conversion Blueprint', 'Security Strategy'],
        backMission: 'Define core technical boundaries and establish high-fidelity data models.',
        backDeliverables: [
          { title: 'Requirements Matrix', format: 'PDF / Notion Spec' },
          { title: 'User Flow Architecture', format: 'Interactive Diagram' },
          { title: 'Data Schema Blueprint', format: 'JSON / ERD Schema' },
        ],
        backStack: ['TypeScript', 'GraphQL', 'PostgreSQL', 'Figma'],
        backKpi: '100% Client Scope Alignment',
        backAxiom: 'Clarity precedes velocity.',
      },
      {
        num: '02',
        phase: 'PHASE 02',
        title: 'High-Fidelity UI/UX & 3D Prototyping',
        subtitle: 'Interactive Visual Engineering',
        duration: '2 - 3 WEEKS',
        desc: 'We craft immersive digital aesthetics with Three.js WebGL shaders and GSAP micro-interactions, providing clickable prototypes before a single line of backend code is committed.',
        quote: 'Design is not just what it looks like and feels like. Design is how it works.',
        quoteAuthor: 'Steve Jobs',
        quoteRole: 'DESIGN PRINCIPLE',
        deliverables: [
          'Comprehensive Figma Design System with Design Tokens',
          'WebGL Shader & Kinetic Motion Choreography Specs',
          'Responsive Multi-Device Micro-Interactions Prototype',
        ],
        techPills: ['Three.js WebGL', 'Figma Prototyping', 'Kinetic Design'],
        backMission: 'Craft an authoritative brand presence with fluid interactive design.',
        backDeliverables: [
          { title: 'Complete Component Library', format: 'Figma Tokens' },
          { title: '3D WebGL Shader Demos', format: 'Canvas Prototypes' },
          { title: 'Responsive Breakpoint Guides', format: 'Design Handoff' },
        ],
        backStack: ['Figma', 'Three.js', 'GSAP', 'GLSL Shaders'],
        backKpi: '60 FPS Motion Standard',
        backAxiom: 'Elegance is the elimination of the unnecessary.',
      },
      {
        num: '03',
        phase: 'PHASE 03',
        title: 'Full-Stack Development & Optimization',
        subtitle: 'Rigorous Coding & Asset Pipeline',
        duration: '3 - 5 WEEKS',
        desc: 'Writing clean, type-safe code using modern React, Node.js, and edge deployments. Every image and script is optimized for sub-second global delivery.',
        quote: 'Make it work, make it right, make it fast. Code with precision and pride.',
        quoteAuthor: 'Kent Beck',
        quoteRole: 'ENGINEERING DOCTRINE',
        deliverables: [
          'Component-Driven React / Next.js Production Architecture',
          'High-Throughput Node.js & Database Microservices',
          'Asset Pipeline with AVIF/WebP Compression & CDN Routing',
        ],
        techPills: ['React & Next.js', 'Node.js & Express', 'Edge Delivery'],
        backMission: 'Deliver an uncompromised, battle-tested software foundation.',
        backDeliverables: [
          { title: 'Clean TypeScript Repository', format: 'Git Repository' },
          { title: 'Automated CI/CD Workflows', format: 'GitHub Actions' },
          { title: 'API Documentation & Tests', format: 'Swagger / Postman' },
        ],
        backStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
        backKpi: '< 1.2s First Contentful Paint',
        backAxiom: 'Simplicity is prerequisite for reliability.',
      },
      {
        num: '04',
        phase: 'PHASE 04',
        title: 'Quality Assurance, Launch & 24/7 SLA',
        subtitle: 'Deployment & Continuous Reliability',
        duration: '1 - 2 WEEKS',
        desc: 'Extensive cross-browser regression testing, automated lighthouse auditing, DNS zero-downtime cutover, and continuous monitoring backed by ChargeEase.',
        quote: 'Quality is not an act, it is a habit. Excellence is our only launch standard.',
        quoteAuthor: 'Aristotle',
        quoteRole: 'QUALITY ETHOS',
        deliverables: [
          'Comprehensive Cross-Device & Browser Compatibility Matrix',
          'Lighthouse 95+ Score Audit & Security Penetration Report',
          '24/7 Server Telemetry, Automated Backups & Direct Support',
        ],
        techPills: ['Lighthouse 99/100', 'Zero-Downtime DNS', '24/7 Monitoring'],
        backMission: 'Ensure maximum resilience, security, and continuous post-launch performance.',
        backDeliverables: [
          { title: 'Penetration & Audit Report', format: 'Security Dossier' },
          { title: 'Zero-Downtime Deployment', format: 'Cloud Infrastructure' },
          { title: 'SLA Support Dashboard', format: 'ChargeEase Console' },
        ],
        backStack: ['Cloudflare', 'AWS / Vercel', 'Datadog', 'Sentry'],
        backKpi: '99.99% Guaranteed SLA Uptime',
        backAxiom: 'Great software is never done, only refined.',
      },
    ],
  },
  projects: {
    sectionTag: '04 / SELECTED WORK',
    title: 'Crafted with Precision & Measurable Impact',
    description:
      'Explore our featured client flagships built with cutting-edge engineering. Drag or click any card in the interactive 3D deck to inspect full project details and connect with our team.',
    categories: ['All', 'Business Website', 'Web Application', 'E-Commerce'],
    projects: [
      {
        id: 'bakery-website',
        title: 'Artisan Oven & Cafe',
        category: 'Business Website',
        url: 'artisanoven.com',
        metric: '+180% Online Orders',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1000&q=80&auto=format&fit=crop',
        description:
          'An enticing and modern online storefront for an artisan bakery featuring real-time menu management, table reservations, and local SEO.',
        fullCaseStudy:
          'Artisan Oven approached Crefto to modernize their regional bakery presence into a high-converting digital destination. We engineered a lightning-fast React application integrated with automated pickup scheduling, live bread inventory status, and local SEO schema that skyrocketed search visibility.',
        stats: [
          { label: 'Online Sales Growth', value: '+180%' },
          { label: 'Page Load Speed', value: '0.74s FCP' },
          { label: 'Customer Rating', value: '4.9 / 5.0' },
        ],
        deliverables: [
          'Custom React & Vite Responsive Architecture',
          'Real-Time Menu & Bread Availability Matrix',
          'Stripe Express Checkout for Scheduled Pickups',
          'Automated SMS & Email Order Notifications',
        ],
        tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Stripe'],
      },
      {
        id: 'admin-dashboard',
        title: 'Apex Cloud Analytics',
        category: 'Web Application',
        url: 'apexcloud.io',
        metric: 'Real-time Telemetry',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=80&auto=format&fit=crop',
        description:
          'Enterprise analytics and operations dashboard with real-time WebSocket charts, role-based authentication, and automated billing metrics.',
        fullCaseStudy:
          'Apex Cloud needed an institutional-grade monitoring console capable of ingesting millions of telemetry data points without UI frame drops. Crefto engineered a low-latency WebGL data visualization platform with instant filtering, multi-tenant RBAC permissions, and automated Slack alert webhooks.',
        stats: [
          { label: 'Data Ingestion Rate', value: '100k events/s' },
          { label: 'System Uptime SLA', value: '99.99%' },
          { label: 'Render Latency', value: '< 16ms 60fps' },
        ],
        deliverables: [
          'High-Frequency WebSocket Data Streaming Engine',
          'Role-Based Access Control (RBAC) & OAuth 2.0',
          'Interactive Canvas & SVG Real-Time Time-Series Charts',
          'Automated PDF & CSV Compliance Reporting',
        ],
        tech: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'WebSockets'],
      },
      {
        id: 'nova-portfolio',
        title: 'Nova Studio Agency',
        category: 'Business Website',
        url: 'novastudio.design',
        metric: '⚡ 99/100 Lighthouse',
        image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1000&q=80&auto=format&fit=crop',
        description:
          'A cutting-edge agency portfolio featuring fluid WebGL transitions, dynamic case studies, and smooth micro-interactions that elevate brand authority.',
        fullCaseStudy:
          'Nova Studio wanted a flagship web presence that showcased their high-end creative identity. Using Three.js and custom GLSL shader liquid distortions paired with GSAP ScrollTrigger timeline choreography, we delivered an immersive digital experience that won site-of-the-month accolades.',
        stats: [
          { label: 'Lighthouse Score', value: '99 / 100' },
          { label: 'Inbound Inquiries', value: '+340%' },
          { label: 'Avg Session Time', value: '3m 48s' },
        ],
        deliverables: [
          'Custom Three.js Interactive Distortion Mesh',
          'GSAP Smooth Scrolling & Timeline Choreography',
          'Headless CMS for One-Click Case Study Publishing',
          'SEO Schema & OpenGraph Dynamic Media Generator',
        ],
        tech: ['React', 'Three.js', 'GLSL', 'GSAP', 'Tailwind CSS'],
      },
      {
        id: 'pulse-fitness',
        title: 'Pulse Fitness & Members',
        category: 'Web Application',
        url: 'pulsefitness.app',
        metric: '5,000+ Active Members',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1000&q=80&auto=format&fit=crop',
        description:
          'Full-featured health and fitness club platform with automated class booking, subscription billing, and mobile-friendly workout tracking.',
        fullCaseStudy:
          'Pulse Fitness transitioned from a fragmented offline membership register to an all-in-one digital member portal. Crefto built an automated scheduling system with calendar sync, recurring Stripe subscription tiers, and personal trainer booking workflows.',
        stats: [
          { label: 'Active App Users', value: '5,000+' },
          { label: 'Monthly Recurring MRR', value: '$120,000+' },
          { label: 'No-Show Reduction', value: '-65%' },
        ],
        deliverables: [
          'Interactive Class Booking Grid with Waitlist Engine',
          'Stripe Recurring Billing & Member Portal Integration',
          'PWA Offline-Ready Workout & Progress Tracking',
          'Automated Class Reminder Push & Email Dispatch',
        ],
        tech: ['React', 'Express.js', 'MongoDB', 'Stripe', 'PWA'],
      },
      {
        id: 'lumina-ecom',
        title: 'Lumina Luxury Goods',
        category: 'E-Commerce',
        url: 'luminashops.store',
        metric: '+210% Checkout Conv.',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000&q=80&auto=format&fit=crop',
        description:
          'High-end luxury apparel e-commerce store with 3D product previews, instant faceted filtering, and zero-latency checkout.',
        fullCaseStudy:
          'Lumina needed a modern shopping experience that matched their ultra-premium brand prestige. We designed a headless Shopify store with 3D Three.js product turntable models, instant client-side facet search, and Apple Pay / Google Pay one-click checkout.',
        stats: [
          { label: 'Checkout Conversion', value: '+210%' },
          { label: 'Cart Abandonment', value: '-38%' },
          { label: 'Mobile Sales Share', value: '72%' },
        ],
        deliverables: [
          'Headless Shopify Storefront with Next.js App Router',
          'Interactive 3D Product Canvas Model Viewer',
          'Instant Algolia Faceted Search & Category Indexing',
          'Apple Pay, Google Pay & Klarna Express Checkout',
        ],
        tech: ['Next.js', 'Shopify Storefront API', 'Three.js', 'Algolia'],
      },
      {
        id: 'vanguard-realty',
        title: 'Vanguard Realty Portal',
        category: 'Business Website',
        url: 'vanguardrealty.com',
        metric: 'Instant Lead Capture',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80&auto=format&fit=crop',
        description:
          'High-conversion real estate platform with interactive map filtering, virtual property tours, and automated CRM lead distribution.',
        fullCaseStudy:
          'Vanguard Realty required a high-converting property search portal to showcase ultra-prime commercial and residential developments. We implemented interactive Mapbox boundary search, embedded virtual tours, and immediate CRM lead qualification.',
        stats: [
          { label: 'Active Listings', value: '350+' },
          { label: 'Lead Response Time', value: '< 2 Minutes' },
          { label: 'Property Inquiries', value: '+42% Faster' },
        ],
        deliverables: [
          'Interactive Mapbox Custom Tile Cluster Search',
          'High-Resolution Matterport Virtual Tour Embeds',
          'Automated CRM Lead Routing & Agent Assignment',
          'Comprehensive Mortgage & ROI Calculators',
        ],
        tech: ['React', 'TypeScript', 'Mapbox GL', 'REST API'],
      },
    ],
  },
  advantages: {
    sectionTag: '05 / ADVANTAGES',
    title: 'Why Industry Leaders Choose Crefto',
    description:
      'We bridge the gap between creative visual artistry and rigorous full-stack engineering to build web platforms that outperform the competition.',
    cards: [
      {
        id: 'performance',
        metric: '99/100 Lighthouse',
        title: 'Lightning Sub-Second Performance',
        description:
          'Every millisecond matters. We optimize assets, employ code-splitting, tree-shaking, and server-side strategies so your website loads in under 1.2 seconds anywhere in the world.',
        tags: ['Zero Bloat', 'Next-Gen Formats', 'Edge Caching'],
        isLarge: true,
      },
      {
        id: 'motion',
        metric: 'WebGL & Three.js',
        title: 'Award-Winning 3D & Motion',
        description:
          'Engage visitors with silky GSAP ScrollTrigger timelines and GPU-accelerated Three.js shaders that make your digital presence unforgettable.',
        tags: ['60 FPS Animations', 'Scroll Parallax'],
        isLarge: false,
      },
      {
        id: 'conversion',
        metric: '+45% Avg Engagement',
        title: 'Conversion-Centric UX',
        description:
          'We craft intentional visual hierarchies and high-converting CTA pathways that turn casual site visitors into committed leads and customers.',
        tags: ['Intentional Flow', 'Lead Magnet Paths'],
        isLarge: false,
      },
      {
        id: 'security',
        metric: 'Backed by ChargeEase',
        title: 'Enterprise Security & SLA Reliability',
        description:
          'As a specialized division under ChargeEase, CREFTO provides institutional-grade uptime, strict code security standards, routine backups, and direct developer support long after launch.',
        tags: ['99.9% Uptime SLA', 'Direct Developer Access', 'Continuous Monitoring'],
        isLarge: true,
      },
    ],
  },
  contact: {
    sectionTag: '06 / CONTACT US',
    title: "Let's Build Something Extraordinary Together",
    description:
      'Have an upcoming project, website redesign, or custom web application in mind? Connect directly with our engineering team.',
    email: 'contact@chargeease.in',
    phone: '+91 (0) 800-CREFTO',
    location: 'Bangalore, India • Available Worldwide',
    hours: 'Mon - Fri: 9:00 AM - 7:00 PM IST',
    responseBadge: 'Guaranteed response within 24 hours',
    servicesList: [
      'Bespoke Website',
      'Web Application',
      'E-Commerce Store',
      'Website Redesign',
      'Maintenance & Support',
    ],
  },
  footer: {
    tagline: 'CREFTO — Modern Websites. Stronger Businesses.',
    subtagline: 'The Website Development Service under ChargeEase.',
    copyright: '© 2026 CREFTO by ChargeEase. All rights reserved.',
    socials: {
      twitter: 'https://twitter.com/crefto',
      linkedin: 'https://linkedin.com/company/chargeease',
      github: 'https://github.com/crefto',
      instagram: 'https://instagram.com/crefto',
    },
  },
};

const STORAGE_KEY = 'crefto_site_content_v1';
const API_BASE = 'http://localhost:5000/api/content';

interface ContentContextType {
  content: ISiteContent;
  loading: boolean;
  saving: boolean;
  lastSavedAt: Date | null;
  updateSection: <K extends keyof ISiteContent>(section: K, data: ISiteContent[K]) => Promise<boolean>;
  saveAll: (newContent: ISiteContent) => Promise<boolean>;
  resetToDefault: () => Promise<boolean>;
  reload: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<ISiteContent>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch {
      // Fallback
    }
    return defaultSiteContent;
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);

  const fetchRemoteContent = useCallback(async () => {
    try {
      const res = await fetch(API_BASE);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setContent(json.data);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(json.data));
          } catch {
            // Ignore storage quota
          }
        }
      }
    } catch {
      // Offline fallback: keep local content
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRemoteContent();
  }, [fetchRemoteContent]);

  const saveAll = async (newContent: ISiteContent): Promise<boolean> => {
    setSaving(true);
    setContent(newContent);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
    } catch {
      // Ignore
    }

    let remoteOk = false;
    try {
      const res = await fetch(API_BASE, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContent),
      });
      if (res.ok) {
        remoteOk = true;
      }
    } catch {
      // Remote unavailable, local is updated
    } finally {
      setSaving(false);
      setLastSavedAt(new Date());
    }
    return remoteOk || true;
  };

  const updateSection = async <K extends keyof ISiteContent>(
    section: K,
    data: ISiteContent[K]
  ): Promise<boolean> => {
    const updated = {
      ...content,
      [section]: data,
    };
    return saveAll(updated);
  };

  const resetToDefault = async (): Promise<boolean> => {
    setSaving(true);
    setContent(defaultSiteContent);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSiteContent));
    } catch {
      // Ignore
    }

    try {
      await fetch(`${API_BASE}/reset`, { method: 'POST' });
    } catch {
      // Ignore
    } finally {
      setSaving(false);
      setLastSavedAt(new Date());
    }
    return true;
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        loading,
        saving,
        lastSavedAt,
        updateSection,
        saveAll,
        resetToDefault,
        reload: fetchRemoteContent,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = (): ContentContextType => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
