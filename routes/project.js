import { Router } from 'express';
import Project from '../models/project';

const router = Router();

/* GET users listing. */
//TODO: edit: if mongoID !== "" => update mongo (not create)
router.post('/', async (req, res, next) => {
  const {projectID, title, description, explanation, amount, createdDate, expirationDate} = req.body.values;
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


router.post('/upload', async (req, res, next) => {
  // console.log(req);

  let projectId = req.body.projectId;
  let imageFile = req.files.file;
  let imageFileName = req.files.file.name;

  const dirFile = `${__dirname}/../public/uploadImg/${imageFileName}`;

  imageFile.mv(dirFile, async(err) => {
    if (err) {
      return res.status(500).send(err);
    }

    let updateImg = await Project.findOneAndUpdate(
      {_id : projectId },
      {$push : {images : imageFileName} },
      {safe:true, upsert:true}
    );
    if(updateImg){
      res.send(updateImg);
    }else{
      res.send(err);
    }

    // res.json({file: `public/${imageFileName}`});
  });



});

module.exports = router;
