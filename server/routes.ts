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

  // Seed data function
  async function seedDatabase() {
    const existingCars = await storage.getCars();
    if (existingCars.length === 0) {
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
          conditions: ["Âge minimum 21 ans", "Permis de conduire > 2 ans", "Justificatif de domicile (- 3 mois)", "Pièce d'identité"]
        },
        {
          model: "Mercedes A35 AMG",
          pricePerDay: 200,
          imageUrl: "/images/a35-amg.jpg",
          galleryUrls: ["/images/a35-amg.jpg"],
          power: "306 ch",
          transmission: "Automatique",
          options: ["4MATIC", "AMG Line", "MBUX", "Toit ouvrant"],
          category: "Sport",
          caution: 5000,
          conditions: ["Âge minimum 21 ans", "Permis de conduire > 2 ans", "Justificatif de domicile (- 3 mois)", "Pièce d'identité"]
        },
        {
          model: "Mercedes Classe S Maybach",
          pricePerDay: 900,
          imageUrl: "/images/classe-s-maybach.jpg",
          galleryUrls: ["/images/classe-s-maybach.jpg"],
          power: "469 ch",
          transmission: "Automatique",
          options: ["Chauffeur Uniquement", "Accompagnement Complet", "Cortège Mairie", "Salon VIP"],
          category: "Luxe",
          caution: 5000,
          conditions: ["Avec chauffeur uniquement", "Prestation sur devis", "Strasbourg & alentours"]
        }
      ];

      for (const car of seedCars) {
        await storage.createCar(car);
      }
      console.log("Database seeded with cars");
    }
  }

  seedDatabase();

  return httpServer;
}
