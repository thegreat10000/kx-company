import { db } from "../server/db";
import { cars } from "../shared/schema";

const carsData = [
  {
    model: "Mercedes A35 AMG",
    pricePerDay: 200,
    imageUrl: "/images/a35_amg_new.jpg",
    galleryUrls: ["/images/a35_amg_new.jpg"],
    power: "306 ch",
    transmission: "Automatique",
    options: ["4MATIC", "AMG Line", "MBUX", "Toit ouvrant"],
    category: "Sport",
    caution: 5000,
    conditions: ["Âge minimum 21 ans", "Permis de conduire > 2 ans", "Justificatif de domicile (- 3 mois)", "Pièce d'identité"],
    displayOrder: 1
  },
  {
    model: "Mercedes C43 AMG",
    pricePerDay: 250,
    imageUrl: "/images/c43_amg_new.jpg",
    galleryUrls: ["/images/c43_amg_new.jpg"],
    power: "390 ch",
    transmission: "Automatique",
    options: ["V6 Biturbo", "AMG Performance", "Échappement sport"],
    category: "Sport",
    caution: 5000,
    conditions: ["Âge minimum 23 ans", "Permis de conduire > 3 ans", "Justificatif de domicile (- 3 mois)", "Pièce d'identité"],
    displayOrder: 2
  },
  {
    model: "Mercedes Classe S Maybach",
    pricePerDay: 500,
    imageUrl: "/images/classe-s-maybach.jpg",
    galleryUrls: ["/images/classe-s-maybach.jpg"],
    power: "503 ch",
    transmission: "Automatique",
    options: ["Luxe absolu", "Chauffeur inclus optionnel", "Écrans arrières"],
    category: "Luxe",
    caution: 5000,
    conditions: ["Sur devis uniquement", "Âge minimum 25 ans", "Permis de conduire > 5 ans"],
    displayOrder: 3
  },
  {
    model: "Peugeot 208 GT",
    pricePerDay: 100,
    imageUrl: "/images/208_gt_new.jpg",
    galleryUrls: ["/images/208_gt_new.jpg"],
    power: "130 ch",
    transmission: "Automatique",
    options: ["GT Line", "i-Cockpit", "Caméra de recul"],
    category: "Citadine",
    caution: 1500,
    conditions: ["Âge minimum 18 ans", "Jeune permis accepté"],
    displayOrder: 4
  }
];

async function resetCars() {
  console.log("Deleting all cars...");
  await db.delete(cars);
  console.log("Inserting cars with new order...");
  for (const car of carsData) {
    await db.insert(cars).values(car);
  }
  console.log("All cars reset successfully!");
  process.exit(0);
}

resetCars().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
