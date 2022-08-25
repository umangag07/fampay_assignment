//This function return the currentPageNumber,maxResponse per page, and startIndex

module.exports = (page, limit) => {
    let pageNumber = page == undefined ? 1 : page === '0' ? 1 : parseInt(page);
    let maxResponseLimit = parseInt(limit) || 10;
    let startIndex = (pageNumber - 1) * maxResponseLimit;
    return { pageNumber, maxResponseLimit, startIndex };
};
