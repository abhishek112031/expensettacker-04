const path=require('path');
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const sequelize=require('./util/database');
// const compression=require('compression');
// const helmet=require('helmet');


//routes:-->
const userRoute=require('./routes/user');
const userExpenseRoute=require('./routes/expense');
const purchaseRoute=require('./routes/purchase');
const forgotpasswordRoute=require('./routes/forgotpassword')

//models:-->
const User=require('./models/user');
const Expense=require('./models/expense');
const Order=require('./models/order');
const Forgotpassword=require('./models/forgotpassword');

const app=express();

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json({extended:false}));
app.use(cors());
// app.use(compression());
// app.use(helmet());

//main middlewares:--->>
app.use(userRoute);
app.use(purchaseRoute);
app.use(userExpenseRoute);
app.use(forgotpasswordRoute);

//table relations:-->
User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);


//practice:

sequelize
// .sync({force:true})
.sync()
.then(()=>{
    app.listen(process.env.PORT || 3000);
})






