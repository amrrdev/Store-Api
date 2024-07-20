import User from "../models/user-model.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

const filterBody = (userBodyObject, ...allowedFields) => {
    const filter = {};
    Object.keys(userBodyObject).forEach((element) => {
        if (allowedFields.includes(element)) filter[element] = userBodyObject[element];
    });
    return filter;
};

export const getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find({ active: true });
    res.status(200).json({
        status: "success",
        length: users.length,
        data: { users },
    });
});

export const createUser = catchAsync(async (req, res, next) => {
    res.status(500).json({
        status: "error",
        message: "This route is not defined! Please use /signup instead",
    });
});
export const getMe = catchAsync(async (req, res, next) => {
    req.params.id = req.user.id;
    next();
});

export const deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });
    res.status(200).json({
        status: "success",
        message: "deleted successfully",
    });
});

export const updateMe = catchAsync(async (req, res, next) => {
    if (req.body.password || req.body.passwordConfirm)
        return next(
            new AppError(
                "This route is not for password updates. Please use /updateMyPassword",
                400
            )
        );
    const filer = filterBody(req.body, "name", "email");
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filer, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        status: "success",
        data: { user: updatedUser },
    });
});

export const getUserById = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) return new AppError("there is no user with this id");
    res.status(200).json({
        status: "success",
        data: { user },
    });
});
export const updateUser = catchAsync(async (req, res, next) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true,
    });
    if (!updateUser) return next(new AppError("there is no user with this ID", 404));

    res.status(200).json({
        status: "success",
        data: {
            user: updatedUser,
        },
    });
});
export const deleteUser = catchAsync(async (req, res, next) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status: "success",
        message: "deleted successfully",
    });
});
