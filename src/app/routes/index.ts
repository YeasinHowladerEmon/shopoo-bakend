import express from "express";
import { ProductsRoutes } from "../modules/products/product.route";
import { AuthRoutes } from "../modules/usersAndauth/auth.route";

const router = express.Router();


const moduleRoutes = [
  { path: "/users", route: AuthRoutes },
  { path: "/products", route: ProductsRoutes },
//   { path: "/orders", route: ProductsRoutes },
];

moduleRoutes.forEach((route) =>router.use(route.path, route.route))

export default router;