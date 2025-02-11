const express = require('express')
const nano = require('nano')('http://thomas:Voiture82@localhost:5984');
const app = express()
const PORT = 3000

app.use(express.json())

const bookRouter = require('./app/routes/bookRouter');
app.use('/books', bookRouter);

app.listen(PORT, () => {
    console.log(`App listen on port ${PORT}`)
})
