const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: displayDate
        }
    },
    {
        toJSON: {
            getters: true
        },
        _id: false
    }
);

function displayDate(createdAt) {
    const date = new Date(createdAt);
    return date.toUTCString;
};

module.exports = reactionSchema;