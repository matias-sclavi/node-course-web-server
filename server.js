const express = require('express');
const hbs = require('hbs');

const port = process.env.PORT || 3000;
var app = express();

// Lets you say wich folder contains 'partials' (reusable components)
hbs.registerPartials(__dirname + '/views/partials')

// Register functions to be called in partials
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

// 'set' lets you configure express
// Here we configure the view engine to 'Handlebars'
app.set('view engine', 'hbs');

// This is how you setup a middleware for every request.
// 'next' is the way to let the app to continue
// If you don't call 'next', the request won't be processed by the following methods
app.use((req, res, next) => {
  let now = new Date().toString();
  
  console.log(`${now}: ${req.method} ${req.url}`);
  
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Maintenance Page'
//   });
// });

// Serve static files from 'public'
// '__dirname' is the path where the app is
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home',
    welcomeMessage: 'Ya sabes gato ninja'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    message: 'Unable to get this page gato'
  });
})

app.listen(port, () => {
  console.log(`Server is up listening on port ${port}`);
});