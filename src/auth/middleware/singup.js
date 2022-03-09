// 'use strict';


// const {User} = require('../models/index');
// const bcrypt = require('bcrypt');


//  const signup = async(req,res , next) => {

//     let {username , password} = req.body;

//     try{
//         let hashedPassword = await bcrypt.hash(password , 5);
//         const newUser = await User.create({
//             username: username,
//             password: hashedPassword
//         })
//        res.status(201).json(newUser);
//     } catch(error){
//        console.log(error);
//     }
//     next();
// }

// module.exports = signup;
