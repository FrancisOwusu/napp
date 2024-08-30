"use strict"
const baseService = require("./baseService");
const { Ticket, Category, User, Sequelize } = require('../database/models');

const { Op } = Sequelize;


const dashboardRepository = require("../repository/dashboardRepository");
// const Sequelize=require('sequelize')
module.exports = {
  ...baseService(dashboardRepository),
  getTicketStatistics : async () => {
    // Count total tickets
    const totalTickets = await Ticket.count();
  
    // Calculate Tickets by Category
    // const ticketsByCategory = await Ticket.findAll({
    //   attributes: [
    //     'category_id',
    //     [Sequelize.fn('COUNT', Sequelize.col('id')), 'count'],
    //   ],
    //   group: ['category_id'],
    // });

    // 2. Tickets by category (e.g., Billing, Technical, etc.)
  const ticketsByCategory = await Ticket.findAll({
    attributes: [
      [Sequelize.fn('COUNT', Sequelize.col('category_id')), 'count'],
      'category_id'
    ],
    include: [
      { model: Category, as: 'category', attributes: ['id','name'] }
    ],
    group: ['category_id', 'category.name'],
    raw: true,
  });

  
    // const categoryPercentages = ticketsByCategory.map(ticket => ({
    //   category: ticket.category.name,
    //   percentage: ((ticket.dataValues.count / totalTickets) * 100).toFixed(2),
    //   count: ticket.dataValues.count,
    // }));
  
    // // Calculate Tickets by Type
    // const ticketsByType = await Ticket.findAll({
    //   attributes: [
    //     'type',
    //     [Sequelize.fn('COUNT', Sequelize.col('id')), 'count'],
    //   ],
    //   group: ['type'],
    // });
  
    // const typePercentages = ticketsByType.map(ticket => ({
    //   type: ticket.type,
    //   percentage: ((ticket.dataValues.count / totalTickets) * 100).toFixed(2),
    //   count: ticket.dataValues.count,
    // }));
  
    // // Calculate Top Ticket Creators
    // const topCreators = await Ticket.findAll({
    //   attributes: [
    //     'creatorId',
    //     [Sequelize.fn('COUNT', Sequelize.col('id')), 'count'],
    //   ],
    //   include: [{ model: User, attributes: ['name'] }],
    //   group: ['creatorId'],
    //   order: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'DESC']],
    // });
  
    // const creatorPercentages = topCreators.map(creator => ({
    //   creator: creator.User.name,
    //   percentage: ((creator.dataValues.count / totalTickets) * 100).toFixed(2),
    //   count: creator.dataValues.count,
    // }));
  
    return {
      totalTickets,
      ticketsByCategory,
      // categoryPercentages,
      // typePercentages,
      // creatorPercentages,
    };
  }
};