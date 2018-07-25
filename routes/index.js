import { Router } from 'express';
import User from '../models/user';

const router = Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  // res.render('index', { title: 'Express!' });
  const userDetails = {
    userName: "String",
    password: "String",
    typePermission: "String"
  };
  const newUser = await User.create(userDetails);

  res.send(newUser);
});

module.exports = router;
