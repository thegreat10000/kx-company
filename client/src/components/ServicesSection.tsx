import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
  return (
    <section className="py-20 bg-slate-50/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Header latéral */}
          <div className="md:w-1/4">
            <h2 className="text-4xl font-sans font-bold text-slate-900 sticky top-24">
              Nos services
            </h2>
          </div>

          {/* Grille de services */}
          <div className="md:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6 flex flex-col items-center">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <ArrowRight className="mt-4 h-5 w-5 text-slate-400 group-hover:text-primary transition-all duration-300 group-hover:translate-x-1" />
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
