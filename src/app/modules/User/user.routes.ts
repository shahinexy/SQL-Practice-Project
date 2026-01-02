import express, { NextFunction, Request, Response } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { fileUploader } from "../../../helpers/fileUploader";

const router = express.Router();

router.route("/").get(userController.getUsers).post(
  userController.createUser
);

router
  .route("/profile")
  .get( auth(),userController.getMyProfile)
  .put(
    fileUploader.uploadSingle,
    (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req.body.data);
      next();
    },
    validateRequest(UserValidation.userUpdateSchema),
    userController.updateProfile
  );

export const UserRoutes = router;
