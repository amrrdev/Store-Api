import * as authController from "./../authentication/auth-controller.js";
import * as userController from "./../controllers/user-controller.js";
import express from "express";

const router = express.Router();

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);

router.route("/forgetPassword").post(authController.forgetPassword);
router.route("/resetPassword/:token").patch(authController.resetPassword);

router.use(authController.protect);

router.route("/me").get(userController.getMe, userController.getUserById);
router.route("/deleteMe").get(userController.deleteMe);
router.route("/updateMe").patch(userController.updateMe);
router
    .route("/")
    .get(authController.restrictTo("admin"), userController.getAllUsers)
    .post(userController.createUser);
router.use(authController.restrictTo("admin"));
router
    .route("/:id")
    .get(userController.getUserById)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

export { router };
