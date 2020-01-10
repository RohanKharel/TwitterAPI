var user = require('../model/Users.js');

var bcrypt = require('bcrypt');

function hashGen(req,res, next){
    saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds)
    .then(function(hash){
        console.log(hash);
        req.userHash = hash;
        next();

    })

    .catch(function(err){
        next('err');
    })
}



function validation(req, res, next){
    user.user.findOne({
        where:{email:req.body.email}
    })

    .then(function(result){
        if(result === null){

            next();
        }

        else{
            
            // console.log('user was already registered');
            res.send('You are already registered')
        }

    })

    .catch(function(err){
        next(err)
        
    })
}


function registerUser(req, res, next){

    console.log(req.body);
    user.user.create({
        fullname: req.body.fullname,
        email: req.body.email,
        phone:req.body.phone,
        password:req.userHash,
        image: req.body.image
    })
    .then(function(result){
        console.log(result);
        res.send("Registered successfully.");
    })
    
    .catch(function(err){
        next(err);
    
    })
}


// function loginUser(req, res, next) {
//     console.log(req.body);
//     user.user.login({
//         user:req.body.username,
//         password:req.body.password
//     })
//     .then(function(result){
//         if(result === null){
//             res.send('incorrect email or password')
//         }

//         else {
//             res.send('Login successful')
//         }
    

//     })

//     .catch(function(err){

//     })

// }

module.exports = {
    registerUser,
    validation,
    hashGen,
    // loginUser
}

