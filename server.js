const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(`${now}: ${req.method} ${req.url}`);
  fs.appendFile('server.log' , log + '\n');
  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs');
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  //response.send('<h1>Hello Express!</h1>');
  res.render('home.hbs', {
    pageTitle : 'Home',
    welcomeMsg : 'Welcome to my site'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle : 'About Page'

  });
});

app.get('/bad', (req, res) => {
  res.send ({

    errorMessage : 'Bad data',

  });
});
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
