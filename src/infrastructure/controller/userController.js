import { Router } from "express";
import { SequelizeUserRepository } from "../repository/sequelizeUserRepository.js";
import { UserUseCase } from "../../application/user-use-case/userUseCase.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../../application/jwt/adminJWT.js";

const routerUser = Router();
const userRepository = new SequelizeUserRepository();
const userUseCase = new UserUseCase(userRepository);

routerUser.get("/:id", adminMiddleware, async (req, res, next) => {
  try {
    const user = await userUseCase.getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    next(error)
  }
});

routerUser.get("/", adminMiddleware, async (req, res, next) => {
  try {
    const users = await userUseCase.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error)  }
});

routerUser.post("/", async (req, res, next) => {
  try {
    const userCreated = await userUseCase.createUser(req.body);
    res.status(201).json(userCreated);
  } catch (error) {
    next(error)  }
});

routerUser.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const userUpdated = await userUseCase.updateUser(req.params.id, req.body);
    res.json(userUpdated);
  } catch (error) {
    next(error)  }
});

routerUser.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const userDeleted = await userUseCase.deleteUser(req.params.id);
    res.json(userDeleted);
  } catch (error) {
    next(error)  }
});

export default routerUser;
