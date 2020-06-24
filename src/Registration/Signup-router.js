const express = require('express')
const SignUpService = require('./SignUp-Service');
const {requireAuth}=require('../middleware/jwt-auth');

const SignUpRouter = express.Router()

    SignUpRouter
    .route('/api/users')
    .post(req,res,)