"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Dictionary } from "@/lib/dictionary";
import { locales, localizePath, type Locale } from "@/lib/i18n";

type LanguageSwitcherProps = {
  lang: Locale;
  language: Dictionary["language"];
};

export function LanguageSwitcher({ lang, language }: LanguageSwitcherProps) {
  const pathname = usePathname();

  return (
    <div role="group" aria-label={language.label} className="flex items-center gap-2 text-sm">
      {locales.map((locale, index) => {
        const active = locale === lang;
        const className = active
          ? "font-semibold text-slate-900"
          : "text-slate-400 transition-colors hover:text-slate-900";

        return (
          <span key={locale} className="flex items-center gap-2">
            {index > 0 ? (
              <span aria-hidden="true" className="text-slate-300">
                /
              </span>
            ) : null}
            {active ? (
              <span aria-current="true" className={className}>
                {language[locale]}
              </span>
            ) : (
              <Link
                href={localizePath(pathname, locale)}
                hrefLang={locale}
                lang={locale}
                className={`${className} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-900`}
              >
                {language[locale]}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
}
