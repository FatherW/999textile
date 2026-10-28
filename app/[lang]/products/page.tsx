import type { Metadata } from "next";

import { getDictionary } from "@/lib/dictionary";
import { resolveLocale, type LangParams } from "@/lib/locale";
import { localeAlternates } from "@/lib/navigation";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLocale(params);
  const dictionary = getDictionary(lang);

  return {
    title: dictionary.products.title,
    description: dictionary.products.description,
    alternates: { languages: localeAlternates("/products") },
  };
}

export default async function ProductsPage({ params }: LangParams) {
  const lang = await resolveLocale(params);
  const dictionary = getDictionary(lang);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
          {dictionary.products.title}
        </h1>
        <p className="mt-6 text-base leading-7 text-slate-500">
          {dictionary.products.description}
        </p>
      </header>

      <ul className="mt-12 grid gap-6 md:grid-cols-3">
        {dictionary.products.items.map((item) => (
          <li key={item.name} className="flex flex-col border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">{item.name}</h2>
            <p className="mt-3 flex-1 text-sm leading-6 text-slate-500">{item.summary}</p>
          </li>
        ))}
      </ul>

      <p className="mt-10 border border-dashed border-slate-300 px-4 py-3 text-sm text-slate-500">
        {dictionary.products.note}
      </p>
    </div>
  );
}
