import { ProductoRepository } from "../../domain/product/repository.js";
import Product from "../database/models/ProductModel.js";
import User from "../database/models/userModel.js";

export class SequelizeProductoRepository extends ProductoRepository {
  async save(producto) {
    const productoCreado = await Product.create({
      nombre: producto.nombre,
      stock: producto.stock,
      precio: producto.precio,
      descripcion: producto.descripcion,
      id_administrador: producto.id_administrador, 
      fecha_creacion: new Date()
    });
    return productoCreado.toJSON();
  }

  async getProductById(id) {
    const producto = await Product.findByPk(id, {
      include: { model: User, as: "administrador" }, 
    });
    if (!producto) return null;
    return producto.toJSON();
  }

  async getAllProducts() {
    const productos = await Product.findAll({
      include: { model: User, as: "administrador" }, 
    });
    return productos.map((producto) => producto.toJSON());
  }

  async updateProduct(id, producto) {
    const productoExistente = await Product.findByPk(id);
    if (!productoExistente) {
      throw new Error("Producto no encontrado.");
    }

    await productoExistente.update({
      nombre: producto.nombre,
      stock: producto.stock,
      precio: producto.precio,
      descripcion: producto.descripcion,
      id_administrador: producto.id_administrador,
    });

    return productoExistente.toJSON();
  }

  async deleteProduct(id) {
    const producto = await Product.findByPk(id);
    if (!producto) {
      throw new Error("Producto no encontrado.");
    }

    await producto.destroy();
    return { mensaje: "Producto eliminado exitosamente" };
  }

  async findAdminId(id){
    const adminId = await User.findOne({where: {id_usuario: id}})
    return adminId.dataValues.rol === "administrador" ? true : false
  }
}
