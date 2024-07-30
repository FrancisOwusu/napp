const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
module.exports = {
  cacheMiddleware: (req, res, next) => {
    const key = `tickets-${JSON.stringify(req.query)}`;
    const cachedData = myCache.get(key);
    if (cachedData) {
      return res.json(cachedData);
    }
    res.locals.cacheKey = key;
    next();
  },

  setCacheMiddleware: (req, res, next) => {
    const key = res.locals.cacheKey;
    if (key) {
      myCache.set(key, res.locals.paginatedData);
    }
    next();
  },
};

// module.exports = { cacheMiddleware, setCacheMiddleware };
