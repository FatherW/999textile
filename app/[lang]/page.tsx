import type { Metadata } from "next";
import Link from "next/link";

import { getDictionary } from "@/lib/dictionary";
import { resolveLocale, type LangParams } from "@/lib/locale";
import { localeAlternates, navHref } from "@/lib/navigation";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLocale(params);
  const dictionary = getDictionary(lang);

  return {
    title: { absolute: dictionary.meta.title },
    description: dictionary.meta.description,
    alternates: { languages: localeAlternates("") },
  };
}

export default async function HomePage({ params }: LangParams) {
  const lang = await resolveLocale(params);
  const dictionary = getDictionary(lang);

  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto flex min-h-[32rem] max-w-6xl flex-col justify-center px-4 py-20 sm:px-6">
          <p className="text-xs font-medium tracking-[0.22em] text-blue-900">
            {dictionary.home.eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            {dictionary.home.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-500">
            {dictionary.home.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={navHref(lang, "/about")}
              className="bg-slate-900 px-5 py-3 text-sm text-white transition-colors hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
            >
              {dictionary.home.cta}
            </Link>
            <Link
              href={navHref(lang, "/products")}
              className="border border-slate-300 bg-white px-5 py-3 text-sm text-slate-900 transition-colors hover:border-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
            >
              {dictionary.home.secondaryCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          {dictionary.home.highlightsTitle}
        </h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {dictionary.home.highlights.map((item) => (
            <li key={item.title} className="border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-500">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
