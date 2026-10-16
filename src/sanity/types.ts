/**
 * Typy dokumentów strony WWW w Sanity (singletony). Kształt = schematy z `schemaTypes/`.
 * Pola tekstowe mogą w trybie podglądu (draft mode) zawierać niewidoczne znaki stega —
 * do logiki (href, tel:, porównania) używaj `stegaClean` z next-sanity.
 */
import type { PortableTextBlock } from "next-sanity";

export interface SanityImage {
  _key?: string;
  _type?: string;
  asset?: { _ref: string; _type?: string };
  hotspot?: { x: number; y: number; height?: number; width?: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  /** Tekst alternatywny (opis zdjęcia dla niewidomych i Google) — wymagany w Studio. */
  alt?: string;
}

export type Motyw = "wave" | "forest" | "sun" | "boat" | "blocks" | "book";

export interface Seo {
  title?: string;
  description?: string;
}

/** Wspólny pas „Umów wizytę” na dole podstron. */
export interface VisitCta {
  heading: string;
  text: string;
}

export interface PageIntro {
  eyebrow: string;
  title: string;
  lead: string;
}

export interface NavItem {
  _key?: string;
  label: string;
  href: string;
}

export interface SiteSettings {
  name: string;
  legalName: string;
  phone: string;
  email: string;
  hours: string;
  address: { street: string; zip: string; city: string; district: string };
  social: { facebook?: string; instagram?: string };
  recruitmentYear: string;
  navigation: NavItem[];
  header: { ctaText: string };
  mobileBar: { callText: string; ctaText: string };
  visitCtaButton: string;
  footer: {
    heading: string;
    ctaText: string;
    description: string;
    addressLabel: string;
    navigateText: string;
    contactLabel: string;
    linksLabel: string;
    privacyLinkText: string;
  };
  seo: Seo & { ogImage?: SanityImage };
  documents?: { _key?: string; title: string; fileUrl?: string }[];
}

export interface HomePage {
  seo: Seo;
  hero: {
    showBadge: boolean;
    badge: string;
    kicker: string;
    title: string;
    lead: string;
    primaryCta: string;
    infoLine: string;
    image?: SanityImage;
    secondImage?: SanityImage;
    stamp: { show: boolean; ringText: string; number: string; label: string };
  };
  activitiesStrip: { show: boolean; srLabel: string };
  groups: {
    show: boolean;
    label: string;
    heading: string;
    lead: string;
    items: {
      _key?: string;
      tag: string;
      title: string;
      text: string;
      status: string;
      highlight?: boolean;
      ctaText?: string;
      motif?: Motyw;
      image?: SanityImage;
    }[];
    specialists: string;
    specialistsLinkText: string;
  };
  adaptation: {
    show: boolean;
    label: string;
    heading: string;
    intro: string;
    days: { _key?: string; day: string; title: string; text: string }[];
    closing: string;
    note: string;
  };
  gallery: {
    show: boolean;
    label: string;
    heading: string;
    lead: string;
    items: { _key?: string; caption: string; motif?: Motyw; image?: SanityImage }[];
  };
  testimonials: {
    show: boolean;
    items: { _key?: string; quote: string; author: string; role?: string }[];
  };
  reasons: {
    show: boolean;
    label: string;
    heading: string;
    items: { _key?: string; title: string; text: string }[];
    feesText: string;
    feesLinkText: string;
  };
  staff: { show: boolean; label: string; heading: string; lead: string; count: number; linkText: string };
  faq: {
    show: boolean;
    label: string;
    heading: string;
    helpText: string;
    items: { _key?: string; question: string; answer: string }[];
  };
  location: {
    show: boolean;
    label: string;
    heading: string;
    lead: string;
    addressTitle: string;
    addressSubtitle: string;
    navigateText: string;
    callText: string;
    hint: string;
  };
  contact: {
    show: boolean;
    label: string;
    heading: string;
    lead: string;
    phoneLabel: string;
    addressLabel: string;
    navigateText: string;
    hoursLabel: string;
  };
}

export interface StaffMember {
  _key?: string;
  name: string;
  role: string;
  image?: SanityImage;
  description: string;
  quote?: string;
  qualifications?: string[];
}

export interface StaffPage {
  seo: Seo;
  intro: PageIntro;
  members: StaffMember[];
  visitCta: VisitCta;
}

export interface ClassroomsPage {
  seo: Seo;
  intro: PageIntro;
  seaRoom: { show: boolean; label: string; heading: string; lead: string; images?: SanityImage[] };
  forestRoom: {
    show: boolean;
    label: string;
    heading: string;
    lead: string;
    linkText: string;
    image?: SanityImage;
    image2?: SanityImage;
  };
  features: { show: boolean; label: string; heading: string; items: string[] };
  zones: { show: boolean; label: string; heading: string; items: { _key?: string; name: string; description: string }[] };
  learningMaterials: {
    show: boolean;
    label: string;
    heading: string;
    items: { _key?: string; category: string; items: string[] }[];
  };
  visitCta: VisitCta;
}

export interface Activity {
  _key?: string;
  name: string;
  description: string;
  frequency: string;
  duration: string;
}

export interface ActivitiesPage {
  seo: Seo;
  intro: PageIntro;
  tableHeaders: { no: string; name: string; description: string; frequency: string; duration: string };
  activities: Activity[];
  note: string;
  visitCta: VisitCta;
}

export interface ConsultationPage {
  seo: Seo;
  breadcrumb: string;
  title: string;
  lead: string;
  phoneLabel: string;
}

export interface PrivacyAdmin {
  name: string;
  fullName: string;
  preschool: string;
  street: string;
  zip: string;
  city: string;
  krs: string;
  nip: string;
  regon: string;
  email: string;
  phone: string;
}

export interface PrivacyPage {
  seo: Seo;
  badge: string;
  title: string;
  lead: string;
  effectiveLabel: string;
  effectiveDate: string;
  tocTitle: string;
  administrator: PrivacyAdmin;
  cookieRows: { _key?: string; category: string; names: string; purpose: string }[];
  sections: { _key?: string; anchor: string; title: string; body: PortableTextBlock[] }[];
}
