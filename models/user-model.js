import crypto from "node:crypto";

import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A user must have a name"],
        minLength: [8, "A name must have more or equal than 8 characters "],
        maxLength: [20, "A name must have less or equal than 20 characters "],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "A user must have an emai  l"],
        unique: [true, "This email is used before, please try another email"],
        lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: "Please provide a valid email",
        },
    },
    password: {
        type: String,
        required: [true, "A user must have a password"],
        minlength: [8, "A password must have at least 8 characters"],
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function (passwordConfirm) {
                return passwordConfirm === this.password;
            },
            message: "Passwords are not the same!",
        },
    },
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer",
    },
    active: {
        type: Boolean,
        default: true,
    },
    passwordResetToken: String,
    passwordResetExprires: String,
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
});

userSchema.methods.correctPassword = async function (requestBodyPassoword, databaseUserPassword) {
    return await bcrypt.compare(requestBodyPassoword, databaseUserPassword);
};

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash("sha512").update(resetToken).digest("hex");
    this.passwordResetExprires = Date.now() + 10 * 60 * 1000;
    return resetToken;
};

const User = mongoose.model("User", userSchema);

export default User;
