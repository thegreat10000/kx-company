import { Link } from "wouter";
import { Car, Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const NavLinks = () => (
    <>
      <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
        Accueil
      </Link>
      <Link href="/catalogue" className="text-sm font-medium hover:text-primary transition-colors">
        Nos Véhicules
      </Link>
      <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
        Contact
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="bg-primary p-1.5 rounded-lg group-hover:bg-primary/90 transition-colors">
            <Car className="h-5 w-5 text-white" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            KX <span className="text-primary">Location</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLinks />
          <Button size="sm" className="rounded-full px-6 font-semibold shadow-lg shadow-primary/20">
            <Phone className="mr-2 h-4 w-4" />
            07 12 34 56 78
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
                  <Button className="w-full rounded-full" size="lg">
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
