// Require needed packages
require('dotenv').config()
let cors = require('cors')
let express = require('express')
let expressJwt = require('express-jwt')
let morgan = require('morgan')
let rowdyLogger = require('rowdy-logger')

// Instantiate app
let app = express()
let rowdyResults = rowdyLogger.begin(app)

// Set up middleware
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: false })) // Accept form data
app.use(express.json()) // Accept data from fetch (or any AJAX call)

// Routes
app.use('/auth', expressJwt({
  secret: process.env.JWT_SECRET
}).unless({ // unless defines exceptions to the rule
  path: [
    { url: '/auth/login', methods: ['POST'] },
    { url: '/auth/signup', methods: ['POST'] }
  ]
}), require('./controllers/auth'))

app.use('/dogs', expressJwt({ secret: process.env.JWT_SECRET }), require('./controllers/dogs'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.listen(process.env.PORT, () => {
  rowdyResults.print()
})
