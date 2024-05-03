const express = require("express");
const app = express();
const dbConnect = require("./config/db");
const {application,mail} = require("./config/app");
const routes = require("./routes/index");
const {myLogger,accessControl,authMiddleware} = require("./middleware/");

const models = require("./database/models");
const {UserService,RoleService} = require("./services");
const {sendMail} = require("./services/emailService");
const emailQueue = require('./queues/emailQueue');
const { hashPassword } = require("./utils/bcrypt");
const {UserController} = require('./controllers')
const bodyParser = require('body-parser');

app.use(express.json());
require("dotenv").config();
// console.log((require('./database/models/index').Role));
// console.log(models.Role);
dbConnect.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
// console.log(models.User.findAll({
//   attributes: ['firstName'],
// }).then(users => {
//     // Handle the array of users
//     users.forEach(user => {
//         console.log(user);
//     });
// })
// .catch(err => {
//     // Handle errors if any
//     console.error('Error:', err);
// }));

(async function () {
  // const result = await RoleService.save({name:'admin',user_id:1});
  // if(result !== null){
  //   console.log(result);
  // }

// console.log(UserController.save)

// // async..await is not allowed in global scope, must use a wrapper
  

// try {
  

//   let dataArray = [
//     "Francis",
//     "Osei",
//     "fowusu1257@gmail.com",
//     await hashPassword("123456"),
//     "male",
//     1,
//     "active",
//     1,
//     new Date(),
//     new Date(),
//   ];

//   let dataObject ={
//     first_name:"Francis",
//     last_name:"Osei",
//    email: "fowusu@revogrit.com",
//    password: await hashPassword("123456"),
//    gender: "male",
//    role: 1,
//    status: "active",
//    user_id: 1
//   }
// const result = UserController.save(dataObject);
// console.log(result);
//   // const result = await UserService.save(dataObject);
//   if(result.email){
//     console.log("fgf q")
//     // return await emailQueue.dispatch(result.email,"User Created").catch(console.error)

//   await  emailQueue.dispatch(result.email, "User Created")
//   .then(() => {
//     console.log('Email dispatched successfully!');
//   })
//   .catch((error) => {
//     console.error('Error dispatching email:', error);
//   });
//     // console.log("fgf e" )
//     // await sendMail(result.email,"User Created").catch(console.error)
//     console.log("fgf")
//     // return sendMail("fowusu1257@gmail.com, fowusu@revogrit.com","Test Mail");
//   }

//   return console.log(result);
// } catch (error) {
//   throw new Error(error.message);
// }


  
})();
// const port = ;
app.use(myLogger);
// app.use(accessControl)
routes(app);
app.listen(application.PORT, () => {
  console.log(`Example app listening on port ${application.PORT}`);
});
