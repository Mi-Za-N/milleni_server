const asyncHandler = require('express-async-handler');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendOtp = (req, res) => {
    const { countryCode, number } = req.body;
    client.verify.services(process.env.SERVICE_ID)
        .verifications
        .create({ to: `${countryCode}${number}`, channel: 'sms' })
        .then(verification => {
            const status = verification.status;
            res.json({status})
        });
}

const verifyOtp = (req, res) => {
    const { countryCode, number, otp } = req.body;
    client.verify.services(process.env.SERVICE_ID)
        .verificationChecks
        .create({ to: `${countryCode}${number}`, code: otp })
        .then(verification_check => {
            const status = verification_check.status;
            res.json({status})
        });
}

module.exports = { sendOtp, verifyOtp };