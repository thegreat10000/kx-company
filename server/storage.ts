import { db } from "./db";
import { cars, type Car, type InsertCar } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getCars(): Promise<Car[]>;
  getCar(id: number): Promise<Car | undefined>;
  createCar(car: InsertCar): Promise<Car>;
}

export class DatabaseStorage implements IStorage {
  async getCars(): Promise<Car[]> {
    return await db.select().from(cars).orderBy(cars.id);
  }

  async getCar(id: number): Promise<Car | undefined> {
    const [car] = await db.select().from(cars).where(eq(cars.id, id));
    return car;
  }

  async createCar(insertCar: InsertCar): Promise<Car> {
    const [car] = await db.insert(cars).values(insertCar).returning();
    return car;
  }
}

export const storage = new DatabaseStorage();
