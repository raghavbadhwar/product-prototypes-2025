import { NavigationHeader } from "@/components/landing/navigation-header";
import { HeroSection } from "@/components/landing/hero-section";
import { DashboardPreviews } from "@/components/landing/dashboard-previews";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050B16] via-[#071427] to-[#0A1B35]">
      <NavigationHeader />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-4 sm:py-8">
        <div className="space-y-12 sm:space-y-16 lg:space-y-20">
          <HeroSection />
          <DashboardPreviews />
        </div>
      </main>
    </div>
  );
}