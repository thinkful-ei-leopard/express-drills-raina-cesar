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
  const response = `The sum of ${a} and ${b} is ${c}`;

  res.send(response);
});


//Drill 2
// two parameters text amd shift
// Making a shift Cipher
app.get('./cipher', (req,res) => {
  const { text, shift } = req.query;

  if (!text) {
    return res.status(400).send('this part is required');
  }

  if (!shift) {
    return res.status(400).send('this part is required');
  }

  if (typeof text !== 'string') {
    return res.status(400).send('text must be a string'); 
  }

  const shiftNum = parseFloat(shift);

  if (typeof shiftNum !== 'number') {
    return res.status(400).send('text must be a number');  
  }
  
  
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});