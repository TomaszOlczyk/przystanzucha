import Link from "next/link";
import type { SiteSettings } from "@/sanity/types";
import { nav } from "@/content/home";
import Logo from "./Logo";
import CookieSettingsLink from "./CookieSettingsLink";
import { GTM_ID } from "@/lib/analytics";
import { POLICY_PATH } from "@/content/privacy";
import { directionsUrl, mapsQuery } from "@/lib/maps";

export default function Footer({ siteData }: { siteData: SiteSettings }) {
  const tel = siteData.phone.replace(/\s/g, "");
  const mapsUrl = directionsUrl(mapsQuery(siteData.address.street, siteData.address.zip, siteData.address.city));

  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-paper)]/80 pb-24 lg:pb-0">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 pt-16 md:pt-24">
        <p className="t-hero !text-[clamp(2.8rem,6.4vw,6rem)] text-[var(--color-paper)] max-w-[14ch]">
          Do zobaczenia <span className="text-[var(--color-sun)]">na Retkini.</span>
        </p>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 items-center">
          <Link href="/#kontakt" data-cta="umow_wizyte" data-loc="stopka" className="btn btn-primary">
            Umów bezpłatną wizytę <span className="arr">→</span>
          </Link>
          <a href={`tel:${tel}`} data-loc="stopka" className="link-u text-[var(--color-paper)] text-lg">
            {siteData.phone}
          </a>
        </div>

        <div className="mt-16 md:mt-24 pt-10 border-t border-white/12 grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr] text-sm">
          <div>
            <Logo name={siteData.name} light />
            <p className="mt-4 leading-relaxed max-w-xs text-[var(--color-paper)]/65">
              Kameralne przedszkole z elementami pedagogiki Montessori na łódzkiej Retkini.
            </p>
          </div>
          <div>
            <p className="t-label !text-[var(--color-paper)]/50 mb-4">Adres</p>
            <address className="not-italic leading-relaxed">
              {siteData.address.street}
              <br />
              {siteData.address.zip} {siteData.address.city}
            </address>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 link-u text-[var(--color-paper)]">
              Nawiguj do przedszkola
            </a>
          </div>
          <div>
            <p className="t-label !text-[var(--color-paper)]/50 mb-4">Kontakt</p>
            <a href={`mailto:${siteData.email}`} data-loc="stopka" className="block hover:text-[var(--color-paper)]">
              {siteData.email}
            </a>
            <p className="mt-2">{siteData.hours}</p>
            <div className="mt-4 flex gap-5">
              <a href={siteData.social.facebook} target="_blank" rel="noopener noreferrer" className="link-u text-[var(--color-paper)]">Facebook</a>
              <a href={siteData.social.instagram} target="_blank" rel="noopener noreferrer" className="link-u text-[var(--color-paper)]">Instagram</a>
            </div>
          </div>
          <div>
            <p className="t-label !text-[var(--color-paper)]/50 mb-4">Na skróty</p>
            <ul className="space-y-1.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-[var(--color-paper)]">
                    {item.label}
                  </Link>
                </li>
              ))}
              {siteData.documents?.map((doc) => (
                <li key={doc.title}>
                  <a href={`${doc.fileUrl}?dl=`} className="hover:text-[var(--color-paper)]">
                    {doc.title.charAt(0) + doc.title.slice(1).toLowerCase()}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 py-6 border-t border-white/12 flex flex-col sm:flex-row gap-3 justify-between text-xs text-[var(--color-paper)]/55">
          <p>&copy; {new Date().getFullYear()} Przystań Zucha Sp. z o.o.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href={POLICY_PATH} className="hover:text-[var(--color-paper)] underline underline-offset-4">
              Polityka prywatności
            </Link>
            {GTM_ID && <CookieSettingsLink className="text-left hover:text-[var(--color-paper)] underline underline-offset-4" />}
          </div>
        </div>
      </div>
    </footer>
  );
}
