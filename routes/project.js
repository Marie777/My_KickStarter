import { Router } from 'express';
import path from 'path';
import Project from '../models/project';

const router = Router();


//Create project
router.post('/newProject', async (req, res, next) => {
  const {title, description, explanation, amount, expirationDate} = req.body.values;
  const projectDetails = {
    title,
    description,
    explanation,
    amount,
    createdDate : Date.now(),
    expirationDate,
  };
  const newProject = await Project.create(projectDetails);
  res.send(newProject);
});


//Update project
router.post('/newProject/:_id', async (req, res, next) => {
  const {_id} = req.params;
  const {title, description, explanation, amount, expirationDate} = req.body.values;
  const projectDetails = {
    title,
    description,
    explanation,
    amount,
    expirationDate,
  };
  const updatedProject = await Project.findOneAndUpdate({_id}, projectDetails);
  res.send(updatedProject);
});


//Fetch all projects (optional: according to start or end index)
router.get('/', async(req, res, next) => {
  let startIndex = req.param("_start") ? Number.parseInt(req.param("_start")) : 0;
  let endIndex = req.param("_end") ? Number.parseInt(req.param("_end")) : 0;

  const allProject = await Project.find();
  if(allProject){
    endIndex = ((endIndex == 0) || (endIndex > allProject.length) || (endIndex < startIndex))
                ? allProject.length
                : endIndex;
    startIndex = (startIndex > endIndex) ? 0 : startIndex;
    res.send(allProject.slice(startIndex, endIndex));
  }else{
    res.send("error");
  }
});


//Fetch pproject according to id
router.get('/:_id', async(req, res, next) => {
  const {_id} = req.params;

  const project = await Project.find({_id});
  if(project){
    console.log(project);
    res.send(project);
  }else{
    res.send("error");
  }
});


//Delete project according to id
router.delete('/delete/:_id', async(req, res, next) => {
  const {_id} = req.params;

  const deleted = await Project.findByIdAndRemove({_id});
  if(deleted){
    res.send(deleted);
  }else{
    res.send("error");
  }
});


//send image to client
router.get('/image/:img', async(req, res, next) => {
  let imgName = req.params.img;
  res.sendFile(path.join(__dirname, '../public/uploadImg/', imgName));
});


//Upload image according to project id
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
