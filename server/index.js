const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');

const api = require('./api');

const app = express();

// middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Cross Origin middleware
app.use(cors());

mongoose.connect('mongodb://database/weather', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) console.log(err);
});
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', true)



app.get('/', function (req, res) {
    res.send('API is running!')
})

app.use('/api', api);


const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);


server.listen(port, () => console.log(`API running on localhost:${port}`));