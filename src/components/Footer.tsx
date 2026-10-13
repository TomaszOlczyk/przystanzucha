import Link from "next/link";
import type { SiteSettings } from "@/sanity/types";
import { nav } from "@/content/home";
import Logo from "./Logo";
import Wave from "./Wave";
import CookieSettingsLink from "./CookieSettingsLink";
import { GTM_ID } from "@/lib/analytics";
import { POLICY_PATH } from "@/content/privacy";

export default function Footer({ siteData }: { siteData: SiteSettings }) {
  const tel = siteData.phone.replace(/\s/g, "");
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${siteData.name}, ${siteData.address.street}, ${siteData.address.zip} ${siteData.address.city}`,
  )}`;

  return (
    <footer className="mt-8">
      <Wave fill="var(--color-ink)" />
      <div className="bg-[var(--color-ink)] text-white/85 pb-20 lg:pb-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Logo name={siteData.name} light />
            <p className="mt-4 text-sm leading-relaxed text-white/70 max-w-sm">
              Kameralne przedszkole z elementami pedagogiki Montessori na łódzkiej Retkini. Dwie małe grupy, adaptacja razem z rodzicem.
            </p>
            <div className="flex gap-3 mt-5">
              <a href={siteData.social.facebook} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-sm font-semibold">
                Facebook
              </a>
              <a href={siteData.social.instagram} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-sm font-semibold">
                Instagram
              </a>
            </div>
          </div>

          <div>
            <h2 className="font-display text-lg text-white mb-4">Kontakt</h2>
            <address className="not-italic space-y-2.5 text-sm">
              <p>
                {siteData.address.street}
                <br />
                {siteData.address.zip} {siteData.address.city} (Retkinia)
              </p>
              <p>
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-white">
                  Wyznacz trasę
                </a>
              </p>
              <p>
                <a href={`tel:${tel}`} data-loc="stopka" className="font-bold text-white hover:underline underline-offset-4">
                  {siteData.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${siteData.email}`} data-loc="stopka" className="hover:text-white underline underline-offset-4">
                  {siteData.email}
                </a>
              </p>
              <p className="text-white/70">{siteData.hours}</p>
            </address>
          </div>

          <div>
            <h2 className="font-display text-lg text-white mb-4">Na skróty</h2>
            <ul className="space-y-2 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white hover:underline underline-offset-4">
                    {item.label}
                  </Link>
                </li>
              ))}
              {siteData.documents?.map((doc) => (
                <li key={doc.title}>
                  <a href={`${doc.fileUrl}?dl=`} className="hover:text-white hover:underline underline-offset-4">
                    {doc.title.charAt(0) + doc.title.slice(1).toLowerCase()} (do pobrania)
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row gap-3 justify-between text-xs text-white/60">
            <p>&copy; {new Date().getFullYear()} Przystań Zucha Sp. z o.o.</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <Link href={POLICY_PATH} className="underline underline-offset-4 hover:text-white">
                Polityka prywatności
              </Link>
              {GTM_ID && <CookieSettingsLink className="text-left underline underline-offset-4 hover:text-white" />}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
