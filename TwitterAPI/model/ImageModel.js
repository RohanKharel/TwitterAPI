var db = require('../controller/dbConfig');


var image = db.sequelize.define('image', {
    //attributes

    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    image: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
},{


freezeTableName: true,
    tableName: 'images',
        paranoid: true
    })


image.sync({ force: false })
    .then(function () {

    })

    .catch(function (err) {
        console.log(err)
    })


    module.exports = {image}



