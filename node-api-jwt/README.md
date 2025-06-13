# Node API with JWT Authentication

This project is a Node.js API that implements user authentication using JSON Web Tokens (JWT). The API connects to a MySQL database and provides endpoints for user registration and login, with tokens that expire after 15 minutes.

## Project Structure

```
node-api-jwt
├── src
│   ├── app.js                # Entry point of the application
│   ├── controllers           # Contains authentication logic
│   │   └── authController.js
│   ├── models                # Database models
│   │   └── userModel.js
│   ├── routes                # API routes
│   │   └── authRoutes.js
│   └── config                # Configuration files
│       └── db.js
├── package.json              # NPM package configuration
├── .env                      # Environment variables
└── README.md                 # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd node-api-jwt
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory and add your database connection details and JWT secret:
   ```
   DB_URL=jdbc:mysql://mysql-jokast38.alwaysdata.net/jokast38_bnk?useSSL=false&serverTimezone=UTC
   DB_USERNAME=jokast38_admin
   DB_PASSWORD=7vu.7wciUJ$5Zws
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the application:**
   ```
   npm start
   ```

## API Usage

### Register User

- **Endpoint:** `POST /api/auth/register`
- **Request Body:**
  ```json
  {
    "username": "exampleUser",
    "password": "examplePassword"
  }
  ```

### Login User

- **Endpoint:** `POST /api/auth/login`
- **Request Body:**
  ```json
  {
    "username": "exampleUser",
    "password": "examplePassword"
  }
  ```

- **Response:**
  ```json
  {
    "token": "your_jwt_token"
  }
  ```

## License

This project is licensed under the MIT License.