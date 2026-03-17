import Link from "next/link";
import type { SiteSettings } from "@/sanity/types";

export default function Footer({ siteData }: { siteData: SiteSettings }) {
  return (
    <footer className="relative" style={{ background: "var(--gradient-dark)" }}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center font-bold text-sm">
                P
              </div>
              <span className="text-2xl font-extrabold">{siteData.name}</span>
            </div>
            <p className="text-indigo-200/70 text-sm leading-relaxed">
              {siteData.description}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Nawigacja</h3>
            <ul className="space-y-2">
              {siteData.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-indigo-200/70 hover:text-white transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Kontakt</h3>
            <ul className="space-y-3 text-sm text-indigo-200/70">
              <li>
                {siteData.address.street}, {siteData.address.zip}{" "}
                {siteData.address.city}
              </li>
              <li>
                <a
                  href={`tel:${siteData.phone.replace(/\s/g, "")}`}
                  className="hover:text-white transition-colors"
                >
                  {siteData.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteData.email}`}
                  className="hover:text-white transition-colors"
                >
                  {siteData.email}
                </a>
              </li>
              <li>{siteData.hours}</li>
            </ul>
            <div className="flex gap-3 mt-5">
              <a
                href={siteData.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-sm font-bold"
              >
                f
              </a>
              <a
                href={siteData.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-sm font-bold"
              >
                ig
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-8 text-center text-indigo-300/50 text-sm">
          <p>
            &copy; {new Date().getFullYear()} {siteData.name}. Wszelkie prawa
            zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
}
