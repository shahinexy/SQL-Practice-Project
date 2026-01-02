import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthController } from "./auth.controller";
import { UserValidation } from "../User/user.validation";
import auth from "../../middlewares/auth";
import { authValidation } from "./auth.validation";

const router = express.Router();

router.post(
  "/login",
  validateRequest(UserValidation.UserLoginValidationSchema),
  AuthController.loginUser
);

router.post("/logout", AuthController.logoutUser);

router.put(
  "/change-password",

  validateRequest(authValidation.changePasswordValidationSchema),
  AuthController.changePassword
);

router.post("/forgot-password", AuthController.forgotPassword);

router.post("/resend-otp", AuthController.resendOtp);

router.post(
  "/verify-otp",
  validateRequest(authValidation.otpValidationSchema),
  AuthController.verifyOtp
);

router.post(
  "/reset-password",

  AuthController.resetPassword
);

export const AuthRoutes = router;
