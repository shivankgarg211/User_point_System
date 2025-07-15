# User Point System Frontend

## Description

This is the React frontend for the User Point System project. It displays a live leaderboard, allows users to be added, and lets users claim random points. The frontend communicates with the Node.js + Express backend via REST API.

## Features

- View live leaderboard with top 3 podium display
- Add new users via modal
- Claim random points for any user via modal
- Responsive UI with Tailwind CSS
- Automatic leaderboard refresh every 5 seconds

## Technologies Used

- React.js
- Axios
- Tailwind CSS
- React Icons

## Setup Instructions

1. **Clone the repository**
   ```sh
   git clone <repository-url>
   cd leaderboard-frontend
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Start the frontend**
   ```sh
   npm start
   ```
   The app will run at [http://localhost:3000](http://localhost:3000).

> **Note:** Make sure the backend server is running at `http://localhost:5000`.

## Folder Structure

```
leaderboard-frontend/
  public/
  src/
    components/
      HeaderTabs.jsx
      Leaderboard.jsx
    App.js
    index.js
  package.json
  README.md
```

## Main Components

### App.js

- Renders `HeaderTabs` and `Leaderboard` components.

### HeaderTabs.jsx

- Displays main and sub tabs (UI only).
- "Add User" button opens modal to add a new user (calls `/addUser` API).
- "Claim" button opens modal to claim points for a selected user (calls `/api/claim` API).

### Leaderboard.jsx

- Fetches leaderboard data from `/api/leaderboard` endpoint.
- Shows top 3 users in podium style.
- Displays other users in a table.
- Refreshes leaderboard every 5 seconds.

## API Integration

- **Add User:**  
  `POST http://localhost:5000/addUser`  
  Body: `{ "name": "Alice" }`  
  Response:
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

- **Claim Points:**  
  `POST http://localhost:5000/api/claim`  
  Body: `{ "userId": "<user_id>" }`  
  Response:
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

- **Get Leaderboard:**  
  `GET http://localhost:5000/api/leaderboard`  
  Response:
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

- **Get All Users (for dropdown):**  
  `GET http://localhost:5000/getAllUsers`  
  Response:
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

