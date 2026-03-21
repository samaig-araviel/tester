import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: ["/dashboard/:path*", "/onboarding", "/explore/:path*", "/parents-hub", "/offer/:path*", "/saved", "/profile"],
};
