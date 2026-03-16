import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const errorParam = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");
  const next = searchParams.get("next") ?? "/onboarding";

  // Handle OAuth error response from provider (e.g. Azure access denied)
  if (errorParam) {
    const message = errorDescription || errorParam;
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(message)}`
    );
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Ensure a row exists in the public.users table for this authenticated user
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const meta = user.user_metadata ?? {};
        await supabase.from("users").upsert(
          {
            id: user.id,
            email: user.email ?? meta.email ?? null,
            first_name: meta.full_name?.split(" ")[0] ?? meta.name?.split(" ")[0] ?? null,
            last_name: meta.full_name?.split(" ").slice(1).join(" ") ?? meta.name?.split(" ").slice(1).join(" ") ?? null,
            avatar_url: meta.avatar_url ?? meta.picture ?? null,
          },
          { onConflict: "id" }
        );
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(error.message)}`
    );
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback_error`);
}
