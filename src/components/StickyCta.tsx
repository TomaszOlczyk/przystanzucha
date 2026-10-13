import Link from "next/link";
import { PhoneIcon } from "./Navbar";

/** Dolny pasek na telefonie: „Zadzwoń” i „Umów wizytę” zawsze pod kciukiem. */
export default function StickyCta({ phone }: { phone: string }) {
  return (
    <div className="lg:hidden fixed inset-x-0 bottom-0 z-[60] bg-[var(--color-paper)]/94 backdrop-blur-md border-t border-[var(--color-line)] px-4 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-[auto_1fr] gap-2.5 max-w-md mx-auto">
        <a
          href={`tel:${phone.replace(/\s/g, "")}`}
          data-loc="pasek_mobile"
          aria-label={`Zadzwoń: ${phone}`}
          className="btn btn-secondary !px-4 !py-3"
        >
          <PhoneIcon className="w-5 h-5" />
          <span className="text-[0.95rem]">Zadzwoń</span>
        </a>
        <Link href="/#kontakt" data-cta="umow_wizyte" data-loc="pasek_mobile" className="btn btn-primary !py-3 text-[0.95rem]">
          Umów bezpłatną wizytę
        </Link>
      </div>
    </div>
  );
}
