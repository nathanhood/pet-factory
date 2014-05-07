'use strict';

var traceur = require('traceur');
var initialized = false;

module.exports = (req, res, next)=>{
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = traceur.require(__dirname + '/../routes/home.js');
  var pets = traceur.require(__dirname + '/../routes/pets.js');

  app.get('/', home.index);//route matching works like a switch statement.
  app.get('/about', home.about);
  app.get('/contact', home.contact);
  app.get('/pets', pets.index);
  app.get('/pets/new', pets.new);// written like this after '/pets/:id' will never get reached since :id means anything
  app.get('/pets/:id', pets.show);
  app.post('/pets', pets.create);
  app.post('/pets/:id/delete', pets.destroy);
  console.log('Routes Loaded');
  fn();
}
