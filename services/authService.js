const User = require("../database/models/user");
const userRepository = require('../repository/userRepository')
const {hashPassword,comparePassword} = require("../utils/bcrypt")

module.exports = {
  login: async (username, password, ipAddress = null) => {
    try {
        const user = await userRepository.findByEmail(username);
        if (user === null) {
          console.log('Not found!');
        }
        const checkPassword = await comparePassword(password,user.password);
        if(!checkPassword){
            console.log("password didnt match");
        }
        let result = await userRepository.findByUserId(user.id);
        if(result){
            return  result;

        }
    } catch (e) {
        throw new Error(e);
    }
  },
};
