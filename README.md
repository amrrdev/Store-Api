# Store-API

This is a RESTful API for a store that allows for product and user management. The API provides endpoints for CRUD operations on products and users, as well as authentication features.

## API Endpoints

### Products

-   **GET /products/top-products**

    -   Retrieves top products.

-   **GET /products**

    -   Retrieves all products.

-   **GET /products/:id**

    -   Retrieves a product by its ID.

-   **POST /products**

    -   Adds a new product.
    -   Request body should include product details.

-   **PATCH /products/:id**

    -   Updates an existing product.
    -   Request body should include updated product details.

-   **DELETE /products/:id**
    -   Deletes a product by its ID.

### Users

-   **POST /users/signup**

    -   Creates a new user.
    -   Request body should include user details.

-   **POST /users/login**

    -   Authenticates a user.
    -   Request body should include user credentials.

-   **GET /users**

    -   Retrieves all users.

-   **PATCH /users/:id**

    -   Updates an existing user.
    -   Request body should include updated user details.

-   **GET /users/:id**

    -   Retrieves a user by their ID.

-   **GET /users/me**

    -   Retrieves the authenticated user's details.

-   **DELETE /users/me**
    -   Deletes the authenticated user's account.

### Authentication

-   **POST /authentication/forget-password**

    -   Sends a password reset link to the user's email.

-   **PATCH /authentication/reset-password**
    -   Resets the user's password.
    -   Request body should include the new password and the reset token.
