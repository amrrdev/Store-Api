export default class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filter() {
        const queryObject = { ...this.queryString };
        const exclude = ['fields', 'limit', 'sort', 'page'];
        exclude.forEach((key) => delete queryObject[key]);

        // 2)-replace all the operators with $operator
        let queryStr = JSON.stringify(queryObject);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }
    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.replaceAll(',', ' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-price');
        }

        return this;
    }
    limitFields() {
        // Projection
        if (this.queryString.fields) {
            const limitBy = this.queryString.fields.replaceAll(',', ' ');
            this.query = this.query.select(limitBy);
        } else {
            this.query = this.query.select('-__v');
        }

        return this;
    }
    pagination() {
        // 5
        // 1) 1 - 5
        // 2) 6 - 10
        // 3) 11-15
        // 4) 21-25
        // skip = page - 1 * limit
        if (this.queryString.page || this.queryString.limit) {
            const page = parseInt(this.queryString.page) || 1;
            const limit = parseInt(this.queryString.limit) || 10;
            const skip = (page - 1) * limit;
            this.query = this.query.skip(skip).limit(limit);
        }
        return this;
    }
}
