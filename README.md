This project is a small authentication app using react and nodejs.

### `npm start`

Starts the react app on port 3000

### `npm serve`

Starts the nodejs api on port 3001

### Linmitations and bugs

* Passwords are clean text
* Login is not handled by passport
* Users are stored in memory
* Token expiration is not being handled by front-end
* Auth flow is not secured with state, nounce and implicit flow
* Front-end is not setup to use CORS, runs using local react proxy
* The form states are very simple and don't show animations when the user is waiting for backend responses
* Forms don't disable submitt button while waiting for backend response
* JWT secret should be moved to env variable
* JWT secret should use a salt
