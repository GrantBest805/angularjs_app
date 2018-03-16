const express        = require('express');
const app            = express();
const port           = process.env.PORT || 8080;
const morgan         = require('morgan');
const bodyParser     = require('body-parser');
const path           = require('path');
const router         = express.Router();
let mongooseDatabase = require('./app/config/mongoose');
let appRoutes        = require('./app/config/routes')(router);


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/api', appRoutes);


app.use(appRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
})

// Start Server
app.listen(port, () => {
    console.log("running on port" + " " + port);
});

