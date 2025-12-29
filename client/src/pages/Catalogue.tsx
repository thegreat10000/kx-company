import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type Car } from "@shared/schema";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Loader2, ArrowLeft, Car as CarIcon } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { SiWhatsapp, SiSnapchat } from "react-icons/si";

export default function Catalogue() {
  const { data: cars, isLoading } = useQuery<Car[]>({
    queryKey: [api.cars.list.path],
  });

  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Nos Véhicules</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cars?.map((car) => {
            const imageUrl = car.imageUrl.startsWith('attached_assets/') 
              ? `/@fs/home/runner/workspace/${car.imageUrl}` 
              : car.imageUrl;
            return (
            <Card 
              key={car.id} 
              className="overflow-hidden hover-elevate cursor-pointer"
              onClick={() => setSelectedCar(car)}
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={imageUrl} 
                  alt={car.model}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardHeader className="p-4">
                <div className="flex justify-between items-start gap-2">
                  <CardTitle className="text-xl">{car.model}</CardTitle>
                  <Badge variant="secondary">{car.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-2xl font-bold text-primary">{car.pricePerDay}€<span className="text-sm font-normal text-muted-foreground">/jour</span></p>
                <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <p>Puissance: {car.power}</p>
                  <p>Transmission: {car.transmission}</p>
                </div>
              </CardContent>
              <CardFooter className="p-4 border-t">
                <Button variant="secondary" className="w-full bg-slate-700 hover:bg-slate-600 text-white border-none shadow-md">Voir les détails</Button>
              </CardFooter>
            </Card>
          );
          })}
          {/* Empty slots for future additions */}
          {Array(3).fill(0).map((_, i) => (
            <Card key={`empty-${i}`} className="overflow-hidden border-2 border-dashed border-muted flex flex-col items-center justify-center min-h-[300px] bg-muted/5 opacity-50">
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mx-auto">
                  <CarIcon className="w-8 h-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-muted-foreground">Bientôt disponible</p>
                  <p className="text-sm text-muted-foreground/60">Nouvel arrivage KX Location</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedCar} onOpenChange={() => setSelectedCar(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedCar && (() => {
            const selectedImageUrl = selectedCar.imageUrl.startsWith('attached_assets/') 
              ? `/@fs/home/runner/workspace/${selectedCar.imageUrl}` 
              : selectedCar.imageUrl;
            return (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedCar.model}</DialogTitle>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                <div className="space-y-4">
                  <div className="aspect-video relative rounded-lg overflow-hidden">
                    <img 
                      src={selectedImageUrl} 
                      alt={selectedCar.model} 
                      className="object-cover w-full h-full" 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-muted">
                      <p className="text-sm text-muted-foreground">Puissance</p>
                      <p className="font-semibold">{selectedCar.power}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <p className="text-sm text-muted-foreground">Transmission</p>
                      <p className="font-semibold">{selectedCar.transmission}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Options incluses</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCar.options.map((option, index) => (
                        <Badge key={index} variant="outline">{option}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Conditions & Caution</h3>
                    <div className="bg-muted p-4 rounded-lg space-y-2">
                      <p className="font-bold text-destructive flex items-center gap-2">
                        Caution: 5.000€
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {selectedCar.conditions?.map((condition, index) => (
                          <li key={index}>• {condition}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl border-2 border-primary/10 bg-primary/5">
                    <p className="text-3xl font-bold text-primary mb-1">{selectedCar.pricePerDay}€ <span className="text-base font-normal text-muted-foreground">/ jour</span></p>
                    <p className="text-sm text-muted-foreground mb-6">Assurance tous risques incluse</p>
                    
                    <div className="space-y-3">
                      <Button 
                        className="w-full h-12 gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white"
                        onClick={() => window.open(`https://wa.me/33677727957?text=Bonjour, je souhaite réserver la ${selectedCar.model}`, '_blank')}
                      >
                        <SiWhatsapp className="w-5 h-5" />
                        Réserver via WhatsApp
                      </Button>
                      <Button 
                        className="w-full h-12 gap-2 bg-[#FFFC00] hover:bg-[#e6e300] text-black"
                        onClick={() => window.open('https://snapchat.com/add/RIIMKA672', '_blank')}
                      >
                        <SiSnapchat className="w-5 h-5" />
                        Réserver via Snapchat
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
