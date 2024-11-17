import { BadRequest } from "../../application/error/errors.js";

export class User {
  constructor({
    id,
    nombre,
    email,
    contraseña,
    rol,
    fechaRegistro = new Date(),
  }) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.contraseña = contraseña;
    this.rol = rol;
    this.fechaRegistro = fechaRegistro;

    this.validate();
  }

  validate() {
    this.validateRequiredFields();
    this.validateName();
    this.validatePassword();
    this.validateEmail();
    this.validateRole();
  }

  validateRequiredFields() {
    if (!this.nombre || !this.email || !this.contraseña || !this.rol) {
      throw new BadRequest(
        "Todos los campos (nombre, email, contraseña, rol) son obligatorios."
      );
    }
  }

  validateName() {
    if (!this.nombre || this.nombre.trim() === "") {
      throw new BadRequest("El nombre es obligatorio.");
    }
    if (this.nombre.length < 3) {
      throw new BadRequest("El nombre debe tener al menos 3 caracteres.");
    }
  }

  validatePassword() {
    if (this.contraseña.length < 3 || this.contraseña.length > 15) {
      throw new BadRequest("La contraseña debe tener entre 3 y 15 caracteres.");
    }
  }

  validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      throw new BadRequest("El formato del email es inválido.");
    }
  }

  validateRole() {
    const ROLES_PERMITIDOS = ["usuario", "administrador"];
    if (!ROLES_PERMITIDOS.includes(this.rol)) {
      throw new BadRequest(
        `El rol no es válido. Roles permitidos: ${ROLES_PERMITIDOS.join(", ")}`
      );
    }
  }
}
