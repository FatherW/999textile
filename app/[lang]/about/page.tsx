import type { Metadata } from "next";

import { getDictionary } from "@/lib/dictionary";
import { resolveLocale, type LangParams } from "@/lib/locale";
import { localeAlternates } from "@/lib/navigation";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLocale(params);
  const dictionary = getDictionary(lang);

  return {
    title: dictionary.about.title,
    description: dictionary.about.description,
    alternates: { languages: localeAlternates("/about") },
  };
}

export default async function AboutPage({ params }: LangParams) {
  const lang = await resolveLocale(params);
  const dictionary = getDictionary(lang);

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:py-24">
      <header>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
          {dictionary.about.title}
        </h1>
        <p className="mt-6 text-base leading-7 text-slate-500">{dictionary.about.description}</p>
      </header>

      <ol className="space-y-8">
        {dictionary.about.points.map((point, index) => (
          <li key={point.title} className="border-t border-slate-200 pt-6">
            <p className="text-xs tracking-[0.18em] text-blue-900">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">{point.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">{point.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
