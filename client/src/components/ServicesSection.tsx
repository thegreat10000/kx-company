import { motion } from "framer-motion";
import { ArrowRight, Cloud } from "lucide-react";
import { useLocation } from "wouter";
import rentalImg from "@assets/generated_images/luxury_car_rental_showroom_display..png";
import chauffeurImg from "@assets/generated_images/professional_chauffeur_opening_car_door..png";
import detailingImg from "@assets/generated_images/luxury_car_detailing_process..png";

const services = [
  {
    title: "Locations de véhicules",
    image: rentalImg,
  },
  {
    title: "Prestations avec chauffeur",
    image: chauffeurImg,
  },
  {
    title: "Detailing & Nettoyage",
    image: detailingImg,
  },
];

export function ServicesSection() {
  const [, setLocation] = useLocation();

  const handleClick = () => {
    setLocation("/services");
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <section className="py-24 bg-slate-50/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-16">
          {/* Header latéral */}
          <div className="md:w-1/4">
            <h2 className="text-4xl lg:text-5xl font-sans font-bold text-slate-900 sticky top-24">
              Nos services
            </h2>
          </div>

          {/* Grille de services */}
          <div className="md:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -15, scale: 1.05 }}
                  onClick={handleClick}
                  className="group relative cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 min-h-[400px] flex flex-col"
                >
                  {/* Effet de fumée au survol - Plus sombre */}
                  <div className="absolute inset-0 pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                        animate={{ 
                          scale: [1, 2.5, 4],
                          x: [0, (i % 2 === 0 ? 30 : -30) * (i + 1)],
                          y: [0, -30 * (i + 1)],
                          opacity: [0, 0.6, 0]
                        }}
                        transition={{ 
                          duration: 2.5,
                          repeat: Infinity,
                          delay: i * 0.15,
                          ease: "easeOut"
                        }}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2"
                      >
                        <Cloud className="w-14 h-14 text-slate-400 fill-slate-400 blur-md" />
                      </motion.div>
                    ))}
                  </div>

                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-8 flex flex-col items-center justify-center flex-1 relative z-10 text-center">
                    <h3 className="text-xl lg:text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <div className="mt-6 flex items-center justify-center w-12 h-12 rounded-full bg-slate-50 group-hover:bg-primary/10 transition-colors duration-300">
                      <ArrowRight className="h-6 w-6 text-slate-400 group-hover:text-primary transition-all duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
