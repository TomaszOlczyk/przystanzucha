import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PortableText, stegaClean, type PortableTextComponents } from "next-sanity";
import CookieSettingsLink from "@/components/CookieSettingsLink";
import { GTM_ID } from "@/lib/analytics";
import { getPrivacyPage } from "@/sanity/fetchers";
import type { PrivacyAdmin, PrivacyPage } from "@/sanity/types";
import { zAkcentem, zKodem } from "@/lib/akcent";
import { metadaneStrony } from "@/lib/metadane";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPrivacyPage({ stega: false });
  return metadaneStrony(seo, "/polityka-prywatnosci/");
}

const linkCls = "font-semibold text-[var(--color-sea-dark)] underline underline-offset-4 hover:text-[var(--color-ink)]";

/** Data z pola „Data obowiązywania” (RRRR-MM-DD) → „13 października 2026 r.”. */
function dataPL(iso: string): string {
  const d = new Date(`${stegaClean(iso)}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return stegaClean(iso);
  return `${new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(d)} r.`;
}

function UL({ children }: { children?: ReactNode }) {
  return <ul className="list-disc pl-5 space-y-1.5 marker:text-[var(--color-sea)]">{children}</ul>;
}

/** Komponenty Portable Text: wygląd 1:1 jak w dawnej wersji zapisanej w kodzie. */
function komponenty(strona: PrivacyPage): PortableTextComponents {
  const A: PrivacyAdmin = strona.administrator;
  const email = stegaClean(A.email);
  const tel = stegaClean(A.phone).replace(/\s/g, "");

  return {
    block: {
      normal: ({ children }) => <p>{children}</p>,
      h3: ({ children }) => <h3 className="text-lg font-bold text-[var(--color-ink)] pt-2">{children}</h3>,
    },
    list: { bullet: ({ children }) => <UL>{children}</UL> },
    listItem: { bullet: ({ children }) => <li>{children}</li> },
    marks: {
      link: ({ value, children }) => {
        const href = stegaClean((value as { href?: string })?.href ?? "");
        const zewnetrzny = /^https?:\/\//.test(href);
        return (
          <a href={href} className={linkCls} {...(zewnetrzny ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
            {children}
          </a>
        );
      },
    },
    types: {
      // Wstawka „Dane administratora” — wartość z sekcji „Dane administratora” w Studio.
      adminData: ({ value }) => {
        const pole = stegaClean((value as { field?: string })?.field) as keyof PrivacyAdmin | "effectiveDate" | undefined;
        const pogrubienie = (value as { bold?: boolean })?.bold;
        if (pole === "email") {
          return (
            <a href={`mailto:${email}`} className={linkCls}>
              {A.email}
            </a>
          );
        }
        if (pole === "phone") {
          return (
            <a href={`tel:${tel}`} className={linkCls}>
              {A.phone}
            </a>
          );
        }
        const tekst = pole === "effectiveDate" ? dataPL(strona.effectiveDate) : pole ? A[pole] : "";
        return pogrubienie ? <strong>{tekst}</strong> : <>{tekst}</>;
      },
      cookieSettingsLink: () =>
        GTM_ID ? (
          <>
            kliknij <CookieSettingsLink className={linkCls} /> (link jest też w stopce strony).
          </>
        ) : (
          <>przez link „Ustawienia cookies” w stopce strony.</>
        ),
      cookieTable: () => (
        <div className="grid gap-3 md:grid-cols-2">
          {strona.cookieRows.map((row, i) => (
            <dl key={row._key ?? i} className="rounded-2xl border border-white/80 bg-white/50 px-4 py-3 text-sm space-y-1.5">
              <dt className="font-bold text-[var(--color-ink)]">{row.category}</dt>
              <dd>
                <span className="font-semibold text-[var(--color-ink)]">Nazwy: </span>
                {zKodem(row.names)}
              </dd>
              <dd>
                <span className="font-semibold text-[var(--color-ink)]">Cel i czas: </span>
                {row.purpose}
              </dd>
            </dl>
          ))}
        </div>
      ),
    },
  };
}

export default async function PrivacyPolicyPage() {
  const strona = await getPrivacyPage();
  const sekcje = strona.sections.filter((s) => s?.title);
  const pt = komponenty(strona);
  const data = dataPL(strona.effectiveDate);

  return (
    <section className="pt-12 pb-16 md:pt-20 md:pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[var(--color-line)] text-sm font-bold mb-5">
            <span className="text-[var(--color-sea-dark)]">{strona.badge}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">
            {zAkcentem(strona.title, (f) => <span className="italic text-[var(--color-sea)]">{f}</span>)}
          </h1>
          <p className="text-lg text-[var(--color-ink-soft)] max-w-2xl mx-auto">{strona.lead}</p>
          <p className="text-sm text-[var(--color-ink-soft)] mt-3">
            {strona.effectiveLabel} {data}
          </p>
        </div>

        <nav aria-labelledby="spis-tresci" className="card p-6 md:p-8 mb-8">
          <h2 id="spis-tresci" className="text-lg font-bold mb-3">
            {strona.tocTitle}
          </h2>
          <ol className="grid gap-x-8 gap-y-1.5 sm:grid-cols-2 list-decimal pl-5 text-sm marker:text-[var(--color-sea)]">
            {sekcje.map((s, i) => (
              <li key={s._key ?? i}>
                <a href={`#${stegaClean(s.anchor)}`} className="text-[var(--color-ink-soft)] hover:text-[var(--color-sea-dark)] transition-colors">
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="space-y-6">
          {sekcje.map((s, i) => (
            <article key={s._key ?? i} id={stegaClean(s.anchor)} className="card p-6 md:p-8 scroll-mt-24 md:scroll-mt-28">
              <h2 className="text-2xl font-semibold mb-4">
                <span className="text-[var(--color-sea)] mr-2">{i + 1}.</span>
                {s.title}
              </h2>
              <div className="space-y-3 text-[15px] leading-relaxed text-[var(--color-ink-soft)] break-words">
                <PortableText value={s.body ?? []} components={pt} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
