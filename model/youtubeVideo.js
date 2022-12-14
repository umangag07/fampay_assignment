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

// Text compound index on title and description
videoSchema.index({ title: 'text', description: 'text' });

// single field index on publishedAT
videoSchema.index({ publishedAt: -1 });

module.exports = mongoose.model('youtubeVideo', videoSchema);
