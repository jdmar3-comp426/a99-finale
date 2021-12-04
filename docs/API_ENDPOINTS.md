
# API Endpoints

- READ (HTTP method GET) at root endpoint /app/
    - Returns message that API is up and running
- CREATE a new user (HTTP method POST) at endpoint /app/new/
    - Creates a new user in the database with given unique username, email, and password, and then updates fields for that user to include the current date and starter game values and returns code 201
- READ a list of all users (HTTP method GET) at endpoint /app/users/
    - Reads all fields for all users from the database and returns code 200
- READ a single user (HTTP method GET) at endpoint /app/user/:user
    - Reads all fields for a single user in the database as given in the request parameters and returns code 200
- LOGIN for a single user (HTTP method GET) at endpoint /app/login/:user/:pass
    - Reads a single user from the database if a user matches the given username and password combination and returns code 200 if the user is found, 404 if the user is not found
- UPDATE a single user (HTTP method PATCH) at endpoint /app/update/user/:user
    - Updates any number of fields for a single user in the database given in the request body and returns code 200
- DELETE a single user (HTTP method DELETE) at endpoint /app/delete/user/:user
    - Deletes a single user from the database where the username matches the request parameter user and returns code 200
- Default response for any other request
    - responds “Invalid request” with error 404
