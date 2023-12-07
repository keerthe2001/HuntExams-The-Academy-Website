const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../Middleware/fetchuser');

const JWT_SECRET = process.env.JWT_SECRET
// ROUTE1 -  Handle POST requests to create and save a user
router.post('/createUser', [
  body('name','Enter a Name with length Min 3').isLength({min:5}),
  body('email','Enter a Valid Email').isEmail(),
  body('role','Enter a role of min length').isLength({min:3}),
  body('mobile','Enter a Valid Mobile').isLength({min:10}),
  body('password','Enter a Password with length Min 3').isLength({min:5})
] ,async(req, res) => {
// 
  // Checking if the req input is validated correctly
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).send("hjghjgj");
  }
try{
  const userValidation = await User.findOne({email: req.body.email});

  if (userValidation){
    return res.send("Already User Exists")
  }
  const salt = await bcrypt.genSalt(10)
  const secPass = await bcrypt.hash(req.body.password,salt)
  
  user = await User.create({
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
        mobile:req.body.mobile,
        password:secPass,
  });

  const data = {
    user:{
        id:user.id
    }
  }
  const authtoken = jwt.sign(data,JWT_SECRET)
  
    res.json({authtoken: authtoken}) 
   user.save()
 
}
catch(error){
  console.error(error.message)
  res.status(500).send(error.message)
}
});
// ROUTE1 -  Handle POST requests to create and save a user
router.post('/login', [
  body('email','Enter a Valid Email').isEmail(),
  body('password','Enter a Password with length Min 3').isLength({min:5})
] ,async(req, res) => {
// 
  // Checking if the req input is validated correctly
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password} = req.body;
    try{
    const user = await User.findOne({email})

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const checkPassword = await bcrypt.compare(password,user.password)

    if(!checkPassword)
    {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    
    const data = {
        user:{
            id:user.id,
            email: user.email,
            role: user.role
        }
      };
    
      const authtoken = jwt.sign(data,JWT_SECRET)
      
      // Check if the email is admin's email and redirect to the admin dashboard
      if (user.role === 'admin') {
        return res.json({ authtoken, userEmail: user.email, userRole:user.role });
      }
      // Check if the email is student's email and redirect to the student dashboard
      if (user.role === 'student') {
        return res.json({ authtoken, userEmail: user.email, userRole:user.role });
      }
      res.json({authtoken: authtoken}) 
    }
    catch (error) {
      // console.error(error.message);
      // res.status(500).send('Server Error');
    }
});


//  ROUTE - 3 -  Handle and Get User Data to display
router.post('/getuser', fetchuser ,async(req, res) => {
  try {
    userid = req.user.id;
    const userData = await User.findById(userid).select('-password');
    res.send(userData);
  } catch (error) {
    return res.status(500).send("User Details Not Found!")
  }
})

module.exports = router