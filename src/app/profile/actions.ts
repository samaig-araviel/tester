"use server";

import { createClient } from "@/lib/supabase/server";

async function getAuthenticatedUserId() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  return { supabase, userId: user.id };
}

export async function savePersonalInfo(data: {
  first_name: string;
  last_name: string;
  country: string;
}) {
  const { supabase, userId } = await getAuthenticatedUserId();
  const { error } = await supabase
    .from("users")
    .update({
      first_name: data.first_name,
      last_name: data.last_name,
      country: data.country,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);
  if (error) throw new Error(error.message);
}

export async function saveFamilyProfile(data: {
  child_age_buckets: string[];
  child_count: string;
  is_expecting: boolean;
  postcode: string;
}) {
  const { supabase, userId } = await getAuthenticatedUserId();
  const { error } = await supabase
    .from("users")
    .update({
      child_age_buckets: data.child_age_buckets,
      child_count: data.child_count,
      is_expecting: data.is_expecting,
      postcode: data.postcode,
      onboarding_completed: true,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);
  if (error) throw new Error(error.message);
}

export async function saveWorkInfo(data: {
  employment_type: string;
  work_location: string;
  working_pattern: string;
}) {
  const { supabase, userId } = await getAuthenticatedUserId();
  const { error } = await supabase
    .from("users")
    .update({
      employment_type: data.employment_type,
      work_location: data.work_location,
      working_pattern: data.working_pattern,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);
  if (error) throw new Error(error.message);
}

export async function savePrivacyToggle(field: "share_data" | "marketing_opt_in", value: boolean) {
  const { supabase, userId } = await getAuthenticatedUserId();
  const { error } = await supabase
    .from("users")
    .update({
      [field]: value,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);
  if (error) throw new Error(error.message);
}

export async function saveAvatar(avatarUrl: string) {
  const { supabase, userId } = await getAuthenticatedUserId();
  const { error } = await supabase
    .from("users")
    .update({
      avatar_url: avatarUrl,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);
  if (error) throw new Error(error.message);
}
