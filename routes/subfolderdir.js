// var express = require('express');

// var multer = require('multer');

// var router = express.Router();
// const Folderdir = require('../models/folderstructure');
// const Subfolderdir = require('../models/subfolderstructure');
// var ObjectId = require('mongoose').Types.ObjectId;
// // include node fs module
// var fs = require('fs');
// const path = require('path');




// router.post('/subdirpath', function(req, res, next) {
//   let userid = req.body.userid;
//   let dirname = req.body.dirname;
//   let subdirname = req.body.subdirname;
//  // let filename = req.body.filename;
 
 
//   Subfolderdir.findOne({ subdirname: {'$eq':subdirname} }, function (err, user) {
//     if (err) {
//       res.json({ response: false, message: err });
//     }
//     if (user) {
//       // res.json({ response: false, message: "Data found" });
//        res.json({ response: false, message: "Directory Name Already EXIST" });
//     } else {




//    fs.mkdir(path.join('./public/images', dirname+'/'+subdirname), (err) => {
//    });


//       var json_ary = {
//         userid : userid,
//         subdirname : subdirname,
//          dirname : dirname,
//          created_at : new Date(),
//         updated_at : new Date(),
//         created_by : 'admin',
//         updated_by : 'admin',
       
//       }
//       Subfolderdir.create(json_ary, function (err, docs) {
//         if (err) {
//           res.json({ response: false, message: err });
//         } else {
//           // res.json({ response: true, message: "Data Inserted" });
//           res.json({ response: true, message: "Sub Directory created successfully" });
//         }
//       });
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




// module.exports = router;
