const express = require('express')
var cors = require('cors')

const ConnectToMongoose = require('./db');
ConnectToMongoose();

const app = express()
app.use(cors())
const port = process.env.port || 5000


app.use(express.json())
//Available Routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/feedback',require('./routes/feedback'));
app.use('/api/student',require('./routes/students'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
