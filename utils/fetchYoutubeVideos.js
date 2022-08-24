const googleApi = require('googleapis');
const cron = require('node-cron');
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

let videoFetchInterval = process.env.VIDEO_FETCH_INTERVAL;
let apiQuotaExceedErrorMessage =
    'The request cannot be completed because you have exceeded your <a href="/youtube/v3/getting-started#quota">quota</a>.';
module.exports = () => {
    cron.schedule(`*/${videoFetchInterval} * * * * *`, async () => {
        try {
            console.log('Cron running', new Date());
            const result = await googleYoutubeApi.search.list(params);
            const videos = result.data.items;
            console.log(videos.length);
        } catch (err) {
            // Refreshing the api key on quota exhaustion
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
