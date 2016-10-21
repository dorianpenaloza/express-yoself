// global dependency from node
const http = require('http');
const path = require('path');
// local dependency from our npm package.json file
const express = require('express');
const ejs = require('ejs');
const ghAvatar = require('gh-avatar');

// Initialize app
const app = express();

// Set views directory
app.set('views', path.join(__dirname, 'views'));
                //"__dirname" passes /User/Dorian/Documents/aca/adv/my-first-express-app
                //path.join will evaluate to a string of the path address you are trying to pass.
//app.set('view engine', 'ejs'); Not required, express takes care of including this module.

app.use(express.static('css'));

// Add a route to our app that renders our index view
app.get('/', function(req, res, next) {
  ghAvatar('dorianpenaloza').then(avatar => {
    res.render('index.ejs', {
                              picture: avatar,
                              studentFirstName: ['Dorian'],
                              studentLastName: ['Penaloza'],
                              studentLocationCity: ['Austin'],
                              studentLocationState: ['TX'],
                              studentOccupation: ['Web Developer'],
                              studentSkills: ['HTML', 'CSS', 'JavaScrtipt', 'Node.js / Express.js', 'MongoDB/Mongoose.js', 'Backbone.js'],
                              studentHobbies: ['Running','Coding','Cycling']
    }); //end of res.render
  }).catch(error => { //end of .then and begining of .catch
      res.render('index.ejs', { picture: 'This was a picture'});
  }); //end of .catch
}); //end of app.get

// Set up our server
const port = 3000;
const server = http.createServer(app);
server.listen(port);
console.log(`Server listening on: ${port}`);
