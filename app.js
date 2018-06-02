const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const bodyParser = require('body-parser')

const app = express()

// Load routes
const ideas = require('./routes/ideas')
const users = require('./routes/users')

// Handlebars Middlewear
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// static folder
app.use(express.static(path.join(__dirname, 'public')))

// method override middleware
app.use(methodOverride('_method'))

// express session middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

// connect flash middleware
app.use(flash())

// global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next()
})

// index route
app.get('/', (req, res) => {
  const title = 'Boners'
  res.render('index', {
    title
  })
})

// about route
app.get('/about', (req, res) => {
  res.render('about')
})

// user routes
app.use('/ideas', ideas)
app.use('/users', users)

const port = 5000
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})