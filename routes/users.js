import { Router } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user';

const router = Router();


// const checkUser = async(username, password) => {
//     //... fetch user from a db etc.
//     const findUsers = await User.find({username});
//     if(!findUsers){
//       return("error");
//     }
//     const match = await bcrypt.compare(password, findUsers.passwordHash);
//
//     if(match) {
//         //login
//         return("true");
//     }else{
//       return("false");
//     }
// }


//Check is username and password is valid
router.post('/login', async(req, res) => {
    const {username, password} = req.body.values;

    const findUser = await User.find({username});
    if(!findUser){
        res.send("error");
    }
    const match = await bcrypt.compare(password, findUser[0].password);

    if(match) {
        //login
        res.send({login: "true", user: findUser[0]});
    }else{
        res.send({login: "false", user: findUser[0]});
    }
});


//Create new user
router.post('/', async(req, res) => {
  const {username, password, type} = req.body.values;

  bcrypt.hash(password, 10, async(err, hash) => {
    if(err){
      res.send(err);
    }
    const userDetails = {
      username,
      password: hash,
      type
    };
    const newUser = await User.create(userDetails);
    res.send(newUser);
  });

});


//Fetch all users
router.get('/allUsers', async(req, res) => {
  const allUsers = await User.find();
  if(allUsers){
    res.send(allUsers);
  }else{
    res.send("error");
  }
});

//Delete users
router.get('/deleteall', async(req, res) => {
    const deleted = await User.collection.drop();
    if(deleted){
        res.send(deleted);
    }else{
        res.send("error");
    }
});


module.exports = router;
