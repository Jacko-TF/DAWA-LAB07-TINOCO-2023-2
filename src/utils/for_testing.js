require('../database');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

const existsUser = async (email) => {
    const user = await User.findOne({email: email})

    return user
}


const verifyToken = (token) => {
    try{
        let decoded = jwt.verify(token, config.secret)
        return decoded
    }catch(e){
        return e
    }
}

module.exports = {
    existsUser,
    verifyToken
}