import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Vitalik B.",
    avatar: "VB",
    review: "elonXchange made it ridiculously easy to get into crypto. The interface is clean and the fees are transparent. Two thumbs up!",
    image: "https://placehold.co/50x50.png",
    aiHint: "man face"
  },
  {
    name: "Satoshi N.",
    avatar: "SN",
    review: "As someone who values security above all, elonXchange's multi-layered protection gives me peace of mind. A truly decentralized experience.",
    image: "https://placehold.co/50x50.png",
    aiHint: "person hoodie"
  },
  {
    name: "Elon M.",
    avatar: "EM",
    review: "To the moon! This platform is the future. Simple, powerful, and ready to take us to new financial heights. Highly recommended!",
    image: "https://placehold.co/50x50.png",
    aiHint: "man rocket"
  },
  {
    name: "Michael S.",
    avatar: "MS",
    review: "The analytics tools are top-notch. I can track my portfolio and market trends with incredible detail. It's a game-changer for serious traders.",
    image: "https://placehold.co/50x50.png",
    aiHint: "man suit"
  },
  {
    name: "Cathie W.",
    avatar: "CW",
    review: "elonXchange is disrupting the digital asset space. Their innovative features and commitment to user experience sets a new industry standard.",
    image: "https://placehold.co/50x50.png",
    aiHint: "woman business"
  },
  {
    name: "Gavin A.",
    avatar: "GA",
    review: "I've tried many exchanges, but the speed and reliability of elonXchange are unmatched. My orders execute instantly, which is crucial in a volatile market.",
    image: "https://placehold.co/50x50.png",
    aiHint: "man glasses"
  }
];

export function LandingReviews() {
  return (
    <section className="bg-muted/50 py-20 md:py-32">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
            What Our Users Are Saying
          </h2>
          <p className="text-lg text-muted-foreground mt-2">
            We're trusted by traders worldwide. Here's why.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={review.image} alt={review.name} data-ai-hint={review.aiHint} />
                    <AvatarFallback>{review.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{review.name}</CardTitle>
                    <div className="flex text-yellow-400 mt-1">
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">"{review.review}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
