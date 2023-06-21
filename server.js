const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));

const workingHoursMiddleware = (req, res, next) => {
  const date = new Date();
  const day = date.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
  const hour = date.getHours();

  if (day > 0 && day < 6 && hour >= 9 && hour < 17) {
    next(); // Continue to the next middleware or route handler
  } else {
    res.sendFile(path.join(__dirname, '/public/closed.html')); // Redirect to a "closed" page
  }
};

app.use(workingHoursMiddleware);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/home.html'));
});

app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/services.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/contact.html'));
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
