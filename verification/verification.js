const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendOtp = (code, user, res) => {
    const phone = (code + user?.phone)?.toString();
    client.verify.services(process.env.SERVICE_ID)
        .verifications
        .create({ to: phone, channel: 'sms' })
        .then(verification => {
            const status = verification.status;
            res.json({ "message": "otp seccesfully sending...please verify your otp", status, token: generateToken(user._id) })
        });
}
const verifyOtp = async (code, id,otp, res) => {
    const user = await User.findById(id);
    const phone = (code + user?.phone)?.toString();
    if (!user) {
        res.status(400).json({ "error": "bad request! otp verify faild!" })
    }
    const userBody = {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
        pic: user.pic,
        verify: user.verify,
        interest_list: user.interest_list,
        token: generateToken(user._id)
    };
    client.verify.services(process.env.SERVICE_ID)
        .verificationChecks
        .create({ to: phone, code:otp })
        .then(verification_check => {
            const status = verification_check.status;
            if (status === 'approved') {
                res.status(200).json({ "message": "user successfully verified!", user: userBody });
            } else {
                res.json({ "error": "user verification failed!" })
            }
        });
}

module.exports = { sendOtp, verifyOtp };