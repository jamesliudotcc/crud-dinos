const express = require('express');
const ejsLayout = require('express-ejs-layouts');
const fs = require('fs');

const app = express();

app.set('view engine', 'ejs');
app.use(ejsLayout);
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('This is the home route');
  console.log(dinoData);
});

// >>>>>>>>> Dinosaurs <<<<<<<<<<<<<<

app.use('/dinosaurs', require('./controllers/dinosaurs'));

// >>>>>>>>>>>>>> Prehistoric Creatures <<<<<<<<<<<<<

app.use('/prehistoric', require('./controllers/prehistoric'));


// >>>>>>>>> App to listen <<<<<<<<<<

app.listen('8000', () => {
  console.log('Listening on Port 8000');
});
