var user = require('../model/Users.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
function validator (req,res,next){
    console.log(req.body.email);

    if(req.body.email === null){
        res.send('user cannot be empty');
    }
    //registered or not
    user.user.findOne({
        where:{email:req.body.email}
    })
    .then(function(result){
        if(result === null){
            res.send('you have not registered');
        }
        else{
            console.log(result);
            req.passwordFromDB = result.dataValues.password
            next();

        }
    })
}

function passWordCheck(req,res,next){
    bcrypt.compare(req.body.password,req.passwordFromDB)
    .then(function(result){
        console.log(result);
        if(result === true){
            next();

        }

        else{
            next({
                status: "200",
                message: "Password wrong"
            })
        }
        
    })

    .catch(function(err){
        next({status:500,message:'err'})
    })
    // next({})
    // req.passwordFromDB
}
function jwtTokenGen(req,res){

    console.log(req.body.email)
    var payload = {
        email : req.body.email,
        userLevel:'superadmin'
    }

    jwt.sign(payload, 'Rohan'
    ,{expiresIn:"10h"}, function(err, resultToken){
        console.log(err);
        console.log(resultToken);
        res.json({"usertoken":resultToken});
    });
    
}

function verifyToken(){

    if(req.headers.authorization === null){
        res.json({status:401, message: 'unauthorized'})
    }
    console.log(req.headers.authorization);

    //slice the Bearer and space part out

    var token = req.headers.authorization.slice(7,req.headers.authorization.lenght)
    jwt.verify(token, 'Rohan', function(err,result){

        console.log(err);
        console.log(result);

        //check result then next to another middleware

        next()
        
    })
}



module.exports = {
    jwtTokenGen,
    validator,
    passWordCheck,
    verifyToken
}

