import { Router } from 'express';
import User from '../models/user';

const router = Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  // res.render('index', { title: 'Express!' });
  res.send("Hello");
});

module.exports = router;
