const express = require('express');
const cors = require('cors');
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// Enable CORS
app.use(cors({
    origin: '*',
    credentials: true
}));

//routes
app.use(require('./routes/index'));

app.listen(3070);
console.log('Server on port: ', 3070);
