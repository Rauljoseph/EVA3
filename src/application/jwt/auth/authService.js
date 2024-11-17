import { JwtService } from "../jwtService.js";

const jwtService = new JwtService(process.env.JWT_SECRET, "1h");

export async function loginUser(user, password) {
  if (!user || !user.validatePassword(password)) {
    throw new Error("Credenciales inválidas.");
  }

  const payload = { id: user.id, email: user.email, rol: user.rol };
  const token = jwtService.generateToken(payload);

  return { token, user };
}
