# Task Management Web App - README

This is a task management web application with a connected backend API. It allows users to register, login, add new tasks, and view their existing tasks. The frontend of the application is built using React, and the backend API is connected using Axios. The project utilizes React Router for navigation and React Toastify for displaying notifications.

## Features

- User Registration: Users can register for a new account using the "Register" page.
- User Login: Existing users can log in using their credentials on the "Login" page.
- Home Page: After login, users are redirected to the home page, where they can view their tasks.
- Add New Task: Authenticated users can add new tasks using the "New Task" page.
- View Tasks: Authenticated users can view all their existing tasks on the "View Tasks" page.
- Toast Notifications: Users receive toast notifications for important actions or events.

## Prerequisites

Before running the application, ensure you have the following:

- Node.js and npm installed on your machine.
- Backend API server running and accessible with the appropriate base URL.

## Getting Started

Follow the steps below to set up and run the Task Management Web App:

1. Clone the repository:

```bash
git clone `https://github.com/saurabhdixit93/FULL_STACK_USER_TASK`
```

2. Change into the project directory:

```bash
cd FULL_STACK_USER_TASK
```

3. Install the project dependencies:

```bash
npm install
```

4. Set the base URL for the backend API:

In the `App.js` file, make sure to set the `REACT_APP_BASE_URL` environment variable to the base URL of your backend API. For example:

```javascript
axios.defaults.baseURL = "http://your-backend-api.com";
```

5. Start the development server:

```bash
npm start
```

The web application will now be accessible in your web browser at `http://localhost:3000`.

## Usage

1. **Register**: Access the web application and click on the "Register" link in the navigation bar. Fill out the registration form with your details and click the "Register" button. You will be redirected to the home page after successful registration.

2. **Login**: If you already have an account, click on the "Login" link in the navigation bar. Enter your login credentials and click the "Login" button. Upon successful login, you will be redirected to the home page.

3. **Home Page**: The home page displays your tasks. If you are not logged in, it will redirect you to the login page. To add a new task, click on the "Add New Task" button.

4. **Add New Task**: Fill out the task details in the form and click the "Add Task" button to create a new task. After adding the task, you will be redirected to the home page.

5. **View Tasks**: Click on the "View Tasks" link in the navigation bar to see all your existing tasks.

6. **Toast Notifications**: You will receive toast notifications for actions such as successful task addition or login failure.

## Contributing

If you wish to contribute to this project, feel free to fork the repository and submit a pull request with your changes.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- This project was built using React and Axios.
- The frontend routing is handled by React Router.
- Toast notifications are displayed using React Toastify.

## Contact

If you have any questions or issues, please contact the project maintainers:

- Maintainer: [Saurabh Dixit](mailto:smartds2550@gmail.com)
- Project Link: [GitHub Repository](https://github.com/saurabhdixit93/FULL_STACK_USER_TASK)
