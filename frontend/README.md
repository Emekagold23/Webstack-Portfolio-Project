# Quizly Frontend

## Overview

The frontend of the Quizly application is built using React, a popular JavaScript library for building user interfaces. It provides an interactive and responsive user experience for managing and taking quizzes. The frontend communicates with the Django backend via API calls to fetch and submit data.

## Features

- **User Authentication**: Sign up, log in, and manage user sessions.
- **Quiz Management**: Take quizzes, view questions, and submit answers.
- **Dashboards**: Different views for admin and regular users to manage their content.
- **Feedback and Results**: Display results and feedback in real-time after quiz completion.

## Tech Stack

- **React**: Core library for building the UI.
- **React Router**: Handles navigation and routing within the application.
- **Axios**: For making HTTP requests to the backend API.
- **CSS**: For styling the application.

## Setup

1. **Navigate to the frontend directory**:
    ```bash
    cd frontend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the development server**:
    ```bash
    npm start
    ```

   The frontend will be available at `http://localhost:3000`.

## Configuration

- **API Endpoint**: Ensure that the API endpoint in your React application is correctly pointing to the backend server (e.g., `http://localhost:8000/api`).

## Connection to Backend

The frontend interacts with the Django backend through RESTful APIs. Here's how they work together:

- **Authentication**: The frontend sends login requests to the backend and stores the authentication token locally. This token is used for subsequent API requests.
- **Data Fetching**: Requests for quizzes, user profiles, and other data are made to the backend, which responds with the necessary information.
- **Submission**: Users can submit answers, feedback, and other data through the frontend, which sends this data to the backend for processing and storage.

## Development

To contribute to the frontend:

1. **Fork the repository**.
2. **Create a new branch**:
    ```bash
    git checkout -b feature-branch
    ```
3. **Make changes and commit**:
    ```bash
    git commit -am 'Add new feature'
    ```
4. **Push to your branch**:
    ```bash
    git push origin feature-branch
    ```
5. **Create a Pull Request** on GitHub.

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.
