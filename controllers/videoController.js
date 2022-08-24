const videoModel = require('../model/youtubeVideo');
const regexParser = require('../utils/regexParser');
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
            message: 'Fail: There is something wrong with the server',
        });
    }
};

exports.searchVideos = async (req, res, next) => {
    try {
        const query_string = req.params.query_string;
        const regexOfQueryString = regexParser(query_string);

        // Making a search query based on compound index created in the model
        // Getting the relevance search score for the matched result
        // Sorting based on the relevance search score

        // const result = await videoModel
        //     .find(
        //         { $text: { $search: query_string } },
        //         { score: { $meta: 'textScore' } }
        //     )
        //     .sort({ score: { $meta: 'textScore' } });

        // Searching based on the regular expression

        const result = await videoModel.find({
            $or: [
                { title: { $in: regexOfQueryString } },
                { description: { $in: regexOfQueryString } },
            ],
        });

        res.status(200).send({
            message: 'success',
            totalResults: result.length,
            data: result,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'fail: There is something wrong with server.',
        });
    }
};
