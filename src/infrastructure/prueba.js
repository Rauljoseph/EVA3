import Product from "./database/models/ProductModel.js";
import User from "./database/models/userModel.js";
import "./database/models/relationships.js";

(async () => {
  try {
    const producto = await Product.findByPk(1, {
      include: { model: User, as: "administrador" },
    });
    console.log(producto);
  } catch (error) {
    console.error("Error al consultar el producto:", error);
  }
})();
