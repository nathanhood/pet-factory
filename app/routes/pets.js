'use strict';

var Mongo = require('mongodb');//bringing in mongo module

exports.index = (req, res)=>{
  var pets = global.nss.db.collection('pets');

  pets.find().toArray((err, records)=>{
    res.render('pets/index', {pets: records, title: 'PF - Pets'});
  });
};

exports.show = (req, res)=>{
  var pets = global.nss.db.collection('pets');
  var _id = Mongo.ObjectID(req.params.id);//converts string into object id. Way to access object id in Mongo


  pets.findOne({_id:_id}, (err, record)=>{ // note .findOne vs .find
    res.render('pets/show', {pet: record, title: 'PF - Animal'});
  });
};

exports.new = (req, res)=>{
  res.render('pets/new', {title: 'PF - Pets'});
};

exports.create = (req, res)=>{//function for POST
  var photo;

  switch(req.body.species){
  case 'Horse':
    photo = 'horse.jpg';
    break;
  case 'Pig':
    photo = 'pig.jpg';
    break;
  case 'Cow':
    photo = 'cow.jpg';
    break;
  }

  req.body.photo = photo;
  var pets = global.nss.db.collection('pets');//db collection
  pets.save(req.body, (err, obj)=>{
    res.redirect(`/pets/${obj._id}`);
  });

  console.log(req.body);
};


exports.destroy = (req, res)=>{
  var _id = Mongo.ObjectID(req.params.id);
  var pets = global.nss.db.collection('pets');
  pets.findAndRemove({_id:_id}, (err, record)=>{//record that is removed
    res.redirect('/pets');
  });
};
