import express from "express";
import { ProductsController } from "./product.controller";

const router = express.Router();

//notice
// we have product to access only admin and we write code inside admin folder so that we also read very well. and other product method code inside product folder

//get all products
router.get("/all-products", ProductsController.products);

//get all category
router.get("/all-category", ProductsController.productCategory);

// details product
router.get("/:id", ProductsController.productDetails);

// this route using comment
router.post("/review/:id", ProductsController.productReview);
router.get("/review/:id", ProductsController.productReviewGet);

export const ProductsRoutes = router;
