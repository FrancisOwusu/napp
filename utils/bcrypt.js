const bcrypt = require('bcrypt');
const saltRounds = 10; // You can adjust this value as needed
module.exports = {
    hashPassword:async (plainPassword)=>{
        return  await bcrypt.hash(plainPassword, saltRounds)
    },
    comparePassword: async (plainPassword, hashedPassword) => {
        return await bcrypt.compare(plainPassword, hashedPassword)
    }
}