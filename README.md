# MongoDB Example

## Description
The MongoDB Example is a full-stack web application that allows users to manage items. It provides a user-friendly interface for adding, editing, deleting, and viewing items in a database.

## Features
- Create new items with name, description, category, price, and quantity
- View a list of all items
- Edit existing items
- Delete items
- Responsive design for mobile and desktop use

## Tech Stack
- **Frontend**: React.js with Bootstrap for styling
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **State Management**: React Hooks
- **Form Handling**: Formik with Yup for validation
- **API Requests**: Axios

## Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or later)
- npm or pnpm
- MongoDB

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/suhasnidgundi/mongodb-example.git
   cd mongo-example
   ```

2. Install dependencies for both frontend and backend:
   ```
   cd backend
   pnpm install
   cd ../frontend
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `backend` directory with the following content:
   ```
   MONGO_URI=mongodb://localhost:27017/item-management
   PORT=5000
   ```

## Running the Application

1. Start the backend server:
   ```
   cd backend
   pnpm start
   ```

2. In a new terminal, start the frontend development server:
   ```
   cd frontend
   pnpm start
   ```

3. Open your browser and navigate to `http://localhost:3000` to use the application.

## API Endpoints

- GET `/api/items`: Fetch all items
- POST `/api/items`: Create a new item
- PUT `/api/items/:id`: Update an item
- DELETE `/api/items/:id`: Delete an item

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

Suhas Nidgundi - [Your Email]

Project Link: [https://github.com/suhasnidgundi/mongodb-example](https://github.com/suhasnidgundi/mongodb-example)