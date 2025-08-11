import { LandingHeader } from "@/components/landing-header";
import { LandingHero } from "@/components/landing-hero";
import { LandingFeatures } from "@/components/landing-features";
import { LandingReviews } from "@/components/landing-reviews";
import { LandingFooter } from "@/components/landing-footer";
import { LandingMarketView } from "@/components/landing-market-view";
import { LandingContact } from "@/components/landing-contact";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <LandingHeader />
      <main className="flex-1">
        <LandingHero />
        <LandingFeatures />
        <LandingMarketView />
        <LandingReviews />
        <LandingContact />
      </main>
      <LandingFooter />
    </div>
  );
}
