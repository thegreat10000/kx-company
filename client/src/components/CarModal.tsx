import { Car } from "@shared/schema";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { FaWhatsapp, FaSnapchatGhost } from "react-icons/fa";
import { X, Check, Gauge, Cog, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface CarModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CarModal({ car, isOpen, onClose }: CarModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!car) return null;

  const images = car.galleryUrls && car.galleryUrls.length > 0 ? car.galleryUrls : [car.imageUrl];

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden bg-background border-none shadow-2xl rounded-2xl md:rounded-3xl h-[100dvh] md:h-auto md:max-h-[90vh] flex flex-col md:block">
        
        {/* Close Button - Custom positioned */}
        <DialogClose className="absolute right-4 top-4 z-50 rounded-full bg-black/20 p-2 text-white hover:bg-black/40 backdrop-blur-sm transition-colors">
          <X className="h-5 w-5" />
          <span className="sr-only">Fermer</span>
        </DialogClose>

        <div className="grid md:grid-cols-2 h-full md:h-auto overflow-y-auto md:overflow-visible">
          {/* Left: Gallery */}
          <div className="relative bg-muted/30 min-h-[300px] md:h-full flex items-center justify-center group/gallery">
            <div className="relative aspect-[4/3] md:aspect-auto md:h-full w-full h-full overflow-hidden">
              <img 
                src={images[currentImageIndex]} 
                alt={car.model} 
                className="object-cover w-full h-full"
              />
              
              {images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 text-white opacity-0 group-hover/gallery:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 text-white opacity-0 group-hover/gallery:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, idx) => (
                      <div 
                        key={idx}
                        className={`h-1.5 rounded-full transition-all ${
                          idx === currentImageIndex ? "w-4 bg-white" : "w-1.5 bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right: Details */}
          <div className="p-6 md:p-8 flex flex-col h-full">
            <div className="mb-6">
              <Badge className="mb-3" variant="outline">{car.category}</Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                {car.model}
              </h2>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">{car.pricePerDay}€</span>
                <span className="text-muted-foreground font-medium">/ jour</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-muted/30 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Zap className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wider">Puissance</span>
                </div>
                <span className="font-semibold text-foreground">{car.power}</span>
              </div>
              <div className="bg-muted/30 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Cog className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wider">Boîte</span>
                </div>
                <span className="font-semibold text-foreground">{car.transmission}</span>
              </div>
            </div>

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
