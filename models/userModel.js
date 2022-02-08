const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    phone:{
        type:Number,
        required: true,
    },
    pic: {
        type: String,
        required: true,
        default:
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    interest_list:[]
},
    {
        timestamps: true,
    }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

const User = mongoose.model("User",userSchema)
module.exports = User;