const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('common'));


//Drill 1
//two query parameters a and b
// returns a string 'The sum of a and b is c'
app.get('/sum', (req, res) => {

  const {a} = req.query;
  const {b} = req.query;

  if (!a) {
    return res.status(400).send('Please provide a number');
  }

  if (!b) {
    return res.status(400).send('Please provide a number');
  }

  const numA = parseFloat(a);
  const numB = parseFloat(b);

  if (typeof numA !== 'number') {
    return res.status(400).send('this must be a number');
  }

  if (typeof numB !== 'number') {
    return res.status(400).send('this must be a number');
  }

  const c = numA + numB;
  const resopnse = `The sum of ${a} and ${b} is ${c}`;

  res.send(resopnse);
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});