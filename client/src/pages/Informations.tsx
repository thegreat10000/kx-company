import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Fuel, Clock, Wallet, CalendarDays, CheckCircle2 } from "lucide-react";

export default function Informations() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Conditions & Fonctionnement</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tout ce que vous devez savoir pour louer votre véhicule de prestige en toute sérénité chez KX Location.
            </p>
          </div>

          <div className="space-y-20">
            {/* Caution Section */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Wallet className="h-8 w-8" />
                </div>
                <h2 className="font-display text-3xl font-bold">Fonctionnement de la caution</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    La sécurité et la protection de nos véhicules sont primordiales. Voici les règles concernant le dépôt de garantie :
                  </p>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                      <p><span className="font-bold text-foreground">Dépôt Obligatoire :</span> La caution doit être déposée impérativement avant tout départ avec le véhicule.</p>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                      <p><span className="font-bold text-foreground">Usure Anormale :</span> Tous les frais résultant d'une usure non conforme à une utilisation normale sont à la charge exclusive du client.</p>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                      <p><span className="font-bold text-foreground">Dépassement de Caution :</span> Si les frais de réparation sont supérieurs au montant de la caution, la différence reste à la charge du client.</p>
                    </li>
                  </ul>
                  <div className="bg-muted p-4 rounded-xl border border-border">
                    <p className="font-semibold mb-2">Moyens de dépôt de garantie acceptés :</p>
                    <div className="flex gap-4 items-center">
                      <span className="bg-white px-3 py-1 rounded shadow-sm text-sm font-bold">CB</span>
                      <span className="bg-white px-3 py-1 rounded shadow-sm text-sm font-bold">Espèces</span>
                      <span className="bg-white px-3 py-1 rounded shadow-sm text-sm font-bold">Virement</span>
                    </div>
                  </div>
                </div>
                <Card className="overflow-hidden border-none shadow-2xl rotate-2">
                  <img src="attached_assets/fonctionnement_caution_1767027896057.jpg" alt="Fonctionnement Caution" className="w-full h-auto" />
                </Card>
              </div>
            </section>

            {/* Prise en charge Section */}
            <section>
              <div className="flex items-center gap-4 mb-8 md:justify-end">
                <h2 className="font-display text-3xl font-bold">Prise en charge et Restitution</h2>
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Fuel className="h-8 w-8" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <Card className="overflow-hidden border-none shadow-2xl -rotate-2 order-2 md:order-1">
                  <img src="attached_assets/prise_en_charge_et_restitution_1767027896059.jpg" alt="Restitution" className="w-full h-auto" />
                </Card>
                <div className="space-y-6 order-1 md:order-2">
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    Nous vous remettons un véhicule dans un état irréprochable. Nous attendons le même soin lors du retour :
                  </p>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                      <p><span className="font-bold text-foreground">Carburant :</span> Le véhicule est fourni avec le plein. Il doit être rendu avec le plein fait en <span className="text-primary font-bold">SP98 UNIQUEMENT</span>.</p>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                      <p><span className="font-bold text-foreground">Propreté :</span> Le véhicule doit être rendu dans le même état de propreté irréprochable qu'à la prise en charge.</p>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                      <p><span className="font-bold text-foreground">Documents & Équipements :</span> Tous les éléments mis à disposition doivent être restitués lors du retour.</p>
                    </li>
                  </ul>
                  <p className="text-sm font-bold text-destructive italic">
                    À défaut du respect de ces règles, le client se verra facturer des frais supplémentaires.
                  </p>
                </div>
              </div>
            </section>

            {/* Réservation Section */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <CalendarDays className="h-8 w-8" />
                </div>
                <h2 className="font-display text-3xl font-bold">Réservation et Acompte</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    L'acompte est le premier versement qui scelle votre engagement et notre prestation de service.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                      <p><span className="font-bold text-foreground">Engagement Mutuel :</span> Dès que l'acompte est versé, chaque partie est obligée de tenir ses engagements.</p>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                      <p><span className="font-bold text-foreground">Montant de l'Acompte :</span> Un acompte à hauteur de <span className="text-primary font-bold">50% du montant total</span> de la location est exigé pour valider toute réservation.</p>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                      <p><span className="font-bold text-foreground">Politique d'Annulation :</span> En cas d'annulation à l'initiative du client, l'acompte ne pourra en aucun cas être restitué.</p>
                    </li>
                  </ul>
                  <div className="bg-muted p-4 rounded-xl border border-border">
                    <p className="font-semibold mb-2">Moyens de dépôt d'acompte acceptés :</p>
                    <div className="flex gap-4 items-center">
                      <span className="bg-white px-3 py-1 rounded shadow-sm text-sm font-bold">CB</span>
                      <span className="bg-white px-3 py-1 rounded shadow-sm text-sm font-bold">Espèces</span>
                      <span className="bg-white px-3 py-1 rounded shadow-sm text-sm font-bold">Virement</span>
                    </div>
                  </div>
                </div>
                <Card className="overflow-hidden border-none shadow-2xl rotate-2">
                  <img src="attached_assets/reservation_et_acompte_1767027896060.jpg" alt="Réservation et Acompte" className="w-full h-auto" />
                </Card>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
