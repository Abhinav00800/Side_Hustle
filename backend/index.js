const express = require('express')
const bodyParser = require('body-parser');
const app = express()


app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const mongoDB= require('./db')
mongoDB();



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api',require('./Routes/Createuser')); 
app.use('/api',require('./Routes/DisplayData')); 
app.use('/api',require('./Routes/OrderData'));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})