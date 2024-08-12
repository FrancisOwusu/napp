"use strict";
module.exports = (model) => {
  return {
    findAll: async (filter) => {
      try {
        return await model.findAll(filter);
      } catch (error) {
        throw new Error(error);
      }
    },

    findById: async (id) => {
      try {
        return await model.findByPk(id);
      } catch (error) {
        throw new Error(error);
      }
    },

    findOne: async (filter) => {
      try {
        return await model.findOne(filter);
      } catch (error) {
        throw new Error(error);
      }
    },
    bulkCreate: async (data) => {
      try {
        return await model.bulkCreate(data);
      } catch (error) {
        throw new Error(error);
      }
    },
    save: async (data) => {
      try {
        return await model.create(data);
      } catch (error) {
        throw new Error(error);
      }
    },
    update: async (id, data) => {
      try {
        return await model.update(data, {
          where: {
            id: id,
          },
        });
      } catch (error) {
        throw new Error(error);
      }
    },
    delete: async (id, condition = true) => {
      try {
        return await model.destroy({
          where: {
            id: id,
          },
          truncate: condition,
        });
      } catch (error) {
        throw new Error(error);
      }
    },
    model: async () => {
      try {
        return await model;
      } catch (error) {
        throw new Error(error);
      }
    },
  };
};
