export function IntegrationLogo({
  k,
  className = "h-5 w-5",
}: { k: "slack" | "google" | "github" | "notion" | "figma"; className?: string }) {
  const logos: Record<string, React.ReactNode> = {
    slack: (
      <svg viewBox="0 0 24 24" className={className} aria-hidden>
        <path fill="#E01E5A" d="M5.5 15a2 2 0 1 1 0-4h2v2a2 2 0 0 1-2 2zm1-2a1 1 0 0 0 0 2 1 1 0 0 0 0-2z"/>
        <path fill="#36C5F0" d="M9 15.5a2 2 0 0 1-4 0v-5a2 2 0 1 1 4 0v5zM9 5.5a2 2 0 1 1 0 4H7v-2a2 2 0 0 1 2-2z"/>
        <path fill="#2EB67D" d="M13.5 7a2 2 0 1 1 0 4h-2V9a2 2 0 0 1 2-2zm5 2a2 2 0 0 1 0 4h-5a2 2 0 1 1 0-4h5z"/>
        <path fill="#ECB22E" d="M18.5 9a2 2 0 1 1 0-4h-2v2a2 2 0 0 0 2 2zM15 18.5a2 2 0 0 1-4 0v-5a2 2 0 1 1 4 0v5z"/>
      </svg>
    ),
    google: (
      <svg viewBox="0 0 24 24" className={className} aria-hidden>
        <path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.3a9.8 9.8 0 0 0 2.9-7.3z"/>
        <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.7-2.4l-3.3-2.5a6 6 0 0 1-9-3.2H3v2.6A10 10 0 0 0 12 22z"/>
        <path fill="#FBBC04" d="M6.4 13.9a6 6 0 0 1 0-3.8V7.5H3a10 10 0 0 0 0 9l3.4-2.6z"/>
        <path fill="#EA4335" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3 7.5l3.4 2.6A6 6 0 0 1 12 6z"/>
      </svg>
    ),
    github: (
      <svg viewBox="0 0 24 24" className={className} aria-hidden>
        <path fill="#0d1117" d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-2c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.5 2.4 1.1 3 .8.1-.7.4-1.1.7-1.4-2.2-.3-4.5-1.1-4.5-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c2-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.7.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.5 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2z"/>
      </svg>
    ),
    notion: (
      <svg viewBox="0 0 24 24" className={className} aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="3" fill="#fff" stroke="#0f0f0f" strokeWidth="1.3"/>
        <path d="M7 7v10M7 7l8 10M15 7v10" stroke="#0f0f0f" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
    figma: (
      <svg viewBox="0 0 24 24" className={className} aria-hidden>
        <path fill="#F24E1E" d="M8 3h4v6H8a3 3 0 1 1 0-6z"/>
        <path fill="#A259FF" d="M12 9h4a3 3 0 1 1 0 6h-4V9z"/>
        <path fill="#0ACF83" d="M8 15h4v3a3 3 0 1 1-4-3z"/>
        <path fill="#FF7262" d="M12 3h4a3 3 0 1 1 0 6h-4V3z"/>
        <circle cx="15" cy="12" r="3" fill="#1ABCFE"/>
      </svg>
    ),
  };
  return <>{logos[k]}</>;
}
