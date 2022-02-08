const mongoose = require('mongoose');
const EventSchema = mongoose.Schema({
    event_Image: {
        type: String,
        required: true
    },
    list_of_communities: [],
    event_name: {
        type: String,
        required: true
    },
    is_event_virtual: {
        type: Boolean,
        required: true,
        default: false
    },
    event_date: {
        date: {
            type: Date,
        },
        start: {
            type: String,
        },
        end: {
            type: String
        },
    },
    list_of_interest: [],
    event_description: {
        type: String,
        required: true
    },
    notify_members: {
        type: Boolean,
        required: true,
        default: false
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    preset: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
},
    {
        timestamps: true,
    }

)

const Events = mongoose.model('Events', EventSchema)
module.exports = Events;