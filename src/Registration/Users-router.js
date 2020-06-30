const express = require('express');
const path = require('path');
const UsersService = require('./Users-Service');
const {requireAuth}=require('../middleware/jwt-auth');
const { hashPassword } = require('./Users-Service');

const jsonBodyParser = express.json();


const userRouter = express.Router();

    userRouter
    .route('')
    .get((req,res,next)=>{
        UsersService.getAllUsers(req.app.get('db'))
            .then(users=>res.json(users))
            .catch(next)
    })
    .post(jsonBodyParser,(req,res, next)=>{
        const { userid, password, store, full_name } = req.body
        console.log(req.body);
        console.log('hello');

        for (const [key, value] of Object.entries(password))
                if (value == null)
                return res.status(400).json({
                error: `Missing '${key}' in request body`
            })
            // newUser.id=req.user.id;
        const passwordError = UsersService.validatePassword(password)
        if (passwordError)
            return res.status(400).json({ error: passwordError })
        
        console.log('goodbye');

        UsersService.hasUserWithUserid(
            req.app.get('db'),
            userid
        )
            .then(hasUserWithUserid => {
                if (hasUserWithUserid)
                    return res.status(400).json({ error: `Userid already taken` })

                
                UsersService.hashPassword(password)
                    .then(hashPassword=>{
                        const newUser = {
                            userid: userid,
                            password: hashPassword,
                            full_name: full_name,
                            store: store
                        } 
                        UsersService.postNewUser(
                            req.app.get('db'),
                            newUser
                        )
                            .then(user => {
                                res
                                    .status(201)
                                    .location(path.posix.join(req.originalUrl, `/${user.id}`))
                                    .json(user)
                            })
                    })
            })
            .catch(next)
    })
        
        

module.exports = userRouter;

