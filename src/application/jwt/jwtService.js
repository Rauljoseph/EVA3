import jwt from "jsonwebtoken";

export class JwtService {
  constructor(secret, expiration) {
    this.secret = secret;
    this.expiration = expiration;
  }

  generateToken(payload) {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiration });
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      throw new Error("Token inválido o expirado.");
    }
  }
}
