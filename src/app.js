import express from "express";
import productRoutes from "./infrastructure/controller/productController.js";
import routerUser from "./infrastructure/controller/userController.js";
import "./infrastructure/database/models/relationships.js";
import routerLogin from "./infrastructure/controller/routerLogin.js";
import { adminMiddleware } from "./application/jwt/adminJWT.js";
import { errorHandler } from "./infrastructure/error/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use("/api", (req, res) => {
  res.send("API prueba");
});

app.use("/products", adminMiddleware, productRoutes);
app.use("/users", routerUser);
app.use("/login", routerLogin);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
