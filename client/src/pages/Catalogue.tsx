import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type Car } from "@shared/schema";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Loader2, ArrowLeft, Car as CarIcon, Euro, Cog, Info, Award } from "lucide-react";
import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { SiWhatsapp, SiSnapchat } from "react-icons/si";
import { BookingForm } from "@/components/BookingForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

export default function Catalogue() {
  const { data: cars, isLoading } = useQuery<Car[]>({
    queryKey: [api.cars.list.path],
  });

  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [activeTab, setActiveTab] = useState("details");

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
          {(cars || []).slice().sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)).map((car) => {
            const imageUrl = car.imageUrl;
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
                  style={car.model === "Renault Clio V Alpine" ? { objectPosition: "center 35%" } : undefined}
                />
              </div>
              <CardHeader className="p-4">
                <div className="flex justify-between items-start gap-2">
                  <CardTitle className="text-xl text-foreground">{car.model}</CardTitle>
                  <Badge variant="secondary" className="bg-secondary text-secondary-foreground">{car.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 text-right flex flex-col items-end">
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider leading-none mb-1">
                  À partir de
                </span>
                <div className="flex items-baseline gap-1">
                  <p className="text-2xl font-bold text-primary">{car.pricePerDay}€</p>
                  <span className="text-sm font-normal text-muted-foreground">/jour</span>
                </div>
                <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {car.pricingInfo ? (
                    <p className="flex items-center gap-1"><Euro className="h-3 w-3" /> Tarifs détaillés</p>
                  ) : null}
                  <p>Transmission: {car.transmission}</p>
                </div>
              </CardContent>
              <CardFooter className="p-4 border-t">
                <Button className="w-full">Voir les détails</Button>
              </CardFooter>
            </Card>
          );
          })}
        </div>
      </div>

      <Dialog open={!!selectedCar} onOpenChange={() => {
        setSelectedCar(null);
        setActiveTab("details");
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedCar && (() => {
            return (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedCar.model}</DialogTitle>
              </DialogHeader>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
                <TabsList className="hidden">
                  <TabsTrigger value="details">Détails</TabsTrigger>
                  <TabsTrigger value="booking">Réservation</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      {selectedCar.galleryUrls && selectedCar.galleryUrls.length > 0 ? (
                        <Carousel className="w-full">
                          <CarouselContent>
                            {selectedCar.galleryUrls.map((imageUrl, index) => (
                              <CarouselItem key={index}>
                                <div className="aspect-video relative rounded-lg overflow-hidden">
                                  <img
                                    src={imageUrl}
                                    alt={`${selectedCar.model} - Image ${index + 1}`}
                                    className="object-cover w-full h-full"
                                    style={selectedCar.model === "Renault Clio V Alpine" && index < 3 ? { objectPosition: "center 35%" } : undefined}
                                  />
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          {selectedCar.galleryUrls.length > 1 && (
                            <>
                              <CarouselPrevious className="left-2" />
                              <CarouselNext className="right-2" />
                            </>
                          )}
                        </Carousel>
                      ) : (
                        <div className="aspect-video relative rounded-lg overflow-hidden">
                          <img
                            src={selectedCar.imageUrl}
                            alt={selectedCar.model}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}

                      {selectedCar.pricingInfo ? (
                        <div className="space-y-3">
                          <div className="p-4 rounded-lg bg-muted">
                            <div className="flex items-center gap-2 text-primary mb-3">
                              <Euro className="h-5 w-5" />
                              <span className="text-sm font-bold uppercase tracking-wider">Tarification</span>
                            </div>
                            {(() => {
                              try {
                                const pricing: PricingInfo = JSON.parse(selectedCar.pricingInfo);
                                if (pricing.type === "standard") {
                                  return (
                                    <div className="space-y-2">
                                      {pricing.prices.map((p, idx) => (
                                        <div key={idx} className="flex items-center justify-between py-1 border-b border-border/30 last:border-0">
                                          <span className="text-sm font-medium">{p.duration}</span>
                                          <div className="flex items-center gap-2">
                                            <span className="font-bold text-primary text-lg">{p.price}</span>
                                            {p.note && <span className="text-xs text-muted-foreground">({p.note})</span>}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  );
                                } else {
                                  return (
                                    <div className="space-y-3">
                                      <div className="flex items-center justify-between py-1">
                                        <span className="text-sm font-medium">Tarif</span>
                                        <span className="font-bold text-primary text-xl">{pricing.basePrice}</span>
                                      </div>
                                      <p className="text-sm font-semibold text-primary">{pricing.note}</p>
                                      <div className="flex items-start gap-2 bg-primary/10 p-3 rounded-lg mt-2">
                                        <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                                        <p className="text-sm text-muted-foreground">{pricing.extra}</p>
                                      </div>
                                    </div>
                                  );
                                }
                              } catch {
                                return <span className="text-sm">{selectedCar.pricePerDay}€/jour</span>;
                              }
                            })()}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="p-4 rounded-lg bg-muted">
                              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                <Cog className="h-4 w-4" />
                                <span className="text-xs font-medium uppercase tracking-wider">Transmission</span>
                              </div>
                              <p className="font-semibold">{selectedCar.transmission}</p>
                            </div>
                            <div className="p-4 rounded-lg bg-muted">
                              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                <CarIcon className="h-4 w-4" />
                                <span className="text-xs font-medium uppercase tracking-wider">Motorisation</span>
                              </div>
                              <p className="font-semibold">{selectedCar.motorisation || "Essence"}</p>
                            </div>
                            <div className="p-4 rounded-lg bg-muted">
                              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                <Award className="h-4 w-4" />
                                <span className="text-xs font-medium uppercase tracking-wider">Puissance</span>
                              </div>
                              <p className="font-semibold">{selectedCar.power.replace("ch", "🐎")}</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="p-4 rounded-lg bg-muted">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Transmission</p>
                            <p className="font-semibold">{selectedCar.transmission}</p>
                          </div>
                          <div className="p-4 rounded-lg bg-muted">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Motorisation</p>
                            <p className="font-semibold">{selectedCar.motorisation || "Essence"}</p>
                          </div>
                          <div className="p-4 rounded-lg bg-muted">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Puissance</p>
                            <p className="font-semibold">{selectedCar.power.replace("ch", "🐎")}</p>
                          </div>
                        </div>
                      )}
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
                            Caution: {selectedCar.caution ? `${selectedCar.caution.toLocaleString()}€` : "5.000€"}
                          </p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {selectedCar.conditions?.map((condition, index) => (
                              <li key={index}>• {condition}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="p-6 rounded-xl border-2 border-primary/10 bg-primary/5 text-center flex flex-col items-center">
                        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider leading-none mb-1">
                          À partir de
                        </span>
                        <div className="flex items-baseline gap-1 mb-1">
                          <p className="text-3xl font-bold text-primary">{selectedCar.pricePerDay}€</p>
                          <span className="text-base font-normal text-muted-foreground">/ jour</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-6 font-medium">Assurance RC INCLUSE</p>

                        <div className="grid grid-cols-1 gap-2 w-full">
                          <Button
                            className="w-full h-10 gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-sm"
                            onClick={() => window.open(`https://wa.me/33677727957?text=Bonjour, je souhaite réserver la ${selectedCar.model}`, '_blank')}
                          >
                            <SiWhatsapp className="w-4 h-4" />
                            WhatsApp
                          </Button>
                          <Button
                            className="w-full h-10 gap-2 bg-[#FFFC00] hover:bg-[#e6e300] text-black text-sm"
                            onClick={() => window.open('https://snapchat.com/add/RIIMKA672', '_blank')}
                          >
                            <SiSnapchat className="w-4 h-4" />
                            Snapchat
                          </Button>
                          <Button
                            className="w-full h-10 gap-2 bg-primary hover:bg-primary/90 text-white text-sm"
                            onClick={() => setActiveTab("booking")}
                          >
                            Réserver en ligne
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="booking" className="mt-6">
                  <div className="mb-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveTab("details")}
                      className="gap-2"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Retour aux détails
                    </Button>
                  </div>
                  <BookingForm
                    cars={cars || []}
                    preselectedCarId={selectedCar.id}
                    onSuccess={() => {
                      setSelectedCar(null);
                      setActiveTab("details");
                    }}
                  />
                </TabsContent>
              </Tabs>
            </>
          );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
