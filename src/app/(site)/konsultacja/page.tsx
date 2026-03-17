import ConsultationForm from "@/components/ConsultationForm";
import { getSiteSettings } from "@/sanity/fetchers";

export default async function ConsultationPage() {
  const siteData = await getSiteSettings();

  return (
    <section className="min-h-screen flex items-center py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Umów{" "}
            <span className="gradient-text">konsultację</span>
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-md mx-auto">
            Zapraszamy na spotkanie — opowiemy o przedszkolu, oprowdzimy po sali i odpowiemy na wszystkie pytania
          </p>
        </div>
        <ConsultationForm email={siteData.email} phone={siteData.phone} />
      </div>
    </section>
  );
}
