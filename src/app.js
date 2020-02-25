const path = require('path')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000 // Port 3000 or Heroku generated port

// Set paths
const publicPage = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')

// Config express
app.use(express.static(publicPage))
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// Routes
app.get('', (req, res) => {
  res.render('index', {
    title: 'Flappy Bird AI'
  })
})

// Run server
app.listen(port, () => {
  console.log('Server is running on port:', port)
})
