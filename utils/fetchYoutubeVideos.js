const googleApi = require('googleapis');
const cron = require('node-cron');
const youtubeVideoModel = require('../model/youtubeVideo');
require('dotenv').config();

let apiKey = process.env.YOUTUBE_API_KEYS.split(',');

let googleYoutubeApi = new googleApi.youtube_v3.Youtube({
    auth: apiKey.pop(),
});

const params = {
    part: ['snippet'],
    maxResults: 25,
    type: ['video'],
    order: 'date',
    publishedAfter: '2021-01-01T00:00:00Z',
    relevanceLanguage: 'en',
    q: 'football',
};

let videoFetchInterval = 3000; // Interval to run cron job in seconds
let apiQuotaExceedErrorMessage =
    'The request cannot be completed because you have exceeded your <a href="/youtube/v3/getting-started#quota">quota</a>.';

module.exports = () => {
    cron.schedule(`*/${videoFetchInterval} * * * * *`, async () => {
        try {
            console.log('Cron running', new Date());
            const results = await googleYoutubeApi.search.list(params);
            let videos = results.data.items;
            videos = videos.map((video) => ({
                title: video.snippet.title,
                description: video.snippet.description,
                videoId: video.id.videoId,
                channelId: video.snippet.channelId,
                channelTitle: video.snippet.channelTitle,
                publishedAt: video.snippet.publishedAt,
                publishTime: video.snippet.publishTime,
                thumbnails: {
                    default: video.snippet.thumbnails.default,
                    medium: video.snippet.thumbnails.medium,
                    high: video.snippet.thumbnails.high,
                },
            }));
            await youtubeVideoModel.create(videos);
        } catch (err) {
            // Refreshing the api key on quota exhaustion
            console.log(err);
            if (
                err.message === apiQuotaExceedErrorMessage &&
                err.code === 403
            ) {
                if (apiKey.length >= 1) {
                    googleYoutubeApi = new googleApi.youtube_v3.Youtube({
                        auth: apiKey.pop(),
                    });
                } else {
                    console.log('Quota is finished for all the api keys.');
                }
            }
        }
    });
};
