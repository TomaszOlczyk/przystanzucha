export const siteSettingsQuery = `*[_type == "siteSettings"][0]`;

export const staffPageQuery = `*[_type == "staffPage"][0]{
  title, subtitle,
  members[]{name, role, image, description, qualifications}
}`;

export const classroomsPageQuery = `*[_type == "classroomsPage"][0]{
  title, subtitle,
  room{name, image, description, features},
  uses[]{name, icon, description},
  materials[]{category, icon, items}
}`;

export const activitiesPageQuery = `*[_type == "activitiesPage"][0]{
  title, subtitle, badge,
  activities[]{name, icon, description, frequency, duration, image}
}`;
