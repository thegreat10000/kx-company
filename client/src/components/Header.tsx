import { Link } from "wouter";
import { Menu, Phone, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SiWhatsapp, SiSnapchat, SiInstagram } from "react-icons/si";

import logoPng from "@assets/generated_images/childish_pink_car_logo_kx.png";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const ContactInfo = () => (
    <div className="space-y-6 py-4">
      <div className="flex flex-col gap-4">
        <Button 
          className="w-full h-14 text-lg font-semibold bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg shadow-[#25D366]/20"
          onClick={() => window.open('https://wa.me/33677727957', '_blank')}
        >
          <SiWhatsapp className="mr-3 h-6 w-6" />
          WhatsApp: 06 77 72 79 57
        </Button>
        <Button 
          className="w-full h-14 text-lg font-semibold bg-[#FFFC00] hover:bg-[#EBE800] text-black shadow-lg shadow-[#FFFC00]/20 border-none"
          onClick={() => window.open('https://snapchat.com/add/RIIMKA672', '_blank')}
        >
          <SiSnapchat className="mr-3 h-6 w-6" />
          Snapchat: RIIMKA672
        </Button>
        <Button 
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] hover:opacity-90 text-white shadow-lg shadow-pink-500/20 border-none"
          onClick={() => window.open('https://instagram.com/kx.location', '_blank')}
        >
          <SiInstagram className="mr-3 h-6 w-6" />
          Instagram: kx.location
        </Button>
      </div>
      <div className="text-center text-muted-foreground">
        <p>Disponible 24/7 pour vos réservations à Strasbourg</p>
      </div>
    </div>
  );

  const NavLinks = () => (
    <>
      <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
        Accueil
      </Link>
      <Link href="/catalogue" className="text-sm font-medium hover:text-primary transition-colors">
        Nos Véhicules
      </Link>
      <Dialog>
        <DialogTrigger asChild>
          <button className="text-sm font-medium hover:text-primary transition-colors">
            Contact
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Contactez KX Location</DialogTitle>
          </DialogHeader>
          <ContactInfo />
        </DialogContent>
      </Dialog>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-3 group">
          <img src={logoPng} alt="KX Location" className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            KX <span className="text-primary">Location</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLinks />
          <Button size="sm" className="rounded-full px-6 font-semibold shadow-lg shadow-primary/20" onClick={() => window.open('tel:0677727957')}>
            <Phone className="mr-2 h-4 w-4" />
            06 77 72 79 57
          </Button>
        </nav>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[385px]">
              <div className="flex flex-col gap-6 mt-10">
                <Link href="/" onClick={() => setIsOpen(false)} className="text-lg font-medium">
                  Accueil
                </Link>
                <Link href="/catalogue" onClick={() => setIsOpen(false)} className="text-lg font-medium">
                  Nos Véhicules
                </Link>
                <Link href="#contact" onClick={() => setIsOpen(false)} className="text-lg font-medium">
                  Contact
                </Link>
                <div className="border-t pt-6">
                  <Button className="w-full rounded-full" size="lg" onClick={() => window.open('tel:0677727957')}>
                    <Phone className="mr-2 h-4 w-4" />
                    Appeler maintenant
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
