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
                : parseInt(req.params.page);

        let maxResponseLimit = parseInt(req.query.limit) || 10;
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
        let query_string = req.params.query_string;
        console.log(query_string);
        if (query_string !== undefined) {
            let regexOfQueryString = regexParser(query_string);

            // Making a search query based on compound index created in the model
            // Getting the relevance search score for the matched result
            // Sorting based on the relevance search score

            // let result = await videoModel
            //     .find(
            //         { $text: { $search: query_string } },
            //         { score: { $meta: 'textScore' } }
            //     )
            //     .sort({ score: { $meta: 'textScore' } });

            // Searching based on the regular expression

            let result = await videoModel.find({
                $or: [
                    { title: { $in: regexOfQueryString } },
                    { description: { $in: regexOfQueryString } },
                ],
            });

            let pageNumber =
                req.query.page == undefined
                    ? 1
                    : req.query.page === '0'
                    ? 1
                    : parseInt(req.query.page);
            let maxResponseLimit = parseInt(req.query.limit) || 10;
            let startIndex = (pageNumber - 1) * maxResponseLimit;
            let totalPages = Math.ceil(result.length / maxResponseLimit);

            let slicedResult = result.slice(
                startIndex,
                startIndex + maxResponseLimit
            );
            res.status(200).send({
                message: 'success',
                totalPages,
                currentPage: pageNumber,
                responseLength: slicedResult.length,
                data: slicedResult,
            });
        } else {
            res.status(404).send({
                message: 'fail:search query is not given',
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'fail: There is something wrong with server.',
        });
    }
};
