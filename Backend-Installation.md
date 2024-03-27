# Instructions ~ Hussain

I did my work on Windows, so if you're using a Mac, you may need to run different commands or install different versions. This guide assumes you have completed the normal installation written by Max.

## Installation

Install MongoDB to host the database locally. You can download it from [here](https://www.mongodb.com/try/download/community-kubernetes-operator).

To run the full program, you need three things running: 

- Expo for the frontend
- Node.js server for the backend
- MongoDB for the database (usually starts with your computer)

To run the Node.js server, use the following commands:

```bash
  cd .\CloudChasers\backend
  node .\startServer.js
```

For managing the DB I recommend using [MongoDBCompass](https://www.mongodb.com/products/tools/compass)

One small thing I haven't figured out yet is IP addresses, so in the meantime you need to run `ipconfig` in the terminal
then update the IPv4 address in the `IPIndex` file

## Documentation

Useful Documentation:

[Mongoose](https://mongoosejs.com/docs/) -NodeJS interface with MongoDB

[NodeJS](https://nodejs.org/en)

[ExpressJS](https://expressjs.com/en/starter/basic-routing.html) -The standard web framework for NodeJS
