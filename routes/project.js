import { Router } from 'express';
import Project from '../models/project';

const router = Router();

/* GET users listing. */
router.post('/', async (req, res, next) => {
  // const data = req.body;
  // const projectDetails = {
  //   title: String,
  //   description: String,
  //   explanation: String,
  //   amount: Number,
  //   createdDate: String,
  //   expirationDate: String,
  // };
  const newProject = await Project.create(req.body.values);
  console.log(newProject);
  res.send(newProject);
  // res.send(req.body.values);
});


router.get('/allProjects', async(req, res, next) => {
  const allProject = await Project.find();
  if(allProject){
    res.send(allProject);
  }else{
    res.send("error");
  }
});

module.exports = router;
