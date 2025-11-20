# Subscription Service Backend

This is a Node.js backend for a subscription service, with different tiers and basic payment handling (using dummy payment processor).

## Features

*   User authentication (JWT)
*   Subscription management
*   Tier management
*   Basic payment simulation

## Structure


server.js         - Main entry point
routes/
  auth.js       - Authentication routes
  subscription.js - Subscription related routes
controllers/
  authController.js - Authentication logic
  subscriptionController.js - Subscription logic
models/
  User.js         - User model
  Subscription.js - Subscription model
middlewares/
  authMiddleware.js - Authentication middleware
utils/
  jwt.js          - JWT helper functions
  paymentProcessor.js - Dummy payment processor


## Setup

1.  Install dependencies:

    
    npm install
    

2.  Run the server:

    
    node server.js
    

## Endpoints

*   `POST /auth/register` - Register a new user
*   `POST /auth/login` - Login user
*   `GET /subscription/tiers` - Get all subscription tiers
*   `POST /subscription/subscribe` - Subscribe to a tier (requires authentication)
*   `GET /subscription/status` - Get current subscription status (requires authentication)
