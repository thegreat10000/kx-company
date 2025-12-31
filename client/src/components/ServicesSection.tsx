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
        <div className="flex flex-col gap-16">
          {/* Header au-dessus */}
          <div className="text-center">
            <h2 className="text-4xl lg:text-6xl font-sans font-bold text-slate-900">
              Nos services
            </h2>
          </div>

          {/* Grille de services - Espacement et taille accrus */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -20, scale: 1.08 }}
                onClick={handleClick}
                className="group relative cursor-pointer bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 min-h-[450px] flex flex-col"
              >
                {/* Effet de fumée au survol - Sombre et dense */}
                <div className="absolute inset-0 pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                      animate={{ 
                        scale: [1, 3, 5],
                        x: [0, (i % 2 === 0 ? 40 : -40) * (i + 1)],
                        y: [0, -40 * (i + 1)],
                        opacity: [0, 0.7, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: "easeOut"
                      }}
                      className="absolute bottom-6 left-1/2 -translate-x-1/2"
                    >
                      <Cloud className="w-16 h-16 text-slate-500 fill-slate-500 blur-xl" />
                    </motion.div>
                  ))}
                </div>

                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-10 flex flex-col items-center justify-center flex-1 relative z-10 text-center">
                  <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <div className="mt-8 flex items-center justify-center w-14 h-14 rounded-full bg-slate-50 group-hover:bg-primary/10 transition-colors duration-300">
                    <ArrowRight className="h-7 w-7 text-slate-400 group-hover:text-primary transition-all duration-300 group-hover:translate-x-2" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
