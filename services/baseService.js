module.exports = (repository) => {
  return {
    findAll: async (filter) => {
      try {
  
        return await repository.findAll(filter);
      } catch (error) {
        throw new Error(error);
      }
    },

    findById: async (id) => {
      try {
        return repository.findById(id);
      } catch (error) {
        throw new Error(error);
      }
    },
    findOne: async (filter) => {
      try {
        return await repository.findOne(filter);
      } catch (error) {
        throw new Error(error);
      }
    },
    bulkCreate:async (data) => {
      try {
        console.log(data)
        return await repository.bulkCreate(data);
      } catch (error) {
        throw new Error(error);
      }
    },
    save: async (data) => {
      try {
        return await repository.save(data);
      } catch (error) {
        throw new Error(error);
      }
    },
    update: async (id, data) => {
      try {
        return await repository.update(id, data);
      } catch (error) {
        throw new Error(error);
      }
    },
    delete: async (id, condition) => {
      try {
        return await repository.delete(id, condition);
      } catch (error) {
        throw new Error(error);
      }
    },
  };
};
