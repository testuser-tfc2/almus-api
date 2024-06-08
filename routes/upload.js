// var express = require('express');

// var multer = require('multer');

// var router = express.Router();
// const Folderdir = require('../models/folderstructure');
// const Uploadfile = require('../models/uploadfile');
// var ObjectId = require('mongoose').Types.ObjectId;
// // include node fs module
// var fs = require('fs');
// const path = require('path');


// //upload file on server

// const fileStorageEngine = multer.diskStorage({
//   destination:(req,file,cb)=>{
//     cb(null,'./public/images')
//   },
//   filename:(req,file,cb)=>{
//     cb(null,file.originalname)
//   }
// })

// const upload = multer({storage:fileStorageEngine})

// router.post('/single', upload.single('image'),(req,res) => {
//       console.log(req.file)
//       // res.send("file Upload sucessfully")
//  //      var sizeInMB = (req.file.size / (1024*1024)).toFixed(2);
//  // console.log(sizeInMB + 'MB');
//       const mydata = {"filepath":"public/images/"+req.file.originalname,"filename":req.file.originalname,"size": req.file.size}
//       res.json({ response: true, details: mydata });


//   })


// router.post('/upoadfile', function(req, res, next) {
//   let userid = req.body.userid;
//   let filepath = req.body.filepath;
//  // let subdirname = req.body.subdirname;
//   let filename = req.body.filename;
//   let filesize = req.body.myfilesize;
 
 
//   Uploadfile.findOne({ filepath: {'$eq':filepath} }, function (err, user) {
//     if (err) {
//       res.json({ response: false, message: err });
//     }
//     if (user) {
//       // res.json({ response: false, message: "Data found" });
//        res.json({ response: false, message: "File Already EXIST" });
//     } else {


//       var json_ary = {
//         userid : userid,
//         filepath : filepath,
//         filename : filename,
//         filesize : filesize,
//          created_at : new Date(),
//         updated_at : new Date(),
//         created_by : 'admin',
//         updated_by : 'admin',
       
//       }
//       Uploadfile.create(json_ary, function (err, docs) {
//         if (err) {
//           res.json({ response: false, message: err });
//         } else {
//           // res.json({ response: true, message: "Data Inserted" });
//           res.json({ response: true, message: "File Upload successfully" });
//         }
//       });
//     }
//   });
// });

// router.post('/getallFile', function(req, res, next) {
//    let userid = req.body.userid;
//   //let dirname = req.body.dirname;
//   console.log(userid);
 
//    Uploadfile.find({ userid: {'$eq':userid} }, function (err, user)  {
//     if (err) {
//       res.json({ response: false, message: err });
//     }
//     if (user) {
//       console.log({ response: true, message: "Data found", details: user })
//       res.json({ response: true, message: "Data found", details: user });
//     } else {
//       res.json({ response: false, message: "No Data found" });
//     }
//   });
// });


// router.post('/deleteFile', function(req, res, next) {
//   let id = req.body.id;
//   console.log(id);
//   console.log({ _id: new ObjectId(id) })
//   Uploadfile.findOneAndDelete({ _id: new ObjectId(id) }, function (err, user) {
//     if (err) {
//       res.json({ response: false, message: err });
//     }
//     if (user) {
//       res.json({ response: true, message: "File Deleted" });
//     }
//   });
// });




// module.exports = router;
