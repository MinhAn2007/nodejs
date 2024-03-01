const express = require('express');
const app = express();
const port = 3000;
const title = 'EJS Template Engine';
let data = require('./data');

app.use(express.urlencoded({extend: true}));
app.use(express.static('./templates'));

app.set('view engine', 'ejs');
app.set('views', './templates');

app.get('/', (req, res) => {  
    res.render('index', {title: title, data: data});
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});