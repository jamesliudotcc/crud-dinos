const express = require('express');
const router = express.Router();

app.get('/dinosaurs', (req, res) => {
    var nameFilter = req.query.nameFilter;
    if (nameFilter) {
      filteredData = dinoData.filter(dino => {
        return dino.name.toLowerCase() === nameFilter.toLowerCase();
      });
      res.render('index', { myDinos: filteredData });
    } else {
      res.render('index', { myDinos: dinoData });
    }
  });
  
  app.get('/dinosaurs/new', (req, res) => {
    res.render('new');
  });
  
  app.get('/dinosaurs/:idx', (req, res) => {
    if (dinoData[req.params.idx - 1]) {
      res.render('show', { dino: dinoData[req.params.idx - 1] });
    } else {
      res.send(`We only have ${dinoData.length} dinos at this time`);
    }
  });
  
  app.post('/dinosaurs', (req, res) => {
    dinoData.push(req.body);
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
    res.redirect('./dinosaurs');
  });
//   