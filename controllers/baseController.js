// controllers/baseController.js
const { validationResult, matchedData } = require("express-validator");
const responseUtil = require("../utils/responseUtil");
module.exports = (service) => {
  return {
    async findAll(req, res) {
      try {
        const filter = req.query.filter || {};
        const items = await service.findAll(filter);
        // res.status(200).json({success:true,data:items});
        if (!items) {
          return responseUtil.sendResponse(
            res,
            404,
            true,
            "Resource not found"
          );
        }
        responseUtil.sendResponse(
          res,
          200,
          true,
          "Resoruce fetched successfully",
          tickets
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        responseUtil.sendResponse(
          res,
          500,
          false,
          "Internal server error",
          null,
          error.message
        );
      }
    },
    async findById(req, res) {
      try {
        const { id } = req.params;
        const item = await service.findById(id);
        if (!item) {
          responseUtil.sendResponse(res, 404, false, "Resource not found");
        } else {
          responseUtil.sendResponse(
            res,
            200,
            true,
            "data fetch successfully",
            item
          );
        }
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },
    async save(req, res) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return responseUtil.sendResponse(
          res,
          500,
          "Error creating a resource",
          null,
          error.message
        );
      }

      try {
        const newItem = await service.save(req.body);
        responseUtil.sendResponse(
          res,
          201,
          true,
          "Resource created successfully",
          newItem
        );
      } catch (error) {
        console.error("Error creating ticket:", error);
        responseUtil.sendResponse(
          res,
          500,
          false,
          "Internal server error",
          null,
          error.message
        );
      }
    },
    async update(req, res) {
      try {
        const { id } = req.params;
        const item = await service.findById(id);

        if (!item) {
          return responseUtil.sendResponse(res, 404, "Resource not found");
        }
        const updatedItem = await service.update(id, req.body);
        responseUtil.sendResponse(
          res,
          200,
          true,
          "Resource updated successfully",
          updatedItem
        );
      } catch (error) {
        console.error("resource ", error);
        responseUtil.sendResponse(
          res,
          500,
          false,
          "Internal server error",
          null,
          error.message
        );
      }
    },
    async delete(req, res) {
      try {
        const { id } = req.params;
        const checkRecord = await service.findById(id);
        if (!checkRecord) {
          return responseUtil.sendResponse(res, 404,false, "Resource not found");
        }
        const record = await service.delete(id);
        responseUtil.sendResponse(res,200,true,"Resource deleted successfully",record)
    } catch (error) {
        console.error("Error deleting a resource:", error);
        sendResponse(
          res,
          500,
          false,
          "Internal server error",
          null,
          error.message
        );
      }
    },
  };
};
