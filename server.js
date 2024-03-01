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

app.post('/save', (req, res) => {
    const id = data.length + 1;
    const name = req.body.name;
    const course_type = req.body.course_type;
    const course_name = req.body.course_name;
    const department = req.body.department;

    const newData = {
        "id": id,
        "name": name,
        "course_type": course_type,
        "course_name": course_name,
        "department": department
    }
    data.push(newData);
    return res.redirect('/');
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});