import { Router } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user';

const router = Router();

//TODO: test?
const checkUser = async(username, password) => {
    //... fetch user from a db etc.
    const findUsers = await User.find({username});
    if(!findUsers){
      res.send("error");
    }
    const match = await bcrypt.compare(password, findUsers.passwordHash);

    if(match) {
        //login
        return("true");
    }else{
      return("false");
    }
}


router.post('/login', async(req, res, next) => {
  const {username, password} = req.body.values;
  res.send(await checkUser(username, password));
});



router.post('/', async(req, res, next) => {
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


router.get('/allUsers', async(req, res, next) => {
  const allUsers = await User.find();
  if(allUsers){
    res.send(allUsers);
  }else{
    res.send("error");
  }
});

module.exports = router;
