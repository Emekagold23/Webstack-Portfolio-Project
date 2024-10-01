# Quizly Backend

## Overview

The backend of the Quizly application is built using Django, a powerful web framework for building robust web applications. It handles user authentication, quiz management, and data storage. The backend exposes RESTful APIs that the React frontend consumes to provide a seamless user experience.

## Features

- **User Authentication**: Manage user sign-up, login, and sessions.
- **Quiz Management**: Create, update, and manage quizzes and questions.
- **Data Storage**: Store user data, quiz results, and feedback in a PostgreSQL database.
- **APIs**: Provide endpoints for frontend communication and data retrieval.

## Tech Stack

- **Django**: Web framework for building the backend.
- **Django REST Framework**: For creating and managing RESTful APIs.
- **PostgreSQL**: Database for storing application data.
- **Gunicorn**: WSGI server for serving the Django application.

## Setup

1. **Navigate to the backend directory**:
    ```bash
    cd backend
    ```

2. **Create and activate a virtual environment**:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4. **Set up environment variables**:
    - Create a `.env` file with necessary configurations (e.g., database credentials, secret key).

5. **Run database migrations**:
    ```bash
    python manage.py migrate
    ```

6. **Create a superuser** (optional):
    ```bash
    python manage.py createsuperuser
    ```

7. **Start the Django development server**:
    ```bash
    python manage.py runserver
    ```

   The backend will be available at `http://localhost:8000`.

## Connection to Frontend

The backend and frontend communicate through a RESTful API. Key points include:

- **API Endpoints**: The backend exposes various endpoints (e.g., `/api/auth/`, `/api/quizzes/`) that the frontend uses to fetch and submit data.
- **Authentication**: The backend handles authentication and issues tokens used by the frontend to make authenticated requests.
- **Data Management**: The backend processes and stores data received from the frontend, such as quiz answers and user feedback.

## Development

To contribute to the backend:

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
