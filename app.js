import { router as productRouter } from "./routes/product-router.js";
import { router as userRouter } from "./routes/user-router.js";
import gloablErrorHandler from "./controllers/error-controller.js";
import AppError from "./utils/appError.js";

import express from "express";
import morgan from "morgan";

const app = express();

// Middlewares

// parse incoming json data into request body object
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
    next(new AppError(`Can not find ${req.url} on this server`, 404));
});

app.use(gloablErrorHandler);

export default app;
