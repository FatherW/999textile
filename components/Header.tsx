"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { isNavActive, navHref, navItems } from "@/lib/navigation";

type HeaderProps = {
  lang: Locale;
  dictionary: Dictionary;
};

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      {open ? (
        <path
          d="M6 6l12 12M18 6L6 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      ) : (
        <path
          d="M4 7h16M4 12h16M4 17h16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      )}
    </svg>
  );
}

export function Header({ lang, dictionary }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const links = navItems.map((item) => {
    const href = navHref(lang, item.path);
    const active = isNavActive(pathname, lang, item.path);

    return (
      <Link
        key={item.key}
        href={href}
        aria-current={active ? "page" : undefined}
        className={
          active
            ? "text-sm font-medium text-blue-900"
            : "text-sm text-slate-600 transition-colors hover:text-slate-900"
        }
      >
        {dictionary.nav[item.key]}
      </Link>
    );
  });

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link
          href={navHref(lang, "")}
          className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-900"
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center bg-slate-900 text-xs font-semibold tracking-wider text-white"
          >
            {dictionary.header.logoMark}
          </span>
          <span className="text-base font-semibold tracking-wide text-slate-900">
            {dictionary.header.logo}
          </span>
        </Link>

        <div className="ml-auto hidden items-center gap-8 md:flex">
          <nav aria-label={dictionary.nav.label} className="flex items-center gap-8">
            {links}
          </nav>
          <LanguageSwitcher lang={lang} language={dictionary.language} />
        </div>

        <button
          type="button"
          className="ml-auto inline-flex h-10 w-10 items-center justify-center text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? dictionary.header.menuClose : dictionary.header.menuOpen}
          onClick={() => setOpen((current) => !current)}
        >
          <MenuIcon open={open} />
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-slate-200 bg-white md:hidden">
          <nav aria-label={dictionary.nav.label} className="mx-auto flex max-w-6xl flex-col px-4 py-4 sm:px-6">
            {navItems.map((item) => {
              const href = navHref(lang, item.path);
              const active = isNavActive(pathname, lang, item.path);

              return (
                <Link
                  key={item.key}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={
                    active
                      ? "border-b border-slate-100 py-3 text-sm font-medium text-blue-900"
                      : "border-b border-slate-100 py-3 text-sm text-slate-600"
                  }
                >
                  {dictionary.nav[item.key]}
                </Link>
              );
            })}
            <div className="py-4">
              <LanguageSwitcher lang={lang} language={dictionary.language} />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
