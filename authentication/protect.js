import * as jwtAuthentication from "./jwt-utils.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import User from "../models/user-model.js";

export default catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
        token = req.headers.authorization.split(" ")[1];
    if (!token)
        return next(new AppError("Your are not logged in! Please log in to get access.", 401));

    const decoded = await jwtAuthentication.verifyJwtToken(token);

    // check if the user
    const freshUser = await User.findById(decoded.id);

    if (!freshUser) return next(new AppError("User no longer exists", 401));

    // the most important step
    req.user = freshUser;
    next();
});
