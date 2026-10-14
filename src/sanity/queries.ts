import { defineQuery } from "next-sanity";

/** Singletony mają stałe ID = nazwa typu (np. „homePage”). W podglądzie perspektywa „drafts” nakłada wersję roboczą. */
export const siteSettingsQuery = defineQuery(`*[_id == "siteSettings"][0]{
  ...,
  documents[]{ _key, title, "fileUrl": file.asset->url }
}`);

export const homePageQuery = defineQuery(`*[_id == "homePage"][0]`);
export const staffPageQuery = defineQuery(`*[_id == "staffPage"][0]`);
export const classroomsPageQuery = defineQuery(`*[_id == "classroomsPage"][0]`);
export const activitiesPageQuery = defineQuery(`*[_id == "activitiesPage"][0]`);
export const consultationPageQuery = defineQuery(`*[_id == "consultationPage"][0]`);
export const privacyPageQuery = defineQuery(`*[_id == "privacyPage"][0]`);
