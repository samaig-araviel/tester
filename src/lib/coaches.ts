import { createClient } from "@/lib/supabase/server";

export type AvatarTone = "teal" | "sage" | "gold" | "sand";

export interface Coach {
  id: string;
  name: string;
  initials: string;
  specialism: string;
  tags: string[];
  avatarTone: AvatarTone;
  email: string;
}

const AVATAR_TONE_CYCLE: AvatarTone[] = ["teal", "sage", "gold", "sand"];

interface CoachRow {
  id: string;
  name: string;
  initials: string;
  specialism: string;
  tags: string[] | null;
  email: string;
}

export async function getCoaches(): Promise<Coach[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("coaches")
    .select("id, name, initials, specialism, tags, email")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Failed to load coaches: ${error.message}`);
  }

  return (data ?? []).map((row: CoachRow, index): Coach => ({
    id: row.id,
    name: row.name,
    initials: row.initials,
    specialism: row.specialism,
    tags: row.tags ?? [],
    avatarTone: AVATAR_TONE_CYCLE[index % AVATAR_TONE_CYCLE.length],
    email: row.email,
  }));
}
