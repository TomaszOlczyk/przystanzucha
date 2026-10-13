import Link from "next/link";

/** Nagłówek podstrony: etykieta, H1, lead. */
export default function PageIntro({ eyebrow, title, lead }: { eyebrow: string; title: React.ReactNode; lead?: string }) {
  return (
    <section className="pt-8 md:pt-16 pb-8 md:pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl lg:max-w-6xl">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-2 text-[2.35rem] leading-[1.1] md:text-5xl lg:text-[3.4rem] font-semibold max-w-3xl">{title}</h1>
        {lead && <p className="mt-5 text-lg md:text-xl leading-relaxed text-[var(--color-ink-soft)] max-w-3xl">{lead}</p>}
      </div>
    </section>
  );
}

/** Pas zamykający podstronę: zaproszenie na wizytę. */
export function VisitCta({ heading, text }: { heading: string; text: string }) {
  return (
    <section className="py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-[var(--color-sea-dark)] text-white px-7 py-10 md:px-14 md:py-14 grid md:grid-cols-[1.4fr_auto] gap-6 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">{heading}</h2>
            <p className="mt-3 text-lg text-white/85 max-w-2xl">{text}</p>
          </div>
          <Link href="/#kontakt" data-cta="umow_wizyte" data-loc="podstrona" className="btn btn-primary text-lg">
            Umów bezpłatną wizytę
          </Link>
        </div>
      </div>
    </section>
  );
}
