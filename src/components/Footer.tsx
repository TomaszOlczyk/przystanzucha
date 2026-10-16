import Link from "next/link";
import { stegaClean } from "next-sanity";
import type { SiteSettings } from "@/sanity/types";
import { zAkcentem } from "@/lib/akcent";
import Logo from "./Logo";
import CookieSettingsLink from "./CookieSettingsLink";
import { GTM_ID } from "@/lib/analytics";
import { POLICY_PATH } from "@/lib/site";
import { directionsUrl, mapsQuery } from "@/lib/maps";

export default function Footer({ siteData }: { siteData: SiteSettings }) {
  const tel = stegaClean(siteData.phone).replace(/\s/g, "");
  const adres = stegaClean(siteData.address);
  const mapsUrl = directionsUrl(mapsQuery(adres.street, adres.zip, adres.city));
  const { footer } = siteData;
  const nav = siteData.navigation.filter((item) => item?.label && item?.href);
  const facebook = stegaClean(siteData.social?.facebook);
  const instagram = stegaClean(siteData.social?.instagram);

  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-paper)]/80 pb-24 lg:pb-0">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 pt-16 md:pt-24">
        <p className="t-hero !text-[clamp(2.8rem,6.4vw,6rem)] text-[var(--color-paper)] max-w-[14ch]">
          {zAkcentem(footer.heading, (f) => <span className="text-[var(--color-sun)]">{f}</span>)}
        </p>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 items-center">
          <Link href="/#kontakt" data-cta="umow_wizyte" data-loc="stopka" className="btn btn-primary">
            {footer.ctaText} <span className="arr">→</span>
          </Link>
          <a href={`tel:${tel}`} data-loc="stopka" className="link-u text-[var(--color-paper)] text-lg">
            {siteData.phone}
          </a>
        </div>

        <div className="mt-16 md:mt-24 pt-10 border-t border-white/12 grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr] text-sm">
          <div>
            <Logo name={siteData.name} light />
            <p className="mt-4 leading-relaxed max-w-xs text-[var(--color-paper)]/65">
              {footer.description}
            </p>
          </div>
          <div>
            <p className="t-label !text-[var(--color-paper)]/60 mb-4">{footer.addressLabel}</p>
            <address className="not-italic leading-relaxed">
              {siteData.address.street}
              <br />
              {siteData.address.zip} {siteData.address.city}
            </address>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 link-u text-[var(--color-paper)]">
              {footer.navigateText}
            </a>
          </div>
          <div>
            <p className="t-label !text-[var(--color-paper)]/60 mb-4">{footer.contactLabel}</p>
            <a href={`mailto:${stegaClean(siteData.email)}`} data-loc="stopka" className="cel block hover:text-[var(--color-paper)]">
              {siteData.email}
            </a>
            <p className="mt-2">{siteData.hours}</p>
            <div className="mt-4 flex gap-5">
              {facebook && <a href={facebook} target="_blank" rel="noopener noreferrer" className="link-u text-[var(--color-paper)]">Facebook</a>}
              {instagram && <a href={instagram} target="_blank" rel="noopener noreferrer" className="link-u text-[var(--color-paper)]">Instagram</a>}
            </div>
          </div>
          <div>
            <p className="t-label !text-[var(--color-paper)]/60 mb-4">{footer.linksLabel}</p>
            <ul className="lg:space-y-1.5">
              {nav.map((item) => (
                <li key={item._key ?? item.href}>
                  <Link href={stegaClean(item.href)} className="inline-block py-3 lg:py-0 hover:text-[var(--color-paper)]">
                    {item.label}
                  </Link>
                </li>
              ))}
              {siteData.documents
                ?.filter((doc) => doc?.title && doc.fileUrl)
                .map((doc) => (
                  <li key={doc._key ?? doc.title}>
                    <a href={`${doc.fileUrl}?dl=`} className="inline-block py-3 lg:py-0 hover:text-[var(--color-paper)]">
                      {doc.title}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 py-6 border-t border-white/12 flex flex-col sm:flex-row gap-3 justify-between text-xs text-[var(--color-paper)]/55">
          <p>&copy; {new Date().getFullYear()} {siteData.legalName}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href={POLICY_PATH} className="cel hover:text-[var(--color-paper)] underline underline-offset-4">
              {footer.privacyLinkText}
            </Link>
            {GTM_ID && <CookieSettingsLink className="cel text-left hover:text-[var(--color-paper)] underline underline-offset-4" />}
          </div>
        </div>
      </div>
    </footer>
  );
}
