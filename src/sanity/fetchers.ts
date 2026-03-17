import { client } from "./client";
import {
  siteSettingsQuery,
  staffPageQuery,
  classroomsPageQuery,
  activitiesPageQuery,
} from "./queries";
import type {
  SiteSettings,
  StaffPage,
  ClassroomsPage,
  ActivitiesPage,
} from "./types";

export async function getSiteSettings(): Promise<SiteSettings> {
  return client.fetch(siteSettingsQuery);
}

export async function getStaffPage(): Promise<StaffPage> {
  return client.fetch(staffPageQuery);
}

export async function getClassroomsPage(): Promise<ClassroomsPage> {
  return client.fetch(classroomsPageQuery);
}

export async function getActivitiesPage(): Promise<ActivitiesPage> {
  return client.fetch(activitiesPageQuery);
}
