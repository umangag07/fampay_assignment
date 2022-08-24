const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
    {
        title: {
            required: true,
            type: String,
        },
        description: {
            type: String,
        },
        videoId: {
            required: true,
            type: String,
        },
        channelId: {
            required: true,
            type: String,
        },
        channelTitle: {
            required: true,
            type: String,
        },
        publishedAt: {
            required: true,
            type: Date,
        },
        publishTime: {
            required: true,
            type: Date,
        },
        thumbnails: {
            default: {
                url: String,
                width: Number,
                height: Number,
            },
            medium: {
                url: String,
                width: Number,
                height: Number,
            },
            high: {
                url: String,
                width: Number,
                height: Number,
            },
        },
    },
    {
        timestamps: true,
    }
);

// creating text compound index on title and description
videoSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('youtubeVideo', videoSchema);
