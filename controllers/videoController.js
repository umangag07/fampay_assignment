const videoModel = require('../model/youtubeVideo');
exports.getVideos = async (req, res, next) => {
    try {
        // pageNumber by default will be 1 if not given and for 0 as well.
        let pageNumber =
            req.params.page == undefined
                ? 1
                : req.params.page === '0'
                ? 1
                : req.params.page;
        let maxResponseLimit = req.query.limit || 10;
        let startIndex = (pageNumber - 1) * maxResponseLimit;
        const totalPages = Math.ceil(
            (await videoModel.find()).length / maxResponseLimit
        );
        const result = await videoModel
            .find()
            .sort({ publishedAt: -1 })
            .skip(startIndex)
            .limit(maxResponseLimit);
        res.status(200).send({
            message: 'success',
            totalPages,
            currentPage: pageNumber,
            responseLength: result.length,
            data: result,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'There is something wrong with the server',
        });
    }
};
