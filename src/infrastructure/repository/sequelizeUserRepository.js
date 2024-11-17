import { IUserRepository } from "../../domain/users/repository.js";
import User from "../database/models/userModel.js";
import bcrypt from "bcrypt";

export class SequelizeUserRepository extends IUserRepository {
  async save(usuario) {
    const hashedPassword = await bcrypt.hash(usuario.contraseña, 10);
    const usuarioCreado = await User.create({
        nombre: usuario.nombre,
        email: usuario.email,
        contraseña: hashedPassword, 
        rol: usuario.rol,
        fecha_registro: usuario.fecha_registro || new Date(),
      });
    
      return usuarioCreado.toJSON();
  }

  async getUserById(id) {
    const user = await User.findByPk(id);
    if (!user) return null;
    return user.toJSON();
  }

  async getAllUsers() {
    return await User.findAll();
  }

  async updateUser(id, user) {
    const userExists = await User.findByPk(id);
    if (!userExists) {
      throw new Error("Usuario no encontrado.");
    }

    await userExists.update({
        nombre: user.nombre,
        email: user.email,
        contraseña: user.contraseña,
        rol: user.rol,
        fecha_registro: user.fecha_registro || new Date()
    });

    return userExists.toJSON();
  }

  async deleteUser(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("Usuario no encontrado.");
    }

    await user.destroy();
    return { mensaje: "Usuario eliminado exitosamente" };
  }

  async findByEmail(email){
    const userEmail = await User.findOne({where: {email: email}})

    if(userEmail){
      return true
    }

    return false
  }
}
