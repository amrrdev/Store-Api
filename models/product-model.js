import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Product must have a name'],
        unique: [true, 'product must have a unique name'],
    },
    description: {
        type: String,
        required: [true, 'A product must have a description'],
        minLength: [8, 'A Product name must have more or equal then 8 characters'],
        maxLength: [80, 'A Product name must have less or equal then 80 characters'],
    },
    price: {
        type: Number,
        required: [true, 'A product must have a price'],
    },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function (priceDiscount) {
                return priceDiscount < this.price;
            },
        },
    },
    ratings: {
        type: Number,
        default: 4.5,
        min: [1, 'rating must be above 1.0'],
        max: [5, 'ratings must be below 5.0'],
    },
    role: String,
    category: String,
    brand: String,
    stock: Number,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
});

const Product = mongoose.model('Product', productSchema);

productSchema.pre('findOneAndUpdate', function (next) {
    this.updatedAt = Date.now();
    next();
});

export default Product;
