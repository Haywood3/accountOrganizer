const {User} = require("../models/login.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports.register = (req, res) => {
    User.create(req.body)
    .then(user => {
    const userToken = jwt.sign({id: user._id}, process.env.SECRET_KEY);
    res
        .cookie("usertoken", userToken, {httpOnly: true})
        .json({msg: "success", user:user});
})
    .catch(err => {
        console.log("in err")
        res.status(400).json(err)
    });
}

module.exports.cookie = (req, res) => {
    res
        .cookie("testkey","testvalue", {httpOnly: true})
        .json("success")
}


module.exports.index = (req, res) => {
    User.find()
    .then(users=>res.cookie("test","test", {httpOnly:true}).json(users))
    .catch(err=>res.json(err))
}

module.exports.login = async(req,res) => {
    const user = await User.findOne({ email: req.body.email });

    if(user === null) {
        
    }
}





register: (req, res) => {
  User.create(req.body)
    .then(user => {
        res.json({ msg: "success!", user: user });
    })
    .catch(err => res.json(err));
}
