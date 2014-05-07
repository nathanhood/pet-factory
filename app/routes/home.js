'use strict';

exports.index = (req, res)=>{
  res.render('home/index', {background: 'afarm.jpg', title: 'PF - Home'});
};

exports.about = (req, res)=>{
  res.render('home/about', {title: 'PF - About'});
};

exports.contact = (req, res)=>{
  res.render('home/contact', {title: 'PF - Contact'});
};
