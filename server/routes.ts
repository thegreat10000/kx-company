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
          imageUrl: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=800",
          galleryUrls: [
            "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800"
          ],
          power: "194 ch",
          transmission: "Automatique",
          options: ["GPS", "Toit ouvrant", "Sièges chauffants", "Bluetooth"],
          category: "Luxe"
        },
        {
          model: "Mercedes Classe S",
          pricePerDay: 250,
          imageUrl: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800",
          galleryUrls: [
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800"
          ],
          power: "286 ch",
          transmission: "Automatique",
          options: ["Massage", "Son Burmester", "Night Vision", "Pack Chauffeur"],
          category: "Luxe"
        },
        {
          model: "Renault Clio 5",
          pricePerDay: 45,
          imageUrl: "https://images.unsplash.com/photo-1621007947382-bb3c3968e3bb?auto=format&fit=crop&q=80&w=800",
          galleryUrls: [
            "https://images.unsplash.com/photo-1621007947382-bb3c3968e3bb?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1635783888365-d601b0f5b9d2?auto=format&fit=crop&q=80&w=800"
          ],
          power: "100 ch",
          transmission: "Manuelle",
          options: ["Climatisation", "CarPlay", "Régulateur", "Caméra de recul"],
          category: "Citadine"
        },
        {
          model: "Audi A6 S-Line",
          pricePerDay: 110,
          imageUrl: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&q=80&w=800",
          galleryUrls: [
            "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&q=80&w=800"
          ],
          power: "204 ch",
          transmission: "Automatique",
          options: ["Virtual Cockpit", "Matrix LED", "Lane Assist", "Cuir"],
          category: "Luxe"
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
