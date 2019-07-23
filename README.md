# ENVIRONMENT FILE

In root directory, create a ".env" file and provide the following information in this format:

PORT=[port number]  
DATABASE_URL=[database url]

# MONGO

mongod (start Mongo in separate tab)
mongo (get Mongo CLI)
show dbs  
use [database name] (and then insert something to create the db)  
db.[database name].insert({"name":"tutorials point"})

# CURL COMMANDS

Get all users
curl -X GET http://localhost:3000/users

Get particular user
curl -X GET http://localhost:3000/users/1

Get particular users photos
curl -X GET http://localhost:3000/users/photos/[username]

Get particular users followers
curl -X GET http://localhost:3000/users/followers/[username]

Get particular who a particular user is following
curl -X GET http://localhost:3000/users/following/[username]

Get users newsfeed
curl -X GET http://localhost:3000/users/newsfeed/[username]

Get current session
curl -X GET http://localhost:3000/session

Get all photos
curl -X GET http://localhost:3000/photos

# SITES

[Setting up MongoDB](https://www.robinwieruch.de/mongodb-macos-setup/)
