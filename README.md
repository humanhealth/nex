# HealthLink

HealthLink is a simple prototype of a professional networking service tailored for health professionals. This minimal example uses Node.js without external dependencies.

## Running the Server

```bash
node server.js
```

The server exposes the following endpoints:

- `GET /` - basic welcome message
- `GET /users` - list all users
- `POST /users` - create a new user with JSON body
- `GET /posts` - list posts
- `POST /posts` - create a post with JSON body

All data is stored in memory, so restarting the server clears the data.

## Running Tests

```bash
npm test
```
