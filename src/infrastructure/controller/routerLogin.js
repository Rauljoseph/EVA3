import { Router } from "express";
import User from "../database/models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JwtService } from "../../application/jwt/jwtService.js";
import {
  BadRequest,
  NotFoundError,
  UnauthorizedError,
} from "../../application/error/errors.js";

const routerLogin = Router();

routerLogin.post("/", async (req, res, next) => {
  try {
    const { email, contraseña } = req.body;

    if (!email || !contraseña) {
      throw new BadRequest("El email y la contraseña son obligatorios.");
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundError("Usuario no encontrado.");
    }

    const passwordIsValid = await bcrypt.compare(contraseña, user.contraseña);
    if (!passwordIsValid) {
      throw new UnauthorizedError("La contraseña es incorrecta.");
    }

    const jwtService = new JwtService(process.env.JWT_SECRET, "1h");
    const payload = { id: user.id_usuario, email: user.email, rol: user.rol };
    const token = jwtService.generateToken(payload);

    res.status(200).json({
      message: "Inicio de sesión exitoso.",
      token,
    });
  } catch (error) {
    next(error);
  }
});

export default routerLogin;
