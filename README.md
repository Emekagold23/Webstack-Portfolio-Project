# Interactive Quiz Application

## Overview

The Interactive Quiz Application is a dynamic platform designed to enhance learning through interactive quizzes. Built with Django for the backend and React for the frontend, this application offers real-time engagement, scoring, time limits, feedback, and supports both individual and institutional use cases.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Interactive Quizzes**: Real-time scoring, time limits, and immediate feedback.
- **Role-Based Dashboards**: Separate dashboards for admins and regular users.
- **Authentication**: Secure login and user role management.
- **Admin Dashboard**: Manage users, view analytics, and configure settings.
- **User Dashboard**: Take quizzes, view results, and manage profile.

## Tech Stack

- **Frontend**:
  - React
  - React Router
  - Axios for HTTP requests
  - CSS for styling

- **Backend**:
  - Django
  - Django REST Framework for API
  - PostgreSQL (or your choice of database)
  - Gunicorn for WSGI server
  - Python Dotenv for environment variables

## Setup

### Frontend Setup

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

   The frontend will be accessible at `http://localhost:3000`.

### Backend Setup

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
    - Create a `.env` file in the `backend` directory with your environment variables.

5. **Run database migrations**:
    ```bash
    python manage.py migrate
    ```

6. **Create a superuser (optional)**:
    ```bash
    python manage.py createsuperuser
    ```

7. **Start the Django development server**:
    ```bash
    python manage.py runserver
    ```

   The backend will be accessible at `http://localhost:8000`.

## Usage

- **Frontend**: Open `http://localhost:3000` in your web browser to use the interactive quiz features.
- **Backend**: Ensure the Django server is running to handle API requests.

## Contributing

We welcome contributions to improve the application. Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
