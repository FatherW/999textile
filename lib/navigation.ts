import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

/**
 * 导航只维护路径和字典键。
 * 新增页面时：在 app/[lang] 下加路由，给两份字典补上文案，再在这里加一项。
 */
type NavKey = Exclude<keyof Dictionary["nav"], "label">;

export type NavItem = {
  key: NavKey;
  path: string;
};

export const navItems: readonly NavItem[] = [
  { key: "home", path: "" },
  { key: "about", path: "/about" },
  { key: "products", path: "/products" },
];

export function navHref(lang: Locale, path: string): string {
  return path.length === 0 ? `/${lang}` : `/${lang}${path}`;
}

export function isNavActive(pathname: string, lang: Locale, path: string): boolean {
  const href = navHref(lang, path);

  if (path.length === 0) {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function localeAlternates(path: string): Record<Locale, string> {
  return {
    "zh-CN": navHref("zh-CN", path),
    en: navHref("en", path),
  };
}
