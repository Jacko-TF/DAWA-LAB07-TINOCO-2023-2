const {verifyPassword} = require('../utils/for_testing')
const User = require('../models/User');

describe('user validate password test', () =>{

    test('Correct Password', async () => {
        const user = await User.findOne({email: "jacko.tinoco@tecsup.edu.pe"})

        const result =  await user.validatePassword("jacko123")

        expect(result).toBe(true)
    })

    test('Incorrect Password', async () => {
        const user = await User.findOne({email: "jacko.tinoco@tecsup.edu.pe"})

        const result =  await user.validatePassword("fefefef")

        expect(result).toBe(false)
    })
})