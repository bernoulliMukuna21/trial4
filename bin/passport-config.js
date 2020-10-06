const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
var ObjectId = require('mongodb').ObjectID;
let database = require('../bin/db_connection').getDb();

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {

            // Find User in the database
            database.collection('User_Collection').findOne({
                email: email
            }).then(user=>{
                console.log(user)
                if(!user){
                    // user email is not found in the database
                    console.log('Email is not registered')
                    return done(null, false, { message: 'Email is not registered' });
                }

                // Match user's password
                bcrypt.compare(password, user.password, (err, passwordMatch)=>{
                    if (err) throw err;

                    if (passwordMatch){
                        return done(null, user);
                    }else{
                        return done(null, false, {message: 'Password is incorrect'});
                    }
                });
            });
        })
    );

    passport.serializeUser(function(user, done) {

        // setting id cookie in the user's browser
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {

        //  get the id from the cookie and use it to get user's information
        database.collection('User_Collection').findOne({_id: ObjectId(id)}, function (err, user) {
            done(err, user);
        });
    });
};
