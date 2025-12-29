import { db } from "../server/db";
import { cars } from "../shared/schema";

async function resetCars() {
  console.log("Deleting all cars...");
  await db.delete(cars);
  console.log("All cars deleted successfully!");
  process.exit(0);
}

resetCars().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
