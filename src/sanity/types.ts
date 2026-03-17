export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export interface SiteSettings {
  name: string;
  tagline: string;
  description: string;
  domain: string;
  phone: string;
  email: string;
  hours: string;
  address: {
    street: string;
    city: string;
    zip: string;
  };
  social: {
    facebook: string;
    instagram: string;
  };
  navigation: { label: string; href: string }[];
  recruitmentOpen: boolean;
  recruitmentYear: string;
  heroHeading?: string;
  heroSubheading?: string;
  heroDescription?: string;
  stats?: { value: string; label: string }[];
  benefits?: { icon: string; title: string; desc: string }[];
  testimonial?: { quote: string; author: string; role: string };
  benefitsHeading?: string;
  benefitsSubheading?: string;
  contactFormHeading?: string;
  contactFormSubheading?: string;
  exploreHeading?: string;
  exploreCards?: { href: string; title: string; desc: string; icon: string }[];
  ctaHeading?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
}

export interface StaffMember {
  name: string;
  role: string;
  image?: SanityImage;
  description: string;
  qualifications?: string[];
}

export interface StaffPage {
  title: string;
  subtitle: string;
  members: StaffMember[];
}

export interface ClassroomsPage {
  title: string;
  subtitle: string;
  room: {
    name: string;
    image?: SanityImage;
    description: string;
    features: string[];
  };
  uses: { name: string; icon: string; description: string }[];
  materials: { category: string; icon: string; items: string[] }[];
}

export interface Activity {
  name: string;
  icon: string;
  description: string;
  frequency: string;
  duration: string;
  image?: SanityImage;
}

export interface ActivitiesPage {
  title: string;
  subtitle: string;
  badge: string;
  activities: Activity[];
}
