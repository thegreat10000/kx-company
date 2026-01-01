import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

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

  // Route to delete all cars (for admin reset)
  app.delete("/api/cars", async (req, res) => {
    await storage.deleteAllCars();
    res.json({ message: "All cars deleted" });
  });

  // Seed data function
  async function seedDatabase() {
    // Delete existing cars to force refresh seed data
    await storage.deleteAllCars();
    
    const seedCars = [
      {
        model: "Mercedes A35 AMG",
        pricePerDay: 200,
        imageUrl: "/images/a35_amg_new.jpg",
        galleryUrls: ["/images/a35_amg_new.jpg"],
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
        model: "Mercedes C43 AMG",
        pricePerDay: 250,
        imageUrl: "/images/c43_amg_new.jpg",
        galleryUrls: ["/images/c43_amg_new.jpg"],
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
        imageUrl: "/images/s_devant_1767034994217.jpg",
        galleryUrls: [
          "/images/s_devant_1767034994217.jpg",
          "/images/s2_1767034999895.jpg",
          "/images/s3_1767035002650.jpg",
          "/images/s4_1767035004807.jpg",
          "/images/s_arriere_1767035011532.jpg",
          "/images/cdda4d84-6306-43da-a681-fd4f8e1b5fb5_1767035032788.jpg"
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
        galleryUrls: ["/images/208_gt_new.jpg"],
        power: "110 ch",
        motorisation: "Hybride",
        transmission: "Automatique",
        options: ["Apple CarPlay", "Ambiance LED", "i-Cockpit 3D", "Toit Black Diamond"],
        category: "Compacte Citadine",
        caution: 2000,
        conditions: ["Âge minimum 20 ans", "Pièce d'identité", "Permis de conduire > 1 an", "Justificatif de domicile (- 3 mois)"],
        displayOrder: 4,
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

  // Seed initial cars data
  seedDatabase();

  return httpServer;
}
