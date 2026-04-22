import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fontHtmlClassName } from "./fonts";
import { SITE_CONFIG, NAVIGATION_LINKS, COMPANY_METADATA } from "@/lib/constants";
import TerminalCTA from "@/components/sections/TerminalCTA";
import "./globals.css";

export default function NotFound() {
  return (
    <html lang="fi" className={fontHtmlClassName}>
      <body className="flex flex-col min-h-screen bg-brand-bg">
        <header className="sticky z-[9999] top-0 w-full bg-brand-bg border-b border-black/10">
          <nav className="w-full flex items-center justify-between px-6 md:px-10 py-6">
            <Link
              href="/fi"
              className="text-2xl font-bold tracking-tighter hover:opacity-70 transition text-brand-primary"
            >
              {COMPANY_METADATA.name}
            </Link>
            <div className="hidden md:flex items-center gap-1">
              {NAVIGATION_LINKS.map((item) => (
                <Link
                  key={item.link}
                  href={item.fi.href}
                  className="px-3 py-2 text-sm text-gray-700 hover:text-brand-primary transition"
                >
                  {item.fi.name}
                </Link>
              ))}
            </div>
            <Button asChild>
              <Link href={`/fi/${SITE_CONFIG.i18n.routes.contact.fi}`}>
                Varaa aika
              </Link>
            </Button>
          </nav>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center py-64 px-6 text-center">
          <h1 className="font-heading italic text-6xl md:text-8xl text-brand-primary mb-4">
            404
          </h1>
          <p className="text-xl text-gray-700 mb-2">Sivua ei löydy</p>
          <p className="text-gray-500 mb-10 max-w-md">
            Etsimääsi sivua ei ole olemassa tai se on siirretty.
          </p>
          <Button asChild>
            <Link href="/fi">Palaa etusivulle</Link>
          </Button>
        </main>

        <TerminalCTA
          title="Tervetuloa juuri sellaisena kuin olet"
          paragraph="Uskon, että jokaisessa ihmisessä on jo olemassa suunta kohti tasapainoa. Joskus tarvitsemme vain toisen ihmisen kulkemaan hetken rinnalla."
          buttons={[{ label: "Varaa aika", href: `/fi/${SITE_CONFIG.i18n.routes.contact.fi}` }]}
        />

        <footer>
          <div className="bg-brand-primary border-t border-white/[0.05] px-6 py-12">
            <div className="container flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-brand-footer-text/70 text-xs">
              <div>
                <p className="font-link text-xl font-medium text-white mb-1.5">
                  {COMPANY_METADATA.name}
                </p>
                <p className="text-base">Lyhytterapeutti</p>
              </div>
              <div className="text-right">
                <a
                  href={`mailto:${COMPANY_METADATA.contact.email}`}
                  className="text-white hover:opacity-80 transition text-xl font-medium"
                >
                  {COMPANY_METADATA.contact.email}
                </a>
                <p className="text-base mt-1.5">
                  © {new Date().getFullYear()} {COMPANY_METADATA.name}
                </p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
