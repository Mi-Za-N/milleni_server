const express = require('express');
const {UserList, getUserById, registerUser, loginUser, updateUser } = require('../constrollers/userControllers');
const { protect } = require('../middleware/authMiddleware');
const {sendOtp,verifyOtp} = require('../verification/verification')
const router = express.Router();

router.route('/').get(UserList)

router.route('/:id').get(getUserById)

router.route('/').post(registerUser)
router.route('/:email').put(protect,updateUser)
router.route('/login').post(loginUser)
//mobile verify 2step verification
router.route('/send-otp').post(sendOtp)
router.route('/verify-otp').post(verifyOtp)

module.exports = router;