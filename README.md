# ENVIRONMENT FILE

In root directory, create a ".env" file and provide the following information in this format:

PORT=[port number]  
DATABASE_URL=[database url]

# MONGO

mongod

# CURL COMMANDS

Get all users
curl -X GET http://localhost:3000/users

Get particular user
curl -X GET http://localhost:3000/users/1

Get current session
curl -X GET http://localhost:3000/session

Get all messages
curl -X GET http://localhost:3000/messages

Get particular message
curl -X GET http://localhost:3000/messages/2

Add a message (note: in index.js, we are setting a default user)
curl -X POST -H "Content-Type:application/json" http://localhost:3000/messages -d '{"text":"Hi again, World"}'

Delete a message
curl -X DELETE http://localhost:3000/messages/3

# SITES

[Setting up MongoDB](https://www.robinwieruch.de/mongodb-macos-setup/)
