import AppError from "./appError.js";

export function errorHandler(err, req, res, next) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ error: err.message });
    }

    res.status(500).json({ error: "Error interno del servidor." });
  }
  