import express from "express";
import { AdminController } from "./admin.controller";
import authGuard from "../../middleware/authGuard";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();

//notice
// we have product to access only admin and we write code inside admin folder so that we also read very well. and other product method product folder

router.get(
  "/users",
  AdminController.usersGet
);
router.delete(
  "/user/:id",
  authGuard(ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.userDelete
);

//post new product
router.post(
  "/add-new-product",
  authGuard(ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.addNewProduct
);

// this route using edit product
router.patch(
  "/editProduct/:id",
  authGuard(ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.productEdit
);

// this route using product delete
router.delete(
  "/product/:id",
  authGuard(ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.productDelete
);

export const AdminRoutes = router;
