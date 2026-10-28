import Link from "next/link";

import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { navHref, navItems } from "@/lib/navigation";

type FooterProps = {
  lang: Locale;
  dictionary: Dictionary;
};

export function Footer({ lang, dictionary }: FooterProps) {
  const year = new Date().getFullYear();
  const copyright = dictionary.footer.copyright.replace("{year}", String(year));

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="text-base font-semibold text-slate-900">{dictionary.header.logo}</p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-slate-500">
            {dictionary.footer.tagline}
          </p>
        </div>

        <nav aria-label={dictionary.footer.quickNavTitle}>
          <h2 className="text-sm font-semibold text-slate-900">
            {dictionary.footer.quickNavTitle}
          </h2>
          <ul className="mt-4 space-y-2">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={navHref(lang, item.path)}
                  className="text-sm text-slate-500 transition-colors hover:text-slate-900"
                >
                  {dictionary.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            {dictionary.footer.contactTitle}
          </h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-slate-400">{dictionary.footer.addressLabel}</dt>
              <dd className="mt-1 text-slate-600">{dictionary.footer.address}</dd>
            </div>
            <div>
              <dt className="text-slate-400">{dictionary.footer.phoneLabel}</dt>
              <dd className="mt-1">
                <a
                  href={`tel:${dictionary.footer.phone.replace(/\s/g, "")}`}
                  className="text-slate-600 transition-colors hover:text-slate-900"
                >
                  {dictionary.footer.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-slate-400">{dictionary.footer.emailLabel}</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${dictionary.footer.email}`}
                  className="text-slate-600 transition-colors hover:text-slate-900"
                >
                  {dictionary.footer.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-slate-500 sm:px-6">{copyright}</p>
      </div>
    </footer>
  );
}
