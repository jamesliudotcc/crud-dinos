const express = require('express');
const router = express.Router();
const fs = require('fs');

var prehistoricData = JSON.parse(
  fs.readFileSync('./prehistoric_creatures.json')
);

router.get('/', (req, res) => {
  res.render('prehistoric/index', { myCreatures: prehistoricData });
});

router.get('/new', (req, res) => {
  res.render('prehistoric/new');
});
router.get('/:idx', (req, res) => {
  if (prehistoricData[req.params.idx - 1]) {
    res.render('prehistoric/show', {
      creature: prehistoricData[req.params.idx - 1],
    });
  } else {
    res.send(`We only have ${prehistoricData.length} creatures at this time`);
  }
});

router.get('/edit/:idx', (req, res) => {
  let index = req.params.idx;
  if (prehistoricData[req.params.idx - 1]) {
    res.render('prehistoric/edit', {
      props: {
        index: index,
        type: prehistoricData[index].type,
        img_url: prehistoricData[index].img_url,
      },
    });
  } else {
    res.send(`We only have ${prehistoricData.length} creatures at this time`);
  }
});

// >>>>>>>>>  Post Route <<<<<<<<<

router.post('/', (req, res) => {
  console.log('I am here');
  prehistoricData.push(req.body);
  console.log(JSON.stringify(prehistoricData));
  fs.writeFileSync(
    './prehistoric_creatures.json',
    JSON.stringify(prehistoricData)
  );
  res.redirect('./prehistoric');
});

module.exports = router;
