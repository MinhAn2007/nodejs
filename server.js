const express = require('express');
const app = express();
const port = 3000;
const title = 'EJS Template Engine';
let data = require('./data');
const e = require('express');

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

app.post('/delete', (req, res) => {
    const listChecked = Object.keys(req.body);
    if (listChecked.length <= 0) {
       return res.redirect('/');
    }
    function removeData(length) {
        const maCourse = Number(listChecked[length]);
        console.log(maCourse);
        data = data.filter((course) => course.id !== maCourse);
        if (length > 0) {
            console.log(JSON.stringify(data));
            removeData(length - 1);
        }
        else {
            return res.redirect('/');
        }
        data = data.filter((course) => course.id !== maCourse);

    }
    removeData(listChecked.length - 1);

});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});