import { Router } from 'express';
import path from 'path';
import Project from '../models/project';
import fs from 'fs';
import User from "../models/user";

const router = Router();

//Upload video according to project id
router.post('/uploadVideo', async (req, res) => {

    console.log(req);

    let projectId = req.body.projectId;
    let videoFile = req.body.file;
    let videoFileName = req.files.file.name;

    const dirFile = `${__dirname}/../public/uploadVideo/${videoFileName}`;
    // const dirFile = `${__dirname}/../public/uploadVideo/IMG_2974.mp4}`;

    videoFile.mv(dirFile, async(err) => {
        if (err) {
            return res.status(500).send(err);
        }

        let updateVideo = await Project.findOneAndUpdate(
            {_id : projectId },
            {$push : {video : videoFileName} },
            {safe:true, upsert:true}
        );
        if(updateVideo){
            res.send(updateVideo);
        }else{
            res.send("err");
        }

    });
    res.send(req.body)
});



//Upload image according to project id
router.post('/upload', async (req, res) => {
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
            res.send("err");
        }
        // res.json({file: `public/${imageFileName}`});
    });
});


//Create project
router.post('/newProject', async (req, res) => {
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






//Fetch all projects (optional: according to start or end index)
router.get('/', async(req, res) => {
  let {_start, _end} = req.params;
  let startIndex = _start ? Number.parseInt(_start) : 0;
  let endIndex = _end ? Number.parseInt(_end) : 0;

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




//Delete users
router.get('/deleteall', async(req, res) => {
    const deleted = await Project.collection.drop();
    if(deleted){
        res.send(deleted);
    }else{
        res.send("error");
    }
});




router.get('/video/:filename', function(req, res) {
    const {filename} = req.params;
    const path = `${__dirname}/../public/uploadVideo/IMG_2974.mp4`;
    // const path = `${__dirname}/../public/uploadVideo/${filename}`;
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10)
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize-1
        const chunksize = (end-start)+1
        const file = fs.createReadStream(path, {start, end})
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(200, head)
        fs.createReadStream(path).pipe(res)
    }
});


//Update project
router.post('/newProject/:_id', async (req, res) => {
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


//Add new donation
router.post('/addDonation/:_id', async (req, res) => {
    const {_id} = req.params;
    const {donationAmount} = req.body.values;

    let updatedProject = await Project.findOneAndUpdate(
        {_id},
        {$push : {donationList : {donationAmount}} },
        {safe:true, upsert:true}
    );
    if(updatedProject){
        console.log(updatedProject);
        res.send(updatedProject);
    }else{
        res.send("err");
    }
});



//Delete donation from project according to id
router.get('/deletedonation/:_id/:donationAmount', async(req, res) => {
    const {_id, donationAmount} = req.params;

    let deleteDonation = await Project.findOneAndUpdate(
        {_id },
        {$pull : {donationList : {donationAmount}} },
        {safe:true, upsert:true}
    );
    if(deleteDonation){
        res.send(deleteDonation);
    }else{
        res.send("err");
    }
});




//Delete project according to id
router.delete('/delete/:_id', async(req, res) => {
    const {_id} = req.params;

    const deleted = await Project.findByIdAndRemove({_id});
    if(deleted){
        res.send(deleted);
    }else{
        res.send("error");
    }
});


//send image to client
router.get('/image/:img', async(req, res) => {
    let imgName = req.params.img;
    res.sendFile(path.join(__dirname, '../public/uploadImg/', imgName));
});



//Fetch project according to id
router.get('/:_id', async(req, res) => {
    const {_id} = req.params;

    const project = await Project.find({_id});
    if(project){
        console.log(project);
        res.send(project);
    }else{
        res.send("error");
    }
});


module.exports = router;
