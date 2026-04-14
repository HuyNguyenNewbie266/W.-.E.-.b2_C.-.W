const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'),
  bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://userid:huy123@cluster0.9jdtkaq.mongodb.net/Tododb')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./api/routes/todoListRoutes'); // importing routes
routes(app); // register the route

app.listen(port);

console.log('Nguyen Tan Huy - todo list RESTful API server started on: ' + port);