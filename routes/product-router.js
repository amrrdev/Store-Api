import * as productController from "./../controllers/product-controller.js";
import * as authenticationController from "./../authentication/auth-controller.js";

import express from "express";

const router = express.Router();

// top 5 ratings
router.route("/top-products").get(productController.topProducts, productController.getAllProducts);

// /api/v1/products
router
    .route("/")
    .get(productController.getAllProducts)
    .post(
        authenticationController.protect,
        authenticationController.restrictTo("admin"),
        productController.addProduct
    );
router
    .route("/:id")
    .get(productController.getProductById)
    .patch(
        authenticationController.protect,
        authenticationController.restrictTo("admin"),
        productController.updateProduct
    )
    .delete(
        authenticationController.protect,
        authenticationController.restrictTo("admin"),
        productController.deleteProduct
    );
export { router };
