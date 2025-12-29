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
          model: "Mercedes Classe E",
          pricePerDay: 120,
          imageUrl: "/images/classe-e.jpg",
          galleryUrls: ["/images/classe-e.jpg"],
          power: "194 ch",
          transmission: "Automatique",
          options: ["GPS", "Toit ouvrant", "Sièges chauffants", "Bluetooth"],
          category: "Luxe",
          caution: 5000,
          conditions: ["Âge minimum 21 ans", "Permis de conduire > 2 ans", "Justificatif de domicile", "Pièce d'identité"]
        },
        {
          model: "Mercedes Classe S",
          pricePerDay: 250,
          imageUrl: "/images/classe-s.webp",
          galleryUrls: ["/images/classe-s.webp"],
          power: "286 ch",
          transmission: "Automatique",
          options: ["Massage", "Son Burmester", "Night Vision", "Pack Chauffeur"],
          category: "Luxe",
          caution: 5000,
          conditions: ["Âge minimum 25 ans", "Permis de conduire > 3 ans", "Justificatif de domicile", "Pièce d'identité"]
        },
        {
          model: "Renault Clio 5",
          pricePerDay: 45,
          imageUrl: "/images/clio-5.jpg",
          galleryUrls: ["/images/clio-5.jpg"],
          power: "100 ch",
          transmission: "Manuelle",
          options: ["Climatisation", "CarPlay", "Régulateur", "Caméra de recul"],
          category: "Citadine",
          caution: 5000,
          conditions: ["Âge minimum 21 ans", "Permis de conduire > 2 ans", "Justificatif de domicile", "Pièce d'identité"]
        },
        {
          model: "Audi A6 S-Line",
          pricePerDay: 110,
          imageUrl: "/images/audi-a6.jpg",
          galleryUrls: ["/images/audi-a6.jpg"],
          power: "204 ch",
          transmission: "Automatique",
          options: ["Virtual Cockpit", "Matrix LED", "Lane Assist", "Cuir"],
          category: "Luxe",
          caution: 5000,
          conditions: ["Âge minimum 21 ans", "Permis de conduire > 2 ans", "Justificatif de domicile", "Pièce d'identité"]
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
