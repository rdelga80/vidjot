const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

// Handlebars Middlewear
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

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

const port = 5000
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})