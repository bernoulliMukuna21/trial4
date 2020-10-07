/*
    * Author: Bernoulli Mukuna
    * created: 10/05/2020
*/
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var fieldInputCheck = require('../public/javascripts/fieldInputCheck');
var UserModel = require('../models/UserModel');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/join', function(req, res, next) {
    res.render('joinFree');
});

router.get('/login', function(req, res, next) {
    //let message = req.flash('message')
    res.render('login');
});

router.get('/account', function(req, res, next) {
    res.render('account');
});

router.get('/forgot', function (req, res, next) {
    res.render('forgot')
});
// Sign Up users to the database
router.post('/join', function (req, res) {

  let {name, username, email, password, password2} = req.body;
  let InputsValidation = new fieldInputCheck.InputsValidation(name, username, email, password, password2);
  let fields_errors = InputsValidation.allFieldsCheck();

  console.log(req.body);
  console.log(UserModel);

  if(fields_errors.length>0){
    // An error has occurred
    res.render('joinFree', {
      fields_errors,
      name,
      username,
      email,
      password,
      password2
    })
  }else{
    UserModel.findOne({email:email})
        .then(user=>{
          if(user){
            // The user is in the database
            fields_errors = [{label:'user', message:'Email is already being used!'}]
            res.render('joinFree',{
              fields_errors,
              name,
              username,
              email,
              password,
              password2})
          }else{
            //USer is not in the database, so add
            let newUser = new UserModel({name, username, email, password});
            bcrypt.genSalt(15, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash)=>{
              if(err) throw err;
              //set password to hash
              newUser.password = hash;
              newUser.comparePassword();
              // Save user in the database
                newUser.save()
                  .then(user =>{
                      res.redirect('/users/login');
                  })
                  .catch(err=>{
                    console.log(err);
                    res.send(err)
                  });
            }));
          }
        })
        .catch(err=>console.log(err))
  }
});

module.exports = router;


/*
 Nodemailer for sending passwords to reset emails
 resetPasswordToen and resetPassword are only set
 after the password reset is submitted.
 It is advice to user mongoose middleware to hash
 the password, otherwise you will repeat the pro-
 cess multiple times
 https://myaccount.google.com/lesssecureapps?pli=1
 will be needed at the end of the project
*/