import { sequelize } from "./sequelizeConfig.js"; 
import "./models/userModel.js"; 
import "./models/ProductModel.js";
import "./models/relationships.js";


async function syncDatabase() {
  try {
    await sequelize.sync({ alter: true }); 
    console.log("Base de datos sincronizada correctamente.");
  } catch (error) {
    console.error("Error al sincronizar la base de datos:", error);
  } finally {
    await sequelize.close();
  }
}

syncDatabase();
