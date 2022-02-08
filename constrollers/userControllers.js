const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

const UserList = asyncHandler(async (req, res) => {
    const users = await User.find().select('-passwordHash');

    if(!users) {
        res.status(500).json({success: false})
    } 
    res.send(users);
}) 

const getUserById = asyncHandler(async (req, res) => {
const user = await User.findById(req.params.id);
    if(!user) {
        res.status(500).json({message: 'The user with the given ID was not found.'})
    } 
    res.status(200).send(user);
})


const registerUser = asyncHandler(async (req, res) => {
    const { first_name, last_name, phone, email, password, pic,interest_list } = req.body;
    // console.log(req.body)
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400)
            throw new Error('User already exists!');
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
        if (!phone) {
            return 'please insert valid phone Number'
        }
        if (user) {
            res.status(201).json({
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                phone: user.phone,
                email: user.email,
                password: user.password,
                isAdmin: user.isAdmin,
                pic: user.pic,
                interest_list:user.interest_list,
                token: generateToken(user._id)
            })
        } else {
            res.status(400)
            throw new Error('Error Occured!')
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
            interest_list:user.interest_list,
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

module.exports = {UserList,getUserById, registerUser, loginUser, updateUser };