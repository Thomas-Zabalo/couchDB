require('dotenv').config();
const express = require('express')

const app = express()
const PORT = 3000

app.use(express.json())

const bookRouter = require('./app/routes/bookRouter');
const authRouter = require('./app/routes/authRouter');
app.use('/books', bookRouter);
app.use('/token', authRouter);


app.listen(PORT, () => {
    console.log(`App listen on port ${PORT}`)
})
