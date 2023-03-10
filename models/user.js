const Sequelize=require('sequelize');
const sequelize=require('../util/database');
const User=sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,

    },
    emailId:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false

    },
    isPremium:Sequelize.BOOLEAN
});

module.exports=User;