/**
 * Deletes the conflicting collection index (mobile_1) that breaks registration.
 * Run once for dev.
 *
 * Usage: node models/seedIndexReset.js
 */

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

(async () => {
  dotenv.config({ path: path.resolve(__dirname, "../.env") });

  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!mongoUri) throw new Error("MongoDB URI missing");

  await mongoose.connect(mongoUri);

  const db = mongoose.connection.db;

  // Replace 'users' if your collection name differs.
  const collectionName = "users";
  const collection = db.collection(collectionName);

  const indexes = await collection.indexes();
  console.log(
    "Existing indexes:",
    indexes.map((i) => ({ name: i.name, key: i.key })),
  );

  // This project’s User schema has an index on email, not mobile.
  // If a leftover index exists (mobile_1 with null values), it blocks inserts.
  const badIndex = indexes.find(
    (i) => i.key && Object.prototype.hasOwnProperty.call(i.key, "mobile"),
  );

  if (!badIndex) {
    console.log("No conflicting mobile index found. Nothing to do.");
    await mongoose.disconnect();
    return;
  }

  console.log("Dropping conflicting index:", badIndex.name);
  await collection.dropIndex(badIndex.name);

  console.log("Done. Restart the backend and try registration again.");
  await mongoose.disconnect();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
