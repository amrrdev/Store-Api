import crypto from "node:crypto";

import catchAsync from "../utils/catchAsync.js";
import User from "../models/user-model.js";
import AppError from "../utils/appError.js";
import * as jwtAuthentication from "./jwt-utils.js";

export default catchAsync(async (req, res, next) => {
    const resetToken = req.params.token;
    const hashedToken = crypto.createHash("sha512").update(resetToken).digest("hex");
    console.log(resetToken);
    console.log(hashedToken);
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExprires: { $gte: Date.now() },
    });

    console.log(user);

    if (!user) return next(new AppError("Token is invalid or has expired", 400));
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExprires = undefined;

    await user.save();

    const token = jwtAuthentication.generateJwtToken({ id: user._id });
    res.status(200).json({
        status: "seccess",
        token,
        data: { user },
    });
});
