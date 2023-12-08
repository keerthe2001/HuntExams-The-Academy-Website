const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../Middleware/fetchuser');

router.post('/createUser', [
  
  ] ,async(req, res) => {
 
  try{
   json.send("skdfjsldkfj")
  }
  catch(error){
    console.error(error.message)
    res.status(500).send(error.message)
  }
  });