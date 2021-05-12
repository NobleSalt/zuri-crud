# ZURI-CRUD - CRUD App with Database

### live
https://zuri-3.herokuapp.com

## Documentation on the routes

### <code> "/" </code>
This is the home route of the api and displays a welcome message.

#### <code> GET "/users" </code>
<code> /users </code> this would return all the users from the database.

#### <code> POST "/add-user" </code>
send a POST request to <code> /add-user </code> route of the api to create a new user by send the following payloads

**:id should be the user's id**

- name
- email
- country

#### <code> GET "/get-user/:id" </code>
Send a GET request to <code> /get-user/:id </code> route of the api to get a particular user from the database.

**:id should be the user's id**

- *:id* should be the user's id

#### <code> PUT "/update-user/:id" </code>
Send a PUT request to <code> /update-user/:id </code> route of the api to get and update a particular user's data in the database by passing the following payload.

**:id should be the user's id**

- name
- email
- country 

depending on the user's data you want to update

#### <code> DELETE "/remove-user/:id" </code>

Send a DELETE request to <code> /remove-user/:id </code> route of the api to delete a particular user from the database.

**:id should be the user's id**
