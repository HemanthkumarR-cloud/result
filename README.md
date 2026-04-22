# Restaurant Ordering Backend

A production-ready RESTful backend system for a restaurant ordering application built with Node.js, Express, and MongoDB.

## Tech Stack
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: NoSQL Database (Local installation)
- **Mongoose**: ODM for MongoDB

## Features
- Full CRUD operations for Menu Items and Orders.
- Dynamic order total calculation based on menu prices.
- Robust input validation and existence checks.
- Centralized error handling and request logging.
- Support for all HTTP methods (GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS).

## Setup Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start MongoDB Locally**
   Ensure MongoDB is running on your machine at `mongodb://127.0.0.1:27017`.

3. **Add .env File**
   Create a `.env` file in the root directory with the following content:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/restaurantDB
   ```

4. **Run Server**
   ```bash
   node server.js
   ```
   Or using nodemon if installed:
   ```bash
   npx nodemon server.js
   ```

## Postman Testing Guide

**Base URL:** `http://localhost:5000/api`
**Headers:** `Content-Type: application/json`

### Step-by-Step Testing

#### 1. Create Menu Item (POST)
- **Endpoint:** `/menu`
- **Method:** `POST`
- **Body:**
  ```json
  {
      "name": "Margherita Pizza",
      "price": 12.99,
      "category": "Pizza",
      "availability": true
  }
  ```

#### 2. Get Menu (GET)
- **Endpoint:** `/menu`
- **Method:** `GET`

#### 3. Place Order (POST)
- **Endpoint:** `/orders`
- **Method:** `POST`
- **Body:**
  ```json
  {
      "items": [
          {
              "menuItemId": "REPLACE_WITH_ACTUAL_MENU_ID",
              "quantity": 2
          }
      ]
  }
  ```

#### 4. Update Order (PATCH/PUT)
- **Endpoint:** `/orders/:id`
- **Method:** `PATCH`
- **Body:**
  ```json
  {
      "status": "preparing"
  }
  ```

#### 5. Delete Order/Menu (DELETE)
- **Endpoint:** `/orders/:id` or `/menu/:id`
- **Method:** `DELETE`

## API Endpoints Summary

| Feature | Method | Endpoint | Description |
|---------|--------|----------|-------------|
| Menu | GET | `/api/menu` | Fetch all menu items |
| Menu | POST | `/api/menu` | Create a new menu item |
| Menu | PUT | `/api/menu/:id` | Replace a menu item |
| Menu | PATCH | `/api/menu/:id` | Update a menu item partially |
| Menu | DELETE | `/api/menu/:id` | Delete a menu item |
| Orders | GET | `/api/orders` | Fetch all orders |
| Orders | POST | `/api/orders` | Place a new order |
| Orders | PUT | `/api/orders/:id` | Replace an order |
| Orders | PATCH | `/api/orders/:id` | Update an order status/quantity |
| Orders | DELETE | `/api/orders/:id` | Delete an order |

## HTTP Methods Explained
- **GET**: Retrieve data.
- **POST**: Create new resources.
- **PUT**: Replace an entire resource with new data.
- **PATCH**: Update specific fields of a resource.
- **DELETE**: Remove a resource.
- **HEAD**: Retrieve headers only (no body).
- **OPTIONS**: Check allowed methods for an endpoint.

## Troubleshooting
- **MongoDB not running**: Ensure the `mongod` service is started on your local machine.
- **Port already in use**: Change the `PORT` in the `.env` file or kill the process using that port.
- **Invalid JSON**: Check your request body in Postman for syntax errors like missing commas or quotes.
