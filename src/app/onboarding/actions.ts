"use server";

import { createClient } from "@/lib/supabase/server";

async function getAuthenticatedUserId() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  return { supabase, userId: user.id };
}

export async function saveIdentityType(identityType: string) {
  const { supabase, userId } = await getAuthenticatedUserId();
  const { error } = await supabase
    .from("users")
    .update({ identity_type: identityType, updated_at: new Date().toISOString() })
    .eq("id", userId);
  if (error) throw new Error(error.message);
}

export async function saveChildInfo(childCount: string, isExpecting: boolean) {
  const { supabase, userId } = await getAuthenticatedUserId();
  const { error } = await supabase
    .from("users")
    .update({
      child_count: childCount,
      is_expecting: isExpecting,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);
  if (error) throw new Error(error.message);
}

export async function saveChildAges(ageBuckets: string[]) {
  const { supabase, userId } = await getAuthenticatedUserId();
  const { error } = await supabase
    .from("users")
    .update({ child_age_buckets: ageBuckets, updated_at: new Date().toISOString() })
    .eq("id", userId);
  if (error) throw new Error(error.message);
}

export async function saveLocation(town: string, county: string) {
  const { supabase, userId } = await getAuthenticatedUserId();
  const { error } = await supabase
    .from("users")
    .update({ town, county, updated_at: new Date().toISOString() })
    .eq("id", userId);
  if (error) throw new Error(error.message);
}

export async function saveSupportNeeds(needs: string[]) {
  const { supabase, userId } = await getAuthenticatedUserId();
  const { error } = await supabase
    .from("users")
    .update({ support_needs: needs, updated_at: new Date().toISOString() })
    .eq("id", userId);
  if (error) throw new Error(error.message);
}

export async function completeOnboarding() {
  const { supabase, userId } = await getAuthenticatedUserId();
  const { error } = await supabase
    .from("users")
    .update({ onboarding_completed: true, updated_at: new Date().toISOString() })
    .eq("id", userId);
  if (error) throw new Error(error.message);
}
