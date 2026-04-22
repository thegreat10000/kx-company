import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import nodemailer from "nodemailer";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.cars.list.path, async (req, res) => {
    const cars = await storage.getCars();
    res.json(cars);
  });

  app.get(api.cars.get.path, async (req, res) => {
    const car = await storage.getCar(Number(req.params.id));
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json(car);
  });

  app.post("/api/bookings", async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        hasLicense3Years,
        depositMethod,
        selectedCar,
        dateRange,
      } = req.body;

      const car = await storage.getCar(Number(selectedCar));
      if (!car) {
        return res.status(404).json({ message: "Véhicule non trouvé" });
      }

      const dateFrom = dateRange.from ? new Date(dateRange.from).toLocaleDateString('fr-FR') : 'Non spécifiée';
      const dateTo = dateRange.to ? new Date(dateRange.to).toLocaleDateString('fr-FR') : 'Même jour';

      const depositMethodMap: Record<string, string> = {
        "carte-bancaire": "Carte bancaire",
        "espece": "Espèce",
        "empreinte-bancaire": "Empreinte bancaire",
        "virement": "Virement",
        "vehicule-equivalent": "Véhicule équivalent",
      };

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.ethereal.email",
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      const mailOptions = {
        from: `"KX Location" <${process.env.SMTP_USER || 'noreply@kx-location.com'}>`,
        to: process.env.BOOKING_EMAIL || "contact@kx-location.com",
        subject: `Nouvelle réservation: ${car.model}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
            <div style="background-color: #DB3B91; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0;">🚗 Nouvelle Demande de Réservation</h1>
            </div>
            <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px;">
              <h2 style="color: #DB3B91; border-bottom: 2px solid #DB3B91; padding-bottom: 10px;">Informations Client</h2>
              <table style="width: 100%; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 8px; font-weight: bold;">Nom complet:</td>
                  <td style="padding: 8px;">${firstName} ${lastName}</td>
                </tr>
                <tr style="background-color: #f9f9f9;">
                  <td style="padding: 8px; font-weight: bold;">Email:</td>
                  <td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px; font-weight: bold;">Téléphone:</td>
                  <td style="padding: 8px;"><a href="tel:${phone}">${phone}</a></td>
                </tr>
                <tr style="background-color: #f9f9f9;">
                  <td style="padding: 8px; font-weight: bold;">Permis +3 ans:</td>
                  <td style="padding: 8px;">${hasLicense3Years === 'oui' ? '✅ Oui' : '❌ Non'}</td>
                </tr>
              </table>

              <h2 style="color: #DB3B91; border-bottom: 2px solid #DB3B91; padding-bottom: 10px;">Détails de la Réservation</h2>
              <table style="width: 100%; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 8px; font-weight: bold;">Véhicule:</td>
                  <td style="padding: 8px;"><strong style="color: #DB3B91;">${car.model}</strong></td>
                </tr>
                <tr style="background-color: #f9f9f9;">
                  <td style="padding: 8px; font-weight: bold;">Prix:</td>
                  <td style="padding: 8px;">${car.pricePerDay}€/jour</td>
                </tr>
                <tr>
                  <td style="padding: 8px; font-weight: bold;">Date de début:</td>
                  <td style="padding: 8px;">${dateFrom}</td>
                </tr>
                <tr style="background-color: #f9f9f9;">
                  <td style="padding: 8px; font-weight: bold;">Date de fin:</td>
                  <td style="padding: 8px;">${dateTo}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; font-weight: bold;">Mode de caution:</td>
                  <td style="padding: 8px;">${depositMethodMap[depositMethod] || depositMethod}</td>
                </tr>
                <tr style="background-color: #f9f9f9;">
                  <td style="padding: 8px; font-weight: bold;">Montant caution:</td>
                  <td style="padding: 8px;">${car.caution?.toLocaleString()}€</td>
                </tr>
              </table>

              <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin-top: 20px;">
                <p style="margin: 0; color: #856404;">
                  <strong>Action requise:</strong> Contactez le client dans les plus brefs délais pour confirmer la réservation.
                </p>
              </div>

              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                <p style="color: #666; font-size: 12px; margin: 0;">
                  Email généré automatiquement par KX Location - ${new Date().toLocaleString('fr-FR')}
                </p>
              </div>
            </div>
          </div>
        `,
      };

      const info = await transporter.sendMail(mailOptions);

      console.log("Email de réservation envoyé:", info.messageId);

      if (process.env.NODE_ENV === "development" && !process.env.SMTP_HOST) {
        console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
      }

      res.json({
        message: "Réservation envoyée avec succès",
        messageId: info.messageId,
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      res.status(500).json({
        message: "Erreur lors de l'envoi de la réservation",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  async function seedDatabase() {
    await storage.deleteAllCars();
    
    const seedCars = [
      {
        model: "Mercedes A35 AMG",
        pricePerDay: 200,
        imageUrl: "/images/a35_amg_new.jpg",
        galleryUrls: [
          "/images/a35_amg_new.jpg",
          "/images/a35_amg_new1.JPG",
          "/images/a35_amg_new2.JPG",
          "/images/a35_amg_new3.JPG",
          "/images/a35_amg_new4.JPG",
          "/images/a35_amg_new5.JPG",
          "/images/a35_amg_new6.JPG",
          "/images/a35_amg_new7.JPG"
        ],
        power: "306 ch",
        motorisation: "Essence",
        transmission: "Automatique",
        options: ["Apple CarPlay", "Ambiance LED", "Volant AMG Performance", "Toit Panoramique"],
        category: "Berline Sportive",
        caution: 5000,
        conditions: ["Âge minimum 21 ans", "Pièce d'identité", "Permis de conduire > 3 ans", "Justificatif de domicile (- 3 mois)"],
        displayOrder: 1,
        pricingInfo: JSON.stringify({
          type: "standard",
          prices: [
            { duration: "24h", price: "200€", note: "en semaine" },
            { duration: "48h", price: "650€", note: "Vendredi à Dimanche" },
            { duration: "72h", price: "800€", note: "Vendredi à Lundi" },
            { duration: "7 jours", price: "1200€", note: "Semaine entière" }
          ]
        })
      },
      {
        model: "Volkswagen Golf 8R ⚫️🔵",
        pricePerDay: 250,
        imageUrl: "/images/golf8r_new1.jpeg",
        galleryUrls: [
          "/images/golf8r_new1.jpeg",
          "/images/golf8r_new2.jpeg",
          "/images/golf8r_new3.jpeg",
          "/images/golf8r_new4.jpeg",
          "/images/golf8r_new5.jpeg",
          "/images/golf8r_new6.jpeg",
          "/images/golf8r_new7.jpeg",
          "/images/golf8r_new8.jpeg",
          "/images/golf8r_new9.jpeg",
          "/images/golf8r_new10.jpeg",
          "/images/golf8r_new11.jpeg",
          "/images/golf8r_new12.jpeg"
        ],
        power: "320 ch",
        motorisation: "Essence",
        transmission: "Automatique",
        options: ["Apple CarPlay", "Ambiance LED", "Digital Cockpit Pro", "Toit Ouvrant"],
        category: "Compacte Sportive",
        caution: 5000,
        conditions: ["Âge minimum 21 ans", "Pièce d'identité", "Permis de conduire > 3 ans", "Justificatif de domicile (- 3 mois)"],
        displayOrder: 4,
        pricingInfo: JSON.stringify({
          type: "standard",
          prices: [
            { duration: "24h", price: "250€", note: "en semaine" },
            { duration: "48h", price: "700€", note: "Vendredi à Dimanche" },
            { duration: "72h", price: "850€", note: "Vendredi à Lundi" },
            { duration: "7 jours", price: "1 500€", note: "Semaine entière" }
          ]
        })
      },
      {
        model: "Mercedes C43 AMG",
        pricePerDay: 250,
        imageUrl: "/images/c43_amg_new.jpg",
        galleryUrls: [
          "/images/c43_amg_new.jpg",
          "/images/c43_amg_new1.JPG",
          "/images/c43_amg_new2.JPG",
          "/images/c43_amg_new3.JPG",
          "/images/c43_amg_new4.JPG",
          "/images/c43_amg_new5.JPG",
          "/images/c43_amg_new6.JPG",
          "/images/c43_amg_new7.JPG"
        ],
        power: "390 ch",
        motorisation: "Essence",
        transmission: "Automatique",
        options: ["Apple CarPlay", "Ambiance LED", "Caméra 360", "Toit Panoramique"],
        category: "Berline Sportive",
        caution: 5000,
        conditions: ["Âge minimum 21 ans", "Pièce d'identité", "Permis de conduire > 3 ans", "Justificatif de domicile (- 3 mois)"],
        displayOrder: 2,
        pricingInfo: JSON.stringify({
          type: "standard",
          prices: [
            { duration: "24h", price: "250€", note: "en semaine" },
            { duration: "48h", price: "750€", note: "Vendredi à Dimanche" },
            { duration: "72h", price: "900€", note: "Vendredi à Lundi" },
            { duration: "7 jours", price: "1500€", note: "Semaine entière" }
          ]
        })
      },
      {
        model: "Mercedes Classe S Maybach",
        pricePerDay: 450,
        imageUrl: "/images/maybach_new1.jpeg",
        galleryUrls: [
          "/images/maybach_new1.jpeg",
          "/images/maybach_new2.jpeg",
          "/images/maybach_new3.jpeg",
          "/images/maybach_new4.jpeg",
          "/images/maybach_new5.jpeg",
          "/images/maybach_new6.jpeg",
          "/images/maybach_new7.jpeg",
          "/images/maybach_new8.jpeg",
          "/images/maybach_new9.jpeg",
          "/images/maybach_new10.jpeg"
        ],
        power: "258 ch",
        motorisation: "Diesel",
        transmission: "Automatique",
        options: ["Apple CarPlay", "Ambiance LED", "Son Burmester", "Double Toit Panoramique"],
        category: "Berline Ultra-Luxueuse",
        caution: 5000,
        conditions: [
          "Âge minimum 21 ans",
          "Pièce d'identité",
          "Permis de conduire > 3 ans",
          "Justificatif de domicile (- 3 mois)",
          "Prestation avec ou sans chauffeur sur devis",
          "Caution requise uniquement pour les prestations sans chauffeur"
        ],
        displayOrder: 3,
        pricingInfo: JSON.stringify({
          type: "standard",
          prices: [
            { duration: "24h", price: "450€", note: "en semaine" },
            { duration: "48h", price: "900€", note: "Vendredi à Dimanche" },
            { duration: "Chauffeur disponible en option", price: "", note: "" }
          ],
          extra: "Chauffeur disponible en option"
        })
      },
      {
        model: "Peugeot 208 GT",
        pricePerDay: 80,
        imageUrl: "/images/208_gt_new.jpg",
        galleryUrls: [
          "/images/208_gt_new.jpg",
          "/images/208_gt_new1.jpg",
          "/images/208_gt_new2.JPG",
          "/images/208_gt_new3.jpg",
          "/images/208_gt_new5.jpg",
          "/images/208_gt_new6.jpg",
          "/images/208_gt_new7.jpg",
          "/images/208_gt_new8.jpg"
        ],
        power: "110 ch",
        motorisation: "Hybride",
        transmission: "Automatique",
        options: ["Apple CarPlay", "Ambiance LED", "i-Cockpit 3D", "Toit Black Diamond"],
        category: "Compacte Citadine",
        caution: 2000,
        conditions: ["Âge minimum 20 ans", "Pièce d'identité", "Permis de conduire > 1 an", "Justificatif de domicile (- 3 mois)"],
        displayOrder: 5,
        pricingInfo: JSON.stringify({
          type: "standard",
          prices: [
            { duration: "24h", price: "80€", note: "en semaine" },
            { duration: "48h", price: "220€", note: "Vendredi à Dimanche" },
            { duration: "72h", price: "300€", note: "Vendredi à Lundi" },
            { duration: "7 jours", price: "450€", note: "Semaine entière" },
            { duration: "30 jours", price: "1300€", note: "Mois complet" }
          ]
        })
      },
      {
        model: "Renault Clio V Alpine",
        pricePerDay: 80,
        imageUrl: "/images/clio_alpine1.jpeg",
        galleryUrls: [
          "/images/clio_alpine1.jpeg",
          "/images/clio_alpine2.jpeg",
          "/images/clio_alpine3.jpeg",
          "/images/clio_alpine4.jpeg",
          "/images/clio_alpine5.jpeg",
          "/images/clio_alpine6.jpeg",
          "/images/clio_alpine7.jpeg",
          "/images/clio_alpine9.jpeg"
        ],
        power: "140 ch",
        motorisation: "Hybride",
        transmission: "Automatique",
        options: ["Apple CarPlay", "Ambiance LED", "Cockpit", "Frein régénératif"],
        category: "Compacte Citadine",
        caution: 2000,
        conditions: ["Âge minimum 20 ans", "Pièce d'identité", "Permis de conduire > 1 an", "Justificatif de domicile (- 3 mois)"],
        displayOrder: 6,
        pricingInfo: JSON.stringify({
          type: "standard",
          prices: [
            { duration: "24h", price: "80€", note: "en semaine" },
            { duration: "48h", price: "220€", note: "Vendredi à Dimanche" },
            { duration: "72h", price: "300€", note: "Vendredi à Lundi" },
            { duration: "7 jours", price: "450€", note: "Semaine entière" },
            { duration: "30 jours", price: "1300€", note: "Mois complet" }
          ]
        })
      }
    ];

    for (const car of seedCars) {
      await storage.createCar(car);
    }
    console.log("Database seeded with cars");
  }

  seedDatabase();

  return httpServer;
}
