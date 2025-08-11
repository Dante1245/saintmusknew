import { LandingHeader } from "@/components/landing-header";
import { LandingHero } from "@/components/landing-hero";
import { LandingFeatures } from "@/components/landing-features";
import { LandingReviews } from "@/components/landing-reviews";
import { LandingFooter } from "@/components/landing-footer";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <LandingHeader />
      <main className="flex-1">
        <LandingHero />
        <LandingFeatures />
        <LandingReviews />
      </main>
      <LandingFooter />
    </div>
  );
}