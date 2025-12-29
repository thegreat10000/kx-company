import { Instagram, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoPng from "@assets/generated_images/pink_and_black_luxury_logo_kx.png";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src={logoPng} alt="KX Location" className="h-10 w-auto object-contain" />
              <span className="font-display text-xl font-bold tracking-tight">
                KX <span className="text-primary">Location</span>
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-xs">
              Location de véhicules de prestige à Strasbourg. Une expérience de conduite inoubliable avec un service premium.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-bold">Contactez-nous</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span>06 77 72 79 57</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span>contact@kx-location.fr</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Strasbourg, France</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-bold">Disponibilités</h3>
            <p className="text-muted-foreground">
              Découvrez notre véhicules et réservez dès maintenant votre prochaine virée.
            </p>
            <Button size="lg" className="w-full md:w-auto font-semibold bg-primary hover:bg-primary/90 text-white" onClick={() => window.open('/catalogue', '_self')}>
              Voir toutes les dispos
            </Button>
            <div className="pt-4 flex gap-4">
              <a href="https://instagram.com/kx.location" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} KX Location. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
