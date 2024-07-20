import Product from '../models/product-model.js';
import APIFeatures from '../utils/apiFeatures.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

export const topProducts = (req, res, next) => {
    req.query.ratings = { gte: '4.5' };
    req.query.fields = 'name description price ratings brand category -_id';
    req.query.sort = "-ratings";
    next();
};

export const getAllProducts = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Product.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .pagination();

    const products = await features.query;

    res.status(200).json({
        status: 'success',
        length: products.length,
        data: { products },
    });
});
export const addProduct = catchAsync(async (req, res, next) => {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            product: newProduct,
        },
    });
});

export const getProductById = catchAsync(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) return next(new AppError('There is no product with this id', 404));
    res.status(200).json({
        status: 'success',
        data: {
            product,
        },
    });
});

export const updateProduct = catchAsync(async (req, res, next) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!updateProduct) return new AppError('There is no product with this id', 404);
    res.status(200).json({
        status: 'success',
        data: {
            product: updatedProduct,
        },
    });
});

export const deleteProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return next(new AppError('There is no product with this id', 404));
    res.status(200).json({
        status: 'success',
        message: 'deleted successfully',
    });
});
