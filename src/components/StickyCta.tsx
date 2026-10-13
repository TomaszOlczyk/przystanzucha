import Link from "next/link";
import { PhoneIcon } from "./Navbar";

/** Dolny pasek na telefonie: zawsze pod kciukiem „Zadzwoń” i „Umów wizytę”. */
export default function StickyCta({ phone }: { phone: string }) {
  return (
    <div className="lg:hidden fixed inset-x-0 bottom-0 z-[60] bg-[var(--color-sand)]/95 backdrop-blur border-t border-[var(--color-line)] px-3 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-2 gap-2.5 max-w-md mx-auto">
        <a href={`tel:${phone.replace(/\s/g, "")}`} data-loc="pasek_mobile" className="btn btn-secondary !py-3 text-[0.95rem]">
          <PhoneIcon className="w-4 h-4" /> Zadzwoń
        </a>
        <Link href="/#kontakt" data-cta="umow_wizyte" data-loc="pasek_mobile" className="btn btn-primary !py-3 text-[0.95rem]">
          Umów wizytę
        </Link>
      </div>
    </div>
  );
}
