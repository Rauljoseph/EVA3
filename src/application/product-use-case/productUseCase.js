import { Producto } from "../../domain/product/product.js";
import { NotFoundError, UnauthorizedError } from "../error/errors.js";

export class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async createProduct(productoData) {
    const findAdminId = await this.productRepository.findAdminId(productoData.id_administrador)

    if(!findAdminId){
      throw new UnauthorizedError("El ID proporcionado no tiene permisos para agregar productos")
    }
    const producto = new Producto(productoData);
    return await this.productRepository.save(producto);
  }

  async getAllProducts() {
    return await this.productRepository.getAllProducts();
  }

  async getProductById(id) {
    const producto = await this.productRepository.getProductById(id);

    if (!producto) {
      throw new NotFoundError("Producto no encontrado.")
    }

    return producto;
  }

  async updateProduct(id, updateData) {
    const findAdminId = await this.productRepository.findAdminId(updateData.id_administrador)
 
    if(!findAdminId){
      throw new UnauthorizedError("El ID proporcionado no tiene permisos para agregar productos")
    }

    const productDB = await this.productRepository.getProductById(id);

    if (!productDB) {
      throw new NotFoundError("Producto no encontrado.");
    }

    const product = new Producto(productDB);

    if (updateData.nombre) product.nombre = updateData.nombre;
    if (updateData.precio !== undefined)
      product.cambiarPrecio(updateData.precio);
    if (updateData.stock !== undefined)
      product.incrementarStock(updateData.stock);

    return await this.productRepository.updateProduct(id, product);
  }

  async deleteProduct(id) {
    const producto = await this.productRepository.getProductById(id);

    if (!producto) {
      throw new NotFoundError(`El producto con ID ${id} no fue encontrado.`)
    }

    return await this.productRepository.deleteProduct(id);
  }
}
