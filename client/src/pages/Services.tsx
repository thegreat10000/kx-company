import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import rentalImg from "@assets/generated_images/luxury_car_rental_showroom_display..png";
import chauffeurImg from "@assets/generated_images/professional_chauffeur_opening_car_door..png";
import detailingImg from "@assets/generated_images/luxury_car_detailing_process..png";

const services = [
  {
    title: "Locations de véhicules",
    description: "KX Company vous propose une large gamme de véhicules de prestige pour tous vos besoins. Que ce soit pour un week-end, un événement spécial ou un besoin professionnel, nous avons le véhicule qu'il vous faut.",
    image: rentalImg,
    features: [
      "Flotte de véhicules récents (Mercedes AMG, Peugeot 208 GT)",
      "Entretien rigoureux et propreté exemplaire",
      "Options de location flexibles (24h, 48h, 7j, 30j)",
      "Assurance RC incluse"
    ]
  },
  {
    title: "Prestations avec chauffeur",
    description: "Profitez d'un service de transport haut de gamme avec nos chauffeurs professionnels. Pour vos mariages, transferts aéroport ou événements d'entreprise, voyagez en toute sérénité et élégance.",
    image: chauffeurImg,
    features: [
      "Chauffeurs professionnels et discrets",
      "Ponctualité garantie",
      "Trajets personnalisés sur Strasbourg et alentours",
      "Prestation sur devis pour une flexibilité maximale"
    ]
  },
  {
    title: "Detailing & Nettoyage",
    description: "Redonnez à votre véhicule son aspect d'origine grâce à notre service de Detailing. Nous intervenons sur place, à votre domicile ou sur votre lieu de travail pour un nettoyage complet et minutieux.",
    image: detailingImg,
    features: [
      "Nettoyage intérieur et extérieur approfondi",
      "Utilisation de produits haut de gamme",
      "Intervention mobile (domicile, travail)",
      "Redonne vie et valeur à votre véhicule"
    ]
  }
];

export default function Services() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-slate-900 text-white py-20">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-extrabold mb-6">
              Nos Services Premium
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto font-serif italic">
              Découvrez l'excellence automobile à Strasbourg à travers nos prestations de location, service chauffeur et entretien.
            </p>
          </div>
        </section>

        {/* Services Detail */}
        <section className="py-20 bg-slate-50/30">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {services.map((service, index) => (
                <Card key={index} className="overflow-hidden border-none shadow-lg bg-white">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4 text-slate-900">{service.title}</h2>
                    <p className="text-slate-600 mb-8 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="space-y-4">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-white">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Besoin d'un service sur mesure ?</h2>
            <p className="text-slate-600 mb-10 max-w-2xl mx-auto">
              Contactez-nous directement pour discuter de vos besoins spécifiques. Notre équipe est à votre disposition pour vous proposer la solution idéale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/33677727957" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-[#25D366] text-white font-bold hover:bg-[#128C7E] transition-colors shadow-lg shadow-[#25D366]/20"
              >
                Nous contacter via WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
