import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const cars = pgTable("cars", {
  id: serial("id").primaryKey(),
  model: text("model").notNull(),
  pricePerDay: integer("price_per_day").notNull(),
  imageUrl: text("image_url").notNull(),
  galleryUrls: text("gallery_urls").array().notNull(),
  power: text("power").notNull(),
  transmission: text("transmission").notNull(),
  options: text("options").array().notNull(),
  category: text("category").notNull(),
  caution: integer("caution").default(5000),
  conditions: text("conditions").array(),
  pricingInfo: text("pricing_info"),
  displayOrder: integer("display_order").default(0),
});

export const insertCarSchema = createInsertSchema(cars).omit({ id: true });

export type Car = typeof cars.$inferSelect;
export type InsertCar = z.infer<typeof insertCarSchema>;
