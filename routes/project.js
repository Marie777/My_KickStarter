import { Router } from 'express';
import Project from '../models/project';

const router = Router();

/* GET users listing. */
router.post('/', async (req, res, next) => {
  const {title, description, explanation, amount, createdDate, expirationDate} = req.body.values;
  const projectDetails = {
    title,
    description,
    explanation,
    amount,
    createdDate,
    expirationDate,
  };
  const newProject = await Project.create(projectDetails);
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


router.post('/upload', (req, res, next) => {
  // console.log(req);

  let projectId = req.files.projectId;
  let imageFile = req.files.file;
  let imageFileName = req.files.file.name;

  console.log(req.files);

  imageFile.mv(`${__dirname}/../public/uploadImg/${imageFileName}`, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.json({file: `public/${imageFileName}`});
  });

});

module.exports = router;
