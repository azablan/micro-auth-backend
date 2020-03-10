## API Endpoints

All enpoints will respond with json that contains a `message`. Use these messages to debug.

### POST /api/signup

Creates a user.
  - body required in request
    - `body.username` string
    - `body.password` string

  - response codes
    - `200` on successful creation
    - `500` on error

### POST /api/signin

Authenticates an exisiting user using their username and password.
  - body required in request:
    - body.username string
    - body.password string

  - response codes:
    - `200` on successful authentication
    - `400` on failed authentication

  - A successful authentication will set a authentication cookie on the client named `token`.

### GET /api/shhh

Check if a user is successfully authenticated.
  - no body
  - response codes:
    - `200` on successful verification of the client's `token` cookie
    - `400` on failed verification of client's `token` cookie
