# Onemda Client and Server

This is the onemda feedback application. This has been developed by the team-onemda at RHOK Melbourne Winter hackathon.

## Technology

- React
- Node
- GraphQL
- Mongo
- Mongoose
- Docker *

### Slack

https://rhokmelbourne.slack.com/messages/CE15DUG9G

### Prerequisites

Node must be installed:  
https://nodejs.org/en/download/package-manager/

Mongo must be installed:  
https://docs.mongodb.com/manual/installation/

Yarn must be installed:  
https://yarnpkg.com/en/docs/install

Or you can use docker:  
https://docs.docker.com/install/

## Client
Run all commands from the `client` directory.

### Install dependencies
```
yarn
```

### Run the app
```
yarn start
```


## Server
Run all commands from the `server` directory.

### Install dependencies
```
yarn
```

### Running the app

```
yarn start
```

OR

```
yarn run server
```

## Running the app using Docker
Run all commands from the root directory. To start up the client, server and MongoDB:
```
docker-compose up
```

To rebuild the image, run:
```
docker-compose build
```

## Populate db with test data
Note that this simply runs `npm run seed` inside the `server` container as it relies on some dependencies in the server application.
```
./seed-db.sh
```

