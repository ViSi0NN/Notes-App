# HD Notes - A Full-Stack Note-Taking Application

HD Notes is a complete note-taking application built with the MERN stack (MongoDB, Express.js, React, Node.js) and TypeScript. 
It features a secure authentication system using JWT, with options for OTP-based email login and Google OAuth.
Deployment link: https://notes-app-kbmv.vercel.app/

---

## Features ✨

* **Secure Authentication**: Users can sign up and log in using an Email/OTP flow or their Google account.
* **JWT Authorization**: User actions, such as creating or deleting notes, are protected using JSON Web Tokens.
* **Note Management**: Logged-in users can create new notes and delete their existing notes.
* **Validation & Error Handling**: The application provides relevant error messages for incorrect inputs or API failures.
* **Responsive Design**: The interface is mobile-friendly and designed to be intuitive on any device.

---

## Technology Stack 🛠️

* **Frontend**: React (TypeScript), Tailwind CSS 
* **Backend**: Node.js, Express.js (TypeScript) 
* **Database**: MongoDB 
* **Version Control**: Git 

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Node.js (v18 or later)
* npm
* Git
* MongoDB (local instance or a cloud URI from MongoDB Atlas)

---

### 🚀 Backend Setup

1.  **Clone the repository:**
    ```sh
    git clone <your-repository-url>
    cd <your-repository-name>
    ```

2.  **Navigate to the backend directory:**
    ```sh
    cd backend
    ```

3.  **Install dependencies:**
    ```sh
    npm install
    ```

4.  **Create the environment file:**
    Create a `.env` file in the `backend` directory and fill it with the necessary values, using the `.env sample` as a guide.
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=a_very_strong_and_long_secret_key_that_you_should_change
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    GOOGLE_OAUTH_REDIRECT_URL=http://localhost:5000/api/auth/google/callback
    GMAIL_USER=your_gmail_address_for_sending_otps
    GMAIL_PASS=your_gmail_app_password
    CLIENT_URL=http://localhost:5173
    ```

5.  **Run the server:**
    ```sh
    npm run dev
    ```
    The backend server should now be running on the port you specified (e.g., `http://localhost:5000`).

---

### 🖥️ Frontend Setup

1.  **Navigate to the frontend directory** (from the root of the project):
    ```sh
    cd frontend
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Create the environment file:**
    Create a `.env` file in the `frontend` directory and add the URL of your running backend server.
    ```env
    VITE_API_URL=http://localhost:5000
    ```

4.  **Run the client:**
    ```sh
    npm run dev
    ```
    The React application should now be running and accessible, typically at `http://localhost:5173`.