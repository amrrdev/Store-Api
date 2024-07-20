import User from "../models/user-model.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

import sendEmail from "./email.js";

export default catchAsync(async (req, res, next) => {
    const { email } = req.body;
    console.log(email);
    if (!email) return next(new AppError("Please provide your email!", 400));

    const user = await User.findOne({ email });
    if (!user) return next(new AppError("there is no user with that email eddress!", 404));

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${req.protocol}://${req.get(
        "host"
    )}/api/v1/users/resetPassword/${resetToken}`;

    const message = `Forget your password motherfucker? Submit a PATCH request with your new password and password confirm to: ${resetURL}.
    \nif you didn't forget your password, please ignore this email`;
    // console.log(
    //     process.env.EMIAL_HOST,
    //     process.env.EMAIL_PORT,
    //     process.env.EMAIL_USERNAME,
    //     process.env.EMAIL_PASSWORD
    // );

    // try {
    //     await sendEmail({
    //         email: user.email,
    //         subject: "Your password reset token (valid for 10 minute)",
    //         message,
    //     });
    //     res.status(200).json({
    //         status: "success",
    //         message: "token send to email",
    //     });
    // } catch (err) {
    // return next(new AppError(err, 500));
    // }

    // user.passwordResetToken = undefined;
    // user.passwordResetExprires = undefined;
    // await user.save({ validateBeforeSave: false });

    res.status(200).json({
        status: "success",
        message,
        resetToken,
    });
});
