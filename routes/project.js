import { Router } from 'express';
import Project from '../models/project';

const router = Router();

/* GET users listing. */
router.post('/', (req, res, next) => {
  // const data = req.body;
  // const projectDetails = {
  //   title: String,
  //   description: String,
  //   explanation: String,
  //   amount: Number,
  //   createdDate: String,
  //   expirationDate: String,
  // };
  // const newProject = await User.create(projectDetails);

  // res.send(newProject);
  res.send(req.body.values);
});


router.get('/allUsers', async(req, res, next) => {
  const allProject = await Project.find();
  if(allProject){
    res.send(allProject);
  }else{
    res.send("error");
  }
});

module.exports = router;
