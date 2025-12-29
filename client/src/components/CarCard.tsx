import { Car } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Gauge, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface CarCardProps {
  car: Car;
  onClick: (car: Car) => void;
}

export function CarCard({ car, onClick }: CarCardProps) {
  const imageUrl = car.imageUrl.startsWith('attached_assets/') 
    ? `/@fs/home/runner/workspace/${car.imageUrl}` 
    : car.imageUrl;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300"
      onClick={() => onClick(car)}
    >
      {/* Image Container */}
      <div className="aspect-[4/3] overflow-hidden bg-muted/20 relative">
        <div className="absolute top-3 left-3 z-10">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur text-foreground font-semibold shadow-sm">
            {car.category}
          </Badge>
        </div>
        <img 
          src={imageUrl} 
          alt={car.model}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display text-lg font-bold text-foreground leading-tight">
            {car.model}
          </h3>
          <div className="text-right">
            <span className="block font-display text-lg font-bold text-primary">
              {car.pricePerDay}€
            </span>
            <span className="text-xs text-muted-foreground font-medium">/jour</span>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Zap className="h-4 w-4" />
            <span>{car.power}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Gauge className="h-4 w-4" />
            <span>{car.transmission}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
