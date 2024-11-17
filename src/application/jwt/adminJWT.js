import jwt from "jsonwebtoken";

export function adminMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1]; 

    if (!token) {
      return res.status(401).json({ error: "No se proporcionó un token." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (req.user.rol !== "administrador") {
      return res.status(403).json({ error: "Acceso denegado. Solo los administradores pueden acceder." });
    }

    next(); 
  } catch (error) {
    res.status(401).json({ error: "Token inválido o expirado." });
  }
}
