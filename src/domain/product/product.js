import { BadRequest } from "../../application/error/errors.js";

export class Producto {
    constructor({ id, nombre, stock, precio, descripcion, id_administrador }) {
      this.id = id; 
      this.nombre = nombre; 
      this.stock = stock;
      this.precio = precio; 
      this.descripcion = descripcion;
      this.id_administrador = id_administrador  
      this.validate();
    }
  
    validate() {
      if (!this.nombre) {
        throw new BadRequest("El nombre del producto es obligatorio.");
      }
      if (this.stock < 0) {
        throw new BadRequest("El stock no puede ser negativo.");
      }
      if (this.precio < 0) {
        throw new BadRequest("El precio no puede ser negativo.");
      }
      if(!this.id_administrador){
        throw new BadRequest("El ID del administrador es obligatorio.")
      }
    }
  
    incrementarStock(amount) {
      if (amount <= 0) {
        throw new BadRequest("La cantidad para incrementar debe ser mayor a 0.");
      }
      this.stock += amount;
    }
  
    reducirStock(amount) {
      if (amount <= 0) {
        throw new BadRequest("La cantidad para reducir debe ser mayor a 0.");
      }
      if (this.stock < amount) {
        throw new BadRequest("Stock insuficiente.");
      }
      this.stock -= amount;
    }
  
    cambiarPrecio(newPrice) {
      if (newPrice <= 0) {
        throw new BadRequest("El precio no puede ser negativo o cero.");
      }
      this.precio = newPrice;
    }
  }
  