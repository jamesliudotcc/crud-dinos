const express = require('express');
const router = express.Router();
const fs = require('fs');

var prehistoricData = JSON.parse(
  fs.readFileSync('./prehistoric_creatures.json')
);

router.get('/', (req, res) => {
  res.render('prehistoric', { myCreatures: prehistoricData });
});

router.get('/new', (req, res) => {
  res.render('prehistoric_new');
});
router.get('/:idx', (req, res) => {
  if (prehistoricData[req.params.idx - 1]) {
    res.render('prehistoric_show', {
      creature: prehistoricData[req.params.idx - 1],
    });
  } else {
    res.send(`We only have ${prehistoricData.length} creatures at this time`);
  }
});

router.post('/', (req, res) => {
  prehistoricData.push(req.body);
  console.log(JSON.stringify(prehistoricData));
  fs.writeFileSync(
    './prehistoric_creatures.json',
    JSON.stringify(prehistoricData)
  );
  res.redirect('./prehistoric_creatures');
});

module.exports = router;
