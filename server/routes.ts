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
        model: "Mercedes C43 AMG",
        pricePerDay: 250,
        imageUrl: "/images/c43-amg.jpg",
        galleryUrls: ["/images/c43-amg.jpg"],
        power: "390 ch",
        transmission: "Automatique",
        options: ["Pack Performance", "Échappement AMG", "Sièges Performance", "Burmester"],
        category: "Sport",
        caution: 5000,
        conditions: ["Âge minimum 21 ans", "Permis de conduire > 2 ans", "Justificatif de domicile (- 3 mois)", "Pièce d'identité"],
        pricingInfo: JSON.stringify({
          type: "standard",
          prices: [
            { duration: "24h", price: "250€", note: "en semaine" },
            { duration: "48h", price: "750€", note: "week-end inclus" },
            { duration: "72h", price: "900€", note: "week-end inclus" },
            { duration: "7 jours", price: "1500€", note: "" }
          ]
        })
      },
      {
        model: "Mercedes Classe S Maybach",
        pricePerDay: 900,
        imageUrl: "attached_assets/s_devant_1767034994217.jpg",
        galleryUrls: [
          "attached_assets/s_devant_1767034994217.jpg",
          "attached_assets/s2_1767034999895.jpg",
          "attached_assets/s3_1767035002650.jpg",
          "attached_assets/s4_1767035004807.jpg",
          "attached_assets/s_arriere_1767035011532.jpg",
          "attached_assets/cdda4d84-6306-43da-a681-fd4f8e1b5fb5_1767035032788.jpg"
        ],
        power: "469 ch",
        transmission: "Automatique",
        options: ["Chauffeur Uniquement", "Accompagnement Complet", "Cortège Mairie", "Salon VIP"],
        category: "Luxe",
        caution: 5000,
        conditions: ["Avec chauffeur uniquement", "Prestation sur devis", "Strasbourg & alentours"],
        pricingInfo: JSON.stringify({
          type: "chauffeur",
          basePrice: "900€",
          note: "Chauffeur inclus uniquement",
          extra: "Pack cortège, mairie et plus disponibles. Contactez-nous pour plus d'informations."
        })
      },
      {
        model: "Mercedes A35 AMG",
        pricePerDay: 200,
        imageUrl: "/images/a35-amg.jpg",
        galleryUrls: ["/images/a35-amg.jpg"],
        power: "306 ch",
        transmission: "Automatique",
        options: ["4MATIC", "AMG Line", "MBUX", "Toit ouvrant"],
        category: "Berline sportive",
        caution: 5000,
        conditions: ["Âge minimum 21 ans", "Permis de conduire > 2 ans", "Justificatif de domicile (- 3 mois)", "Pièce d'identité"],
        pricingInfo: JSON.stringify({
          type: "standard",
          prices: [
            { duration: "24h", price: "200€", note: "" },
            { duration: "48h", price: "650€", note: "week-end inclus" },
            { duration: "72h", price: "800€", note: "week-end inclus" },
            { duration: "7 jours", price: "1200€", note: "" }
          ]
        })
      },
      {
        model: "Peugeot 208 GT",
        pricePerDay: 80,
        imageUrl: "attached_assets/riimka672-2025-11-22T19-11-59_1767035330155.jpg",
        galleryUrls: ["attached_assets/riimka672-2025-11-22T19-11-59_1767035330155.jpg"],
        power: "130 ch",
        transmission: "Automatique",
        options: ["Finition GT", "i-Cockpit 3D", "Caméra de recul", "Toit Black Diamond"],
        category: "",
        caution: 2000,
        conditions: ["Âge minimum 21 ans", "Permis de conduire > 2 ans", "Justificatif de domicile (- 3 mois)", "Pièce d'identité"],
        pricingInfo: null
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
