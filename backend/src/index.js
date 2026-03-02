import { app } from "./app.js";
import mongoDbConnect from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 8000;
mongoDbConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is running on PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
