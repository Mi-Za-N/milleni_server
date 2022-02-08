const express = require('express');
const {createEvent, updateEvent, deleteEvent,getEvent, getByUser } = require('../constrollers/eventControllers');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(getEvent);
router.route('/:id').get(getByUser);
router.route('/create').post(protect,createEvent);
router.route('/update/:id').put(protect,updateEvent);
router.route('/delete/:id').delete(protect,deleteEvent);
module.exports = router;

