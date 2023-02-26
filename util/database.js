const {Sequelize}=require('sequelize');
const sequelize=new Sequelize('expense-3','root','mysql@2022',{
    dialect:'mysql',
    host:'localhost'
});
module.exports=sequelize;