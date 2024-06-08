// var express = require('express');

// var multer = require('multer');



// var router = express.Router();
// const Folderdir = require('../models/folderstructure');
// var ObjectId = require('mongoose').Types.ObjectId;
// // include node fs module
// var fs = require('fs');
// const path = require('path');




// router.post('/dirpath', function(req, res, next) {
//   let userid = req.body.userid;
//   let dirname = req.body.path;
//  // let filename = req.body.filename;
//  if (dirname==undefined) {
//    res.json({ response: false, message: "Please enter proper Directory name" });
//  }
 
//   Folderdir.findOne({ dirname: {'$eq':dirname} }, function (err, user) {
//     if (err) {
//       res.json({ response: false, message: err });
//     }
//     if (user) {
//       // res.json({ response: false, message: "Data found" });
//        res.json({ response: false, message: "Directory Name Already EXIST" });
//     } else {




//    fs.mkdir(path.join('./public/images', dirname), (err) => {
//    });


//       var json_ary = {
//         userid : userid,
//         dirname : dirname,
//        // filename : filepath,
       
//         created_at : new Date(),
//         updated_at : new Date(),
//         created_by : 'admin',
//         updated_by : 'admin',
       
//       }
//       Folderdir.create(json_ary, function (err, docs) {
//         if (err) {
//           res.json({ response: false, message: err });
//         } else {
//           // res.json({ response: true, message: "Data Inserted" });
//           res.json({ response: true, message: "Directory created successfully" });
//         }
//       });
//     }
//   });
// });

// router.post('/getDir', function(req, res, next) {
//    let userid = req.body.userid;
//   //let dirname = req.body.dirname;
//   console.log(userid);
 
//    Folderdir.find({ userid: {'$eq':userid} }, function (err, user)  {
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

// //Create file



// router.post('/filepath', function(req, res, next) {
//   let filepath = './public/images/shivaji/'+req.body.path;
//     console.log(filepath)

//     fs.access(filepath, fs.F_OK, (err) => {
//   if (err) {
//    fs.writeFile(filepath,'',(err)=> {
//    if (err) {
//         res.send(err)
//     }else{
//       // res.send("File created successfully!")
//        res.json({ response: true, message: "File created successfully" });
//     }
// });
//   } else {
//     console.log("File exists.")
//     // res.send("File exists")
//     res.json({ response: false, message: "File exists" });

//   }
// })


// });



  
// //Create directory

// // router.post('/dirpath', function(req, res, next) {
// //   let path2 = req.body.path;
// //     console.log(path2)
// //    fs.mkdir(path.join('./public/images', path2), (err) => {
// //     if (err) {
       
// //         if(err.code=='EEXIST'){
// //         // res.send("Directory Name Already EXIST!")
// //          res.json({ response: false, message: "Directory Name Already EXIST" });
// //         }else{
// //            // res.send("Please enter proper Directory name");
// //             res.json({ response: false, message: "Please enter proper Directory name" });
// //         }
// //     }else{
// //       // res.send("Directory created successfully!")
// //        res.json({ response: true, message: "Directory created successfully" });
// //     }
    
// // });
  
// // });

// //upload file on server

// // const fileStorageEngine = multer.diskStorage({
// //   destination:(req,file,cb)=>{
// //     cb(null,'./public/images')
// //   },
// //   filename:(req,file,cb)=>{
// //     cb(null,file.originalname)
// //   }
// // })

// // const upload = multer({storage:fileStorageEngine})

// // router.post('/single', upload.single('image'),(req,res) => {
// //       console.log(req.file)
// //       // res.send("file Upload sucessfully")
// //       res.json({ response: true, message: "file Upload sucessfully" });


// //   })



// module.exports = router;
