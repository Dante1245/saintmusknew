import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";

export function LandingHero() {
  return (
    <section className="container grid lg:grid-cols-2 gap-10 items-center py-16 md:py-24">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
            </div>
            <p className="text-sm text-muted-foreground">Loved by 10,000+ traders</p>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
          The Future of Crypto Trading is Here.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          elonXchange is the most secure and intuitive platform to buy, sell, and manage your cryptocurrency portfolio. We offer institutional-grade security, blazing-fast transactions, and a suite of advanced tools in a single, user-friendly interface. Join the revolution.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <Link href="/signup">
              Get Started for Free <ArrowRight className="ml-2" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#features">Explore Features</Link>
          </Button>
        </div>
      </div>
      <div className="hidden lg:block relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        <Image
          src="https://placehold.co/600x400.png"
          alt="Elon Musk"
          width={600}
          height={400}
          className="rounded-xl shadow-2xl relative"
          data-ai-hint="man futuristic"
        />
      </div>
    </section>
  );
}
