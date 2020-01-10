var db = require('../controller/dbConfig');
console.log(db.seq);

var user = db.sequelize.define('user', {
    //attributes

    id: {
        type:db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    fullname: {
        type:db.Sequelize.TEXT,
        allowNull: false
    },


    email: {
        type:db.Sequelize.TEXT,
        allowNull: false
    },

    phone: {
        type:db.Sequelize.STRING,
        allowNull: false

    },

    password: {
        type:db.Sequelize.TEXT,
        allowNull: false
    },

    image: {
        type:db.Sequelize.TEXT,
        allowNull: true
    },
},
{
freezeTableName: true,
tableName: 'users_table_4',
paranoid:true
}
)
user.sync({force:false})
.then(function(){

})

.catch(function(err){
    console.log(err)
})

module.exports = {
    db, user
}