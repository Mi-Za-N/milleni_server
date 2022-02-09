const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const { verifyOtp, sendOtpVia } = require('../utils/otp');
const { sendOtp } = require('../verification/verification');

const UserList = asyncHandler(async (req, res) => {
    const users = await User.find().select('-passwordHash');
    if (!users) {
        res.status(400).json({ success: false })
    }
    res.send(users);
})

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(400).json({ message: 'The user with the given ID was not found.' })
    }
    res.status(200).send(user);
})


const registerUser = asyncHandler(async (req, res) => {
    let { code, first_name, last_name, phone, email, password, pic, interest_list } = req.body;
    email = email?.toLowerCase();
    const emailValided = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    if (email) {
        if (!(emailValided(email))) {
            return res.status(400).json({ "message": "email invalid! please insert a valid email!" })
        }
    }
    // console.log(password.length)
    function ValidateUSPhoneNumber(phone) {
        const regExp = /^(01[6789])(\d{8})$/;
        const vaidPhone = phone.match(regExp);
        if (vaidPhone) {
            return true;
        }
        return false;
    }
    if (ValidateUSPhoneNumber(phone) === false) {
        return res.status(400).json({ error: { "phone": "Invalid phone Number!" } })
    }
    // console.log(req.body)
    const userExists = await User.findOne({ email });
    if (userExists?.verify === false) {
        const sendOtp = await sendOtpVia(userExists.phone);
        if (sendOtp) {
            return res.json({ "message": "otp message successfully sending.", token: generateToken(userExists._id) })
        }
    } if (userExists?.verify === true) {
        throw new Error('User already exists! please login!');
    }
    const user = await User.create({
        first_name,
        last_name,
        phone,
        email,
        password,
        pic,
        interest_list
    })
    if (user) {
        const sendOtp = await sendOtpVia(user.phone);
        if (sendOtp) {
            res.json({ "message": "otp message successfully sending.", token: generateToken(user._id) })
        }
    } else {
        res.status(400)
        throw new Error('Error Occured!')
    }

})
const verifyUser = asyncHandler(async (req, res) => {
    const { otp } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
        res.status(400).json({ "error": "bad request! otp verify failed!" })
    } else {
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
        const verify = await verifyOtp(user.phone, otp);
        // console.log(verify)
        if (!verify) {
            res.json({ "error": "user verification failed!" })
        } if (verify) {
            user.verify = true;
            await user.save();
            res.status(200).json({ "message": "user successfully verified!", user: userBody });
        }
    }

})
const loginUser = asyncHandler(async (req, res) => {
    // console.log(req.body)
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // console.log(user)
    if (user && (await user.matchPassword(password))) {
        //    console.log('password matched')
    };
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            phone: user.phone,
            email: user.email,
            password: user.password,
            isAdmin: user.isAdmin,
            pic: user.pic,
            interest_list: user.interest_list,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid Email or Password!')
    }

})

const updateUser = asyncHandler(async (req, res) => {
    const { first_name,
        last_name,
        pic,
        interest_list } = req.body;
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
        res.status(401);
        throw new Error("You can't perform this action");
    } else if (user && user) {
        user.first_name = first_name || user.first_name;
        user.last_name = last_name || user.last_name;
        user.pic = pic || user.pic;
        user.interest_list = interest_list || user.interest_list;
        const updatedUser = await user.save();
        res.json(updatedUser)
    } else {
        res.status(404);
        throw new Error("user permission denied");
    }

})

module.exports = { UserList, getUserById, registerUser, loginUser, updateUser, verifyUser };