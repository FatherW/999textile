import en from "@/dictionaries/en.json";
import zhCN from "@/dictionaries/zh-CN.json";

import type { Locale } from "@/lib/i18n";

/** 把字面量收成基础类型，只比较字段结构，不比较文案内容。 */
type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? readonly Widen<U>[]
        : T extends object
          ? { [K in keyof T]: Widen<T[K]> }
          : T;

export type Dictionary = Widen<typeof zhCN>;

/** 两份字典必须同构，缺字段或字段类型不一致时这里会报错。 */
type AssertSame<A, B> = [A] extends [B] ? ([B] extends [A] ? true : never) : never;

const dictionariesMatch: AssertSame<Widen<typeof zhCN>, Widen<typeof en>> = true;
void dictionariesMatch;

const dictionaries: Record<Locale, Dictionary> = {
  "zh-CN": zhCN,
  en,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
