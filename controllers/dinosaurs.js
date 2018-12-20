const express = require('express');
const router = express.Router();
const fs = require('fs');

var dinoData = JSON.parse(fs.readFileSync('./dinosaurs.json'));

router.get('/', (req, res) => {
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

router.get('/new', (req, res) => {
  res.render('new');
});

router.get('/:idx', (req, res) => {
  if (dinoData[req.params.idx - 1]) {
    res.render('show', { dino: dinoData[req.params.idx - 1] });
  } else {
    res.send(`We only have ${dinoData.length} dinos at this time`);
  }
});

router.post('/', (req, res) => {
  dinoData.push(req.body);
  fs.writeFileSync('../dinosaurs.json', JSON.stringify(dinoData));
  res.redirect('./dinosaurs');
});
//
module.exports = router;
