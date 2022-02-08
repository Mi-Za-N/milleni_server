const asyncHandler = require('express-async-handler');
const User = require('../models/userModel')
const Event = require('../models/eventModel');
//creating Event
const createEvent = asyncHandler(async (req, res) => {
    // console.log(req.user._id)
    const { event_Image, list_of_communities, event_name, is_event_virtual, event_date, list_of_interest, event_description, notify_members,isFeatured, preset } = req.body;
    if (!event_Image || !event_name || !event_description) {
        res.status(400);
        throw new Error("Please Fill all Feilds");
    } else {
        const event = new Event({ event_Image, list_of_communities, event_name, is_event_virtual, event_date, list_of_interest, event_description, notify_members,isFeatured, preset, user: req.user._id });
        const user = await User.findOne({ user: req.user._id })
        if (user) {
            const createdEvent = await event.save();
            res.status(200).json(createdEvent);
        } else {
            res.status(401)
            throw new Error('event created permission denied');
        }
    }
});

const getEvent = asyncHandler(async (req, res) => {
    const event = await Event.find();
    if (event) {
        res.json(event)
    } else {
        res.status(404).json({ message: "event not found" });
    }
})


//geting current user all Events 
const getByUser = asyncHandler(async (req, res) => {
    const event = await Event.find({user:req.params.id});
    if (event) {
        res.json(event)
    } else {
        res.status(404).json({ message: "User event not found" });
    }
})


//update current user Events 
const updateEvent = asyncHandler(async (req, res) => {
    const { event_Image, list_of_communities, event_name, is_event_virtual, event_date, list_of_interest, event_description, notify_members,isFeatured, preset } = req.body;
    const event = await Event.findOne({ _id: req.params.id });
    if (event.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("You can't perform this action");
    } else if (event) {
        event.event_Image = event_Image;
        event.list_of_communities = list_of_communities;
        event.event_name = event_name;
        event.is_event_virtual = is_event_virtual;
        event.event_date = event_date;
        event.list_of_interest = list_of_interest;
        event.event_description = event_description;
        event.notify_members = notify_members;
        event.isFeatured = isFeatured;
        event.preset = preset;
        const updatedEvent = await event.save();
        res.json(updatedEvent)
    } else {
        res.status(401);
        throw new Error("user permission denied");
    }

})

//delte current user Events 
const deleteEvent = asyncHandler(async(req,res) => {
    Event.findByIdAndRemove(req.params.id, (err, del) => {
        if (err) return res.status(500).json(err);
        const response = {
            message: "event successfully deleted",
        };
        return res.status(200).json(response);
    });
})



module.exports = { createEvent,getEvent, getByUser, updateEvent, deleteEvent };