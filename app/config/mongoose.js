const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

mongoose.connect('mongodb://localhost:27017/mean_tut', (err) => {
    if (err) {
        console.log('Not conected to the databse' + err);
    } else {
        console.log('Sucsessfully connected to mongoDB')
    }
});

var models_path = path.join(__dirname, './../models');
fs.readdirSync(models_path).forEach(function(file) {
    if(file.indexOf('.js') >= 0) {
        //  require the file (this fund the model file which registers the schema)s
        require(models_path + '/' + file);
    }
});