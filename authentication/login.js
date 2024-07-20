import User from "../models/user-model.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "./../utils/appError.js";
import * as jwtAuthentication from "./jwt-utils.js";

export default catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return next(new AppError("missing email or password", 400));

    // find the user with email
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password)))
        return next(new AppError("Invalid email or password", 401));

    const token = jwtAuthentication.generateJwtToken({ id: user._id });

    // Remove the password field from the user object
    user.password = undefined;
    res.status(200).json({
        status: "success",
        token,
        data: { user },
    });
});
