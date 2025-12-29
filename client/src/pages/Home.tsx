import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CarCard } from "@/components/CarCard";
import { CarModal } from "@/components/CarModal";
import { useCars } from "@/hooks/use-cars";
import { Button } from "@/components/ui/button";
import { ChevronRight, ShieldCheck, Clock, Award } from "lucide-react";
import { Car } from "@shared/schema";

import { Link, useLocation } from "wouter";

export default function Home() {
  const { data: cars, isLoading, isError } = useCars();
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 -z-10 w-2/3 h-full bg-gradient-to-l from-primary/5 to-transparent rounded-l-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -z-10 w-1/3 h-1/2 bg-gradient-to-t from-primary/5 to-transparent rounded-tr-full blur-3xl" />

        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                Louez l'excellence à <span className="text-primary block sm:inline">Strasbourg</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Découvrez notre flotte de véhicules premium pour vos déplacements professionnels ou vos escapades le temps d'un week-end.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/catalogue">
                  <Button size="lg" className="rounded-full text-base px-8 h-12 shadow-lg shadow-primary/25 w-full sm:w-auto">
                    Voir le catalogue
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="rounded-full text-base px-8 h-12 border-2 hover:bg-muted/50">
                  Nous contacter
                </Button>
              </div>
            </div>
            
            <div className="flex-1 relative w-full max-w-[600px] lg:max-w-none">
               {/* Hero image placeholder - would ideally be a stunning car shot with transparent bg */}
               {/* unspash: Silver luxury sports car on modern background */}
              <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 ease-out border border-white/50 bg-white">
                <img 
                  src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200&h=800&fit=crop"
                  alt="Luxury Car Hero"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating badges */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce [animation-duration:3s]">
                <div className="bg-green-100 p-2 rounded-full text-green-600">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase">Assurance</p>
                  <p className="font-bold text-sm">Tous risques inclus</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-background border border-border/50">
              <div className="bg-primary/10 p-4 rounded-full text-primary mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Qualité Premium</h3>
              <p className="text-muted-foreground">Des véhicules récents, entretenus méticuleusement et suréquipés.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-background border border-border/50">
              <div className="bg-primary/10 p-4 rounded-full text-primary mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Service 24/7</h3>
              <p className="text-muted-foreground">Une équipe disponible à tout moment pour répondre à vos besoins.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-background border border-border/50">
              <div className="bg-primary/10 p-4 rounded-full text-primary mb-4">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Sérénité Totale</h3>
              <p className="text-muted-foreground">Assurance complète incluse pour rouler l'esprit tranquille.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue Grid */}
      <section className="py-20 bg-muted/30" id="catalogue">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Notre Flotte</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez nos véhicules et plongez dans le luxe ultime en réservant dès maintenant votre voiture de prestige et transformez chaque trajet en expérience inoubliable de puissance et d'élégance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isLoading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="h-[340px] bg-muted animate-pulse rounded-2xl" />
              ))
            ) : isError ? (
              <div className="col-span-full text-center py-10">
                <p className="text-destructive">Erreur de chargement</p>
              </div>
            ) : (
              cars?.slice(0, 3).map((car) => (
                <CarCard 
                  key={car.id} 
                  car={car} 
                  onClick={() => setLocation(`/catalogue?id=${car.id}`)} 
                />
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
      
      <CarModal 
        car={selectedCar} 
        isOpen={!!selectedCar} 
        onClose={() => setSelectedCar(null)} 
      />
    </div>
  );
}
