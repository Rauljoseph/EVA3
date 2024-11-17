import { User } from "../../domain/users/user.js";
import { BadRequest, NotFoundError } from "../error/errors.js";

export class UserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser(userData) {
    const user = new User(userData);

    const findUserByEmail = await this.userRepository.findByEmail(user.email);
    if (findUserByEmail) {
      throw new BadRequest("El email ya existe");
    }

    return await this.userRepository.save(user);
  }

  async getAllUsers() {
    return await this.userRepository.getAllUsers();
  }

  async getUserById(id) {
    const user = await this.userRepository.getUserById(id);

    if (!user) {
      throw new NotFoundError("Usuario no encontrado.");
    }

    return user;
  }

  async updateUser(id, updateData) {
    const userDB = await this.userRepository.getUserById(id);

    if (!userDB) {
      throw new NotFoundError("Usuario no encontrado.");
    }

    const user = new User(userDB);

    if (updateData.nombre !== undefined) {
      user.nombre = updateData.nombre;
      user.validateName();
    }

    if (updateData.email !== undefined) {
      user.email = updateData.email;
      user.validateEmail();
      const findUserByEmail = await this.userRepository.findByEmail(user.email);
      if (findUserByEmail) {
        throw new BadRequest("El email ya existe");
      }
    }

    if (updateData.contraseña !== undefined) {
      user.contraseña = updateData.contraseña;
      user.validatePassword();
    }

    if (updateData.rol !== undefined) {
      user.rol = updateData.rol;
      user.validateRole();
    }

    const usuarioActualizado = await this.userRepository.updateUser(id, user);

    return usuarioActualizado;
  }

  async deleteUser(id) {
    const user = await this.userRepository.getUserById(id);

    if (!user) {
      throw new NotFoundError("Usuario no encontrado.");
    }

    return await this.userRepository.deleteUser(id);
  }
}
