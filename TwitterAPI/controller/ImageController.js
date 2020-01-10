var imageModel = require('../model/ImageModel');

var multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage });

var imageName = upload.single('image');


function uploadImage(req, res, next) {
    imageModel.image.create({
        image: req.file.filename
    })

        .then(function (result) {
            res.json({
                status: 300,
                message: "Image was successfully uploaded"
            })
        })
        .catch(function (err){
            console.log(err)
        })
}

var imageData = upload.fields([{name:'image', maxCount:1}, {name:'Secondimage', maxCount:1}, {name:'Thirdimage', maxCount:1}]);
function uploadMultipleImage(req,res,next){
    const data = req.files;
    var i = 1;


    for (i = 1; i<=Object.keys(data).length; i++){
        if(i === 1){
            var array = req.files.image
        }

        else if(i === 2){
            var array = req.files.Secondimage
        }
        else if(i === 3){
            var array = req.files.Thirdimage
        }

        array.forEach(element => {
            imageModel.image.create({
                image: element.filename
            })

            .then(function(result){
                res.json({
                    status:200,
                    message:"successfully uploaded"
                })
            })
            .catch(function(err){
                console.log(err);
            })
            
        });
        



    }



        


}

module.exports = {imageName, uploadImage, imageData, uploadMultipleImage}
