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

app.get('/cipher', (req,res) => {
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
    
  const start = 'A'.charCodeAt(0);
  
  let cipher = text 
    .toUpperCase()
    .split('')
    .map(letter => {
      const code = letter.charCodeAt(0);
      if(code < start || code > (start +26)){
        return letter;
      }
      let diff = code - start;
      diff = diff + shiftNum;
      diff = diff % 26;
        
      const shiftedChar = String.fromCharCode(start + diff);
      return shiftedChar;
    });
  
  cipher = cipher.join('');
  res.status(200).send(cipher);
    
});

// drill3
/******
    1. randomly generates 6numbers 
    2. numbers are between 1 - 2  ******/

app.get('/lotto', (req, res) => {
  const {numbers} = req.query;
  const randomNumbers = [];

  if (!numbers) {
    return res.status(400).send('this part is required');
  }

  if (!Array.isArray(numbers)) {
    return res.status(400).send('number must be in an array');
  }

  if (numbers.length !== 6) {
    return res.status(400).send('6 numbers required');
  }

  const guess = numbers
    .map(n => parseInt(n))
    .filter(n => (typeof n !== 'number') && (n >=1 && n <= 20) );

  const stockNumbers = Array(20).fill(1).map((_,i) => i + 1);

  for(let i = 0; i < 6; i++) {
    const ran = Math.floor(Math.random() * stockNumbers.length);
    randomNumbers.push(stockNumbers[ran]);
    stockNumbers.splice(ran, 1);
  }

  let diff = randomNumbers.filter(n => !guess.includes(n));

  if(diff === 0){
    res.status(200).send('Wow! Unbelievable! You could have won the mega millions!');
  }
  else if(diff > 1){
    res.status(200).send('Congratulations! You win $100!');
  }
  else if(diff > 2 && diff <= 19){
    res.status(200).send('Congratulations, you win a free ticket');
  }
  else {
    res.status(200).send('Sorry, you lose');
  }
});






  
app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});

