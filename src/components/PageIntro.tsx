import Link from "next/link";

/** Nagłówek podstrony w stylu „dziennika”: linia meta, wielki szeryf, lead. */
export default function PageIntro({ eyebrow, title, lead }: { eyebrow: string; title: React.ReactNode; lead?: string }) {
  return (
    <section className="max-w-[1200px] mx-auto px-5 lg:px-10">
      <p className="pt-4 t-small">
        <Link href="/" className="hover:text-[var(--color-ink)]">
          Przystań Zucha
        </Link>
        <span className="mx-2 text-[var(--color-coral)]">/</span>
        {eyebrow}
      </p>
      <div className="pt-10 pb-14 lg:pt-16 lg:pb-20 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end">
        <h1 data-hero="title" className="t-hero !text-[clamp(3rem,7.4vw,6.8rem)]">
          {title}
        </h1>
        {lead && (
          <p data-hero="fade" className="t-lead max-w-[44ch]">
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}

/** Pas zamykający podstronę: zaproszenie na wizytę. */
export function VisitCta({ heading, text }: { heading: React.ReactNode; text: string }) {
  return (
    <section className="bg-[var(--color-paper-deep)]/70 border-t border-[var(--color-line)]">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 py-20 lg:py-28 grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_auto] lg:items-end">
        <div>
          <h2 data-split className="t-display max-w-[15ch]">
            {heading}
          </h2>
          <p className="mt-5 t-lead max-w-[48ch]">{text}</p>
        </div>
        <Link href="/#kontakt" data-cta="umow_wizyte" data-loc="podstrona" className="btn btn-primary justify-self-start">
          Umów bezpłatną wizytę <span className="arr">→</span>
        </Link>
      </div>
    </section>
  );
}
