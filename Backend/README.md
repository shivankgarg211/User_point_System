# User Point System

## Description

User Point System is a Node.js backend application built with Express and MongoDB. It allows users to be added, claim random points (between 1 and 10), and ranks users based on their total points. Each point claim is recorded in a separate claim history collection for auditing and analytics.

## Features

- Add new users
- Claim random points for a user (1–10 points per claim)
- Retrieve all users ranked by total points
- Store and retrieve claim history for each user

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- dotenv

## Setup Instructions

1. **Clone the repository**
   ```sh
   git clone <repository-url>
   cd User_Point_system/Backend
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

 
   ```



## API Endpoints

### 1. Add User

- **Method:** POST  
- **Route:** `/addUser`
- **Body Example:**
  ```json
  {
    "name": "Alice"
  }
  ```
- **Response Example:**
  ```json
  {
    "_id": "664b1e...",
    "name": "Alice",
    "totalPoints": 0,
    "__v": 0
  }
  ```

### 2. Claim Points

- **Method:** POST  
- **Route:** `/claimPoints/:id`
- **Example Request:**
  ```
  POST /claimPoints/664b1e...
  ```
- **Response Example:**
  ```json
  {
    "user": {
      "_id": "664b1e...",
      "name": "Alice",
      "totalPoints": 7,
      "__v": 0
    },
    "history": {
      "_id": "664b1f...",
      "userId": "664b1e...",
      "points": 7,
      "claimedAt": "2024-06-01T12:34:56.789Z",
      "__v": 0
    }
  }
  ```

### 3. Get All Users

- **Method:** GET  
- **Route:** `/getAllUsers`
- **Response Example:**
  ```json
  [
    {
      "_id": "664b1e...",
      "name": "Alice",
      "totalPoints": 15,
      "__v": 0
    },
    {
      "_id": "664b1f...",
      "name": "Bob",
      "totalPoints": 10,
      "__v": 0
    }
  ]
  ```

## MongoDB Schema Overview

### User

- `name`: String (required)
- `totalPoints`: Number (default: 0)

### ClaimHistory

- `userId`: ObjectId (reference to User)
- `points`: Number
- `claimedAt`: Date (default: now)






