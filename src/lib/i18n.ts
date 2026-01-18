import en from '@/messages/en.json'
import fr from '@/messages/fr.json'

export type Locale = 'en' | 'fr'

const dict = { en, fr } as const

export function getLocale(input: string | undefined): Locale {
  return input === 'fr' ? 'fr' : 'en'
}

export function t(locale: Locale) {
  const m = dict[locale]
  return (key: keyof typeof m) => m[key]
}
