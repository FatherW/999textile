import type { Metadata } from "next";

import "@/app/globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getDictionary } from "@/lib/dictionary";
import { locales } from "@/lib/i18n";
import { resolveLocale, type LangParams } from "@/lib/locale";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLocale(params);
  const dictionary = getDictionary(lang);

  return {
    title: {
      default: dictionary.meta.title,
      template: `%s | ${dictionary.meta.siteName}`,
    },
    description: dictionary.meta.description,
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const lang = await resolveLocale(params);
  const dictionary = getDictionary(lang);

  return (
    <html lang={lang}>
      <body className="bg-white font-sans text-slate-900 antialiased">
        <div className="flex min-h-screen flex-col">
          <a
            href="#content"
            className="absolute left-4 top-4 z-50 -translate-y-24 bg-white px-4 py-2 text-sm text-slate-900 shadow focus:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
          >
            {dictionary.common.skipToContent}
          </a>
          <Header lang={lang} dictionary={dictionary} />
          <main id="content" className="flex-1">
            {children}
          </main>
          <Footer lang={lang} dictionary={dictionary} />
        </div>
      </body>
    </html>
  );
}
