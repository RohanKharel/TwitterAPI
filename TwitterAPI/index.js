"use strict"
var test = require('express');

var UserController = require('./controller/UserController');
var AuthController = require('./controller/AuthController');
var ImageController = require('./controller/ImageController.js');

var app = test();

app.use(test.json());

app.post('/registration',UserController.validation,UserController.hashGen, UserController.registerUser);
app.post('/login', AuthController.validator, AuthController.passWordCheck, AuthController.jwtTokenGen);
app.post('/image/upload', ImageController.imageName, ImageController.uploadImage);
app.post('/image/multiple', ImageController.imageData, ImageController.uploadMultipleImage)

app.post('/user');



app.use('/*', function (req, res) {
    res.status(404);
    res.send('NOT FOUND');
});

app.use(function (err, req, res, next) {
    console.log(err.message);

    res.json({
        status: err.status,
        message: err.message


    })
    res.send(err.message)

})

app.listen(3024);

