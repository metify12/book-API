<!-- ##Book API -->
This is a simple RESTful API for managing books. It provides endpoints for creating, retrieving, updating, and deleting books in a MongoDB database.

<!-- ##FEATURES -->
Add Books: Create a new book entry in the database.
Retrieve All Books: Fetch a list of all available books.
Retrieve a Book by ID: Get details of a specific book using its ID.
Update a Book: Update an existing book by ID.
Delete a Book: Delete a specific book by ID.

<!-- ##BACKEND STACKS USED -->
Node.js: Backend runtime environment.
Express.js: Web framework for building the API.
MongoDB: Database for storing books.
Mongoose: MongoDB object modeling for Node.js.
Postman: API testing.
MongoDB Compass: GUI for interacting with MongoDB.
Installation and Setup

<!-- ##PREREQUISITES -->
1. Node.js installed.
Before setting up the application, ensure you have the following installed on your machine:

Node.js: Version 14 or higher.
Download Node.js [https://nodejs.org/en]
Verify installation:
node --version 22.11.0
npm --version 10.9.0

2. Ensure MongoDB is installed and running.
For MongoDB Compass:
Download and install from [https://www.mongodb.com/products/tools/compass]
Alternatively, use MongoDB Atlas for a cloud-hosted database.

3. Postman for API testing.
Download Postman [https://www.postman.com/downloads/]

<!-- INSTALLATION -->
1. Clone the repository:
git clone <repository-url>
cd <repository-folder>

2. Install dependencies:
    **npm install**

3. Create a .env file in the root directory and add the following:
MONGO_URI=mongodb://localhost:27017/bookdb
**PORT=5000**

4. Start the server:
**npm start**

5. Test the API using **Postman** or any other API client.

Github: [https://github.com/metify12/book-API.git]
Render: [https://book-api-2-xtwk.onrender.com]

<!-- RUN INSTRUCTIONS -->
Start the server:
The server is started with **npm start** because I have a start script in my package.json file.  

Open Postman and test the API endpoints:
Base URL: [http://localhost:5000]
Example:
GET /books: [http://localhost:5000/books]
POST /books: [http://localhost:5000/books]
**Monitor the console for logs indicating successful connection to MongoDB and the server port.**

<!-- API ENDPOINTS -->
1. Create a Book
**Endpoint: POST /books**
Description: Adds a new book to the database.
Request Body:
```json
{
  "title": "Book Title",
  "author": "Book Author",
  "genre": "Book Genre"
}
```
Response:

Success:
```json
{
  "message": "Book saved successfully!",
  "book": {
    "_id": "unique-book-id",
    "title": "Book Title",
    "author": "Book Author",
    "genre": "Book Genre",
    "__v": 0
  }
}
```
Failure: Missing fields result in validation errors.

2. Get All Books
**Endpoint: GET /books**
Description: Retrieves a list of all books.

Response:
[
```json
  {
    "_id": "unique-book-id-1",
    "title": "Book Title 1",
    "author": "Book Author 1",
    "genre": "Book Genre 1",
    "__v": 0
  },
  {
    "_id": "unique-book-id-2",
    "title": "Book Title 2",
    "author": "Book Author 2",
    "genre": "Book Genre 2",
    "__v": 0
  }
```
]

3. Get a Book by ID
**Endpoint: GET /books/:id**
Description: Retrieves details of a specific book by ID.

Response:
Success:
```json
{
  "_id": "unique-book-id",
  "title": "Book Title",
  "author": "Book Author",
  "genre": "Book Genre",
  "__v": 0
}
```
Failure: Invalid ID or not found:
```json
{
  "message": "Book not found"
}
```

4. Update a Book by ID
**Endpoint: PUT /books/:id**
Description: Updates an existing book by ID.

Request Body:
```json
{
  "title": "Updated Book Title",
  "author": "Updated Book Author",
  "genre": "Updated Book Genre"
}
```
Response:
Success:
```json
{
  "message": "Book updated successfully",
  "book": {
    "_id": "unique-book-id",
    "title": "Updated Book Title",
    "author": "Updated Book Author",
    "genre": "Updated Book Genre",
    "__v": 0
  }
}
```
Failure: Invalid ID or missing fields.

5. Delete a Book by ID
**Endpoint: DELETE /books/:id**
Description: Deletes a book from the database by ID.

Response:
Success:
```json
{
  "message": "Book deleted successfully"
}
```
Failure: Invalid ID or not found:
```json
{
  "message": "Book not found"
}
```

<!-- EXAMPLE REQUESTS USING POSTMAN -->
1. **Add a Book**:
Method: POST
URL:[http://localhost:5000/books]
Body (JSON):
```json
{
  "title": "Lover Eternal",
  "author": "J.R.Ward",
  "genre": "Romance"
}
```

2. **Get All Books**:
Method: GET
URL: [http://localhost:5000/books]

3. **Get a Book by ID**:
Method: GET
URL: [http://localhost:5000/books/<book-id>]

4. **Update a Book**:
Method: PUT
URL: [http://localhost:5000/books/<book-id>]
Body (JSON):
```json
{
  "title": "Women of Owu",
  "author": "Femi Osofisan",
  "genre": "Tragedy"
}
```

5. **Delete a Book**:
Method: DELETE
URL: [http://localhost:5000/books/<book-id>]

