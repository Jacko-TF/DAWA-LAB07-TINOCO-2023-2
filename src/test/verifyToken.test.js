const {verifyToken} = require('../utils/for_testing')
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

describe('Token test', () =>{

    test('When the token is valid', async () => {
        const user = await User.findOne({email: "jacko.tinoco@tecsup.edu.pe"})

        const token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 60 * 60 * 24
        });

        let result = verifyToken(token)

        expect(result.id).toBe(user._id.toString())
    })

    test('When the token is malformed', async () => {
        const token = "cualquiercosa"

        let result = verifyToken(token)

        expect(result.message).toBe("jwt malformed")
    })

    test('When the token is expired', async () => {
        const user = await User.findOne({email: "jacko.tinoco@tecsup.edu.pe"})

        const token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 0
        });

        let result = verifyToken(token)

        expect(result.message).toBe("jwt expired")
    })
})
