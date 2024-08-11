const _ = require('lodash');

function paginateAndSort(data, query) {
    let result = [...data];

    // Filtering
    if (query.filter) {
        const filters = JSON.parse(query.filter);
        result = _.filter(result, filters);
    }

    // Sorting
    if (query.sortBy) {
        const sortBy = query.sortBy.split(',');
        result = _.orderBy(result, sortBy, Array(sortBy.length).fill('asc'));
    }

    // Pagination
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedData = result.slice(startIndex, endIndex);

    return {
        data: paginatedData,
        pagination: {
            currentPage: page,
            totalPages: Math.ceil(result.length / limit),
            totalItems: result.length
        }
    };
}

function paginateAndSortMiddleware(req, res, next) {
    const { data, pagination } = paginateAndSort(res.locals.data, req.query);
    res.locals.paginatedData = {
        success: true,
        message: 'Tickets fetched successfully',
        data,
        pagination
    };
    next();
}

module.exports = {paginateAndSortMiddleware,paginateAndSort};
