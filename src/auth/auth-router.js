const express = require('express');
const AuthService = require('./auth-service');

const authRouter = express.Router();
const jsonBodyParser = express.json();

authRouter
    .post('/login', jsonBodyParser, (req,res,next)=>{
        const { userid, password } = req.body;
        const loginUser = { userid, password };
        console.log(loginUser);
        for (const [key, value] of Object.entries(loginUser))
            if (value == null)
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                });
        AuthService.getUserWithUserId(
            req.app.get('db'),
            loginUser.userid
        )
            .then(dbUser => {
                if (!dbUser)
                    return res.status(401).json({
                        error: 'Incorrect userid or password'
                    });
                    console.log(loginUser.password, dbUser.password);
                return AuthService.comparePasswords(loginUser.password, dbUser.password)
                    .then(compareMatch => {
                        if (!compareMatch)
                            return res.status(401).json({
                                error: 'Incorrect userid or password'
                            });
                        const sub = dbUser.userid;
                        console.log(sub, 'herrro');
                        console.log(dbUser.id, 'muahahaha')
                        const payload = { userid: dbUser.id };
                        res.send({
                            authToken: AuthService.createJwt(sub, payload),
                            user: dbUser
                        });
                    });
            })
            .catch(next);
    });

    module.exports = authRouter;