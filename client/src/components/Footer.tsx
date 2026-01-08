import { Instagram, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiWhatsapp, SiSnapchat, SiTiktok, SiInstagram } from "react-icons/si";
import { Link } from "wouter";
import logoPng from "@assets/image_1767024778246.png";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-bold">Contactez-nous</h3>
            <ul className="space-y-3 text-muted-foreground flex flex-col items-center">
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span>06 77 72 79 57</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="font-display font-bold tracking-tight">KX.Company77694@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Strasbourg, France</span>
              </li>
            </ul>
            
            {/* Socials reordered: Instagram, Snapchat, Whatsapp */}
            <div className="flex gap-4 justify-center pt-2">
              <Button
                size="icon"
                className="rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] hover:opacity-90 text-white shadow-lg shadow-pink-500/20 border-none"
                onClick={() =>
                  window.open("https://www.instagram.com/kx.company?igsh=MnprbGV1czFhZDYy", "_blank")
                }
              >
                <SiInstagram className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                className="rounded-full bg-[#FFFC00] hover:bg-[#EBE800] text-black shadow-lg shadow-[#FFFC00]/20 border-none"
                onClick={() =>
                  window.open("https://snapchat.com/add/RIIMKA672", "_blank")
                }
              >
                <SiSnapchat className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                className="rounded-full bg-black hover:bg-zinc-800 text-white shadow-lg shadow-black/20 border border-white/30"
                onClick={() =>
                  window.open("https://www.tiktok.com/@kx.company", "_blank")
                }
              >
                <SiTiktok className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                className="rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg shadow-[#25D366]/20"
                onClick={() =>
                  window.open("https://wa.me/33677727957", "_blank")
                }
              >
                <SiWhatsapp className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} KX Company. Tous droits réservés.
          </p>
          <Link href="/mentions-legales">
            <a className="text-primary hover:underline mt-2 inline-block">
              Mentions Légales
            </a>
          </Link>
        </div>
      </div>
    </footer>
  );
}
