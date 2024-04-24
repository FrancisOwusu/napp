'use strict';
const {hashPassword} =require('../../utils/bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('users', [
    
      {
        first_name: 'Francis',
        last_name: 'Osei',
        user_id:1,
        email: 'fowusu1257@gmail.com',
        gender:"male",
        role:1,
        status:"active",
        password: await hashPassword('123456'),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('users', null, {});
  }
};
