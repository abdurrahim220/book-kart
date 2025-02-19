    # API Documentation

## Overview
This API provides endpoints for user authentication, product management, cart operations, orders, and wishlists.

## Base URL
```
http://your-api-url.com/api/v1
```

---

## **User APIs**

### Create a New User
**Endpoint:** `POST /user/create`

### Verify Email
**Endpoint:** `GET /user/verify-email/:token`

### Update User Role
**Endpoint:** `PATCH /user/update-user-role`
**Auth:** `super-admin`, `admin`

### Update User Status
**Endpoint:** `PATCH /user/update-user-status`
**Auth:** `admin`, `super-admin`

---

## **Auth APIs**

### User Login
**Endpoint:** `POST /auth/login`

### Refresh Access Token
**Endpoint:** `POST /auth/refresh-token`

### Forgot Password
**Endpoint:** `POST /auth/forgot-password`

### Reset Password
**Endpoint:** `POST /auth/reset-password/:token`

### Logout
**Endpoint:** `POST /auth/logout`

#### **Google Authentication**

### Google Authentication
**Endpoint:** `GET /auth/google`

### Google Authentication Callback
**Endpoint:** `GET /auth/google/callback`

---

## **Product APIs**

### Create a Product
**Endpoint:** `POST /product/create`
**Auth:** `seller`
**Uploads:** Cloudinary

### Update Product
**Endpoint:** `PATCH /product/update/:productId`
**Auth:** `seller`
**Uploads:** Cloudinary

### Get All Products
**Endpoint:** `GET /product/`

### Get Single Product
**Endpoint:** `GET /product/single-product/:productId`
**Auth:** `admin`, `seller`, `buyer`

### Get Products by Seller
**Endpoint:** `GET /product/seller-product/:sellerId`
**Auth:** `seller`, `admin`, `buyer`

### Delete Product
**Endpoint:** `DELETE /product/:productId`
**Auth:** `seller`, `admin`

---

## **Order APIs**

### Create or Update Order
**Endpoint:** `POST /order/`
**Auth:** `buyer`, `seller`, `admin`

### Get All Orders
**Endpoint:** `GET /order/`
**Auth:** `buyer`, `seller`, `admin`

### Delete Order
**Endpoint:** `DELETE /order/:id`
**Auth:** `buyer`, `seller`, `admin`

---

## **Cart APIs**

### Add to Cart
**Endpoint:** `POST /cart/`
**Auth:** `buyer`, `seller`, `admin`

### Get Cart Items
**Endpoint:** `GET /cart/`
**Auth:** `buyer`, `seller`, `admin`

### Remove from Cart
**Endpoint:** `DELETE /cart/:id`
**Auth:** `buyer`, `seller`, `admin`

---

## **Wishlist APIs**

### Add to Wishlist
**Endpoint:** `POST /wish-list/add`
**Auth:** `buyer`, `admin`, `seller`

### Get Wishlist Items
**Endpoint:** `GET /wish-list/`
**Auth:** `buyer`, `admin`, `seller`

### Remove from Wishlist
**Endpoint:** `DELETE /wish-list/:productId`
**Auth:** `buyer`, `admin`, `seller`

---

## **Authentication & Authorization**
Most API endpoints require authentication via a valid token. Ensure you send the token in the headers like this:

```
Authorization: Bearer <your-access-token>
```

---

## **License**
This project is licensed under the MIT License.

