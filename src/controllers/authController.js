//Declarando el router
const { Router } = require('express');
const router = Router();

//JSON webtoken
const jwt = require('jsonwebtoken');
const config = require('../config');
const verifyToken = require('./verifyToken');

const User = require('../models/User');

__dirname = 'src/'

router.get('/', async (req, res, next)=>{
    res.sendFile('login.html', {
        root:__dirname+ '/public/'
    });
})

router.get('/login', async (req, res, next)=>{
    res.sendFile('login.html', {
        root:__dirname+ '/public/'
    });
})

router.post('/sinup', async (req, res, next) => {
    const { username, email, password } = req.body;
    const user = new User(
       {
          username: username,
          email: email,
          password: password
       } 
    );

    //console.log(user)
    //res.json({message: 'Received'})
    
    user.password = await user.encryptPassword(user.password)
    await user.save();

    const token = jwt.sign({id: user._id}, config.secret, {
        expiresIn: 60 * 60 * 24
    })
    
    res.json({auth: true, token: token})
    
})

router.get('/dashboard', verifyToken, async (req, res, next) => {
    const user = await User.findById(req.userId, { password: 0 });
    //const user = await User.findById(req.userId);
    if(!user){
        return res.status(404).send('No user found....!!!');
    }

    res.json(user);
    //res.sendFile(__dirname + '../public/dashboard.html');
})

router.get('/register', (req, res, next) =>{
    //console.log(__dirname)
    res.sendFile('register.html', {
        root:__dirname+ '/public/'
    });
})

router.post('/sinin', async (req, res, next) => {
    const { email, password } = req.body; 
    //console.log(email, password);
    const user = await User.findOne({email: email})

    if(!user){
        return res.status(404).send("The user doesn't exists");
    }

    const validPassword = await user.validatePassword(password);
    //console.log(passwordIsValid);
    if(!validPassword){
        return res.status(401).json({auth: false, token: null});
    }

    const token = jwt.sign({id: user._id}, config.secret, {
        expiresIn: 60 * 60 * 24
    });
    //console.log(user)
    res.json({auth: true, token});
    // res.sendFile('dashboard.html', {
    //     root:__dirname+ '/public/'
    // });
})

// router.get('/dashboard', verifyToken, (req, res, next) => {
//     res.json('dashboard');
// })


module.exports = router