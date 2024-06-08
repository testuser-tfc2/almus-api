// var express = require('express');
// var router = express.Router();
// const teriff_fs = require('../models/teriff_fs');
// const teriff_ms = require('../models/teriff_ms');
// const teriff_ss = require('../models/teriff_ss');
// var ObjectId = require('mongoose').Types.ObjectId;
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// router.get('/FSList', function(req, res, next) {
//   teriff_fs.find({}, function (err, user) {
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

// router.get('/MSList', function(req, res, next) {
//   teriff_ms.find({}, function (err, user) {
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

// router.get('/SSList', async function(req, res, next) {
//   await teriff_ss.find({}, function (err, user) {
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

// router.post('/addTeriffFS', function(req, res, next) {
//   let discomID = req.body.discomID;
// 	let category = req.body.category;
// 	let price = req.body.price;
// 	let load_based = req.body.load_based;
// 	let operation = req.body.operation;
// 	let remarks = req.body.remarks;

//   var json_ary = {
//     discomID : discomID,
//     category : category,
//     price : price,
//     load_based : load_based,
//     operation : operation,
//     remarks : remarks,
//     created_at : new Date(),
//     updated_at : new Date(),
//     created_by : 'admin',
//     updated_by : 'admin'
//   }
//   teriff_fs.create(json_ary, function (err, docs) {
//     if (err) {
//       res.json({ response: false, message: err });
//     } else {
//       res.json({ response: true, message: "Data Inserted" });
//     }
//   });
// });

// router.post('/addTeriffMS', function(req, res, next) {
//   let discomID = req.body.discomID;
// 	let category = req.body.category;
// 	let price = req.body.price;
// 	let meter_type = req.body.meter_type;
// 	let operation = req.body.operation;

//   var json_ary = {
//     discomID : discomID,
//     category : category,
//     price : price,
//     meter_type : meter_type,
//     operation : operation,
//     created_at : new Date(),
//     updated_at : new Date(),
//     created_by : 'admin',
//     updated_by : 'admin'
//   }
//   teriff_ms.create(json_ary, function (err, docs) {
//     if (err) {
//       res.json({ response: false, message: err });
//     } else {
//       res.json({ response: true, message: "Data Inserted" });
//     }
//   });
// });

// router.post('/addTeriffSS', function(req, res, next) {
//   let discomID = req.body.discomID;
// 	let category = req.body.category;
// 	let unit_from = req.body.unit_from;
// 	let unit_to = req.body.unit_to;
// 	let price = req.body.price;
// 	let uom = req.body.uom;
// 	let operation = req.body.operation;

//   var json_ary = {
//     discomID : discomID,
//     category : category,
//     price : price,
//     unit_from : unit_from,
//     unit_to : unit_to,
//     uom : uom,
//     operation : operation,
//     created_at : new Date(),
//     updated_at : new Date(),
//     created_by : 'admin',
//     updated_by : 'admin'
//   }
//   teriff_ss.create(json_ary, function (err, docs) {
//     if (err) {
//       res.json({ response: false, message: err });
//     } else {
//       res.json({ response: true, message: "Data Inserted" });
//     }
//   });
// });

// router.post('/editTeriffFS', function(req, res, next) {
//   let discomID = req.body.discomID;
// 	let category = req.body.category;
// 	let price = req.body.price;
// 	let load_based = req.body.load_based;
// 	let operation = req.body.operation;
// 	let remarks = req.body.remarks;
// 	let id = req.body.id;

//   teriff_fs.findOneAndUpdate({ _id: new ObjectId(id) },{$set:{discomID:discomID, category:category, price:price, load_based:load_based, operation:operation, remarks: remarks }},{ returnOriginal:false }, function (err, user) {
//     if (err) {
//       res.json({ response: false, message: err });
//     }
//     if (user) {
//       res.json({ response: true, message: "Teriff Updated" });
//     }
//   });
// });

// router.post('/deleteTeriffFS', function(req, res, next) {
//   let id = req.body.id;
//   teriff_fs.findOneAndDelete({ _id: new ObjectId(id) }, function (err, user) {
//     if (err) {
//       res.json({ response: false, message: err });
//     }
//     if (user) {
//       res.json({ response: true, message: "Teriff Deleted" });
//     }
//   });
// });

// router.post('/editTeriffMS', function(req, res, next) {
//   let discomID = req.body.discomID;
// 	let category = req.body.category;
// 	let price = req.body.price;
// 	let meter_type = req.body.meter_type;
// 	let operation = req.body.operation;
//   let id = req.body.id;
//   teriff_ms.findOneAndUpdate({ _id: new ObjectId(id) },{$set:{discomID:discomID, category:category, price:price, meter_type:meter_type, operation:operation}},{ returnOriginal:false }, function (err, user) {
//     if (err) {
//       res.json({ response: false, message: err });
//     }
//     if (user) {
//       res.json({ response: true, message: "Teriff Updated" });
//     }
//   });
// });

// router.post('/deleteTeriffMS', function(req, res, next) {
//   let id = req.body.id;
//   teriff_ms.findOneAndDelete({ _id: new ObjectId(id) }, function (err, user) {
//     if (err) {
//       res.json({ response: false, message: err });
//     }
//     if (user) {
//       res.json({ response: true, message: "Teriff Deleted" });
//     }
//   });
// });

// router.post('/editTeriffSS', function(req, res, next) {
//   let discomID = req.body.discomID;
// 	let category = req.body.category;
// 	let unit_from = req.body.unit_from;
// 	let unit_to = req.body.unit_to;
// 	let price = req.body.price;
// 	let uom = req.body.uom;
// 	let operation = req.body.operation;
//   let id = req.body.id;
//   teriff_ss.findOneAndUpdate({ _id: new ObjectId(id) },{$set:{discomID:discomID, category:category, unit_from:unit_from, unit_to:unit_to, price:price, uom:uom, operation:operation}},{ returnOriginal:false }, function (err, user) {
//     if (err) {
//       res.json({ response: false, message: err });
//     }
//     if (user) {
//       res.json({ response: true, message: "Teriff Updated" });
//     }
//   });
// });

// router.post('/deleteTeriffSS', function(req, res, next) {
//   let id = req.body.id;
//   teriff_ss.findOneAndDelete({ _id: new ObjectId(id) }, function (err, user) {
//     if (err) {
//       res.json({ response: false, message: err });
//     }
//     if (user) {
//       res.json({ response: true, message: "Teriff Deleted" });
//     }
//   });
// });

// router.post('/getFSByID', function(req, res, next) {
//   let id = req.body.id;
//   console.log(id);
//   console.log({ _id: new ObjectId(id) })
//   teriff_fs.findOne({ _id: new ObjectId(id)}, function (err, user) {
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

// router.post('/getMSByID', function(req, res, next) {
//   let id = req.body.id;
//   console.log(id);
//   console.log({ _id: new ObjectId(id) })
//   teriff_ms.findOne({ _id: new ObjectId(id)}, function (err, user) {
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

// router.post('/getSSByID', function(req, res, next) {
//   let id = req.body.id;
//   console.log(id);
//   console.log({ _id: new ObjectId(id) })
//   teriff_ss.findOne({ _id: new ObjectId(id)}, function (err, user) {
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


// module.exports = router;
