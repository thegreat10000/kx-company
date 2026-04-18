import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-4xl font-bold">Mentions Légales</h1>
        </div>

        <div className="space-y-8 text-foreground">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Informations légales</h2>
            <p className="text-muted-foreground mb-4">
              Conformément aux dispositions des Articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique, dite L.C.E.N., il est porté à la connaissance des utilisateurs et visiteurs du site KX Location les présentes mentions légales.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Éditeur du site</h2>
            <div className="bg-muted p-6 rounded-lg space-y-2">
              <p><strong>Raison sociale :</strong> KX Company</p>
              <p><strong>Forme juridique :</strong> SASU au Capital de 1.000€</p>
              <p><strong>Adresse :</strong> Strasbourg, France</p>
              <p><strong>Email :</strong> kx.company77694@gmail.com</p>
              <p><strong>Téléphone :</strong> +33 6 77 72 79 57</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Hébergement</h2>
            <div className="bg-muted p-6 rounded-lg space-y-2">
              <p><strong>Hébergeur :</strong> Replit.dev </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Propriété intellectuelle</h2>
            <p className="text-muted-foreground mb-4">
              L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
            </p>
            <p className="text-muted-foreground">
              La reproduction de tout ou partie de ce site sur un support électronique ou autre quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Protection des données personnelles</h2>
            <p className="text-muted-foreground mb-4">
              Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.
            </p>
            <p className="text-muted-foreground mb-4">
              Les informations recueillies sur ce site sont enregistrées dans un fichier informatisé par KX Location pour la gestion des réservations et la relation client. Elles sont conservées pendant 3 ans et sont destinées uniquement à KX Location.
            </p>
            <p className="text-muted-foreground">
              Pour exercer vos droits, vous pouvez nous contacter par email à l'adresse : kx.company77694@gmail.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
            <p className="text-muted-foreground">
              Ce site n'utilise pas de cookies de traçage ou de cookies publicitaires. Seuls des cookies techniques nécessaires au bon fonctionnement du site peuvent être utilisés.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Responsabilité</h2>
            <p className="text-muted-foreground mb-4">
              L'éditeur du site ne pourra être tenu responsable des dommages directs et indirects causés au matériel de l'utilisateur, lors de l'accès au site, et résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications indiquées, soit de l'apparition d'un bug ou d'une incompatibilité.
            </p>
            <p className="text-muted-foreground">
              L'éditeur ne pourra également être tenu responsable des dommages indirects consécutifs à l'utilisation du site. Des espaces interactifs (possibilité de poser des questions dans l'espace contact) sont à la disposition des utilisateurs. L'éditeur du site se réserve le droit de supprimer, sans mise en demeure préalable, tout contenu déposé dans cet espace qui contreviendrait à la législation applicable en France.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Droit applicable</h2>
            <p className="text-muted-foreground">
              Tout litige en relation avec l'utilisation du site KX Location est soumis au droit français. Il est fait attribution exclusive de juridiction aux tribunaux compétents de Strasbourg.
            </p>
          </section>

          <div className="pt-8 border-t">
            <p className="text-sm text-muted-foreground text-center">Dernière mise à jour : 09/01/2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}
