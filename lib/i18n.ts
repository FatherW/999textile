/** 站点支持的语言。新增语言时，在此登记并补齐对应字典。 */
export const locales = ["zh-CN", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "zh-CN";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * 按 Accept-Language 的权重选择语言。
 * 无法识别时回退到简体中文。
 */
export function negotiateLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) {
    return defaultLocale;
  }

  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [rawTag, ...params] = part.trim().split(";");
      const tag = rawTag?.trim().toLowerCase() ?? "";
      const qParam = params.find((item) => item.trim().startsWith("q="));
      const q = qParam ? Number(qParam.trim().slice(2)) : 1;

      return { tag, q: Number.isFinite(q) ? q : 0 };
    })
    .filter((item) => item.tag.length > 0)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    if (tag.startsWith("zh")) {
      return "zh-CN";
    }

    if (tag.startsWith("en")) {
      return "en";
    }
  }

  return defaultLocale;
}

/** 替换路径中的语言段，保留当前页面路径。 */
export function localizePath(pathname: string, locale: Locale): string {
  const segments = pathname.split("/");

  if (segments.length > 1 && isLocale(segments[1] ?? "")) {
    segments[1] = locale;
    const nextPath = segments.join("/");
    return nextPath.length > 0 ? nextPath : `/${locale}`;
  }

  if (pathname === "/" || pathname.length === 0) {
    return `/${locale}`;
  }

  const suffix = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `/${locale}${suffix}`;
}
