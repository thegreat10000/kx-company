import { Instagram, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiWhatsapp, SiSnapchat, SiInstagram } from "react-icons/si";
import logoPng from "@assets/image_1767024778246.png";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="font-display text-2xl md:text-3xl font-extrabold tracking-tighter">
                KX <span className="text-primary italic">Location</span>
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

          {/* CTA & Socials */}
          <div className="space-y-4 md:text-right">
            <h3 className="font-display text-lg font-bold">Disponibilités</h3>
            <p className="text-muted-foreground ml-auto max-w-xs">
              Découvrez notre véhicules et réservez dès maintenant votre prochaine virée.
            </p>
            <div className="flex flex-col gap-4 md:items-end">
              <Button 
                size="lg" 
                className="w-full md:w-auto font-semibold bg-primary hover:bg-primary/90 text-white" 
                onClick={() => window.open('/catalogue', '_self')}
              >
                Voir toutes les dispos
              </Button>
              <div className="flex gap-4 justify-start md:justify-end">
                <Button 
                  size="icon" 
                  className="rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg shadow-[#25D366]/20"
                  onClick={() => window.open('https://wa.me/33677727957', '_blank')}
                >
                  <SiWhatsapp className="h-5 w-5" />
                </Button>
                <Button 
                  size="icon" 
                  className="rounded-full bg-[#FFFC00] hover:bg-[#EBE800] text-black shadow-lg shadow-[#FFFC00]/20 border-none"
                  onClick={() => window.open('https://snapchat.com/add/RIIMKA672', '_blank')}
                >
                  <SiSnapchat className="h-5 w-5" />
                </Button>
                <Button 
                  size="icon" 
                  className="rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] hover:opacity-90 text-white shadow-lg shadow-pink-500/20 border-none"
                  onClick={() => window.open('https://instagram.com/kx.location', '_blank')}
                >
                  <SiInstagram className="h-5 w-5" />
                </Button>
              </div>
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
