"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, Leaf } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

function MicrosoftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
      <rect x="0" y="0" width="10" height="10" fill="#F25022" />
      <rect x="12" y="0" width="10" height="10" fill="#7FBA00" />
      <rect x="0" y="12" width="10" height="10" fill="#00A4EF" />
      <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48">
      <path
        fill="#4285F4"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#34A853"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.01 24.01 0 0 0 0 21.56l7.98-6.19z"
      />
      <path
        fill="#EA4335"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

function LeftPanel() {
  return (
    <div className="hidden md:flex relative w-1/2 flex-col items-center justify-center overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg, #0A5C50 0%, #0E7566 30%, #1A8B6E 50%, #2D9B6E 80%, #34A572 100%)
          `,
        }}
      />

      {/* Radial glow overlays for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 20%, rgba(255,255,255,0.08) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 80% 80%, rgba(45,155,110,0.3) 0%, transparent 50%)",
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-[15%] left-[10%] w-48 h-48 rounded-full bg-white/[0.08] blur-sm" />
      <div className="absolute bottom-[20%] right-[12%] w-64 h-64 rounded-full bg-white/[0.06] blur-md" />
      <div className="absolute top-[55%] left-[60%] w-32 h-32 rounded-full bg-white/[0.1]" />

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-12">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-6">
          <Leaf className="w-7 h-7 text-white" strokeWidth={2.5} />
          <span className="font-heading text-[28px] font-bold text-white">
            Parentfits
          </span>
        </div>

        {/* Tagline */}
        <p className="font-body text-lg text-white/85 mb-8">
          Benefits that work for parents
        </p>

        {/* Glassmorphism illustration */}
        <div className="relative w-[200px] h-[160px]">
          {/* Main card */}
          <div
            className="absolute inset-0 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/[0.15]"
            style={{ animation: "float 6s ease-in-out infinite" }}
          />

          {/* Floating decorative elements */}
          <div
            className="absolute -top-4 -right-6 w-12 h-12 rounded-lg bg-accent/30 border border-white/10"
            style={{
              animation: "float-slow 5s ease-in-out infinite",
              transform: "rotate(6deg)",
            }}
          />
          <div
            className="absolute -bottom-3 -left-5 w-10 h-10 rounded-lg bg-white/[0.15] border border-white/10"
            style={{
              animation: "float-reverse 7s ease-in-out infinite",
              transform: "rotate(-12deg)",
            }}
          />
          <div
            className="absolute top-6 -left-8 w-6 h-6 rounded-md bg-accent/20"
            style={{ animation: "float-slow 8s ease-in-out infinite" }}
          />
        </div>
      </div>

      {/* Bottom text */}
      <p className="absolute bottom-8 text-white/50 text-xs font-body text-center px-8">
        Trusted by leading employers across the UK
      </p>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <svg className="animate-spin h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

function OAuthButtons() {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  async function handleOAuthSignIn(provider: "azure" | "google") {
    setLoadingProvider(provider);
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        scopes: provider === "azure" ? "openid email profile" : undefined,
        redirectTo: `${window.location.origin}/auth/callback?next=/onboarding`,
      },
    });
  }

  return (
    <div className="flex flex-col gap-3">
      <Button
        variant="outline"
        fullWidth
        className="flex items-center justify-center gap-3"
        onClick={() => handleOAuthSignIn("azure")}
        disabled={loadingProvider !== null}
      >
        {loadingProvider === "azure" ? (
          <LoadingSpinner />
        ) : (
          <MicrosoftIcon />
        )}
        Continue with Microsoft
      </Button>
      <Button
        variant="outline"
        fullWidth
        className="flex items-center justify-center gap-3"
        disabled={loadingProvider !== null}
      >
        <GoogleIcon />
        Continue with Google
      </Button>
    </div>
  );
}

function Divider() {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-border" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-bg px-3 text-[13px] font-body text-text-secondary">
          or
        </span>
      </div>
    </div>
  );
}

interface PasswordFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

function PasswordField({ label, placeholder, value, onChange }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <Input
      label={label}
      type={visible ? "text" : "password"}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rightIcon={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      }
    />
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Input
        label="Email"
        type="email"
        placeholder="name@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="mt-3">
        <PasswordField
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={setPassword}
        />
        <div className="flex justify-end mt-2">
          <button
            type="button"
            className="font-body text-[13px] text-primary hover:underline cursor-pointer"
          >
            Forgot password?
          </button>
        </div>
      </div>

      <Button type="submit" fullWidth className="mt-4">
        Sign In
      </Button>
    </>
  );
}

function SignupForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="First name"
          type="text"
          placeholder="Jane"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          label="Last name"
          type="text"
          placeholder="Smith"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <Input
        label="Email"
        type="email"
        placeholder="name@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-3"
      />

      <div className="mt-3">
        <PasswordField
          label="Password"
          placeholder="Create a password"
          value={password}
          onChange={setPassword}
        />
      </div>

      <div className="mt-3">
        <PasswordField
          label="Confirm Password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />
      </div>

      <Button type="submit" fullWidth className="mt-4">
        Create Account
      </Button>
    </>
  );
}

function ErrorBanner() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  if (!error) return null;
  return (
    <div className="mb-6 rounded-lg border border-error/30 bg-error/5 px-4 py-3">
      <p className="font-body text-sm text-error">
        Sign-in failed. Please try again.
      </p>
    </div>
  );
}

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="flex min-h-screen">
      <LeftPanel />

      {/* Right panel */}
      <div className="w-full md:w-1/2 bg-bg flex items-center justify-center px-6 py-8 sm:px-12">
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <div className="md:hidden flex items-center gap-2 mb-12">
            <Leaf className="w-6 h-6 text-primary" strokeWidth={2.5} />
            <span className="font-heading text-2xl font-bold text-primary">
              Parentfits
            </span>
          </div>

          {/* Error banner */}
          <Suspense>
            <ErrorBanner />
          </Suspense>

          {/* Heading */}
          <div
            key={isSignup ? "signup" : "login"}
            className="animate-[fadeSlideIn_200ms_ease-out]"
          >
            <h1 className="font-heading text-[32px] font-bold text-text-primary mb-2">
              {isSignup ? "Create Account" : "Log In"}
            </h1>
            <p className="font-body text-[15px] text-text-secondary mb-8">
              {isSignup
                ? "Set up your account to get started with Parentfits."
                : "Enter your details to access your employer-enabled benefits."}
            </p>
          </div>

          <OAuthButtons />
          <Divider />

          {/* Form */}
          <form onSubmit={(e) => e.preventDefault()}>
            <div
              key={isSignup ? "signup-form" : "login-form"}
              className="animate-[fadeSlideIn_200ms_ease-out]"
            >
              {isSignup ? <SignupForm /> : <LoginForm />}
            </div>
          </form>

          {/* Toggle */}
          <p className="mt-6 text-center font-body text-sm text-text-secondary">
            {isSignup
              ? "Already have an account? "
              : "Don't have an account? "}
            <button
              type="button"
              onClick={() => setIsSignup((v) => !v)}
              className="text-primary font-medium hover:underline cursor-pointer"
            >
              {isSignup ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>

    </div>
  );
}
