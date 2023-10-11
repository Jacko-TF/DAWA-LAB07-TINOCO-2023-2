const User = require('../models/User');

describe('user encrypt password test', () =>{

    test('encript password', async () => {
        const user = new User(
            {
               username: "prueba",
               email: "prueab@gmail.com",
               password: "mypassword"
            } 
         );

        user.password = await user.encryptPassword(user.password)

        expect(user.password).toBeDefined();
        expect(user.password.length).toBeGreaterThan(0);
    })
})