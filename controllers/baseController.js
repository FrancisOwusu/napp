// controllers/baseController.js
const {validationResult, matchedData} = require('express-validator')
module.exports = (service) => {
  return {
    async findAll(req, res) {
      try {
        const items = await service.findAll();
        res.status(200).json(items);
      } catch (error) {
        res.status(500).json({ message: error.stack });
      }
    },
    async findById(req, res) {
      try {
        const { id } = req.params;
        const item = await service.findById(id);
        if (!item) {
          res.status(404).json({ message: "Item not found" });
        } else {
          res.status(200).json({ success: true, count: item.length, data: item});
        }
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },
    async save(req, res) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(matchedData(req))
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const newItem = await service.save(req.body);
        res.status(201).json({ success: true, count: newItem.length, data: newItem});
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
      }
    },
    async update(req, res) {
      try {
        const { id } = req.params;
        const updatedItem = await service.update(id, req.body);
        res.status(200).json({ success: true, count: updatedItem.length, data: updatedItem});
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    },
    async delete(req, res) {
      try {
        const { id } = req.params;

      const record =  await service.delete(id);
      
        res.status(204).json({ success: true, data:record});
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },
  };
};
