"use client";

import { Button } from "@/components/ui/button";

export function SocialAuthButtons({ mode = "signin" }: { mode?: "signin" | "signup" }) {
  const verb = mode === "signin" ? "Sign in" : "Sign up";
  async function go(provider: string) {
    // Placeholder — wire to Supabase Auth (supabase.auth.signInWithOAuth) once configured.
    // For now we just route to /dashboard so the flow feels real.
    window.location.href = `/api/auth/${provider}`;
  }
  return (
    <div className="grid grid-cols-1 gap-2">
      <Button
        variant="secondary"
        size="lg"
        type="button"
        className="w-full"
        onClick={() => go("google")}
      >
        <GoogleIcon /> {verb} with Google
      </Button>
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="secondary"
          size="lg"
          type="button"
          className="w-full"
          onClick={() => go("github")}
        >
          <GitHubIcon /> GitHub
        </Button>
        <Button
          variant="secondary"
          size="lg"
          type="button"
          className="w-full"
          onClick={() => go("microsoft")}
        >
          <MicrosoftIcon /> Microsoft
        </Button>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.3a9.8 9.8 0 0 0 2.9-7.3z"/>
      <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.7-2.4l-3.3-2.5a6 6 0 0 1-9-3.2H3v2.6A10 10 0 0 0 12 22z"/>
      <path fill="#FBBC04" d="M6.4 13.9a6 6 0 0 1 0-3.8V7.5H3a10 10 0 0 0 0 9l3.4-2.6z"/>
      <path fill="#EA4335" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3 7.5l3.4 2.6A6 6 0 0 1 12 6z"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path fill="#0d1117" d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-2c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.5 2.4 1.1 3 .8.1-.7.4-1.1.7-1.4-2.2-.3-4.5-1.1-4.5-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c2-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.7.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.5 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2z"/>
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path fill="#F25022" d="M3 3h8v8H3z"/>
      <path fill="#7FBA00" d="M13 3h8v8h-8z"/>
      <path fill="#00A4EF" d="M3 13h8v8H3z"/>
      <path fill="#FFB900" d="M13 13h8v8h-8z"/>
    </svg>
  );
}
