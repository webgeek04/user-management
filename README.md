# User Management App

A simple React application for managing users, including login authentication, user listing, search, pagination, editing, and deletion. The project uses the [Reqres API](https://reqres.in/) as a mock backend.

## link to hosted webpage
[Project Link](https://user-management-woad-two.vercel.app/)
## Features
- Login with pre-defined credentials
- Fetch and display users from API
- Search users by name or email
- Edit user details
- Delete users
- Pagination support

## Prerequisites
Ensure you have the following installed:
- **Node.js** (v14+ recommended)
- **npm** or **yarn**

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/user-management-app.git


## Navigate to the project directory:
cd user-management-app


## Install Dependencies
npm install
OR
yarn install

## Running the Project
npm start
OR
yarn start

## Assumptions

Mock Backend: The app uses https://reqres.in/ for fetching users and performing CRUD operations.

Data Persistence: Since the API is a mock service, user modifications (edit/delete) won’t persist on refresh.

Pagination: The Reqres API supports pagination, and the app dynamically adjusts to the total pages returned by the API.
