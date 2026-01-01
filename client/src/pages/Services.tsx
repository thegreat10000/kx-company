import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
const services = [
  {
    title: "Locations de véhicules",
    description: "La société KX vous propose une large gamme de véhicules en allant de la simple citadine tout en passant par la sportive ou encore la berline ultra-luxueuse Allemande.\n\nLe tout pour répondre à vos différents besoins !\n\nUn week-end, un mariage, un évènement particulier ou encore des vacances entre ami(e)s ?\n\nNous avons le véhicule qu'il vous faut avec des formules sur mesure répondant spécifiquement à vos désirs !",
    image: "/images/service_location.jpg",
    features: [
      "Flotte de véhicules récents (AMG, Maybach, GT, R)",
      "Véhicules entretenus et suivis exclusivement en concession",
      "Options de location flexibles (Durée, Kilométrage)",
      "Assurance RC incluse avec diverses formules de rachat de franchise"
    ]
  },
  {
    title: "Prestations avec chauffeur",
    description: "Profitez d'un service de transport haut de gamme avec nos chauffeurs professionnels. Pour vos mariages, transferts aéroport ou événements d'entreprise, voyagez en toute sérénité et élégance.",
    image: "/images/service_chauffeur.jpg",
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
    image: "/images/service_detailing.jpg",
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
    <div className="min-h-screen bg-background dark:bg-slate-950 flex flex-col transition-colors duration-300">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-slate-100 dark:bg-[#4A1D2F] py-20 transition-colors duration-500">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 dark:text-pink-100">
              Nos Services Premium
            </h1>
            <p className="text-xl text-slate-600 dark:text-pink-200/70 max-w-3xl mx-auto font-serif italic">
              Découvrez l'excellence automobile à Strasbourg à travers nos prestations de location, service chauffeur et entretien.
              <span className="block mt-4 text-lg not-italic font-sans">
                La référence Strasbourgeoise pour vos diverses prestations de services :
              </span>
              <span className="block mt-2 text-lg not-italic font-sans space-y-1">
                <span className="block">• Location de véhicules Citadines, Sportives et Luxueuses</span>
                <span className="block">• Service avec chauffeur</span>
                <span className="block">• Entretien Detailing de votre véhicule</span>
              </span>
            </p>
          </div>
        </section>

        {/* Services Detail */}
        <section className="py-20 bg-slate-50/30 dark:bg-slate-900/20">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {services.map((service, index) => (
                <Card key={index} className="overflow-hidden border-none shadow-lg bg-white dark:bg-slate-900/50 dark:border dark:border-slate-800 transition-all duration-300">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">{service.title}</h2>
                    <div className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed whitespace-pre-line">
                      {service.description}
                    </div>
                    <div className="space-y-4">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-slate-400 dark:text-primary shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{feature}</span>
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
        <section className="py-20 bg-white dark:bg-slate-950 transition-colors duration-500">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 dark:text-slate-100">Besoin d'un service sur mesure ?</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
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
