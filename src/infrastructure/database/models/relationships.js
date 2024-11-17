import Product from "./ProductModel.js";
import User from "./userModel.js";

User.hasMany(Product, {
  foreignKey: "id_administrador", 
  as: "productos", 
});

Product.belongsTo(User, {
  foreignKey: "id_administrador", 
  as: "administrador",
});
