# User Point System

## Description

User Point System is a Node.js backend application built with Express and MongoDB. It allows users to be added, claim random points (between 1 and 10), and ranks users based on their total points. Each point claim is recorded in a separate claim history collection for auditing and analytics.

## Features

- Add new users
- Claim random points for a user (1–10 points per claim)
- Retrieve all users ranked by total points
- Store and retrieve claim history for each user
- Leaderboard and user claim history endpoints

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

3. **Configure environment variables**

   Create a `.env` file in the `Backend` folder:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/points-system
   ```

4. **Start the server**
   ```sh
   npm start
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
    "message": "User created",
    "user": {
      "_id": "664b1e...",
      "name": "Alice",
      "totalPoints": 0,
      "__v": 0
    }
  }
  ```

### 2. Claim Points (User Controller)

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
      "points": 7
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

### 4. Claim Points (Claim Controller)

- **Method:** POST  
- **Route:** `/api/claim`
- **Body Example:**
  ```json
  {
    "userId": "664b1e..."
  }
  ```
- **Response Example:**
  ```json
  {
    "message": "Points claimed successfully",
    "user": {
      "_id": "664b1e...",
      "name": "Alice",
      "totalPoints": 17,
      "__v": 0
    },
    "pointsClaimed": 10,
    "currentRank": 1
  }
  ```

### 5. Leaderboard

- **Method:** GET  
- **Route:** `/api/leaderboard`
- **Response Example:**
  ```json
  [
    {
      "name": "Alice",
      "totalPoints": 17,
      "rank": 1
    },
    {
      "name": "Bob",
      "totalPoints": 10,
      "rank": 2
    }
  ]
  ```

### 6. User Claim History

- **Method:** GET  
- **Route:** `/api/history/:userId`
- **Response Example:**
  ```json
  [
    {
      "_id": "664b1f...",
      "userId": "664b1e...",
      "pointsClaimed": 10,
      "claimedAt": "2024-06-01T12:34:56.789Z",
      "__v": 0
    }
  ]
  ```

## MongoDB Schema Overview

### User

- `name`: String (required)
- `totalPoints`: Number (default: 0)

### ClaimHistory

- `userId`: ObjectId (reference to User, required)
- `pointsClaimed`: Number (required)
- `claimedAt`: Date (default: now)

