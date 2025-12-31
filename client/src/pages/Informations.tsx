import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, CreditCard, CalendarCheck, Fuel, ShieldAlert, Sparkles, ClipboardList } from "lucide-react";
import { motion } from "framer-motion";

export default function Informations() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pb-16 md:pb-24 bg-slate-50/30">
        {/* Hero Section with pleasant background */}
        <section className="bg-slate-100 py-16 md:py-24 mb-12">
          <div className="container px-4 md:px-6 mx-auto max-w-5xl text-center">
            <h1 className="font-display text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-slate-900">
              Conditions & Fonctionnement
            </h1>
            <p className="text-xl text-slate-600 font-serif italic max-w-2xl mx-auto">
              Tout ce que vous devez savoir pour louer l'excellence en toute sérénité.
            </p>
          </div>
        </section>

        <div className="container px-4 md:px-6 mx-auto max-w-5xl">

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-12"
          >
            {/* 1. CONDITIONS DE LOCATION */}
            <motion.section variants={itemVariants} className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                  <ClipboardList className="w-6 h-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 uppercase tracking-wide">
                  Conditions de location
                </h2>
              </div>
              <Card className="border-none shadow-xl bg-white overflow-hidden">
                <CardContent className="p-8 md:p-10">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <li className="flex items-start gap-4">
                      <div className="bg-slate-100 p-3 rounded-xl text-slate-600">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">Permis de conduire</h3>
                        <p className="text-slate-500">Document original en cours de validité.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-slate-100 p-3 rounded-xl text-slate-600">
                        <ShieldAlert className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">Pièce d'identité</h3>
                        <p className="text-slate-500">CNI ou Passeport original requis.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-slate-100 p-3 rounded-xl text-slate-600">
                        <CalendarCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">Justificatif de domicile</h3>
                        <p className="text-slate-500">De moins de 3 mois obligatoire.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-slate-100 p-3 rounded-xl text-slate-600">
                        <CreditCard className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">Caution</h3>
                        <p className="text-slate-500">CB, Espèces ou véhicule équivalent + 1.000€.</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.section>

            {/* 2. FONCTIONNEMENT DE LA CAUTION */}
            <motion.section variants={itemVariants} className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 uppercase tracking-wide">
                  Fonctionnement de la caution
                </h2>
              </div>
              <Card className="border-none shadow-xl bg-white overflow-hidden">
                <CardContent className="p-8 md:p-10">
                  <div className="space-y-8">
                    <div className="flex gap-6 items-center border-b border-slate-100 pb-6">
                      <span className="text-primary font-bold text-xl">01</span>
                      <p className="text-lg font-medium text-slate-900">
                        La caution est à déposer <span className="text-primary font-bold">OBLIGATOIREMENT</span> avant tout départ.
                      </p>
                    </div>
                    <div className="flex gap-6 items-center border-b border-slate-100 pb-6">
                      <span className="text-primary font-bold text-xl">02</span>
                      <p className="text-lg font-medium text-slate-900">
                        Tout frais, résultant d'un <span className="text-primary font-bold">USURE ANORMALE</span>, sont à la charge du client.
                      </p>
                    </div>
                    <div className="flex gap-6 items-center">
                      <span className="text-primary font-bold text-xl">03</span>
                      <p className="text-lg font-medium text-slate-900">
                        Dans le cas où les <span className="text-primary font-bold">FRAIS DE RÉPARATION</span> s'avèrent supérieur à la caution, la différence reste à la charge du client.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.section>

            {/* 3. RÉSERVATION ET ACOMPTE */}
            <motion.section variants={itemVariants} className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                  <CalendarCheck className="w-6 h-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 uppercase tracking-wide">
                  Réservation et acompte
                </h2>
              </div>
              <Card className="border-none shadow-xl bg-white overflow-hidden">
                <CardContent className="p-8 md:p-10 space-y-8">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <p className="text-slate-600 leading-relaxed">
                      Un acompte est un premier versement dans le cadre d'un achat ou d'une prestation de services. Dès lors qu'il est versé, chaque parties se voient obligés de tenir ses engagements.
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row gap-8 items-center bg-primary/5 p-8 rounded-2xl border border-primary/10">
                    <div className="text-center md:text-left flex-1">
                      <h3 className="text-xl font-bold mb-2">Montant de la réservation</h3>
                      <p className="text-slate-600">
                        Pour toute réservation, un acompte à hauteur de <span className="text-primary font-bold text-lg">50% du montant</span> de la location est exigé.
                      </p>
                    </div>
                    <div className="w-full md:w-px h-px md:h-16 bg-primary/20" />
                    <div className="text-center md:text-left flex-1">
                      <h3 className="text-xl font-bold mb-2 text-red-600">En cas d'annulation</h3>
                      <p className="text-slate-600">
                        À l'initiative du client, ce dernier ne pourra en aucun cas être <span className="font-bold">restitué</span>.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.section>

            {/* 4. PRISE EN CHARGE ET RESTITUTION */}
            <motion.section variants={itemVariants} className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                  <Fuel className="w-6 h-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 uppercase tracking-wide">
                  Prise en charge et restitution
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="border-none shadow-xl bg-white overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-primary/10 p-2 rounded-lg text-primary">
                        <Fuel className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-lg">Carburant</h3>
                    </div>
                    <p className="text-slate-600 mb-4">
                      Véhicule fourni avec le plein de carburant. Il doit être rendu avec le plein.
                    </p>
                    <div className="bg-primary text-white px-4 py-2 rounded-full inline-block font-bold text-sm">
                      SP98 UNIQUEMENT
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-xl bg-white overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-primary/10 p-2 rounded-lg text-primary">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-lg">Propreté</h3>
                    </div>
                    <p className="text-slate-600">
                      Véhicule fourni dans un état de propreté irréprochable. Il doit donc être rendu dans le même état.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="bg-slate-900 text-slate-400 p-8 rounded-3xl text-center">
                <p className="text-sm">
                  LES DOCUMENTS ET ÉQUIPEMENTS MIS À DISPOSITION DOIVENT ÊTRE RESTITUÉS LORS DU RETOUR.
                </p>
                <p className="text-primary font-bold mt-4 text-xs tracking-widest uppercase">
                  À défaut du respect de ces règles, le client se verra facturé.
                </p>
              </div>
            </motion.section>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
