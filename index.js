const express = require('express');
const ejsLayout = require('express-ejs-layouts');
const fs = require('fs');

// var dinoData = JSON.parse(fs.readFileSync('./dinosaurs.json'));
var prehistoricData = JSON.parse(
  fs.readFileSync('./prehistoric_creatures.json')
);

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

app.get('/prehistoric_creatures', (req, res) => {
  res.render('prehistoric', { myCreatures: prehistoricData });
});

app.get('/prehistoric_creatures/new', (req, res) => {
  res.render('prehistoric_new');
});

app.get('/prehistoric_creatures/:idx', (req, res) => {
  if (prehistoricData[req.params.idx - 1]) {
    res.render('prehistoric_show', {
      creature: prehistoricData[req.params.idx - 1],
    });
  } else {
    res.send(`We only have ${prehistoricData.length} creatures at this time`);
  }
});

app.post('/prehistoric_creatures', (req, res) => {
  prehistoricData.push(req.body);
  console.log(JSON.stringify(prehistoricData));
  fs.writeFileSync(
    './prehistoric_creatures.json',
    JSON.stringify(prehistoricData)
  );
  res.redirect('./prehistoric_creatures');
});
// >>>>>>>>> App to listen <<<<<<<<<<

app.listen('8000', () => {
  console.log('Listening on Port 8000');
});
