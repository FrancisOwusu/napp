// controllers/baseController.js
const { validationResult, matchedData } = require("express-validator");
const responseUtil = require("../utils/responseUtil");
const  httpCodes= require('../middleware/httpCodes');
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
            httpCodes.NOT_FOUND,
            true,
            "Resource not found"
          );
        }
        responseUtil.sendResponse(
          res,
          httpCodes.OK.code,
          true,
          "Resoruce fetched successfully",
          items
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        responseUtil.sendResponse(
          res,
          httpCodes.INTERNAL_SERVER_ERROR.code,
          false,
         httpCodes.INTERNAL_SERVER_ERROR.message,
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
          responseUtil.sendResponse(res, httpCodes.NOT_FOUND.code, false, "Resource "+httpCodes.NOT_FOUND.message);
        } else {
          responseUtil.sendResponse(
            res,
            httpCodes.OK.code,
            true,
            "data fetch successfully",
            item
          );
        }
      } catch (error) {
        res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json({ message: error.message });
      }
    },
    async save(req, res) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return responseUtil.sendResponse(
          res,
          httpCodes.UNPROCESSABLE_ENTITY.code,
          httpCodes.UNPROCESSABLE_ENTITY.message,
          null,
          error.message
        );
      }

      try {
        const newItem = await service.save(req.body);
        responseUtil.sendResponse(
          res,
          httpCodes.CREATED.code,
          true,
          "Resource created successfully",
          newItem
        );
      } catch (error) {
        responseUtil.sendResponse(
          res,
          httpCodes.INTERNAL_SERVER_ERROR.code,
          false,
          httpCodes.INTERNAL_SERVER_ERROR.message,
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
          return responseUtil.sendResponse(res, httpCodes.NOT_FOUND.code, "Resource "+httpCodes.NOT_FOUND.message);
        }
        const updatedItem = await service.update(id, req.body);
        responseUtil.sendResponse(
          res,
          httpCodes.OK.code,
          true,
          "Resource updated successfully",
          updatedItem
        );
      } catch (error) {
        console.error("resource ", error);
        responseUtil.sendResponse(
          res,
          httpCodes.INTERNAL_SERVER_ERROR.code,
          false,
         httpCodes.INTERNAL_SERVER_ERROR.message,
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
          return responseUtil.sendResponse(res, httpCodes.NOT_FOUND,false, "Resource not found");
        }
        const record = await service.delete(id);
        responseUtil.sendResponse(res,httpCodes.OK,true,"Resource deleted successfully",null)
    } catch (error) {
        console.error("Error deleting a resource:", error);
        sendResponse(
          res,
          httpCodes.INTERNAL_SERVER_ERROR.code,
          false,
         httpCodes.INTERNAL_SERVER_ERROR.message,
          null,
          error.message
        );
      }
    },
  };
};
