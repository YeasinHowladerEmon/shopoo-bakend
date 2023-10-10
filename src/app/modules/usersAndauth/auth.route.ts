import express from "express";
import passport from "passport";
import { AuthUserController } from "./auth.controller";
import authGuard from "../../middleware/authGuard";
import { ENUM_USER_ROLE } from "../../../enums/user";
const router = express.Router();

//login method
router.post("/login", AuthUserController.loginUser);

//create a user to sign up
router.post("/create-user", AuthUserController.createUser);
router.post("/verify", AuthUserController.verify);

//google and facebook
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/login/success",
    failureRedirect: "/login"
  })
);
router.get("/login/success", AuthUserController.googleLogin);

router.post("/createUser-facebook");
//end of google and facebook

// user own profile
router.get(
  "/profile",
  authGuard(
    ENUM_USER_ROLE.USER,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.SELLER
  ),
  AuthUserController.profileGet
);

// user can also update her profile like name change only
router.patch(
  "/update-user",
  authGuard(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SELLER),
  AuthUserController.updateUser
);

// user change her password what he want
router.patch(
  "/change-password",
  authGuard(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SELLER),
  AuthUserController.changePassword
);

export const AuthRoutes = router;
