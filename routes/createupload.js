// var express = require('express');

// var multer = require('multer');

// var router = express.Router();
// const Folderdir = require('../models/folderstructure');
// const Createfile = require('../models/createfile');
// var ObjectId = require('mongoose').Types.ObjectId;
// // include node fs module
// var fs = require('fs');
// const path = require('path');







// //Create file



// router.post('/filepath', function(req, res, next) {
//  let userid = req.body.userid;
//  let filepath = './public/'+req.body.path;
 
//     console.log(filepath)

//     fs.access(filepath, fs.F_OK, (err) => {
//   if (err) {
//    fs.writeFile(filepath,'',(err)=> {
//    if (err) {
//         res.send(err)
//     }else{
//       // res.send("File created successfully!")
//      //  res.json({ response: true, message: "File created successfully" });


//   Createfile.findOne({ filepath: {'$eq':filepath} }, function (err, user) {
//     if (err) {
//       res.json({ response: false, message: err });
//     }
//     if (user) {
//       // res.json({ response: false, message: "Data found" });
//        res.json({ response: false, message: "File Already EXIST" });
//     } else {


//       var json_ary = {
//         userid : userid,
//         filepath : 'public/'+req.body.path,
//          created_at : new Date(),
//         updated_at : new Date(),
//         created_by : 'admin',
//         updated_by : 'admin',
       
//       }
//       Createfile.create(json_ary, function (err, docs) {
//         if (err) {
//           res.json({ response: false, message: err });
//         } else {
//           // res.json({ response: true, message: "Data Inserted" });
//           res.json({ response: true, message: "File created successfully" });
//         }
//       });
//     }
//   });
//     }
// });
//   } else {
//     console.log("File exists.")
//     // res.send("File exists")
//     res.json({ response: false, message: "File Already EXIST" });

//   }
// })


// });



  



// module.exports = router;
