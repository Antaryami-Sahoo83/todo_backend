#  Todo Application API

## Project Overview

The Todo Application API is a RESTful API built with Node.js and Express for managing todos, with MongoDB used for database storage. &nbsp;It features user authentication and role-based authorization to control access to CRUD operations on todos. Users must sign up and sign in to obtain a JSON Web Token (JWT), which is required for all operations on todos.


## Installation

To run the project locally on your machine, follow these steps:

Clone the Repository:

```bash
  git clone https://github.com/Antaryami-Sahoo83/todo_backend_squbix.git
```


Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

Access the application by visiting http://localhost:3000 in your web browser.


**Run Tests**:

```bash
  npm test
```

This will run the test suite, which includes various test cases to ensure that different parts of the application function correctly. Testing will cover scenarios such as user registration, authentication, and CRUD operations for todos.

## Features
➜ **User Management**  
   &nbsp;&nbsp;&nbsp;&nbsp;Users can sign up and sign in to the system.  
   &nbsp;&nbsp;&nbsp;&nbsp;User registration includes role assignment (e.g., `user`, `admin`).  
   &nbsp;&nbsp;&nbsp;&nbsp;Passwords are handled securely with hashing.

➜ **Todo Management**  
   &nbsp;&nbsp;&nbsp;&nbsp;Users can create, read, and update their own todos.   
   &nbsp;&nbsp;&nbsp;&nbsp;Todos have fields for title, description, and status.  
   &nbsp;&nbsp;&nbsp;&nbsp;Admins have the ability to access and manage todos across all users. 

➜ **Role-Based Authorization**  
   &nbsp;&nbsp;&nbsp;&nbsp;Access to todo operations is controlled based on user roles (`user` and `admin`).  
   &nbsp;&nbsp;&nbsp;&nbsp;Regular users can manage only their own todos, while admins have elevated  &nbsp;&nbsp;&nbsp;&nbsp;permissions to manage any todo.

➜ **JWT Authentication**  
   &nbsp;&nbsp;&nbsp;&nbsp;A token-based authentication system ensures that only authorized users can &nbsp;&nbsp;&nbsp;&nbsp;perform CRUD operations.  
   &nbsp;&nbsp;&nbsp;&nbsp;Tokens are used to authenticate requests and manage session security.

➜ **Error Handling and Validation**  
   &nbsp;&nbsp;&nbsp;&nbsp;The system features comprehensive error handling for invalid inputs, &nbsp;&nbsp;&nbsp;&nbsp;unauthorized access, and server errors.  
   &nbsp;&nbsp;&nbsp;&nbsp;Input validation is performed when creating and updating todos to ensure data &nbsp;&nbsp;&nbsp;&nbsp;integrity.

➜ **API Documentation**  
   &nbsp;&nbsp;&nbsp;&nbsp;Interactive API documentation is available at `/api-docs` using Swagger.  
   &nbsp;&nbsp;&nbsp;&nbsp;This documentation provides detailed information on API endpoints and &nbsp;&nbsp;&nbsp;&nbsp;request/response formats.

➜ **Testing**  
   &nbsp;&nbsp;&nbsp;&nbsp;Unit tests are written for all API endpoints to ensure correct functionality.  
   &nbsp;&nbsp;&nbsp;&nbsp;The tests cover various scenarios including valid and invalid requests, &nbsp;&nbsp;&nbsp;&nbsp;authentication, and authorization.

## Models

### Todo Model

The `Todo` model represents a todo item and includes the following fields:

- **title**  The title of the todo.

- **description**   A detailed description of the todo.

- **status**  The status of the todo, which can be `pending` or `completed`.

- **userId**  The ID of the user who created the todo.


### User Model

The `User` model represents a user in the system and includes the following fields:

- **username**  The username of the user, which must be unique.

- **email**  The email address of the user, which must be unique.

- **password**  The hashed password of the user.

- **role**  The role of the user, which can be `user` or `admin`.

- **createdAt**  Timestamp when the user account was created.

- **updatedAt**  Timestamp when the user account was last updated.


## Authentication and Authorization

### Authentication

- **Sign Up**: Users must sign up with their `username`, `email`, and `password`. The password is hashed before storing it in the database.
- **Sign In**: Users sign in with their `email` and `password`. Upon successful authentication, a JWT token is generated and returned to the user.

### Authorization

- **JWT Token**: The JWT token received upon sign-in must be included in the `Authorization` header for all CRUD operations on todos.

- **Role-Based Access**:
  - **GET /todos**: Accessible by users with roles `user` or `admin`.
  - **POST /todos**: Accessible by users with roles `user` or `admin`.
  - **PUT /todos/{id}**: Accessible by users with roles `user` or `admin`.
  - **DELETE /todos/{id}**: Accessible only by users with the role `admin`.

## Screenshots

###### Home Page
![part1](https://github.com/user-attachments/assets/10fd275c-1535-4913-846e-73c6c09db445)

###### Swagger API Documentation Page

![part2](https://github.com/user-attachments/assets/e98b8797-f588-4615-8839-37f632d678b0)


![part3](https://github.com/user-attachments/assets/ec80154b-693e-43b7-bbc6-9123e29024cf)

###### User Signup

![part4](https://github.com/user-attachments/assets/44bff54d-ff7a-4694-8c28-0d22bd8ba236)

###### User Signin

![part5](https://github.com/user-attachments/assets/bf56a140-104f-489b-b5e4-32feed3b1039)

###### Create new Todo

![part6](https://github.com/user-attachments/assets/f22d47de-29bb-4228-b40f-f0895f40b11f)

###### Get Todo

![part7](https://github.com/user-attachments/assets/bee92b2d-b036-4b51-b1c4-1e282f5fdeac)

###### Update Todo

![part8](https://github.com/user-attachments/assets/41f8fb20-d83c-46f9-923e-5c4bc6c664b2)

###### Delete Todo

![part9](https://github.com/user-attachments/assets/af8e1d21-8514-4f8c-b22f-8105971cdba0)

###### Testing Phase

![part10](https://github.com/user-attachments/assets/4ca1c5dd-22a3-459a-90ff-ec697c0cb77e)



## API Reference

#### Get all todos

```http
  GET /todos
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | *Required* Bearer token for authentication |


#### Create a new todo

```http
  POST /todos
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | *Required* Bearer token for authentication |
| `title` | `string` | *Required* Title of the todo |
| `description` | `string` | *Required* Description of the todo |
| `status` | `string` | *Required* Status of the todo (pending, completed) |


#### Update a todo

```http
  PUT /todos/{id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | *Required* Bearer token for authentication |
| `id`      | `string` | *Required* Id of the todo to update |
| `title` | `string` | *Optional* Title of the todo |
| `description` | `string` | *Optional* Description of the todo |
| `status` | `string` | *Optional* Status of the todo (pending, completed) |


#### Delete a todo

```http
  DELETE /todos/{id}
```
  
Parameter	Type	Description
Authorization	string	Required. Bearer token for authentication
id	string	Required. Id of the todo to delete


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization` | `string` | *Required* Bearer token for authentication |
| `id`      | `string` | *Required* Id of the todo to delete |



## Contact

Please refer to the documentation section for detailed installation instructions, usage guidelines, and API reference. If you have any questions or need support, feel free to reach out. 

- **Antaryami Sahoo**  
  Email: [er.antaryami@gmail.com](mailto:er.antaryami@gmail.com)  

---

Thank you for checking out this project!
Happy Browsing! 🚀
