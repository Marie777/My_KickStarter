import { Router } from 'express';
import User from '../models/user';

const router = Router();

/* GET users listing. */
router.post('/', async(req, res, next) => {
  const {username, password, type} = req.body.values;
  const userDetails = {
    username,
    password,
    type
  };
  const newUser = await User.create(userDetails);
  res.send(newUser);
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
