export interface HeroSlide {
  tag: string;
  title: string;
  description: string;
  image: string;
  video?: string; // Optional video URL
  videoType?: string; // Optional video MIME type e.g., 'video/mp4'
}

export interface NavSubItem {
  name: string;
  href: string;
  icon?: React.FC<{ className?: string }>; // Optional icon for sub-items
}

export interface NavItem {
  name: string;
  href: string;
  active?: boolean;
  isButton?: boolean;
  icon?: React.FC<{ className?: string }>; // Optional: Icon for the main nav item
  children?: NavSubItem[]; // Optional: For dropdown menus
  sectionIndex?: number; // Optional: For programmatic navigation to a section by index
}

export interface NewsArticle {
  image: string;
  category: string;
  title: string;
  summary: string;
  authorLine?: string;
}

export interface FactItem {
  category: string;
  title: string;
  content: string;
  tagline: string;
}

export interface SocialPost {
  id: string;
  platform: 'facebook' | 'instagram';
  platformIcon: React.FC<{ className?: string }>;
  userLogoText: string; // Text for the brand logo, e.g., "LNCT"
  content: string;
  hashtags?: string[];
  timestamp: string;
  postImage?: string; // For FB-style image within content
  backgroundImage?: string; // For IG-style full card background
  imageCredit?: string;
  cardClass: string; // Tailwind classes for card background/gradient
  textClass: string; // Tailwind classes for main text color
  iconColorClass: string; // For platform icon, logo text, and external link
}

export interface FooterLink {
  name: string;
  href: string;
}

export interface FooterLinkCategory {
  title: string;
  links: FooterLink[];
}

export interface MilestoneItem {
  id: string;
  year: string; // Used as category label
  title: string;
  description: string;
  icon?: React.FC<{ className?: string }>;
  categoryColor?: string; 
  image?: string; // Optional image for the milestone card
}