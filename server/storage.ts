import { type Car, type InsertCar } from "@shared/schema";

export interface IStorage {
  getCars(): Promise<Car[]>;
  getCar(id: number): Promise<Car | undefined>;
  createCar(car: InsertCar): Promise<Car>;
  deleteAllCars(): Promise<void>;
}

// Données des véhicules en mémoire (sera remplacé par les vraies données)
const carsData: Car[] = [];

export class MemoryStorage implements IStorage {
  async getCars(): Promise<Car[]> {
    return carsData;
  }

  async getCar(id: number): Promise<Car | undefined> {
    return carsData.find(car => car.id === id);
  }

  async createCar(insertCar: InsertCar): Promise<Car> {
    const newId = carsData.length > 0 ? Math.max(...carsData.map(c => c.id)) + 1 : 1;
    const car: Car = {
      id: newId,
      model: insertCar.model,
      pricePerDay: insertCar.pricePerDay,
      imageUrl: insertCar.imageUrl,
      galleryUrls: insertCar.galleryUrls || [],
      power: insertCar.power,
      transmission: insertCar.transmission,
      options: insertCar.options || [],
      category: insertCar.category,
      caution: insertCar.caution ?? 5000,
      conditions: insertCar.conditions || [],
      pricingInfo: insertCar.pricingInfo ?? null
    };
    carsData.push(car);
    return car;
  }

  async deleteAllCars(): Promise<void> {
    carsData.length = 0;
  }
}

export const storage = new MemoryStorage();
