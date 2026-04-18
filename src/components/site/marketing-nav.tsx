"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export function MarketingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkCls =
    "text-sm text-[var(--color-muted-foreground)] hover:text-foreground transition-colors";

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all ${
        scrolled
          ? "backdrop-blur-xl bg-white/75 border-b border-[var(--color-border)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1200px] px-6 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#how" className={linkCls}>How it works</Link>
          <Link href="#integrations" className={linkCls}>Integrations</Link>
          <Link href="#pricing" className={linkCls}>Pricing</Link>
          <Link href="#faq" className={linkCls}>FAQ</Link>
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <Link href="/login">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Start free scan</Button>
          </Link>
        </div>
        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-white">
          <div className="px-6 py-4 flex flex-col gap-3">
            <Link href="#how" className={linkCls} onClick={() => setOpen(false)}>How it works</Link>
            <Link href="#integrations" className={linkCls} onClick={() => setOpen(false)}>Integrations</Link>
            <Link href="#pricing" className={linkCls} onClick={() => setOpen(false)}>Pricing</Link>
            <Link href="#faq" className={linkCls} onClick={() => setOpen(false)}>FAQ</Link>
            <div className="flex gap-2 pt-2">
              <Link href="/login" className="flex-1"><Button variant="secondary" className="w-full">Sign in</Button></Link>
              <Link href="/signup" className="flex-1"><Button className="w-full">Start free</Button></Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
