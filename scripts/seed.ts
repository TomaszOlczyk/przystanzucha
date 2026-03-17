import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve } from "path";

const client = createClient({
  projectId: "hzxqcvp2",
  dataset: "production",
  apiVersion: "2026-03-17",
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
});

const read = (name: string) =>
  JSON.parse(readFileSync(resolve(__dirname, `../src/content/${name}.json`), "utf-8"));

async function seed() {
  const site = read("site");
  const staff = read("staff");
  const classrooms = read("classrooms");
  const activities = read("activities");

  // 1. Site Settings
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    name: site.name,
    tagline: site.tagline,
    description: site.description,
    domain: site.domain,
    phone: site.phone,
    email: site.email,
    hours: site.hours,
    address: {
      _type: "object",
      street: site.address.street,
      city: site.address.city,
      zip: site.address.zip,
    },
    social: {
      _type: "object",
      facebook: site.social.facebook,
      instagram: site.social.instagram,
    },
    navigation: site.navigation.map((nav: { label: string; href: string }, i: number) => ({
      _key: `nav-${i}`,
      _type: "object",
      label: nav.label,
      href: nav.href,
    })),
    recruitmentOpen: site.recruitmentOpen,
    recruitmentYear: site.recruitmentYear,
  });
  console.log("✅ siteSettings");

  // 2. Staff Page
  await client.createOrReplace({
    _id: "staffPage",
    _type: "staffPage",
    title: staff.title,
    subtitle: staff.subtitle,
    members: staff.members.map((m: { name: string; role: string; description: string; qualifications?: string[] }, i: number) => ({
      _key: `member-${i}`,
      _type: "object",
      name: m.name,
      role: m.role,
      description: m.description,
      qualifications: m.qualifications || [],
    })),
  });
  console.log("✅ staffPage");

  // 3. Classrooms Page
  await client.createOrReplace({
    _id: "classroomsPage",
    _type: "classroomsPage",
    title: classrooms.title,
    subtitle: classrooms.subtitle,
    room: {
      _type: "object",
      name: classrooms.room.name,
      description: classrooms.room.description,
      features: classrooms.room.features,
    },
    uses: classrooms.uses.map((u: { name: string; icon: string; description: string }, i: number) => ({
      _key: `use-${i}`,
      _type: "object",
      name: u.name,
      icon: u.icon,
      description: u.description,
    })),
    materials: classrooms.materials.map((m: { category: string; icon: string; items: string[] }, i: number) => ({
      _key: `mat-${i}`,
      _type: "object",
      category: m.category,
      icon: m.icon,
      items: m.items,
    })),
  });
  console.log("✅ classroomsPage");

  // 4. Activities Page
  await client.createOrReplace({
    _id: "activitiesPage",
    _type: "activitiesPage",
    title: activities.title,
    subtitle: activities.subtitle,
    badge: activities.badge,
    activities: activities.activities.map((a: { name: string; icon: string; description: string; frequency: string; duration: string }, i: number) => ({
      _key: `activity-${i}`,
      _type: "object",
      name: a.name,
      icon: a.icon,
      description: a.description,
      frequency: a.frequency,
      duration: a.duration,
    })),
  });
  console.log("✅ activitiesPage");

  console.log("\n🎉 All data seeded successfully!");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
