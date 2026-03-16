import Link from "next/link";
import siteData from "@/content/site.json";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-text)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🏠</span>
              <span className="text-2xl font-bold">{siteData.name}</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {siteData.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Nawigacja</h3>
            <ul className="space-y-2">
              {siteData.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-[var(--color-accent-yellow)] transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Kontakt</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-lg mt-0.5">📍</span>
                <span>
                  {siteData.address.street}
                  <br />
                  {siteData.address.zip} {siteData.address.city}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-lg">📞</span>
                <a
                  href={`tel:${siteData.phone.replace(/\s/g, "")}`}
                  className="hover:text-[var(--color-accent-yellow)] transition-colors"
                >
                  {siteData.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-lg">✉️</span>
                <a
                  href={`mailto:${siteData.email}`}
                  className="hover:text-[var(--color-accent-yellow)] transition-colors"
                >
                  {siteData.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-lg">🕐</span>
                <span>{siteData.hours}</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a
                href={siteData.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-primary)] transition-colors text-lg"
              >
                📘
              </a>
              <a
                href={siteData.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-accent-pink)] transition-colors text-lg"
              >
                📸
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} {siteData.name}. Wszelkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  );
}
