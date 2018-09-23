const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const formData = require("express-form-data");

const writeFile = require('./routes/writeFile');

app.use(formData.parse());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', writeFile.router);

const port = 80;
app.listen(port, () => {
    console.log('Server listen on port:', port);
});