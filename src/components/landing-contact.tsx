
import { Phone, Mail } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent } from './ui/card';

export function LandingContact() {
  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
            Get in Touch
          </h2>
          <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
            We are here to help and answer any question you might have.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <div className="flex items-start gap-6">
                    <Image 
                        src="https://placehold.co/150x150.png"
                        alt="Elon Musk"
                        width={150}
                        height={150}
                        className="rounded-full border-4 border-primary/20"
                        data-ai-hint="man portrait"
                    />
                    <div>
                        <h3 className="text-2xl font-bold">Elon Musk</h3>
                        <p className="text-primary font-medium">Visionary & Founder</p>
                        <p className="mt-2 text-muted-foreground">
                            The driving force behind elonXchange, Elon's vision is to create a decentralized, transparent, and accessible financial future for everyone. His leadership guides our mission to innovate and push the boundaries of what's possible in the crypto space.
                        </p>
                    </div>
                </div>
                <Card className="bg-muted/30">
                    <CardContent className="p-6 space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-full">
                                <Phone className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-semibold">Phone Number</h4>
                                <a href="tel:+12096501913" className="text-muted-foreground hover:text-primary transition-colors">+1 209-650-1913</a>
                            </div>
                        </div>
                         <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-full">
                                <Mail className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-semibold">Email Address</h4>
                                <a href="mailto:managementsafee@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">managementsafee@gmail.com</a>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
             <div className="hidden lg:block relative">
                <div className="absolute -inset-8 bg-gradient-to-br from-primary to-accent rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
                <Image
                src="https://placehold.co/600x400.png"
                alt="Contact illustration"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl relative z-10 border-2 border-primary/10"
                data-ai-hint="futuristic communication"
                />
            </div>
        </div>
      </div>
    </section>
  );
}
