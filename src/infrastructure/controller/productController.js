import { Router } from "express";
import { SequelizeProductoRepository } from "../repository/sequelizeProductRepository.js";
import { ProductService } from "../../application/product-use-case/productUseCase.js";

const router = Router();

const productoRepository = new SequelizeProductoRepository();
const productService = new ProductService(productoRepository);

router.get("/:id", async (req, res, next) => {
  try {
    const producto = await productService.getProductById(req.params.id);
    res.json(producto);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const productos = await productService.getAllProducts();
    res.json(productos);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const producto = await productService.createProduct(req.body);
    res.status(201).json(producto);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const producto = await productService.updateProduct(
      req.params.id,
      req.body
    );
    res.json(producto);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const producto = await productService.deleteProduct(req.params.id);
    res.json(producto);
  } catch (error) {
    next(error);
  }
});

export default router;
