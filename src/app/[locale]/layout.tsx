import '@/app/globals.css'
import Link from 'next/link'
import Image from 'next/image'
import { getLocale, t } from '@/lib/i18n'

export const metadata = {
  title: 'SkyAnalytix',
  description: 'AI-powered security & operational intelligence',
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const locale = getLocale(params.locale)
  const tt = t(locale)

  const otherLocale = locale === 'en' ? 'fr' : 'en'

  return (
    <html lang={locale}>
      <body>
        <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-600" />
              <span className="font-bold tracking-tight">SkyAnalytix</span>
            </Link>

            <nav className="hidden md:flex items-center gap-5 text-sm">
              <Link href={`/${locale}`}>{tt('nav.home')}</Link>
              <Link href={`/${locale}/solutions/retail`}>{tt('nav.retail')}</Link>
              <Link href={`/${locale}/solutions/eldercare`}>{tt('nav.eldercare')}</Link>
              <Link href={`/${locale}/about`}>{tt('nav.about')}</Link>
              <Link href={`/${locale}/contact`}>{tt('nav.contact')}</Link>
              <Link href={`/${locale}/pricing`}>{tt('nav.pricing')}</Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href={`/${otherLocale}${locale === 'en' ? '' : ''}`}
                className="text-xs px-3 py-1.5 rounded-full border hover:bg-gray-50"
                prefetch={false}
              >
                {otherLocale.toUpperCase()}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="text-sm px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700"
              >
                {tt('hero.ctaPrimary')}
              </Link>
            </div>
          </div>
        </header>

        <main>{children}</main>

        <footer className="border-t mt-16">
          <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-gray-600 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <Image src="/logos/skycloud.svg" alt="SkyCloud" width={24} height={24} />
              <span>© {new Date().getFullYear()} SkyAnalytix. {tt('footer.rights')}</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/${locale}/terms`} className="hover:text-gray-900">Terms</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
