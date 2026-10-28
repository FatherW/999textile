import { notFound } from "next/navigation";

import { isLocale, type Locale } from "@/lib/i18n";

export type LangParams = {
  params: Promise<{ lang: string }>;
};

export async function resolveLocale(params: Promise<{ lang: string }>): Promise<Locale> {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  return lang;
}
