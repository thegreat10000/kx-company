import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Clock, ShieldCheck, Camera, UserCheck, Sparkles } from "lucide-react";

const services = [
  {
    title: "Location de Prestige",
    description: "Une flotte de véhicules luxueux pour toutes vos occasions spéciales, shootings ou simplement pour le plaisir de conduire.",
    icon: Award,
    category: "Location"
  },
  {
    title: "Detailing & Nettoyage",
    description: "Redonnez l'éclat du neuf à votre véhicule. Nettoyage complet extérieur et intérieur avec des produits haut de gamme.",
    icon: Sparkles,
    category: "Entretien"
  },
  {
    title: "Service à Domicile",
    description: "Nous nous déplaçons chez vous ou sur votre lieu de travail pour le nettoyage de votre véhicule.",
    icon: UserCheck,
    category: "Praticité"
  },
  {
    title: "Prestations avec Chauffeur",
    description: "Profitez de votre trajet en toute sérénité. Chauffeurs professionnels pour vos événements et transferts.",
    icon: ShieldCheck,
    category: "Luxe"
  },
  {
    title: "Shootings & Clips",
    description: "Mise à disposition de nos véhicules pour vos productions audiovisuelles, clips musicaux et séances photos.",
    icon: Camera,
    category: "Production"
  },
  {
    title: "Disponibilité 24/7",
    description: "Une équipe à votre écoute jour et nuit pour répondre à vos besoins et assurer vos réservations.",
    icon: Clock,
    category: "Service"
  }
];

export default function Services() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-extrabold mb-4">
              Nos Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto italic font-serif">
              Découvrez l'étendue de nos prestations premium à Strasbourg
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover-elevate transition-all duration-300 border-border/50">
                <CardContent className="p-8">
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center text-primary mb-6">
                    <service.icon className="w-8 h-8" />
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                    {service.category}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
