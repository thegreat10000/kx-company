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
        model: "Peugeot 208 GT",
        pricePerDay: 80,
        imageUrl: "attached_assets/riimka672-2025-11-22T19-11-59_1767035330155.jpg",
        galleryUrls: ["attached_assets/riimka672-2025-11-22T19-11-59_1767035330155.jpg"],
        power: "130 ch",
        transmission: "Automatique",
        options: ["Finition GT", "i-Cockpit 3D", "Caméra de recul", "Toit Black Diamond"],
        category: "",
        caution: 2000,
        conditions: ["Âge minimum 21 ans", "Permis de conduire > 2 ans", "Justificatif de domicile (- 3 mois)", "Pièce d'identité"]
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
