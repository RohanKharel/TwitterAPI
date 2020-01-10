var Sequelize = require('sequelize');

var sequelize = new Sequelize('twitterapi','root','H@ppy456',{
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});
var seq = sequelize.authenticate()


.then(
    function(){
        console.log('db connection successfull')
    }
)
.catch(
    function(err){
        console.log(err)
    });


module.exports = {
    Sequelize, sequelize, seq
}