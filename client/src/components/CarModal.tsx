import { Car } from "@shared/schema";
import { Dialog, DialogContent, DialogClose, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { FaWhatsapp, FaSnapchatGhost } from "react-icons/fa";
import { X, Check, Cog, Euro, Info } from "lucide-react";

interface PricingStandard {
  type: "standard";
  prices: { duration: string; price: string; note: string }[];
}

interface PricingChauffeur {
  type: "chauffeur";
  basePrice: string;
  note: string;
  extra: string;
}

type PricingInfo = PricingStandard | PricingChauffeur;

interface CarModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CarModal({ car, isOpen, onClose }: CarModalProps) {
  if (!car) return null;

  const images = car.galleryUrls && car.galleryUrls.length > 0 
    ? car.galleryUrls.map(url => url.startsWith('attached_assets/') ? `/@fs/home/runner/workspace/${url}` : url)
    : [car.imageUrl.startsWith('attached_assets/') ? `/@fs/home/runner/workspace/${car.imageUrl}` : car.imageUrl];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden bg-background border-none shadow-2xl rounded-2xl md:rounded-3xl h-[100dvh] md:h-auto md:max-h-[90vh] flex flex-col md:block">
        <DialogTitle className="sr-only">{car.model}</DialogTitle>
        <DialogDescription className="sr-only">Détails et tarifs pour {car.model}</DialogDescription>
        
        <DialogClose className="absolute right-4 top-4 z-50 rounded-full bg-black/20 p-2 text-white hover:bg-black/40 backdrop-blur-sm transition-colors">
          <X className="h-5 w-5" />
          <span className="sr-only">Fermer</span>
        </DialogClose>

        <div className="grid md:grid-cols-2 h-full md:h-auto overflow-y-auto md:overflow-visible">
          {/* Left: Gallery */}
          <div className="relative bg-muted/30 min-h-[300px] md:h-full flex items-center justify-center group/gallery">
            <div className="relative aspect-[4/3] md:aspect-auto md:h-full w-full h-full overflow-hidden">
              <Carousel className="w-full h-full" opts={{ loop: true }}>
                <CarouselContent className="h-full">
                  {images.map((src, index) => (
                    <CarouselItem key={index} className="h-full">
                      <div className="relative h-full w-full">
                        <img 
                          src={src} 
                          alt={`${car.model} - Photo ${index + 1}`} 
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {images.length > 1 && (
                  <>
                    <CarouselPrevious className="left-4 opacity-0 group-hover/gallery:opacity-100 transition-opacity bg-black/20 text-white hover:bg-black/40 border-none disabled:hidden" />
                    <CarouselNext className="right-4 opacity-0 group-hover/gallery:opacity-100 transition-opacity bg-black/20 text-white hover:bg-black/40 border-none disabled:hidden" />
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
                      {images.map((_, idx) => (
                        <div 
                          key={idx}
                          className="h-1.5 rounded-full w-1.5 bg-white/50"
                        />
                      ))}
                    </div>
                  </>
                )}
              </Carousel>
            </div>
          </div>

          {/* Right: Details */}
          <div className="p-6 md:p-8 flex flex-col h-full">
            <div className="mb-6">
              {car.category && <Badge className="mb-3" variant="outline">{car.category}</Badge>}
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                {car.model}
              </h2>
              {/* Force refresh trigger: 1767038280 */}
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">{car.pricePerDay}€</span>
                <span className="text-muted-foreground font-medium">/ jour</span>
              </div>
            </div>

            {car.pricingInfo ? (
              <div className="space-y-4 mb-6">
                <div className="bg-muted/30 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-muted-foreground mb-3">
                    <Euro className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase tracking-wider">Tarification</span>
                  </div>
                  {(() => {
                    try {
                      const pricing: PricingInfo = JSON.parse(car.pricingInfo);
                      if (pricing.type === "standard") {
                        return (
                          <div className="space-y-2">
                            {pricing.prices.map((p, idx) => (
                              <div key={idx} className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">{p.duration}</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-foreground">{p.price}</span>
                                  {p.note && <span className="text-xs text-muted-foreground">({p.note})</span>}
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      } else {
                        return (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Tarif</span>
                              <span className="font-bold text-foreground text-lg">{pricing.basePrice}</span>
                            </div>
                            <p className="text-sm font-medium text-primary">{pricing.note}</p>
                            <div className="flex items-start gap-2 bg-primary/10 p-3 rounded-lg">
                              <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              <p className="text-xs text-muted-foreground">{pricing.extra}</p>
                            </div>
                          </div>
                        );
                      }
                    } catch {
                      return <span className="text-sm text-foreground">{car.pricePerDay}€/jour</span>;
                    }
                  })()}
                </div>
                <div className="bg-muted/30 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Cog className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase tracking-wider">Boîte</span>
                  </div>
                  <span className="font-semibold text-foreground">{car.transmission}</span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-muted/30 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Euro className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase tracking-wider">Prix</span>
                  </div>
                  <span className="font-semibold text-foreground">{car.pricePerDay}€/jour</span>
                </div>
                <div className="bg-muted/30 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Cog className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase tracking-wider">Boîte</span>
                  </div>
                  <span className="font-semibold text-foreground">{car.transmission}</span>
                </div>
              </div>
            )}

            <div className="mb-8 flex-1">
              <h3 className="font-display text-lg font-bold mb-4">Options incluses</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {car.options.map((option, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>{option}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 mt-auto pt-4 md:pt-0">
              <Button 
                className="w-full h-12 text-base font-semibold bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg shadow-[#25D366]/20"
                onClick={() => window.open(`https://wa.me/?text=Bonjour, je suis intéressé par la ${car.model}`, '_blank')}
              >
                <FaWhatsapp className="mr-2 h-5 w-5" />
                Réserver via WhatsApp
              </Button>
              <Button 
                className="w-full h-12 text-base font-semibold bg-[#FFFC00] hover:bg-[#EBE800] text-black shadow-lg shadow-[#FFFC00]/20 border-none"
                variant="outline"
                onClick={() => window.open('https://snapchat.com', '_blank')}
              >
                <FaSnapchatGhost className="mr-2 h-5 w-5" />
                Réserver via Snapchat
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
