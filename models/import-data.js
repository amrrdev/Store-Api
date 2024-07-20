import fs from "node:fs";

import Product from "./product-model.js";
import User from "./user-model.js";

import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config({ path: `${import.meta.dirname}/../.env` });

const products = JSON.parse(
    fs.readFileSync(`${import.meta.dirname}/../dev-data/data/products.json`)
);

const users = JSON.parse(fs.readFileSync(`${import.meta.dirname}/../dev-data/data/users.json`));

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
mongoose
    .connect(DB)
    .then(console.log("Database connected successfully"))
    .catch((err) => console.log(`Error while connected with database`));

const importDataToDataBase = async () => {
    try {
        await Product.create(products);
        // await User.create(users);
        console.log("Data imported Successfully.");
    } catch (err) {
        console.log(`Error while importing data -> ${err.message}`);
    }
    process.exit();
};

const deleteEveryThingFromDataBase = async () => {
    try {
        await Product.deleteMany();
        console.log(`Data Deleted Successfully`);
    } catch (err) {
        console.log(`Error while importing data -> ${err.message}`);
    }
    process.exit();
};

if (process.argv[2] === "--import") importDataToDataBase();
else if (process.argv[2] === "--delete") deleteEveryThingFromDataBase();
