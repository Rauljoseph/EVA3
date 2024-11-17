import AppError from "../../infrastructure/error/appError.js";

export class NotFoundError extends AppError {
    constructor(message = "Recurso no encontrado.") {
      super(message, 404);
    }
  }
  
  export class BadRequest extends AppError {
    constructor(message = "Solicitud inválida.") {
      super(message, 400);
    }
  }
  
  export class UnauthorizedError extends AppError {
    constructor(message = "No autorizado. Por favor, inicie sesión.") {
      super(message, 401);
    }
  }
  export class ForbiddenError extends AppError {
    constructor(message = "Acceso denegado. No tiene permisos para esta acción.") {
      super(message, 403);
    }
  }
  