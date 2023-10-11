const {existsUser} = require('../utils/for_testing')

describe('user test', () =>{

    test('When the user exits', async () => {
        let email = "jacko.tinoco@tecsup.edu.pe"

        const result =  await existsUser(email)

        expect(!result).toBe(false)
    })

    test('When the user didnt exits', async () => {
        let email = "jacko.prueba@tecsup.edu.pe"

        const result =  await existsUser(email)

        expect(!result).toBe(true)
    })
})