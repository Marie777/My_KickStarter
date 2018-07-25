import { Router } from 'express';
import User from '../models/user';

const router = Router();

/* GET users listing. */
router.get('/', async(req, res, next) => {
  const userDetails = {
    userName: "String1",
    password: "String1",
    typePermission: "String1"
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
