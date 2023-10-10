import express from "express";
import { ProductsController } from "./product.controller";

const router = express.Router();

//post new product
router.post("/add-new-product", ProductsController.addNewProduct);

//get all products
router.get("/all-products", ProductsController.products);

//get all category
router.get("/all-category", ProductsController.productCategory);

// details product
router.get("/:id", ProductsController.productDetails);

// this route using comment
router.post("/review/:id", ProductsController.productReview);
router.get("/review/:id", ProductsController.productReviewGet);

// this route using edit product
router.patch("/editProduct/:id", ProductsController.productEdit);

// this route using book delete
router.delete("/product/:id", ProductsController.productDelete);
export const ProductsRoutes = router;
