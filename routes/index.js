var express = require('express');

var multer = require('multer');

var router = express.Router();
const Users = require('../models/users');
const Importinputexcel = require('../models/uploadimportexcel');
const Exportinputexcel = require('../models/uploadexportexcel');
const Spotrateexcel = require('../models/uploadspotrateexcel');
const Usdinrpremiumexcel = require('../models/uploadusdinrpremiumexcel');
const Eurinrpremiumexcel = require('../models/uploadeurinrpremiumexcel');
const Settleddata = require('../models/settled_master');
const Settledimportdata = require('../models/settled1_master');
const Settledpcfcdata = require('../models/pcfcsettled_master');
const Settledforexbuydata = require('../models/forexbuysettled_master');
const Settledforexselldata = require('../models/forexsellsettled_master');
const Pcfcexcel = require('../models/uploadpcfcexcel');
const Forexbuyexcel = require('../models/uploadforexbuyexcel');
const Forexsellexcel = require('../models/uploadforexsellexcel');
const Saveimportcalculation = require('../models/saveimportcaculation_master');
const Saveexportcalculation = require('../models/saveexportortcaculation_master');
const Savepcfccalculation = require('../models/savepcfccaculation_master');
const Saveforexbuycalculation = require('../models/saveforexbuycaculation_master');
const Saveforexsellcalculation = require('../models/saveforexsellcaculation_master');
const Savecashratereport = require('../models/cashratemodel');
const Rbireferencemaster = require('../models/rbireferencemaster');

const Gbpinrpremiumexcel = require('../models/uploadgbpinrpremiumexcel');
const Yeninrpremiumexcel = require('../models/uploadyeninrpremiumexcel');
const EurUsdinrpremiumexcel = require('../models/uploadeurusdinrpremiumexcel');
const GbpUsdinrpremiumexcel = require('../models/uploadgbpusdinrpremiumexcel');

var ObjectId = require('mongoose').Types.ObjectId;
// include node fs module
var fs = require('fs');
const path = require('path');
var nodemailer = require('nodemailer');
var ObjectId = require('mongodb').ObjectID;

const async = require('async');

const DIR = './uploads';

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + "-" + (new Date().getTime()).toString(15) + path.extname(file.originalname));
  }
});
let upload = multer({ storage: storage });


//Create file


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

// router.post('/dirpath', function(req, res, next) {
//   let path2 = req.body.path;
//     console.log(path2)
//    fs.mkdir(path.join('./public/images', path2), (err) => {
//     if (err) {

//         if(err.code=='EEXIST'){
//         // res.send("Directory Name Already EXIST!")
//          res.json({ response: false, message: "Directory Name Already EXIST" });
//         }else{
//            // res.send("Please enter proper Directory name");
//             res.json({ response: false, message: "Please enter proper Directory name" });
//         }
//     }else{
//       // res.send("Directory created successfully!")
//        res.json({ response: true, message: "Directory created successfully" });
//     }

// });

// });

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
//       res.json({ response: true, message: "file Upload sucessfully" });


//   })

/* GET home page. */
router.post('/login', function (req, res, next) {
  let email = req.body.email;
  let password = req.body.password;
  console.log({ email: { '$eq': email }, password: { '$eq': password } })
  Users.findOne({ email: { '$eq': email }, password: { '$eq': password } }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      console.log({ response: true, message: "Data found", details: user })
      res.json({ response: true, message: "Data found", details: user });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});

router.post('/addUser', function (req, res, next) {
  let username = req.body.username;
  let companyname = req.body.companyname;
  let email = req.body.email;
  let phone = req.body.phone;
  let usertype = req.body.usertype;
  let exposuredate = req.body.exposuredate;
  let turnover = req.body.turnover;
  let banker = req.body.banker;
  let margincharge = req.body.margincharge;
  let role = req.body.role;
  let password = req.body.password;
  let activestatus = req.body.activestatus;

  Users.findOne({ email: { '$eq': email }, phone: { '$eq': phone } }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: false, message: "Data found" });
    } else {
      var json_ary = {
        username: username,
        companyname: companyname,
        email: email,
        phone: phone,
        usertype: usertype,
        exposuredate: exposuredate,
        turnover: turnover,
        banker: banker,
        margincharge: margincharge,
        role: role,
        password: password,
        activestatus: activestatus,
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 'admin',
        updated_by: 'admin',


      }


      Users.create(json_ary, function (err, docs) {
        if (err) {
          res.json({ response: false, message: err });
        } else {
          res.json({ response: true, message: "Data Inserted", docs: docs });
          console.log(email)
          console.log('docs data', docs.email)


//           var transporter = nodemailer.createTransport({
//             host: "server2.hohtechlabs.com",
//             port: 587,
//             secure: false,
//             auth: {
//               user: 'no-reply@hohtechlabs.com',
//               pass: '3[zJu3XkKRV0'
//             }
//           });

//           //    var transporter = nodemailer.createTransport({
//           // service:"gmail",
//           //   auth: {
//           //   user: 'chetan.hoh@gmail.com',
//           //   pass: 'Rajveer!12'
//           //         }
//           //    });

//           var mailOptions = {
//             from: 'no-reply@hohtechlabs.com',
//             to: email,
//             subject: 'Almus Team',
//             // text: 'That was easy!'
//             // html: 'emailData'

//             html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
// <html xmlns="http://www.w3.org/1999/xhtml">
// <head>
// <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
// <title>Untitled Document</title>
// </head>

// <body>
// <table width="600px" border="0" cellspacing="0" cellpadding="10" style="font-family:Arial, Helvetica, sans-serif; margin:0 auto; border:1px solid #eee; font-size:14px;">
//   <tr>
//     <td><a href="#"><img src="http://localhost:3300/public/logo.png"></a></td>
//   </tr>
//   <tr>
//     <td>Dear Team,</td>
//   </tr>
//   <tr>
//     <td>hope this email finds you well.</td>
//   </tr>
//   <tr>
//     <td>Please find the Activation link of Almus portal with this mail. <a href="http://localhost:3300/verifyUser?id=`+ docs._id + `" style="color:#000; font-weight:bold">click here.</a></td>
//   </tr>
//   <tr>
//     <td height="75">&nbsp;</td>
//   </tr>
//   <tr>
//     <td>Thanks,<br>
//     Team WFM.</td>
//   </tr>
// </table>
// </body>
// </html>`


//           };

//           transporter.sendMail(mailOptions, function (error, info) {
//             if (error) {
//               console.log(error);
//             } else {
//               console.log('Email sent: ' + info.response);

//             }
//           });



        }
      });
    }
  });
});

// router.get('/usersList', function (req, res, next) {
//   Users.find({ role: { '$ne': 'admin' } }, function (err, user) {
//     if (err) {
//       res.json({ response: false, message: err });
//     }
//     if (user) {
    
//       res.json({ response: true, message: "Data found", details: user });
//     } else {
//       res.json({ response: false, message: "No Data found" });
//     }
//   });
// });


router.get('/usersList', function (req, res, next) {
  Users.find({ role: { '$ne': 'admin' } }, async function (err, users) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (users) {
      var XLSX = require('xlsx')
      var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/userdata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
        { header: "S no.", key: "s_no" },
        { header: "Full Name", key: "username" },
        { header: "Email ID", key: "email" },
        { header: "Phone number", key: "phone" },
        { header: "User Type", key: "usertype" },
        { header: "Exposure start date", key: "exposuredate" },
        { header: "Margin Charged", key: "margincharge" },
        { header: "Status", key: "activestatus" },
        
      ];
      // Looping through User data
      let counter = 1;
      users.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
        await workbook.xlsx.writeFile(`${path}/userlistdata.xlsx`)
          .then(() => {
            console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
      } catch (err) {
        console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }
    
      res.json({ response: true, message: "Data found", details: users });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});


router.post('/editUser', function (req, res, next) {
  let companyname = req.body.companyname;
  let email = req.body.email;
  let phone = req.body.phone;
  let usertype = req.body.usertype;
  let exposuredate = req.body.exposuredate;
  let turnover = req.body.turnover;
  let banker = req.body.banker;
  let margincharge = req.body.margincharge;
  let role = req.body.role;
  let password = req.body.password;
  let activestatus = req.body.activestatus;
  let id = req.body.id;
  Users.findOneAndUpdate({ _id: new ObjectId(id) }, {
    $set: {
      companyname: companyname, email: email, phone: phone, usertype: usertype, exposuredate: exposuredate,
      turnover: turnover, banker: banker, margincharge: margincharge, role: role, password: password, activestatus: activestatus
    }
  }, { returnOriginal: false }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "User updated" });
    }
  });
});

router.post('/deleteUser', function (req, res, next) {
  let id = req.body.id;
  console.log(id);
  console.log({ _id: new ObjectId(id) })
  Users.findOneAndDelete({ _id: new ObjectId(id) }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "User Deleted" });
    }
  });
});

router.post('/blockUser', function (req, res, next) {
  let id = req.body.id;
  let activestatus = req.body.activestatus;
  console.log(id);

  Users.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { activestatus: activestatus } }, { returnOriginal: false }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "User BLocked" });
    }
  });
});


router.get('/verifyUser', function (req, res, next) {
  let id = req.query.id;
  let activestatus = 'Active';
  Users.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { activestatus: activestatus } }, { returnOriginal: false }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      // res.json({ response: true, message: "User Activated" });
      // <a href="http://localhost:3300"></a>
      res.redirect('http://localhost:4200/account/login');
    }
  });
});

router.post('/getUser', function (req, res, next) {
  let id = req.body.id;
  console.log(id);
  console.log({ _id: new ObjectId(id) })
  Users.findOne({ _id: new ObjectId(id) }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      console.log({ response: true, message: "Data found", details: user })
      res.json({ response: true, message: "Data found", details: user });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});


router.post('/settledinput', function (req, res, next) {
  let type = req.body.type;
  let cunter_party_name = req.body.cunter_party_name;
  let invoice_no = req.body.invoice_no;
  let currency = req.body.currency;
  let amount_in_fc = req.body.amount_in_fc;
  let start_date = req.body.start_date;
  let due_date = req.body.due_date;
  let previous_spot = req.body.previous_spot;
  let previous_premium = req.body.previous_premium;
  let costed_rate = req.body.costed_rate;
  let current_spot = req.body.current_spot;
  let current_premium = req.body.current_premium;
  let current_forwardrate = req.body.current_forwardrate;
  let profit_loss = req.body.profit_loss;
  let settledid = req.body.settledid;
  let userid = req.body.userid;
  let remark = req.body.remark;
  let forwardon_date = req.body.forwardon_date;
   let settledflag = req.body.settledflag;
   let remaingamt = req.body.remaingamt;
    if (type=='Export') {
    Settleddata.findOne({ _id: new ObjectId(settledid) }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: false, message: "Data found" });
    } else {
      var json_ary = {
        type: type,
        cunter_party_name: cunter_party_name,
        invoice_no: invoice_no,
        currency: currency,
        amount_in_fc: amount_in_fc,
        start_date: start_date,
        due_date: due_date,
        previous_spot: previous_spot,
        previous_premium: previous_premium,
        costed_rate: costed_rate,
        current_spot: current_spot,
        current_premium: current_premium,
        current_forwardrate: current_forwardrate,
        profit_loss: profit_loss,
        remark:remark,
        forwardon_date:forwardon_date,
        settledid: settledid,
        userid: userid,
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 'admin',
        updated_by: 'admin',

      }

   if(settledflag==false){

    console.log('false')

     Settleddata.create(json_ary, function (err, docs) {
        if (err) {
          res.json({ response: false, message: err });
        } else {

     Saveexportcalculation.findOneAndUpdate({ _id: new ObjectId(settledid) }, {
      $set: {
      amount_in_fc:remaingamt
    }
  }, { returnOriginal: false }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "Data Inserted" });
    }
  });
 }
      });

   }else{

    console.log('true');

          Settleddata.create(json_ary, function (err, docs) {
        if (err) {
          res.json({ response: false, message: err });
        } else {
               Saveexportcalculation.findOneAndDelete({ _id: new ObjectId(settledid) }, function (err, user) {
            if (err) {
              res.json({ response: false, message: err });
            }
            if (user) {
              res.json({ response: true, message: "Data Inserted" });
            }
          });
        }
      });

   }
   }
  });

  } else {

    Settledimportdata.findOne({ _id: new ObjectId(settledid) }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: false, message: "Data found" });
    } else {
      var json_ary = {
        type: type,
        cunter_party_name: cunter_party_name,
        invoice_no: invoice_no,
        currency: currency,
        amount_in_fc: amount_in_fc,
        start_date: start_date,
        due_date: due_date,
        previous_spot: previous_spot,
        previous_premium: previous_premium,
        costed_rate: costed_rate,
        current_spot: current_spot,
        current_premium: current_premium,
        current_forwardrate: current_forwardrate,
        profit_loss: profit_loss,
        remark:remark,
        forwardon_date:forwardon_date,
        settledid: settledid,
        userid: userid,
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 'admin',
        updated_by: 'admin',

      }



if(settledflag==false){

    console.log('false')

     Settledimportdata.create(json_ary, function (err, docs) {
        if (err) {
          res.json({ response: false, message: err });
        } else {

     Saveimportcalculation.findOneAndUpdate({ _id: new ObjectId(settledid) }, {
      $set: {
      amount_in_fc:remaingamt
    }
  }, { returnOriginal: false }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "Data Inserted" });
    }
  });
 }
      });

   }else{

    console.log('true');

          Settledimportdata.create(json_ary, function (err, docs) {
        if (err) {
          res.json({ response: false, message: err });
        } else {

        Saveimportcalculation.findOneAndDelete({ _id: new ObjectId(settledid) }, function (err, user) {
            if (err) {
              res.json({ response: false, message: err });
            }
            if (user) {
              res.json({ response: true, message: "Data Inserted" });
            }
          });


        }
      });

   }

    }
  });


  }

});


router.post('/settledallinput', function (req, res, next) {
  console.log('in')
  let type = req.body.type;
  let cunter_party_name = req.body.cunter_party_name;
  let invoice_no = req.body.invoice_no;
  let currency = req.body.currency;
  let amount_in_fc = req.body.amount_in_fc;
  let start_date = req.body.start_date;
  let from_date = req.body.from_date;
   let to_date = req.body.to_date;
    let forwardon_date = req.body.forwardon_date;
  let previous_spot = req.body.previous_spot;
  let previous_premium = req.body.previous_premium;
  let booking_rate = req.body.booking_rate;
  let current_forwardrate = req.body.current_forwardrate;
  let edc = req.body.edc;
  let status = req.body.status;
  let profit_loss = req.body.profit_loss;
  let settledid = req.body.settledid;
  let userid = req.body.userid;
  let settledflag = req.body.settledflag;
  let remaingamt = req.body.remaingamt;
  let bank_name = req.body.bank_name;
  let bank_margin = req.body.bank_margin;
  let gain_loss = req.body.gain_loss;
  

  if (type=='PCFC') {
    Settledpcfcdata.findOne({ _id: new ObjectId(settledid) }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: false, message: "Data found" });
    } else {

      var json_ary = {
        type: type,
        cunter_party_name: cunter_party_name,     
        invoice_no: invoice_no,
        currency: currency,
        amount_in_fc: amount_in_fc,
        start_date: start_date,
        from_date: from_date,
        to_date: to_date,
        forwardon_date: forwardon_date,
        previous_spot: previous_spot,
        previous_premium: previous_premium,
        booking_rate: booking_rate,
        current_forwardrate: current_forwardrate,
         edc: edc,
          status: status,
        profit_loss: profit_loss,
        settledid: settledid,
        userid: userid,
         bank_name: bank_name,
          bank_margin: bank_margin,
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 'admin',
        updated_by: 'admin',
      

}

if(settledflag==false){

    console.log('false')

     Settledpcfcdata.create(json_ary, function (err, docs) {
        if (err) {
          res.json({ response: false, message: err });
        } else {

     Savepcfccalculation.findOneAndUpdate({ _id: new ObjectId(settledid) }, {
      $set: {
      amount_in_fc:remaingamt
    }
  }, { returnOriginal: false }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "Data Inserted" });
    }
  });
 }
      });

   }else{

    console.log('true');

          Settledpcfcdata.create(json_ary, function (err, docs) {
        if (err) {
          res.json({ response: false, message: err });
        } else {

        Savepcfccalculation.findOneAndDelete({ _id: new ObjectId(settledid) }, function (err, user) {
            if (err) {
              res.json({ response: false, message: err });
            }
            if (user) {
              res.json({ response: true, message: "Data Inserted" });
            }
          });


        }
      });

   }

     
    }
  });

  } else if(type=='Forex-Buy') {

    Settledforexbuydata.findOne({ _id: new ObjectId(settledid) }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: false, message: "Data found" });
    } else {
       var json_ary = {
        type: type,
        cunter_party_name: cunter_party_name,     
        invoice_no: invoice_no,
        currency: currency,
        amount_in_fc: amount_in_fc,
        start_date: start_date,
        from_date: from_date,
        to_date: to_date,
        forwardon_date: forwardon_date,
        previous_spot: previous_spot,
        previous_premium: previous_premium,
        booking_rate: booking_rate,
        current_forwardrate: current_forwardrate,
         edc: edc,
          status: status,
        profit_loss: profit_loss,
        settledid: settledid,
        userid: userid,
        bank_name: bank_name,
        bank_margin: bank_margin,
        gain_loss: gain_loss,
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 'admin',
        updated_by: 'admin',

      

}


if(settledflag==false){

    console.log('false')

     Settledforexbuydata.create(json_ary, function (err, docs) {
        if (err) {
          res.json({ response: false, message: err });
        } else {

     Saveforexbuycalculation.findOneAndUpdate({ _id: new ObjectId(settledid) }, {
      $set: {
      amount_in_fc:remaingamt
    }
  }, { returnOriginal: false }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "Data Inserted" });
    }
  });
 }
      });

   }else{

    console.log('true');

          Settledforexbuydata.create(json_ary, function (err, docs) {
        if (err) {
          res.json({ response: false, message: err });
        } else {

        Saveforexbuycalculation.findOneAndDelete({ _id: new ObjectId(settledid) }, function (err, user) {
            if (err) {
              res.json({ response: false, message: err });
            }
            if (user) {
              res.json({ response: true, message: "Data Inserted" });
            }
          });


        }
      });

   }


    }
  });


  }else{
     Settledforexselldata.findOne({ _id: new ObjectId(settledid) }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: false, message: "Data found" });
    } else {
      var json_ary = {
        type: type,
        cunter_party_name: cunter_party_name,     
        invoice_no: invoice_no,
        currency: currency,
        amount_in_fc: amount_in_fc,
        start_date: start_date,
        from_date: from_date,
        to_date: to_date,
        forwardon_date: forwardon_date,
        previous_spot: previous_spot,
        previous_premium: previous_premium,
        booking_rate: booking_rate,
        current_forwardrate: current_forwardrate,
         edc: edc,
          status: status,
        profit_loss: profit_loss,
        settledid: settledid,
        userid: userid,
        bank_name: bank_name,
        bank_margin: bank_margin,
        gain_loss: gain_loss,
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 'admin',
        updated_by: 'admin',
}

if(settledflag==false){

    console.log('false')

     Settledforexselldata.create(json_ary, function (err, docs) {
        if (err) {
          res.json({ response: false, message: err });
        } else {

     Saveforexsellcalculation.findOneAndUpdate({ _id: new ObjectId(settledid) }, {
      $set: {
      amount_in_fc:remaingamt
    }
  }, { returnOriginal: false }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "Data Inserted" });
    }
  });
 }
      });

   }else{

    console.log('true');

          Settledforexselldata.create(json_ary, function (err, docs) {
        if (err) {
          res.json({ response: false, message: err });
        } else {

        Saveforexsellcalculation.findOneAndDelete({ _id: new ObjectId(settledid) }, function (err, user) {
            if (err) {
              res.json({ response: false, message: err });
            }
            if (user) {
              res.json({ response: true, message: "Data Inserted" });
            }
          });


        }
      });

   }


    }
  });
}

});




router.post('/getsettleddata', function (req, res, next) {
  let userid = req.body.userid;
    var mymanualArray = [];

  Settleddata.find({ userid: { '$eq': userid } }, async function (err, users) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (users) {
     // res.json({ response: true, message: "Data found", details: users });
     var amount_in_fc_total = 0;
      var profit_loss_total = 0;

       for (var i = 0; i < users.length; i++) {
        // console.log(users[i]);
        amount_in_fc_total += parseFloat(users[i].amount_in_fc);
        profit_loss_total += parseFloat(users[i].profit_loss);
     }
      //   let temp = {}

      //    //********start date******//
      //    let  date = new Date(users[i].start_date);
      //    let year = date.getFullYear();
      //    let month = date.getMonth()+1;
      //    let dt = date.getDate();
      //    if (dt < 10) {
      //     dt = '0' + dt;
      //   }
      //   if (month < 10) {
      //     month = '0' + month;
      //   }
      //   //********start date end******//

      //     //********from date******//
      //     let  fromdate = new Date(users[i].due_date);
      //     let fromyear = fromdate.getFullYear();
      //     let frommonth = fromdate.getMonth()+1;
      //     let fromdt = fromdate.getDate();
      //     if (fromdt < 10) {
      //       fromdt = '0' + fromdt;
      //     }
      //     if (frommonth < 10) {
      //       frommonth = '0' + frommonth;
      //     }
      //   //********from date end******//

      //     //******** forwardon date******//
      //     let  forwardondate = new Date(users[i].forwardon_date);
      //     let forwardonyear = forwardondate.getFullYear();
      //     let forwardonmonth = forwardondate.getMonth()+1;
      //     let forwardondt = forwardondate.getDate();
      //     if (forwardondt < 10) {
      //       forwardondt = '0' + forwardondt;
      //     }
      //     if (forwardonmonth < 10) {
      //       forwardonmonth = '0' + forwardonmonth;
      //     }
      //   //********forwardon date end******//

      //   temp['_id']=users[i]._id;
      //   temp['type']=users[i].type;
      //   temp['invoice_no']=users[i].invoice_no;
      //   temp['currency']=users[i].currency;
      //   temp['cunter_party_name']=users[i].cunter_party_name;
      //   temp['amount_in_fc']=users[i].amount_in_fc;
      //   temp['start_date']=users[i].start_date;
      //   temp['from_date']=users[i].from_date;
      //   temp['forwardon_date']=users[i].forwardon_date;
      //   temp['previous_spot']=users[i].previous_spot;
      //   temp['previous_premium']=users[i].previous_premium;
      //   temp['costed_rate']=users[i].costed_rate;
      //   temp['current_forwardrate']=users[i].current_forwardrate;
      //   temp['profit_loss']=users[i].profit_loss;
      //   temp['userid']=users[i].userid;
      //   temp['myconvertstart']=(dt+'-' + month + '-'+year);
      //   temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
      //   temp['myconvertforwardon']=(forwardondt+'-' + forwardonmonth + '-'+forwardonyear);
      //   mymanualArray.push(temp);
      // }
      // console.log(mymanualArray)


      //     var XLSX = require('xlsx')
      // var Excel = require("exceljs");
      // const workbook = new Excel.Workbook();  // Create a new workbook
      // const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      // const path = "./uploads/settleddata";  // Path to download excel
      // // Column for data in excel. key must match data key
      // worksheet.columns = [
      //   { header: "S no.", key: "s_no" },
      //   { header: "Txn Type", key: "type" },
      //   { header: "Trade ref no.", key: "invoice_no" },
      //   { header: "Currency", key: "currency" },
      //   { header: "Counterparty", key: "cunter_party_name" },
      //   { header: "Open amount", key: "amount_in_fc" },
      //   { header: "Recognition date", key: "myconvertstart" },
      //   { header: "Due date", key: "myconvertfromdate" },
      //   { header: "Forward as on date", key: "forwardon_date" },
      //   { header: "Spot", key: "previous_spot" },
      //   { header: "Premium", key: "previous_premium" },
      //   { header: "Costed Rate", key: "costed_rate" },
      //   { header: "Current forward rate", key: "myconvertforwardon" },
      //   { header: "100% Hedge P&L", key: "profit_loss" },
      // ];
      // // Looping through User data
      // let counter = 1;
      // mymanualArray.forEach((user) => {
      //   user.s_no = counter;
      //   worksheet.addRow(user); // Add data in worksheet
      //   counter++;
      // });
      // // Making first line in excel bold
      // worksheet.getRow(1).eachCell((cell) => {
      //   cell.font = { bold: true };
      // });
      // try {
      //   await workbook.xlsx.writeFile(`${path}/exportsettleddata.xlsx`)
      //     .then(() => {
      //       console.log("Success");
      //       //res.json({ response: true, message: message, data: users });
      //     });
      // } catch (err) {
      //   console.log("Error");
      //   //res.json({ response: false, message: "Something went wrong" });
      // }
       let obj = {'users':users,'amount_in_fc_total':amount_in_fc_total,'profit_loss_total':profit_loss_total}
       res.json({ response: true, message: "Data found", details: obj });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});



router.post('/getimportsettleddata', function (req, res, next) {
  let userid = req.body.userid;
    var mymanualArray = [];

  Settledimportdata.find({ userid: { '$eq': userid } }, async function (err, users) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (users) {
     // res.json({ response: true, message: "Data found", details: users });
     var amount_in_fc_total = 0;
      var profit_loss_total = 0;

       for (var i = 0; i < users.length; i++) {
        // console.log(users[i]);
        amount_in_fc_total += parseFloat(users[i].amount_in_fc);
        profit_loss_total += parseFloat(users[i].profit_loss);
      }

      //   let temp = {}

      //    //********start date******//
      //    let  date = new Date(users[i].start_date);
      //    let year = date.getFullYear();
      //    let month = date.getMonth()+1;
      //    let dt = date.getDate();
      //    if (dt < 10) {
      //     dt = '0' + dt;
      //   }
      //   if (month < 10) {
      //     month = '0' + month;
      //   }
      //   //********start date end******//

      //     //********from date******//
      //     let  fromdate = new Date(users[i].due_date);
      //     let fromyear = fromdate.getFullYear();
      //     let frommonth = fromdate.getMonth()+1;
      //     let fromdt = fromdate.getDate();
      //     if (fromdt < 10) {
      //       fromdt = '0' + fromdt;
      //     }
      //     if (frommonth < 10) {
      //       frommonth = '0' + frommonth;
      //     }
      //   //********from date end******//

      //     //******** forwardon date******//
      //     let  forwardondate = new Date(users[i].forwardon_date);
      //     let forwardonyear = forwardondate.getFullYear();
      //     let forwardonmonth = forwardondate.getMonth()+1;
      //     let forwardondt = forwardondate.getDate();
      //     if (forwardondt < 10) {
      //       forwardondt = '0' + forwardondt;
      //     }
      //     if (forwardonmonth < 10) {
      //       forwardonmonth = '0' + forwardonmonth;
      //     }
      //   //********forwardon date end******//

      //   temp['_id']=users[i]._id;
      //   temp['type']=users[i].type;
      //   temp['invoice_no']=users[i].invoice_no;
      //   temp['currency']=users[i].currency;
      //   temp['cunter_party_name']=users[i].cunter_party_name;
      //   temp['amount_in_fc']=users[i].amount_in_fc;
      //   temp['start_date']=users[i].start_date;
      //   temp['from_date']=users[i].from_date;
      //   temp['forwardon_date']=users[i].forwardon_date;
      //   temp['previous_spot']=users[i].previous_spot;
      //   temp['previous_premium']=users[i].previous_premium;
      //   temp['costed_rate']=users[i].costed_rate;
      //   temp['current_forwardrate']=users[i].current_forwardrate;
      //   temp['profit_loss']=users[i].profit_loss;
      //   temp['userid']=users[i].userid;
      //   temp['myconvertstart']=(dt+'-' + month + '-'+year);
      //   temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
      //   temp['myconvertforwardon']=(forwardondt+'-' + forwardonmonth + '-'+forwardonyear);
      //   mymanualArray.push(temp);
      // }
      // console.log(mymanualArray)


      //     var XLSX = require('xlsx')
      // var Excel = require("exceljs");
      // const workbook = new Excel.Workbook();  // Create a new workbook
      // const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      // const path = "./uploads/settleddata";  // Path to download excel
      // // Column for data in excel. key must match data key
      // worksheet.columns = [
      //   { header: "S no.", key: "s_no" },
      //   { header: "Txn Type", key: "type" },
      //   { header: "Trade ref no.", key: "invoice_no" },
      //   { header: "Currency", key: "currency" },
      //   { header: "Counterparty", key: "cunter_party_name" },
      //   { header: "Open amount", key: "amount_in_fc" },
      //   { header: "Recognition date", key: "myconvertstart" },
      //   { header: "Due date", key: "myconvertfromdate" },
      //   { header: "Forward as on date", key: "forwardon_date" },
      //   { header: "Spot", key: "previous_spot" },
      //   { header: "Premium", key: "previous_premium" },
      //   { header: "Costed Rate", key: "costed_rate" },
      //   { header: "Current forward rate", key: "myconvertforwardon" },
      //   { header: "100% Hedge P&L", key: "profit_loss" },
      // ];
      // // Looping through User data
      // let counter = 1;
      // mymanualArray.forEach((user) => {
      //   user.s_no = counter;
      //   worksheet.addRow(user); // Add data in worksheet
      //   counter++;
      // });
      // // Making first line in excel bold
      // worksheet.getRow(1).eachCell((cell) => {
      //   cell.font = { bold: true };
      // });
      // try {
      //   await workbook.xlsx.writeFile(`${path}/importsettleddata.xlsx`)
      //     .then(() => {
      //       console.log("Success");
      //       //res.json({ response: true, message: message, data: users });
      //     });
      // } catch (err) {
      //   console.log("Error");
      //   //res.json({ response: false, message: "Something went wrong" });
      // }
       let obj = {'users':users,'amount_in_fc_total':amount_in_fc_total,'profit_loss_total':profit_loss_total}
       res.json({ response: true, message: "Data found", details: obj });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});

router.post('/getpcfcsettleddata', function (req, res, next) {
  let userid = req.body.userid;
 var mymanualArray = [];

  Settledpcfcdata.find({ userid: { '$eq': userid } },async function (err, users) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (users) {
       var amount_in_fc_total = 0;
       var profit_loss_total = 0;
      for (var i = 0; i < users.length; i++) {
         amount_in_fc_total += parseFloat(users[i].amount_in_fc);
         profit_loss_total += parseFloat(users[i].profit_loss);
        // console.log(users[i]);
      }
      //   let temp = {}

      //    //********start date******//
      //    let  date = new Date(users[i].start_date);
      //    let year = date.getFullYear();
      //    let month = date.getMonth()+1;
      //    let dt = date.getDate();
      //    if (dt < 10) {
      //     dt = '0' + dt;
      //   }
      //   if (month < 10) {
      //     month = '0' + month;
      //   }
      //   //********start date end******//

      //     //********from date******//
      //     let  fromdate = new Date(users[i].from_date);
      //     let fromyear = fromdate.getFullYear();
      //     let frommonth = fromdate.getMonth()+1;
      //     let fromdt = fromdate.getDate();
      //     if (fromdt < 10) {
      //       fromdt = '0' + fromdt;
      //     }
      //     if (frommonth < 10) {
      //       frommonth = '0' + frommonth;
      //     }
      //   //********from date end******//
      //     //********to date******//
      //     let  todate = new Date(users[i].to_date);
      //     let toyear = todate.getFullYear();
      //     let tomonth = todate.getMonth()+1;
      //     let todt = todate.getDate();
      //     if (todt < 10) {
      //       todt = '0' + todt;
      //     }
      //     if (tomonth < 10) {
      //       tomonth = '0' + tomonth;
      //     }
      //   //********to date end******//

      //     //******** forwardon date******//
      //     let  forwardondate = new Date(users[i].forwardon_date);
      //     let forwardonyear = forwardondate.getFullYear();
      //     let forwardonmonth = forwardondate.getMonth()+1;
      //     let forwardondt = forwardondate.getDate();
      //     if (forwardondt < 10) {
      //       forwardondt = '0' + forwardondt;
      //     }
      //     if (forwardonmonth < 10) {
      //       forwardonmonth = '0' + forwardonmonth;
      //     }
      //   //********forwardon date end******//

      //   temp['_id']=users[i]._id;
      //   temp['type']=users[i].type;
      //   temp['cunter_party_name']=users[i].cunter_party_name;
      //   temp['bank_name']=users[i].bank_name;
      //   temp['currency']=users[i].currency;
      //   temp['amount_in_fc']=users[i].amount_in_fc;
      //   temp['start_date']=users[i].start_date;
      //   temp['from_date']=users[i].from_date;
      //   temp['to_date']=users[i].to_date;
      //   temp['forwardon_date']=users[i].forwardon_date;
      //   temp['previous_spot']=users[i].previous_spot;
      //   temp['previous_premium']=users[i].previous_premium;
      //   temp['booking_rate']=users[i].booking_rate;
      //   temp['current_forwardrate']=users[i].current_forwardrate;
      //   temp['edc']=users[i].edc;
      //   temp['status']=users[i].status;
      //   temp['profit_loss']=users[i].profit_loss;
      //   temp['settledid']=users[i].settledid;
      //   temp['userid']=users[i].userid;
      //   temp['created_at']=users[i].created_at;
      //   temp['updated_at']=users[i].updated_at;
      //   temp['created_by']=users[i].created_by;
      //   temp['updated_by']=users[i].updated_by;
      //   temp['myconvertstart']=(dt+'-' + month + '-'+year);
      //   temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
      //   temp['myconverttodate']=(todt+'-' + tomonth + '-'+toyear);
      //   temp['myconvertforwardon']=(forwardondt+'-' + forwardonmonth + '-'+forwardonyear);
      //   mymanualArray.push(temp);
      // }

      //   var XLSX = require('xlsx')
      // var Excel = require("exceljs");
      // const workbook = new Excel.Workbook();  // Create a new workbook
      // const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      // const path = "./uploads/settleddata";  // Path to download excel
      // // Column for data in excel. key must match data key
      // worksheet.columns = [
      //   { header: "S no.", key: "s_no" },
      //   { header: "Txn Type", key: "type" },
      //   // { header: "Trade ref no.", key: "invoice_no" },
      //   { header: "Currency", key: "currency" },
      //   { header: "Counterparty", key: "cunter_party_name" },
      //    { header: "Bank Name", key: "bank_name" },
      //   { header: "Open amount", key: "amount_in_fc" },
      //   { header: "Start date", key: "myconvertstart" },
      //   { header: "From date", key: "myconvertfromdate" },
      //   { header: "To date", key: "myconverttodate" },
      //   { header: "Forward as on date", key: "myconvertforwardon" },
      //   { header: "Spot", key: "previous_spot" },
      //   { header: "Premium", key: "previous_premium" },
      //   { header: "Bookking Rate", key: "booking_rate" },
      //   { header: "Current forward rate", key: "current_forwardrate" },
      //   { header: "EDC", key: "edc" },
      //   { header: "Status", key: "status" },
      //   { header: "100% Hedge P&L", key: "profit_loss" },
       
      // ];
      // // Looping through User data
      // let counter = 1;
      // mymanualArray.forEach((user) => {
      //   user.s_no = counter;
      //   worksheet.addRow(user); // Add data in worksheet
      //   counter++;
      // });
      // // Making first line in excel bold
      // worksheet.getRow(1).eachCell((cell) => {
      //   cell.font = { bold: true };
      // });
      // try {
      //   await workbook.xlsx.writeFile(`${path}/pcfcsettleddata.xlsx`)
      //     .then(() => {
      //       console.log("Success");
      //       //res.json({ response: true, message: message, data: users });
      //     });
      // } catch (err) {
      //   console.log("Error");
      //   //res.json({ response: false, message: "Something went wrong" });
      // }
        
      let obj={"users":users,"amount_in_fc_total":amount_in_fc_total,"profit_loss_total":profit_loss_total}
      res.json({ response: true, message: "Data found", details: obj });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});


router.post('/getforexbuysettleddata', function (req, res, next) {
  let userid = req.body.userid;
 var mymanualArray = [];

  Settledforexbuydata.find({ userid: { '$eq': userid } },async function (err, users) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (users) {
       var amount_in_fc_total = 0;
        var gain_loss_total = 0;
      var profit_loss_total = 0;

      

      for (var i = 0; i < users.length; i++) {
         amount_in_fc_total += parseFloat(users[i].amount_in_fc);
       if (users[i].gain_loss !="") {
         gain_loss_total += parseFloat(users[i].gain_loss);
       }
      // profit_loss_total += parseFloat(users[i].profit_loss);
        if (users[i].status=='Cancelled') {
          profit_loss_total += parseFloat(users[i].profit_loss);
       }

     }
        // console.log(users[i]);
      //   let temp = {}

      //    //********start date******//
      //    let  date = new Date(users[i].start_date);
      //    let year = date.getFullYear();
      //    let month = date.getMonth()+1;
      //    let dt = date.getDate();
      //    if (dt < 10) {
      //     dt = '0' + dt;
      //   }
      //   if (month < 10) {
      //     month = '0' + month;
      //   }
      //   //********start date end******//

      //     //********from date******//
      //     let  fromdate = new Date(users[i].from_date);
      //     let fromyear = fromdate.getFullYear();
      //     let frommonth = fromdate.getMonth()+1;
      //     let fromdt = fromdate.getDate();
      //     if (fromdt < 10) {
      //       fromdt = '0' + fromdt;
      //     }
      //     if (frommonth < 10) {
      //       frommonth = '0' + frommonth;
      //     }
      //   //********from date end******//
      //     //********to date******//
      //     let  todate = new Date(users[i].to_date);
      //     let toyear = todate.getFullYear();
      //     let tomonth = todate.getMonth()+1;
      //     let todt = todate.getDate();
      //     if (todt < 10) {
      //       todt = '0' + todt;
      //     }
      //     if (tomonth < 10) {
      //       tomonth = '0' + tomonth;
      //     }
      //   //********to date end******//

      //     //******** forwardon date******//
      //     let  forwardondate = new Date(users[i].forwardon_date);
      //     let forwardonyear = forwardondate.getFullYear();
      //     let forwardonmonth = forwardondate.getMonth()+1;
      //     let forwardondt = forwardondate.getDate();
      //     if (forwardondt < 10) {
      //       forwardondt = '0' + forwardondt;
      //     }
      //     if (forwardonmonth < 10) {
      //       forwardonmonth = '0' + forwardonmonth;
      //     }
      //   //********forwardon date end******//

      //   temp['_id']=users[i]._id;
      //   temp['type']=users[i].type;
      //   temp['cunter_party_name']=users[i].cunter_party_name;
      //   temp['bank_name']=users[i].bank_name;
      //   temp['currency']=users[i].currency;
      //   temp['amount_in_fc']=users[i].amount_in_fc;
      //   temp['start_date']=users[i].start_date;
      //   temp['from_date']=users[i].from_date;
      //   temp['to_date']=users[i].to_date;
      //   temp['forwardon_date']=users[i].forwardon_date;
      //   temp['previous_spot']=users[i].previous_spot;
      //   temp['previous_premium']=users[i].previous_premium;
      //   temp['booking_rate']=users[i].booking_rate;
      //   temp['current_forwardrate']=users[i].current_forwardrate;
      //   temp['edc']=users[i].edc;
      //   temp['status']=users[i].status;
      //   temp['profit_loss']=users[i].profit_loss;
      //   temp['gain_loss']=users[i].gain_loss;
      //   temp['settledid']=users[i].settledid;
      //   temp['userid']=users[i].userid;
      //   temp['created_at']=users[i].created_at;
      //   temp['updated_at']=users[i].updated_at;
      //   temp['created_by']=users[i].created_by;
      //   temp['updated_by']=users[i].updated_by;
      //   temp['myconvertstart']=(dt+'-' + month + '-'+year);
      //   temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
      //   temp['myconverttodate']=(todt+'-' + tomonth + '-'+toyear);
      //   temp['myconvertforwardon']=(forwardondt+'-' + forwardonmonth + '-'+forwardonyear);
      //   mymanualArray.push(temp);
      // }

      //   var XLSX = require('xlsx')
      // var Excel = require("exceljs");
      // const workbook = new Excel.Workbook();  // Create a new workbook
      // const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      // const path = "./uploads/settleddata";  // Path to download excel
      // // Column for data in excel. key must match data key
      // worksheet.columns = [
      //   { header: "S no.", key: "s_no" },
      //   { header: "Txn Type", key: "type" },
      //   // { header: "Trade ref no.", key: "invoice_no" },
      //   { header: "Currency", key: "currency" },
      //   { header: "Counterparty", key: "cunter_party_name" },
      //    { header: "Bank Name", key: "bank_name" },
      //   { header: "Open amount", key: "amount_in_fc" },
      //   { header: "Start date", key: "myconvertstart" },
      //   { header: "From date", key: "myconvertfromdate" },
      //   { header: "To date", key: "myconverttodate" },
      //   { header: "Forward as on date", key: "myconvertforwardon" },
      //   { header: "Spot", key: "previous_spot" },
      //   { header: "Premium", key: "previous_premium" },
      //   { header: "Bookking Rate", key: "booking_rate" },
      //   { header: "Current forward rate", key: "current_forwardrate" },
      //   { header: "EDC", key: "edc" },
      //   { header: "Status", key: "status" },
      //   { header: "100% Hedge P&L", key: "profit_loss" },
      //   { header: "Gain/Loss", key: "gain_loss" },
      // ];
      // // Looping through User data
      // let counter = 1;
      // mymanualArray.forEach((user) => {
      //   user.s_no = counter;
      //   worksheet.addRow(user); // Add data in worksheet
      //   counter++;
      // });
      // // Making first line in excel bold
      // worksheet.getRow(1).eachCell((cell) => {
      //   cell.font = { bold: true };
      // });
      // try {
      //   await workbook.xlsx.writeFile(`${path}/forexbuysettleddata.xlsx`)
      //     .then(() => {
      //       console.log("Success");
      //       //res.json({ response: true, message: message, data: users });
      //     });
      // } catch (err) {
      //   console.log("Error");
      //   //res.json({ response: false, message: "Something went wrong" });
      // }
        
      let obj={"users":users,"amount_in_fc_total":amount_in_fc_total,"gain_loss_total":gain_loss_total,"profit_loss_total":profit_loss_total}
      res.json({ response: true, message: "Data found", details: obj });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});

router.post('/getforexsellsettleddata', function (req, res, next) {
  let userid = req.body.userid;
 var mymanualArray = [];

  Settledforexselldata.find({ userid: { '$eq': userid } },async function (err, users) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (users) {
       var amount_in_fc_total = 0;
        var gain_loss_total = 0;
       var profit_loss_total = 0;

      

      for (var i = 0; i < users.length; i++) {
         amount_in_fc_total += parseFloat(users[i].amount_in_fc);
       if (users[i].gain_loss !="") {
         gain_loss_total += parseFloat(users[i].gain_loss);
       }

       if (users[i].status=='Cancelled') {
          profit_loss_total += parseFloat(users[i].profit_loss);
       }

     }
     
        // console.log(users[i]);
      //   let temp = {}

      //    //********start date******//
      //    let  date = new Date(users[i].start_date);
      //    let year = date.getFullYear();
      //    let month = date.getMonth()+1;
      //    let dt = date.getDate();
      //    if (dt < 10) {
      //     dt = '0' + dt;
      //   }
      //   if (month < 10) {
      //     month = '0' + month;
      //   }
      //   //********start date end******//

      //     //********from date******//
      //     let  fromdate = new Date(users[i].from_date);
      //     let fromyear = fromdate.getFullYear();
      //     let frommonth = fromdate.getMonth()+1;
      //     let fromdt = fromdate.getDate();
      //     if (fromdt < 10) {
      //       fromdt = '0' + fromdt;
      //     }
      //     if (frommonth < 10) {
      //       frommonth = '0' + frommonth;
      //     }
      //   //********from date end******//
      //     //********to date******//
      //     let  todate = new Date(users[i].to_date);
      //     let toyear = todate.getFullYear();
      //     let tomonth = todate.getMonth()+1;
      //     let todt = todate.getDate();
      //     if (todt < 10) {
      //       todt = '0' + todt;
      //     }
      //     if (tomonth < 10) {
      //       tomonth = '0' + tomonth;
      //     }
      //   //********to date end******//

      //     //******** forwardon date******//
      //     let  forwardondate = new Date(users[i].forwardon_date);
      //     let forwardonyear = forwardondate.getFullYear();
      //     let forwardonmonth = forwardondate.getMonth()+1;
      //     let forwardondt = forwardondate.getDate();
      //     if (forwardondt < 10) {
      //       forwardondt = '0' + forwardondt;
      //     }
      //     if (forwardonmonth < 10) {
      //       forwardonmonth = '0' + forwardonmonth;
      //     }
      //   //********forwardon date end******//

      //   temp['_id']=users[i]._id;
      //   temp['type']=users[i].type;
      //   temp['cunter_party_name']=users[i].cunter_party_name;
      //   temp['bank_name']=users[i].bank_name;
      //   temp['currency']=users[i].currency;
      //   temp['amount_in_fc']=users[i].amount_in_fc;
      //   temp['start_date']=users[i].start_date;
      //   temp['from_date']=users[i].from_date;
      //   temp['to_date']=users[i].to_date;
      //   temp['forwardon_date']=users[i].forwardon_date;
      //   temp['previous_spot']=users[i].previous_spot;
      //   temp['previous_premium']=users[i].previous_premium;
      //   temp['booking_rate']=users[i].booking_rate;
      //   temp['current_forwardrate']=users[i].current_forwardrate;
      //   temp['edc']=users[i].edc;
      //   temp['status']=users[i].status;
      //   temp['profit_loss']=users[i].profit_loss;
      //   temp['gain_loss']=users[i].gain_loss;
      //   temp['settledid']=users[i].settledid;
      //   temp['userid']=users[i].userid;
      //   temp['created_at']=users[i].created_at;
      //   temp['updated_at']=users[i].updated_at;
      //   temp['created_by']=users[i].created_by;
      //   temp['updated_by']=users[i].updated_by;
      //   temp['myconvertstart']=(dt+'-' + month + '-'+year);
      //   temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
      //   temp['myconverttodate']=(todt+'-' + tomonth + '-'+toyear);
      //   temp['myconvertforwardon']=(forwardondt+'-' + forwardonmonth + '-'+forwardonyear);
      //   mymanualArray.push(temp);
      // }

      //   var XLSX = require('xlsx')
      // var Excel = require("exceljs");
      // const workbook = new Excel.Workbook();  // Create a new workbook
      // const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      // const path = "./uploads/settleddata";  // Path to download excel
      // // Column for data in excel. key must match data key
      // worksheet.columns = [
      //   { header: "S no.", key: "s_no" },
      //   { header: "Txn Type", key: "type" },
      //   // { header: "Trade ref no.", key: "invoice_no" },
      //   { header: "Currency", key: "currency" },
      //   { header: "Counterparty", key: "cunter_party_name" },
      //    { header: "Bank Name", key: "bank_name" },
      //   { header: "Open amount", key: "amount_in_fc" },
      //   { header: "Start date", key: "myconvertstart" },
      //   { header: "From date", key: "myconvertfromdate" },
      //   { header: "To date", key: "myconverttodate" },
      //   { header: "Forward as on date", key: "myconvertforwardon" },
      //   { header: "Spot", key: "previous_spot" },
      //   { header: "Premium", key: "previous_premium" },
      //   { header: "Bookking Rate", key: "booking_rate" },
      //   { header: "Current forward rate", key: "current_forwardrate" },
      //   { header: "EDC", key: "edc" },
      //   { header: "Status", key: "status" },
      //   { header: "100% Hedge P&L", key: "profit_loss" },
      //   { header: "Gain/Loss", key: "gain_loss" },
      // ];
      // // Looping through User data
      // let counter = 1;
      // mymanualArray.forEach((user) => {
      //   user.s_no = counter;
      //   worksheet.addRow(user); // Add data in worksheet
      //   counter++;
      // });
      // // Making first line in excel bold
      // worksheet.getRow(1).eachCell((cell) => {
      //   cell.font = { bold: true };
      // });
      // try {
      //   await workbook.xlsx.writeFile(`${path}/forexsellsettleddata.xlsx`)
      //     .then(() => {
      //       console.log("Success");
      //       //res.json({ response: true, message: message, data: users });
      //     });
      // } catch (err) {
      //   console.log("Error");
      //   //res.json({ response: false, message: "Something went wrong" });
      // }
        
      let obj={"users":users,"amount_in_fc_total":amount_in_fc_total,"gain_loss_total":gain_loss_total,"profit_loss_total":profit_loss_total}
      res.json({ response: true, message: "Data found", details: obj });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});


router.post('/upload_importexcel', upload.single('file'), function (req, res) {
  // var wb = new Excel.Workbook();
  var filename = "";
  var userid = "";
  if (req.file) {
    filename = req.file.filename;
    userid = req.body.userid;
    console.log('userid', req.body.userid);
  }


  var filePath = path.resolve(DIR + "/" + filename);


  var XLSX = require('xlsx')
  var workbook = XLSX.readFile(filePath);
  var sheet_name_list = workbook.SheetNames;
  var Excel = require("exceljs");
  var workbook = new Excel.Workbook();
  var cnt = 1;
  var json_ary = [];
  ///var batch_id = String(Math.floor(Math.random() * 100) + 2 + "" + new Date().getTime());
  workbook.xlsx.readFile(filePath).then(function () {
    var worksheet = workbook.getWorksheet(sheet_name_list[0]);
    worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
      currRow = worksheet.getRow(rowNumber);
      if (cnt > 1 && currRow.getCell(1).value  && currRow.getCell(5).value && currRow.getCell(6).value && currRow.getCell(7).value && currRow.getCell(8).value) {

        var type = "";
        var reference_no = "";
        var cunter_party_name = "";
        var invoice_no = "";
        var currency = "";
        var amount_in_fc = "";
        var start_date = "";
        var due_date = "";
        var bank_name = "";
      

        type = currRow.getCell(1).value;
        reference_no = currRow.getCell(2).value;
        cunter_party_name = currRow.getCell(3).value;
        invoice_no = currRow.getCell(4).value;
        currency = currRow.getCell(5).value;
        amount_in_fc = currRow.getCell(6).value;
        start_date = currRow.getCell(7).value;
        due_date = currRow.getCell(8).value;
        bank_name = (currRow.getCell(9).value);
     
        if (type) {
          type = type.toString();
          type = type.trim();
        }
         if (reference_no) {
          reference_no = reference_no.toString();
          reference_no = reference_no.trim();
        }
        if (cunter_party_name) {
          cunter_party_name = cunter_party_name.toString();
          cunter_party_name = cunter_party_name.trim();
        }
        if (invoice_no) {
          invoice_no = invoice_no.toString();
          invoice_no = invoice_no.trim();
        }
        if (currency) {
          currency = currency.toString();
          currency = currency.trim();
        }
        if (amount_in_fc) {
          amount_in_fc = amount_in_fc.toString();
          amount_in_fc = amount_in_fc.trim();
        }
        if (start_date) {
          start_date = start_date.toString();
          start_date = start_date.trim();
        }
        if (due_date) {
          due_date = due_date.toString();
          due_date = due_date.trim();
        }
        if (bank_name) {
          bank_name = bank_name.toString();
          bank_name = bank_name.trim();
        }
      

        // if (userid) {

        json_ary.push({
          userid: (userid),
          type: (type),
          reference_no: reference_no,
          cunter_party_name: cunter_party_name,
          invoice_no: (invoice_no),
          currency: (currency),
          amount_in_fc: amount_in_fc,
          start_date: start_date,
          due_date: due_date,
          bank_name: bank_name,
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 'admin',
          updated_by: 'admin',
        });


        // }
      }
      cnt++;
    });

    Importinputexcel.collection.insertMany(json_ary, function (err, docs) {
      if (err) {
        //return console.error(err);
        res.json({ response: false, message: "Excel not uploaded" });
      } else {
        res.json({ response: true, message: "Excel has been successfully uploaded", filepath: filePath, count: json_ary.length });
      }
    });
  });

})


router.post('/manualinsert_importdata', function (req, res, next) {
         let userid = req.body.userid ;
         let type = req.body.type;
        let cunter_party_name = req.body.cunter_party_name;
         let invoice_no = req.body.invoice_no;
        let  currency = req.body.currency;
         let amount_in_fc = req.body.amount_in_fc.trim();
         let start_date = req.body.start_date;
        let  due_date = req.body.due_date;
        let  bank_name = req.body.bank_name;
        
         var json_ary = {
          userid: userid,
          type: type,
          cunter_party_name: cunter_party_name,
          invoice_no: invoice_no,
          currency: currency,
          amount_in_fc: amount_in_fc,
          start_date: start_date,
          due_date: due_date,
          bank_name: bank_name,
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 'admin',
          updated_by: 'admin',

      }
      Importinputexcel.create(json_ary, function (err, docs) {
        if (err) {
          res.json({ response: false, message: err });
        } else {
          res.json({ response: true, message: "Data Inserted", docs: docs });
         



        }
      });


  
});


router.post('/manualinsert_exportdata', function (req, res, next) {
         let userid = req.body.userid ;
         let type = req.body.type;
        let cunter_party_name = req.body.cunter_party_name;
         let invoice_no = req.body.invoice_no;
        let  currency = req.body.currency;
         let amount_in_fc = req.body.amount_in_fc.trim();
         let start_date = req.body.start_date;
        let  due_date = req.body.due_date;
        let  bank_name = req.body.bank_name;

         var json_ary = {
          userid: userid,
          type: type,
          cunter_party_name: cunter_party_name,
          invoice_no: invoice_no,
          currency: currency,
          amount_in_fc: amount_in_fc,
          start_date: start_date,
          due_date: due_date,
          bank_name: bank_name,
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 'admin',
          updated_by: 'admin',

      }
      Exportinputexcel.create(json_ary, function (err, docs) {
        if (err) {
          res.json({ response: false, message: err });
        } else {
          res.json({ response: true, message: "Data Inserted", docs: docs });
         



        }
      });


  
});

router.post('/manualinsert_pcfcdata', function (req, res, next) {
          let userid = req.body.userid ;
          let type = req.body.type;
          let company_name = req.body.company_name;
          let invoice_no = req.body.invoice_no;
          let  currency = req.body.currency;
          let amount_in_fc = req.body.amount_in_fc.trim();
          let start_date = req.body.start_date;
          let  from_date = req.body.from_date;
          let  to_date = req.body.to_date;
          let  bank_name = req.body.bank_name;
          let  spot = req.body.spot;
          let  premium = req.body.premium;
          let  bank_margin = req.body.bank_margin;

         var json_ary = {
          userid: userid,
          type: type,
          company_name: company_name,
          invoice_no: invoice_no,
          currency: currency,
          amount_in_fc: amount_in_fc,
          start_date: start_date,
          from_date: from_date,
          to_date: to_date,
          bank_name: bank_name,
          spot: spot,
          premium: premium,
          bank_margin: bank_margin,
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 'admin',
          updated_by: 'admin',

      }
       Pcfcexcel.create(json_ary, function (err, docs) {
        if (err) {
          res.json({ response: false, message: err });
        } else {
          res.json({ response: true, message: "Data Inserted", docs: docs });
          }
      });
  });


router.post('/manualinsert_forexbuydata', function (req, res, next) {
          let userid = req.body.userid ;
          let type = req.body.type;
          let company_name = req.body.company_name;
          let invoice_no = req.body.invoice_no;
          let  currency = req.body.currency;
          let amount_in_fc = req.body.amount_in_fc.trim();
          let start_date = req.body.start_date;
          let  from_date = req.body.from_date;
          let  to_date = req.body.to_date;
          let  bank_name = req.body.bank_name;
          let  spot = req.body.spot;
          let  premium = req.body.premium;
          let  bank_margin = req.body.bank_margin;

        
        var json_ary = {
          userid: userid,
          type: type,
          company_name: company_name,
          invoice_no: invoice_no,
          currency: currency,
          amount_in_fc: amount_in_fc,
          start_date: start_date,
          from_date: from_date,
          to_date: to_date,
          bank_name: bank_name,
          spot: spot,
          premium: premium,
          bank_margin: bank_margin,
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 'admin',
          updated_by: 'admin',

      }


      Forexbuyexcel.create(json_ary, function (err, docs) {
        if (err) {
          res.json({ response: false, message: err });
        } else {
          res.json({ response: true, message: "Data Inserted", docs: docs });
         



        }
      });


  
});


router.post('/manualinsert_forexselldata', function (req, res, next) {
            let userid = req.body.userid ;
            let type = req.body.type;
            let company_name = req.body.company_name;
            let invoice_no = req.body.invoice_no;
            let  currency = req.body.currency;
            let amount_in_fc = req.body.amount_in_fc.trim();
            let start_date = req.body.start_date;
            let  from_date = req.body.from_date;
            let  to_date = req.body.to_date;
            let  bank_name = req.body.bank_name;
            let  spot = req.body.spot;
            let  premium = req.body.premium;
            let  bank_margin = req.body.bank_margin;
        var json_ary = {
          userid: userid,
          type: type,
          company_name: company_name,
          invoice_no: invoice_no,
          currency: currency,
          amount_in_fc: amount_in_fc,
          start_date: start_date,
          from_date: from_date,
          to_date: to_date,
          bank_name: bank_name,
          spot: spot,
          premium: premium,
          bank_margin: bank_margin,
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 'admin',
          updated_by: 'admin',

      }


      Forexsellexcel.create(json_ary, function (err, docs) {
        if (err) {
          res.json({ response: false, message: err });
        } else {
          res.json({ response: true, message: "Data Inserted", docs: docs });
         



        }
      });


  
});


router.post('/saveimportcalculation', function (req, res, next) {
  console.log('in')
  let type = req.body.type;
  let invoice_no = req.body.invoice_no;
  let currency = req.body.currency;
  let cunter_party_name = req.body.cunter_party_name;
  let amount_in_fc = req.body.amount_in_fc;
  let start_date = req.body.start_date;
  let due_date = req.body.due_date;
  let forwardon_date = req.body.forwardon_date;
  let costing_spot = req.body.costing_spot;
  let costing_premium = req.body.costing_premium;
  let costed_rate = req.body.costed_rate;
  let mtm_spot = req.body.mtm_spot;
  let mtm_premium = req.body.mtm_premium;
  let current_forwardrate = req.body.current_forwardrate;
  let profit_loss = req.body.profit_loss;
  let savecalcualtionid = req.body.savecalcualtionid;
  let userid = req.body.userid;

  Saveimportcalculation.findOne({ _id: new ObjectId(savecalcualtionid) }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: false, message: "Data found" });
    } else {

      var json_ary = {
        type: type,
         invoice_no: invoice_no,
          currency: currency,
         cunter_party_name: cunter_party_name,     
        amount_in_fc: amount_in_fc,
        start_date: start_date,
        due_date: due_date,
        forwardon_date: forwardon_date,
        costing_spot: costing_spot,
        costing_premium: costing_premium,
        costed_rate: costed_rate,
          mtm_spot: mtm_spot,
        mtm_premium: mtm_premium,
         current_forwardrate: current_forwardrate,
        profit_loss: profit_loss,
        savecalcualtionid: savecalcualtionid,
        userid: userid,
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 'admin',
        updated_by: 'admin',

}

   Saveimportcalculation.create(json_ary, function (err, docs) {
        if (err) {
          res.json({ response: false, message: err });
        } else {
            Importinputexcel.findOneAndDelete({ _id: new ObjectId(savecalcualtionid) }, function (err, user) {
            if (err) {
              res.json({ response: false, message: err });
            }
            if (user) {
              res.json({ response: true, message: "Data Inserted" });
            }
          });
      



        }
      });
    }
  });

  });





 router.post('/getimportcalculation_data', function (req, res, next) {
  let userid = req.body.userid;


  Saveimportcalculation.find({ userid: { '$eq': userid } },async function (err, users) {
    if (err) {
      res.json({ response: false, message: err });
    }
    var temp1 = []
    if (users) {
      for (var i = 0; i < users.length; i++) {
       var temp = {};
       
      //***********start Date convert*********//
          
         var mycovertstartate = new Date(users[i].start_date);
        console.log(mycovertstartate)
        var  startday = mycovertstartate.getDate();        
        var  startmonth = mycovertstartate.getMonth();     
        var startyear = mycovertstartate.getFullYear();
        const startnewdate = new Date(Date.UTC(startyear, startmonth, startday))
        const resultstart = startnewdate.toISOString().split('T')[0]
        console.log(resultstart) 
        var myresultsplitresultstart = resultstart.split('-');
        console.log(myresultsplitresultstart)
        var startfinal=myresultsplitresultstart[2]+"-"+myresultsplitresultstart[1]+"-"+myresultsplitresultstart[0];
        console.log('startfinal',startfinal)

       //***********start Date convert end*********//


         //***********Due Date convert*********//
          
         var mycovertduedate = new Date(users[i].due_date);
        console.log(mycovertduedate)
        var  dueday = mycovertduedate.getDate();        
        var  duemonth = mycovertduedate.getMonth();     
        var dueyear = mycovertduedate.getFullYear();
        const duenewdate = new Date(Date.UTC(dueyear, duemonth, dueday))
        const resultdue = duenewdate.toISOString().split('T')[0]
        console.log(resultdue) 
        var myresultsplitresultdue = resultdue.split('-');
        console.log(myresultsplitresultdue)
        var duefinal=myresultsplitresultdue[2]+"-"+myresultsplitresultdue[1]+"-"+myresultsplitresultdue[0];
        console.log('duefinal',duefinal)
        
       //***********Due Date convert end*********//
   
   //***********forwardon Date convert*********//
          
         var mycovertforwardon = new Date(users[i].forwardon_date);
        console.log(mycovertforwardon)
        var  forwardonday = mycovertforwardon.getDate();        
        var  forwardonmonth = mycovertforwardon.getMonth();     
        var forwardonyear = mycovertforwardon.getFullYear();
        const forwardonnewdate = new Date(Date.UTC(forwardonyear, forwardonmonth, forwardonday))
        const resultforwardon = forwardonnewdate.toISOString().split('T')[0]
        console.log(resultforwardon) 
        var myresultsplitresultforwardon = resultforwardon.split('-');
        console.log(myresultsplitresultforwardon)
        var forwardonfinal=myresultsplitresultforwardon[2]+"-"+myresultsplitresultforwardon[1]+"-"+myresultsplitresultforwardon[0];
        console.log('forwardonfinal',forwardonfinal)
        
       //***********forwardon Date convert end*********//
    


    temp['_id']=users[i]._id;
    temp['type']=users[i].type;
    temp['invoice_no']=users[i].invoice_no;
    temp['currency']=users[i].currency ;
    temp['cunter_party_name']=users[i].cunter_party_name;
    temp['amount_in_fc']=users[i].amount_in_fc; 
    temp['start_date']=users[i].start_date ;
    temp['due_date']=users[i].due_date ;
    temp['forwardon_date']=users[i].forwardon_date;
    temp['costing_spot']=users[i].costing_spot ;
    temp['costing_premium']=users[i].costing_premium ;
    temp['costed_rate']=users[i].costed_rate ;
    temp['mtm_spot']=users[i].mtm_spot ;
    temp['mtm_premium']=users[i].mtm_premium ;
    temp['current_forwardrate']=users[i].current_forwardrate; 
    temp['profit_loss']=users[i].profit_loss ;
    temp['savecalcualtionid']=users[i].savecalcualtionid ;
    temp['userid']=users[i].userid ;
    temp['created_at']=users[i].created_at ;
    temp['updated_at']=users[i].updated_at ;
    temp['updated_by']=users[i].updated_by ;
    temp['created_by']=users[i].created_by ;
    temp['myconvertstart']= startfinal;
    temp['myconvertdue']= duefinal;
    temp['myconvertforwardon']= forwardonfinal;
    temp1.push(temp);

    }
      var XLSX = require('xlsx')
      var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/caculationdata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
        { header: "S no.", key: "s_no" },
        { header: "Txn Type", key: "type" },
        { header: "Trade ref no.", key: "invoice_no" },
        { header: "Currency", key: "currency" },
        { header: "Counterparty", key: "cunter_party_name" },
        { header: "Open amount", key: "amount_in_fc" },
        { header: "Recognition date", key: "myconvertstart" },
        { header: "Due date", key: "myconvertdue" },
        { header: "Forward as on date", key: "myconvertforwardon" },
        { header: "Costing Spot", key: "costing_spot" },
        { header: "Costing Premium", key: "costing_premium" },
        { header: "Costed Rate", key: "costed_rate" },
        { header: "MTM Spot", key: "mtm_spot" },
        { header: "MTM Premium", key: "mtm_premium" },
        { header: "Current forward rate", key: "current_forwardrate" },
        { header: "100% Hedge P&L", key: "profit_loss" },
      ];
      // Looping through User data

      // console.log('temp1',temp1);
      let counter = 1;
      temp1.forEach((user) => {
        console.log('user',user)

        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
        await workbook.xlsx.writeFile(`${path}/importcalcualtiondata.xlsx`)
          .then(() => {
            console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
      } catch (err) {
        console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }



      res.json({ response: true, message: "Data found", details: users });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});


// function writeToCSVFileLocation(users) {
//     const filename = users[0].utility_id + "_" + users[0].sub_division_id + '.csv';
//     fs.writeFile('csv_uploads/' + filename, extractAsCSVLocation(users), err => {
//         if (err) {
//             console.log('Error writing to csv file', err);
//         } else {
//             //client.upload('csv_uploads/' + filename, '/HOH/PRD/LoadCurtailment/' + filename, 755);
//             console.log(`saved as ${filename}`);
//         }
//     });
// }

// function extractAsCSVLocation(users) {
//     const header = ['UtilityID,DivisionID,SubdivisionID,SectionID,Category,ConsumerID,METER_TYPE,Curtailment_Type,Curtailment_Value,Load_Curtailment_Starttime,Load_Curtailment_Endtime'];
//     const rows = users.map(user =>
//         `${user.utility_id},${user.division_id},${user.sub_division_id},${user.section_id},${user.category},${user.consumer_id},${user.meter_phase},${user.value_type},${user.value},${user.start_date},${user.end_date + "\r\n"}`
//     );
//     return header.concat(rows).join("\n");
// }

// function changeDate(dateTime) {
//     var temp = new Date(dateTime).toLocaleString({ timeZone: "Asia/Kolkata" });
//     var mi_temp_datetime = temp.split(" ");
//     var mi_temp_date = mi_temp_datetime[0].split("/");
//     var mi_temp_time = mi_temp_datetime[1].split(":");
//     mi_temp_time[0] = ((mi_temp_datetime[2] == "PM" && mi_temp_time[0] != "12") ? (Number(mi_temp_time[0]) + 12).toString() : mi_temp_time[0]);
//     return mi_temp_date[1] + "-" + mi_temp_date[0] + "-" + mi_temp_date[2].substr(0, 4) + " " + mi_temp_time[0] + ":" + mi_temp_time[1] + ":" + mi_temp_time[2]
// }


router.post('/saveexportcalculation', function (req, res, next) {
  console.log('in')
  let type = req.body.type;
  let invoice_no = req.body.invoice_no;
  let currency = req.body.currency;
  let cunter_party_name = req.body.cunter_party_name;
  let amount_in_fc = req.body.amount_in_fc;
  let start_date = req.body.start_date;
  let due_date = req.body.due_date;
  let forwardon_date = req.body.forwardon_date;
  let costing_spot = req.body.costing_spot;
  let costing_premium = req.body.costing_premium;
  let costed_rate = req.body.costed_rate;
  let mtm_spot = req.body.mtm_spot;
  let mtm_premium = req.body.mtm_premium;
  let current_forwardrate = req.body.current_forwardrate;
  let profit_loss = req.body.profit_loss;
  let savecalcualtionid = req.body.savecalcualtionid;
  let userid = req.body.userid;
  
    Saveexportcalculation.findOne({ _id: new ObjectId(savecalcualtionid) }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: false, message: "Data found" });
    } else {

      var json_ary = {
        type: type,
        invoice_no: invoice_no,
        currency: currency,
        cunter_party_name: cunter_party_name,     
        amount_in_fc: amount_in_fc,
        start_date: start_date,
        due_date: due_date,
        forwardon_date: forwardon_date,
        costing_spot: costing_spot,
        costing_premium: costing_premium,
        costed_rate: costed_rate,
          mtm_spot: mtm_spot,
        mtm_premium: mtm_premium,
         current_forwardrate: current_forwardrate,
        profit_loss: profit_loss,
        savecalcualtionid: savecalcualtionid,
        userid: userid,
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 'admin',
        updated_by: 'admin',

}

   Saveexportcalculation.create(json_ary, function (err, docs) {
        if (err) {
          res.json({ response: false, message: err });
        } else {


       
            Exportinputexcel.findOneAndDelete({ _id: new ObjectId(savecalcualtionid) }, function (err, user) {
            if (err) {
              res.json({ response: false, message: err });
            }
            if (user) {
              res.json({ response: true, message: "Data Inserted" });
            }
          });
      



        }
      });
    }
  });

  });



router.post('/getexportcalculation_data', function (req, res, next) {
  let userid = req.body.userid;


  Saveexportcalculation.find({ userid: { '$eq': userid } },async function (err, users) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (users) {

        var XLSX = require('xlsx')
      var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/caculationdata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
        { header: "S no.", key: "s_no" },
        { header: "Txn Type", key: "type" },
        { header: "Trade ref no.", key: "invoice_no" },
        { header: "Currency", key: "currency" },
        { header: "Counterparty", key: "cunter_party_name" },
        { header: "Open amount", key: "amount_in_fc" },
        { header: "Recognition date", key: "start_date" },
        { header: "Due date", key: "due_date" },
        { header: "Forward as on date", key: "forwardon_date" },
        { header: "Costing Spot", key: "costing_spot" },
        { header: "Costing Premium", key: "costing_premium" },
        { header: "Costed Rate", key: "costed_rate" },
        { header: "MTM Spot", key: "mtm_spot" },
        { header: "MTM Premium", key: "mtm_premium" },
        { header: "Current forward rate", key: "current_forwardrate" },
        { header: "100% Hedge P&L", key: "profit_loss" },
      ];
      // Looping through User data
      let counter = 1;
      users.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
        await workbook.xlsx.writeFile(`${path}/exportcalcualtiondata.xlsx`)
          .then(() => {
            console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
      } catch (err) {
        console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }




      res.json({ response: true, message: "Data found", details: users });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});


router.post('/savepcfccalculation', function (req, res, next) {
  console.log('in')
  let type = req.body.type;
  let company_name = req.body.company_name;
  let currency = req.body.currency;
  let amount_in_fc = req.body.amount_in_fc;
  let start_date = req.body.start_date;
  let from_date = req.body.from_date;
   let to_date = req.body.to_date;
  let forwardon_date = req.body.forwardon_date;
  let costing_spot = req.body.costing_spot;
  let costing_premium = req.body.costing_premium;
  let bank_margin = req.body.bank_margin;
  let booking_rate = req.body.booking_rate;
  let mtm_spot = req.body.mtm_spot;
  let mtm_premium = req.body.mtm_premium;
  let current_forwardrate = req.body.current_forwardrate;
  let profit_loss = req.body.profit_loss;
  let savecalcualtionid = req.body.savecalcualtionid;
  let userid = req.body.userid;
  let invoice_no = req.body.invoice_no;
  let bank_name = req.body.bank_name;

   Savepcfccalculation.findOne({ _id: new ObjectId(savecalcualtionid) }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: false, message: "Data found" });
    } else {

      var json_ary = {
        type: type,
        company_name: company_name,
        currency: currency,
        amount_in_fc: amount_in_fc,
        start_date: start_date,
        from_date: from_date,
        to_date: to_date,
        forwardon_date: forwardon_date,
        costing_spot: costing_spot,
        costing_premium: costing_premium,
        bank_margin: bank_margin,
        booking_rate: booking_rate,
          mtm_spot: mtm_spot,
        mtm_premium: mtm_premium,
         current_forwardrate: current_forwardrate,
        profit_loss: profit_loss,
        savecalcualtionid: savecalcualtionid,
        userid: userid,
        invoice_no : invoice_no,
        bank_name : bank_name,
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 'admin',
        updated_by: 'admin',

}

 Savepcfccalculation.create(json_ary, function (err, docs) {
        if (err) {
          res.json({ response: false, message: err });
        } else {


       
            Pcfcexcel.findOneAndDelete({ _id: new ObjectId(savecalcualtionid) }, function (err, user) {
            if (err) {
              res.json({ response: false, message: err });
            }
            if (user) {
              res.json({ response: true, message: "Data Inserted" });
            }
          });
      



        }
      });
    }
  });

  });

router.post('/getpcfccalculation_data', function (req, res, next) {
  let userid = req.body.userid;


  Savepcfccalculation.find({ userid: { '$eq': userid } },async function (err, users) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (users) {

      console.log('users',users)

      for (var i = 0; i < users.length; i++) {
        users[i].convertdate = '';
      }


         var XLSX = require('xlsx')
      var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/caculationdata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
        { header: "S no.", key: "s_no" },
        { header: "Txn Type", key: "type" },
        { header: "Company Name", key: "company_name" },
        { header: "Currency", key: "currency" },
        { header: "Open amount", key: "amount_in_fc" },
        { header: "Start date", key: "start_date" },
         { header: "From date", key: "from_date" },
        { header: "To Date", key: "to_date" },
        { header: "Forward as on date", key: "forwardon_date" },
        { header: "Costing Spot", key: "costing_spot" },
        { header: "Costing Premium", key: "costing_premium" },
        { header: "Bank Margin", key: "bank_margin" },
        { header: "Booking Rate", key: "booking_rate" },
        { header: "MTM Spot", key: "mtm_spot" },
        { header: "MTM Premium", key: "mtm_premium" },
        { header: "Current forward rate", key: "current_forwardrate" },
        { header: "100% Hedge P&L", key: "profit_loss" },
      ];
      // Looping through User data
      let counter = 1;
      users.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
        await workbook.xlsx.writeFile(`${path}/pcfccalcualtiondata.xlsx`)
          .then(() => {
            console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
      } catch (err) {
        console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }


      res.json({ response: true, message: "Data found", details: users });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});




router.post('/saveforexbuycalculation', function (req, res, next) {
  console.log('in')
  let type = req.body.type;
  let company_name = req.body.company_name;
  let invoice_no = req.body.invoice_no;
  let currency = req.body.currency;
  let amount_in_fc = req.body.amount_in_fc;
  let start_date = req.body.start_date;
  let from_date = req.body.from_date;
   let to_date = req.body.to_date;
  let forwardon_date = req.body.forwardon_date;
  let costing_spot = req.body.costing_spot;
  let costing_premium = req.body.costing_premium;
   let bank_margin = req.body.bank_margin;
  let booking_rate = req.body.booking_rate;
  let mtm_spot = req.body.mtm_spot;
  let mtm_premium = req.body.mtm_premium;
  let current_forwardrate = req.body.current_forwardrate;
  let profit_loss = req.body.profit_loss;
  let savecalcualtionid = req.body.savecalcualtionid;
  let bank_name = req.body.bank_name;
  let userid = req.body.userid;
  
    Saveforexbuycalculation.findOne({ _id: new ObjectId(savecalcualtionid) }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: false, message: "Data found" });
    } else {

      var json_ary = {
        type: type,
        company_name: company_name,
        invoice_no: invoice_no,
        bank_name: bank_name,
        currency: currency,
        amount_in_fc: amount_in_fc,
        start_date: start_date,
        from_date: from_date,
        to_date: to_date,
        forwardon_date: forwardon_date,
        costing_spot: costing_spot,
        costing_premium: costing_premium,
        bank_margin: bank_margin,
        booking_rate: booking_rate,
          mtm_spot: mtm_spot,
        mtm_premium: mtm_premium,
         current_forwardrate: current_forwardrate,
        profit_loss: profit_loss,
        savecalcualtionid: savecalcualtionid,
        userid: userid,
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 'admin',
        updated_by: 'admin',

}

   Saveforexbuycalculation.create(json_ary, function (err, docs) {
        if (err) {
          res.json({ response: false, message: err });
        } else {


       
            Forexbuyexcel.findOneAndDelete({ _id: new ObjectId(savecalcualtionid) }, function (err, user) {
            if (err) {
              res.json({ response: false, message: err });
            }
            if (user) {
              res.json({ response: true, message: "Data Inserted" });
            }
          });
      



        }
      });
    }
  });

  });



router.post('/getforexbuycalculation_data', function (req, res, next) {
  let userid = req.body.userid;


  Saveforexbuycalculation.find({ userid: { '$eq': userid } }, async function (err, users) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (users) {

      //    var XLSX = require('xlsx')
      // var Excel = require("exceljs");
      // const workbook = new Excel.Workbook();  // Create a new workbook
      // const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      // const path = "./uploads/caculationdata";  // Path to download excel
      // // Column for data in excel. key must match data key
      // worksheet.columns = [
      //   { header: "S no.", key: "s_no" },
      //   { header: "Txn Type", key: "type" },
      //   { header: "Company Name", key: "company_name" },
      //   { header: "Currency", key: "currency" },
      //   { header: "Open amount", key: "amount_in_fc" },
      //   { header: "Start date", key: "start_date" },
      //    { header: "From date", key: "from_date" },
      //   { header: "To Date", key: "to_date" },
      //   { header: "Forward as on date", key: "forwardon_date" },
      //   { header: "Costing Spot", key: "costing_spot" },
      //   { header: "Costing Premium", key: "costing_premium" },
      //   { header: "Bank Margin", key: "bank_margin" },
      //   { header: "Booking Rate", key: "booking_rate" },
      //   { header: "MTM Spot", key: "mtm_spot" },
      //   { header: "MTM Premium", key: "mtm_premium" },
      //   { header: "Current forward rate", key: "current_forwardrate" },
      //   { header: "100% Hedge P&L", key: "profit_loss" },
      // ];
      // // Looping through User data
      // let counter = 1;
      // users.forEach((user) => {
      //   user.s_no = counter;
      //   worksheet.addRow(user); // Add data in worksheet
      //   counter++;
      // });
      // // Making first line in excel bold
      // worksheet.getRow(1).eachCell((cell) => {
      //   cell.font = { bold: true };
      // });
      // try {
      //   await workbook.xlsx.writeFile(`${path}/forexbuycalcualtiondata.xlsx`)
      //     .then(() => {
      //       console.log("Success");
      //       //res.json({ response: true, message: message, data: users });
      //     });
      // } catch (err) {
      //   console.log("Error");
      //   //res.json({ response: false, message: "Something went wrong" });
      // }


      res.json({ response: true, message: "Data found", details: users });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});




router.post('/saveforexsellcalculation', function (req, res, next) {
  console.log('in')
  let type = req.body.type;
  let company_name = req.body.company_name;
  let currency = req.body.currency;
  let amount_in_fc = req.body.amount_in_fc;
  let start_date = req.body.start_date;
  let from_date = req.body.from_date;
   let to_date = req.body.to_date;
  let forwardon_date = req.body.forwardon_date;
  let costing_spot = req.body.costing_spot;
  let costing_premium = req.body.costing_premium;
  let bank_margin = req.body.bank_margin;
  let booking_rate = req.body.booking_rate;
  let mtm_spot = req.body.mtm_spot;
  let mtm_premium = req.body.mtm_premium;
  let current_forwardrate = req.body.current_forwardrate;
  let profit_loss = req.body.profit_loss;
  let savecalcualtionid = req.body.savecalcualtionid;
  let userid = req.body.userid;
  let invoice_no = req.body.invoice_no;
  let bank_name = req.body.bank_name;
   Saveforexsellcalculation.findOne({ _id: new ObjectId(savecalcualtionid) }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: false, message: "Data found" });
    } else {

      var json_ary = {
        type: type,
        company_name: company_name,
        invoice_no: invoice_no,
        bank_name: bank_name,
        currency: currency,
        amount_in_fc: amount_in_fc,
        start_date: start_date,
        from_date: from_date,
        to_date: to_date,
        forwardon_date: forwardon_date,
        costing_spot: costing_spot,
        costing_premium: costing_premium,
        bank_margin: bank_margin,
        booking_rate: booking_rate,
          mtm_spot: mtm_spot,
        mtm_premium: mtm_premium,
         current_forwardrate: current_forwardrate,
        profit_loss: profit_loss,
        savecalcualtionid: savecalcualtionid,
        userid: userid,
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 'admin',
        updated_by: 'admin',

}

   Saveforexsellcalculation.create(json_ary, function (err, docs) {
        if (err) {
          res.json({ response: false, message: err });
        } else {


       
            Forexsellexcel.findOneAndDelete({ _id: new ObjectId(savecalcualtionid) }, function (err, user) {
            if (err) {
              res.json({ response: false, message: err });
            }
            if (user) {
              res.json({ response: true, message: "Data Inserted" });
            }
          });
      



        }
      });
    }
  });

  });



router.post('/getforexsellcalculation_data', function (req, res, next) {
  let userid = req.body.userid;


  Saveforexsellcalculation.find({ userid: { '$eq': userid } },async function (err, users) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (users) {

      console.log('users',users)

      for (var i = 0; i < users.length; i++) {
        users[i].convertdate = '';
      }


      //    var XLSX = require('xlsx')
      // var Excel = require("exceljs");
      // const workbook = new Excel.Workbook();  // Create a new workbook
      // const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      // const path = "./uploads/caculationdata";  // Path to download excel
      // // Column for data in excel. key must match data key
      // worksheet.columns = [
      //   { header: "S no.", key: "s_no" },
      //   { header: "Txn Type", key: "type" },
      //   { header: "Company Name", key: "company_name" },
      //   { header: "Currency", key: "currency" },
      //   { header: "Open amount", key: "amount_in_fc" },
      //   { header: "Start date", key: "start_date" },
      //    { header: "From date", key: "from_date" },
      //   { header: "To Date", key: "to_date" },
      //   { header: "Forward as on date", key: "forwardon_date" },
      //   { header: "Costing Spot", key: "costing_spot" },
      //   { header: "Costing Premium", key: "costing_premium" },
      //   { header: "Bank Margin", key: "bank_margin" },
      //   { header: "Booking Rate", key: "booking_rate" },
      //   { header: "MTM Spot", key: "mtm_spot" },
      //   { header: "MTM Premium", key: "mtm_premium" },
      //   { header: "Current forward rate", key: "current_forwardrate" },
      //   { header: "100% Hedge P&L", key: "profit_loss" },
      // ];
      // // Looping through User data
      // let counter = 1;
      // users.forEach((user) => {
      //   user.s_no = counter;
      //   worksheet.addRow(user); // Add data in worksheet
      //   counter++;
      // });
      // // Making first line in excel bold
      // worksheet.getRow(1).eachCell((cell) => {
      //   cell.font = { bold: true };
      // });
      // try {
      //   await workbook.xlsx.writeFile(`${path}/forexsellcalcualtiondata.xlsx`)
      //     .then(() => {
      //       console.log("Success");
      //       //res.json({ response: true, message: message, data: users });
      //     });
      // } catch (err) {
      //   console.log("Error");
      //   //res.json({ response: false, message: "Something went wrong" });
      // }


      res.json({ response: true, message: "Data found", details: users });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});






router.post('/upload_exportexcel', upload.single('file'), function (req, res) {
  // var wb = new Excel.Workbook();
  var filename = "";
  var userid = "";
  if (req.file) {
    filename = req.file.filename;
    userid = req.body.userid;
    console.log('userid', req.body.userid);
  }


  var filePath = path.resolve(DIR + "/" + filename);


  var XLSX = require('xlsx')
  var workbook = XLSX.readFile(filePath);
  var sheet_name_list = workbook.SheetNames;
  var Excel = require("exceljs");
  var workbook = new Excel.Workbook();
  var cnt = 1;
  var json_ary = [];
  ///var batch_id = String(Math.floor(Math.random() * 100) + 2 + "" + new Date().getTime());
  workbook.xlsx.readFile(filePath).then(function () {
    var worksheet = workbook.getWorksheet(sheet_name_list[0]);
    worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
      currRow = worksheet.getRow(rowNumber);
      if (cnt > 1 && currRow.getCell(1).value  && currRow.getCell(5).value && currRow.getCell(6).value && currRow.getCell(7).value && currRow.getCell(8).value) {

        var type = "";
        var reference_no = "";
        var cunter_party_name = "";
        var invoice_no = "";
        var currency = "";
        var amount_in_fc = "";
        var start_date = "";
        var due_date = "";
        var bank_name = "";
      

        type = currRow.getCell(1).value;
        reference_no = currRow.getCell(2).value;
        cunter_party_name = currRow.getCell(3).value;
        invoice_no = currRow.getCell(4).value;
        currency = currRow.getCell(5).value;
        amount_in_fc = currRow.getCell(6).value;
        start_date = currRow.getCell(7).value;
        due_date = currRow.getCell(8).value;
        bank_name = (currRow.getCell(9).value);
     
        if (type) {
          type = type.toString();
          type = type.trim();
        }
         if (reference_no) {
          reference_no = reference_no.toString();
          reference_no = reference_no.trim();
        }
        if (cunter_party_name) {
          cunter_party_name = cunter_party_name.toString();
          cunter_party_name = cunter_party_name.trim();
        }
        if (invoice_no) {
          invoice_no = invoice_no.toString();
          invoice_no = invoice_no.trim();
        }
        if (currency) {
          currency = currency.toString();
          currency = currency.trim();
        }
        if (amount_in_fc) {
          amount_in_fc = amount_in_fc.toString();
          amount_in_fc = amount_in_fc.trim();
        }
        if (start_date) {
          start_date = start_date.toString();
          start_date = start_date.trim();
        }
        if (due_date) {
          due_date = due_date.toString();
          due_date = due_date.trim();
        }
        if (bank_name) {
          bank_name = bank_name.toString();
          bank_name = bank_name.trim();
        }
      

        // if (userid) {

        json_ary.push({
          userid: (userid),
          type: (type),
          reference_no: reference_no,
          cunter_party_name: cunter_party_name,
          invoice_no: (invoice_no),
          currency: (currency),
          amount_in_fc: amount_in_fc,
          start_date: start_date,
          due_date: due_date,
          bank_name: bank_name,
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 'admin',
          updated_by: 'admin',
        });


        // }
      }
      cnt++;
    });

    Exportinputexcel.collection.insertMany(json_ary, function (err, docs) {
      if (err) {
        //return console.error(err);
        res.json({ response: false, message: "Excel not uploaded" });
      } else {
        res.json({ response: true, message: "Excel has been successfully uploaded", filepath: filePath, count: json_ary.length });
      }
    });
  });

})




router.post('/getexportexceldata', function (req, res, next) {
  let userid = req.body.userid;
  let type = req.body.type;
  console.log({ userid: { '$eq': userid }, type: { '$eq': type } })
  Exportinputexcel.find({ userid: { '$eq': userid }, type: { '$eq': type } }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      var mydata = [];
      mydata.push(user);

      console.log(user)
      res.json({ response: true, message: "Data found", details: user });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});






router.post('/getimportexceldata', function (req, res, next) {
  let userid = req.body.userid;
  let type = req.body.type;
  console.log({ userid: { '$eq': userid }, type: { '$eq': type } })
  Importinputexcel.find({ userid: { '$eq': userid }, type: { '$eq': type } }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      // var mydata = [];
      //  mydata.push(user)
      res.json({ response: true, message: "Data found", details: user });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});



     router.post('/upload_spotrateexcel', upload.single('file'), function (req, res) {
  // var wb = new Excel.Workbook();
  var filename = "";
  var userid = "";
  if (req.file) {
    filename = req.file.filename;
    userid = req.body.userid;
    console.log('userid', req.body.userid);
  }

  var filePath = path.resolve(DIR + "/" + filename);
  var XLSX = require('xlsx')
  var workbook = XLSX.readFile(filePath);
  var sheet_name_list = workbook.SheetNames;
  var Excel = require("exceljs");
  var workbook = new Excel.Workbook();
  var cnt = 1;
  var json_ary = [];
  var flag = false;
  ///var batch_id = String(Math.floor(Math.random() * 100) + 2 + "" + new Date().getTime());
  workbook.xlsx.readFile(filePath).then(function () {
    var worksheet = workbook.getWorksheet(sheet_name_list[0]);
    const promises = [];
    worksheet.eachRow(function (row, rowNumber) {
      console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
      
    });

    
    worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
      currRow = worksheet.getRow(rowNumber);
      if (cnt > 1 && currRow.getCell(1).value && currRow.getCell(2).value && currRow.getCell(3).value
        && currRow.getCell(4).value && currRow.getCell(5).value && currRow.getCell(5).value
        && currRow.getCell(7).value) {
        var applicable_date = "";
        var spotin_usd = "";
        var spotin_gbp = "";
        var spotin_eur = "";
        var spotin_yen = "";
        var spotin_eur_usd = "";
        var spotin_gbp_usd = "";
      

        applicable_date = currRow.getCell(1).value;
        spotin_usd = currRow.getCell(2).value;
        spotin_gbp = currRow.getCell(3).value;
        spotin_eur = currRow.getCell(4).value;
        spotin_yen = currRow.getCell(5).value;
        spotin_eur_usd = currRow.getCell(6).value;
        spotin_gbp_usd = currRow.getCell(7).value;
        var applicable_converdate = currRow.getCell(1).value;

        if (applicable_date) {
          applicable_date = applicable_date.toString();
          applicable_date = applicable_date.trim();
        }
        if (spotin_usd) {
          spotin_usd = spotin_usd.toString();
          spotin_usd = spotin_usd.trim();
        }
        if (spotin_gbp) {
          spotin_gbp = spotin_gbp.toString();
          spotin_gbp = spotin_gbp.trim();
        }
        if (spotin_eur) {
          spotin_eur = spotin_eur.toString();
          spotin_eur = spotin_eur.trim();
        }
        if (spotin_yen) {
          spotin_yen = spotin_yen.toString();
          spotin_yen = spotin_yen.trim();
        }
        if (spotin_eur_usd) {
          spotin_eur_usd = spotin_eur_usd.toString();
          spotin_eur_usd = spotin_eur_usd.trim();
        }
        if (spotin_gbp_usd) {
          spotin_gbp_usd = spotin_gbp_usd.toString();
          spotin_gbp_usd = spotin_gbp_usd.trim();
        }

        Spotrateexcel.countDocuments({ applicable_date: applicable_date }, function (err, count) {
         console.log(count)
          if (count == 0) {
            json_ary.push({
              userid: (userid),
              applicable_date: applicable_date,
              applicable_converdate: new Date(applicable_converdate),
              spotin_usd: (spotin_usd),
              spotin_gbp: (spotin_gbp),
              spotin_eur: (spotin_eur),
              spotin_yen: (spotin_yen),
              spotin_eur_usd: (spotin_eur_usd),
              spotin_gbp_usd: (spotin_gbp_usd),
              created_at: new Date(),
              updated_at: new Date(),
              created_by: 'admin',
              updated_by: 'admin',
            });
            const promise = Spotrateexcel.collection.insertOne({
              userid: (userid),
              applicable_date: applicable_date,
              applicable_converdate: new Date(applicable_converdate),
              spotin_usd: (spotin_usd),
              spotin_gbp: (spotin_gbp),
              spotin_eur: (spotin_eur),
              spotin_yen: (spotin_yen),
              spotin_eur_usd: (spotin_eur_usd),
              spotin_gbp_usd: (spotin_gbp_usd),
              created_at: new Date(),
              updated_at: new Date(),
              created_by: 'admin',
              updated_by: 'admin',
            }); // <-- whatever async operation you have here
            promises.push(promise);
          }
        })
      }

      cnt++;
    });
   console.log('promises',promises.length)
    Promise.all(promises).then((result) => {
      // console.log("Done")
      res.json({ response: true, message: "Excel has been successfully uploaded" });
    }).catch((err) => {
      console.log("An error occurred while inserting data", err);
    });

    // console.log('json',json_ary)

    //  console.log('cnt',cnt)
    //   console.log('worksheet.rowCount',worksheet.rowCount+1)

    // if (cnt==worksheet.rowCount+1) {
    //    Spotrateexcel.collection.insertMany(json_ary, function (err, docs) {
    //   if (err) {
    //      console.log(err);
    //     res.json({ response: false, message: "Excel not uploaded" });
    //   } else {
    //     res.json({ response: true, message: "Excel has been successfully uploaded", filepath: filePath, count: json_ary.length });
    //   }
    // });

    // }


  });

})

router.post('/upload_eurpremiumexcel', upload.single('file'), function (req, res) {
  // var wb = new Excel.Workbook();
  var filename = "";
  var userid = "";
  if (req.file) {
    filename = req.file.filename;
    userid = req.body.userid;
    console.log('userid', req.body.userid);
  }


  var filePath = path.resolve(DIR + "/" + filename);


  var XLSX = require('xlsx')
  var workbook = XLSX.readFile(filePath);
  var sheet_name_list = workbook.SheetNames;
  var Excel = require("exceljs");
  var workbook = new Excel.Workbook();
  var cnt = 1;
  var json_ary = [];
  ///var batch_id = String(Math.floor(Math.random() * 100) + 2 + "" + new Date().getTime());
  workbook.xlsx.readFile(filePath).then(function () {
    var worksheet = workbook.getWorksheet(sheet_name_list[0]);
     const promises = [];
    worksheet.eachRow(function (row, rowNumber) {
      console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
      
    });

    worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
      currRow = worksheet.getRow(rowNumber);
      if (cnt > 1 && currRow.getCell(1).value && currRow.getCell(2).value && currRow.getCell(3).value) {


        var applicable_date = "";
        var currency = "";
        var tenor = "";
        var settled_date = "";
        var bid_rate = "";
        var offer_rate = "";
        var source = "";


        applicable_date = currRow.getCell(1).value;
        currency = currRow.getCell(2).value;
        tenor = currRow.getCell(3).value;
        settled_date = currRow.getCell(4).value;
        bid_rate = currRow.getCell(5).value;
        offer_rate = currRow.getCell(6).value;
        source = currRow.getCell(7).value;
        var applicable_converdate = currRow.getCell(1).value;

        if (applicable_date) {
          applicable_date = applicable_date.toString();
          applicable_date = applicable_date.trim();
        }
        if (currency) {
          currency = currency.toString();
          currency = currency.trim();
        }
        if (tenor) {
          tenor = tenor.toString();
          tenor = tenor.trim();
        }
        if (settled_date) {
          settled_date = settled_date.toString();
          settled_date = settled_date.trim();
        }
        if (bid_rate) {
          bid_rate = bid_rate.toString();
          bid_rate = bid_rate.trim();
        }
        if (offer_rate) {
          offer_rate = offer_rate.toString();
          offer_rate = offer_rate.trim();
        }
        if (source) {
          source = source.toString();
          source = source.trim();
        }






        // // if (userid) {

        // json_ary.push({
        //   userid: (userid),
        //   applicable_date: applicable_date,
        //   currency: (currency),
        //   tenor: (tenor),
        //   settled_date: (settled_date),
        //   bid_rate: (bid_rate),
        //   offer_rate: (offer_rate),
        //   source: (source),
        //   created_at: new Date(),
        //   updated_at: new Date(),
        //   created_by: 'admin',
        //   updated_by: 'admin',
        // });



        // // }


 Eurinrpremiumexcel.countDocuments({ applicable_date: applicable_date,settled_date: settled_date }, function (err, count) {
         console.log(count)
          if (count == 0) {
            json_ary.push({
             userid: (userid),
          applicable_date: applicable_date,
          applicable_converdate:applicable_converdate,
          currency: (currency),
          tenor: (tenor),
          settled_date: (settled_date),
          bid_rate: (bid_rate),
          offer_rate: (offer_rate),
          source: (source),
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 'admin',
          updated_by: 'admin',
            });
            const promise = Eurinrpremiumexcel.collection.insertOne({
              userid: (userid),
          applicable_date: applicable_date,
          applicable_converdate:applicable_converdate,
          currency: (currency),
          tenor: (tenor),
          settled_date: (settled_date),
          bid_rate: (bid_rate),
          offer_rate: (offer_rate),
          source: (source),
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 'admin',
          updated_by: 'admin',
            }); // <-- whatever async operation you have here
            promises.push(promise);
          }
        })


      }
      cnt++;
    });

    console.log('promises',promises.length)
    Promise.all(promises).then((result) => {
       console.log("Done")
      res.json({ response: true, message: "Excel has been successfully uploaded" });
    }).catch((err) => {
      console.log("An error occurred while inserting data", err);
    });

    // Eurinrpremiumexcel.collection.insertMany(json_ary, function (err, docs) {
    //   if (err) {
    //     //return console.error(err);
    //     res.json({ response: false, message: "Excel not uploaded" });
    //   } else {
    //     res.json({ response: true, message: "Excel has been successfully uploaded", filepath: filePath, count: json_ary.length });
    //   }
    // });
  });

})





router.post('/upload_usdpremiumexcel', upload.single('file'), function (req, res) {
  // var wb = new Excel.Workbook();
  var filename = "";
  var userid = "";
  if (req.file) {
    filename = req.file.filename;
    userid = req.body.userid;
    console.log('userid', req.body.userid);
  }


  var filePath = path.resolve(DIR + "/" + filename);


  var XLSX = require('xlsx')
  var workbook = XLSX.readFile(filePath);
  var sheet_name_list = workbook.SheetNames;
  var Excel = require("exceljs");
  var workbook = new Excel.Workbook();
  var cnt = 1;
  var json_ary = [];
  ///var batch_id = String(Math.floor(Math.random() * 100) + 2 + "" + new Date().getTime());
  workbook.xlsx.readFile(filePath).then(function () {
    var worksheet = workbook.getWorksheet(sheet_name_list[0]);

 const promises = [];
    worksheet.eachRow(function (row, rowNumber) {
      console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
      
    });

    worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
      currRow = worksheet.getRow(rowNumber);
      if (cnt > 1 && currRow.getCell(1).value && currRow.getCell(2).value && currRow.getCell(3).value) {


        var applicable_date = "";
        var currency = "";
        var tenor = "";
        var settled_date = "";
        var bid_rate = "";
        var offer_rate = "";
        var source = "";


        applicable_date = currRow.getCell(1).value;
        currency = currRow.getCell(2).value;
        tenor = currRow.getCell(3).value;
        settled_date = currRow.getCell(4).value;
        bid_rate = currRow.getCell(5).value;
        offer_rate = currRow.getCell(6).value;
        source = currRow.getCell(7).value;
          var applicable_converdate = currRow.getCell(1).value;

        if (applicable_date) {
          applicable_date = applicable_date.toString();
          applicable_date = applicable_date.trim();
        }
        if (currency) {
          currency = currency.toString();
          currency = currency.trim();
        }
        if (tenor) {
          tenor = tenor.toString();
          tenor = tenor.trim();
        }
        if (settled_date) {
          settled_date = settled_date.toString();
          settled_date = settled_date.trim();
        }
        if (bid_rate) {
          bid_rate = bid_rate.toString();
          bid_rate = bid_rate.trim();
        }
        if (offer_rate) {
          offer_rate = offer_rate.toString();
          offer_rate = offer_rate.trim();
        }
        if (source) {
          source = source.toString();
          source = source.trim();
        }






        // if (userid) {

        // json_ary.push({
        //   userid: (userid),
        //   applicable_date: applicable_date,
        //   currency: (currency),
        //   tenor: (tenor),
        //   settled_date: (settled_date),
        //   bid_rate: (bid_rate),
        //   offer_rate: (offer_rate),
        //   source: (source),
        //   created_at: new Date(),
        //   updated_at: new Date(),
        //   created_by: 'admin',
        //   updated_by: 'admin',
        // });



        // }
     // }
      Usdinrpremiumexcel.countDocuments({ applicable_date: applicable_date,settled_date: settled_date }, function (err, count) {
         console.log(count)
          if (count == 0) {
            json_ary.push({
             userid: (userid),
          applicable_date: applicable_date,
          applicable_converdate:applicable_converdate,
          currency: (currency),
          tenor: (tenor),
          settled_date: (settled_date),
          bid_rate: (bid_rate),
          offer_rate: (offer_rate),
          source: (source),
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 'admin',
          updated_by: 'admin',
            });
            const promise = Usdinrpremiumexcel.collection.insertOne({
          userid: (userid),
          applicable_date: applicable_date,
          applicable_converdate:applicable_converdate,
          currency: (currency),
          tenor: (tenor),
          settled_date: (settled_date),
          bid_rate: (bid_rate),
          offer_rate: (offer_rate),
          source: (source),
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 'admin',
          updated_by: 'admin',
            }); // <-- whatever async operation you have here
            promises.push(promise);
          }
        })
      }

      cnt++;
    });

    console.log('promises',promises.length)
    Promise.all(promises).then((result) => {
       console.log("Done")
      res.json({ response: true, message: "Excel has been successfully uploaded" });
    }).catch((err) => {
      console.log("An error occurred while inserting data", err);
    });

    // Usdinrpremiumexcel.collection.insertMany(json_ary, function (err, docs) {
    //   if (err) {
    //     //return console.error(err);
    //     res.json({ response: false, message: "Excel not uploaded" });
    //   } else {
    //     res.json({ response: true, message: "Excel has been successfully uploaded", filepath: filePath, count: json_ary.length });
    //   }
    // });
  });

})



router.post('/upload_pcfcexcel', upload.single('file'), function (req, res) {
  // var wb = new Excel.Workbook();
  var filename = "";
  var userid = "";
  if (req.file) {
    filename = req.file.filename;
    userid = req.body.userid;
    console.log('userid', req.body.userid);
  }


  var filePath = path.resolve(DIR + "/" + filename);


  var XLSX = require('xlsx')
  var workbook = XLSX.readFile(filePath);
  var sheet_name_list = workbook.SheetNames;
  var Excel = require("exceljs");
  var workbook = new Excel.Workbook();
  var cnt = 1;
  var json_ary = [];
  ///var batch_id = String(Math.floor(Math.random() * 100) + 2 + "" + new Date().getTime());
  workbook.xlsx.readFile(filePath).then(function () {
    var worksheet = workbook.getWorksheet(sheet_name_list[0]);
    worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
      currRow = worksheet.getRow(rowNumber);
      if (cnt > 1 && currRow.getCell(1).value && currRow.getCell(5).value && currRow.getCell(6).value && currRow.getCell(7).value && currRow.getCell(8).value && currRow.getCell(9).value 
        && currRow.getCell(10).value ) {

        // && currRow.getCell(11).value && currRow.getCell(12).value


        var type = "";
        var company_name = "";
        var invoice_no = "";
        var bank_name = "";
        var currency = "";
        var amount_in_fc = "";
        var start_date = "";
        var from_date = "";
        var to_date = "";
        var spot = "";
        var premium = "";
        var bank_margin = "";
       
        type = currRow.getCell(1).value;
        invoice_no = currRow.getCell(2).value;
        company_name = currRow.getCell(3).value;
        bank_name = currRow.getCell(4).value;
        currency = currRow.getCell(5).value;
        amount_in_fc = currRow.getCell(6).value;
        start_date = currRow.getCell(7).value;
        from_date = currRow.getCell(8).value;
        to_date = currRow.getCell(9).value;
        spot = currRow.getCell(10).value;
        premium = currRow.getCell(11).value;
        bank_margin = currRow.getCell(12).value;

        if (type) {
          type = type.toString();
          type = type.trim();
        }
        if (company_name) {
          company_name = company_name.toString();
          company_name = company_name.trim();
        }
         if (invoice_no) {
          invoice_no = invoice_no.toString();
          invoice_no = invoice_no.trim();
        }
        if (bank_name) {
          bank_name = bank_name.toString();
          bank_name = bank_name.trim();
        }
        if (currency) {
          currency = currency.toString();
          currency = currency.trim();
        }
        if (amount_in_fc) {
          amount_in_fc = amount_in_fc.toString();
          amount_in_fc = amount_in_fc.trim();
        }
        if (start_date) {
          start_date = start_date.toString();
          start_date = start_date.trim();
        }
        if (from_date) {
          from_date = from_date.toString();
          from_date = from_date.trim();
        }

         if (to_date) {
          to_date = to_date.toString();
          to_date = to_date.trim();
        }
         if (spot) {
          spot = spot.toString();
          spot = spot.trim();
        }
         if (premium) {
          premium = premium.toString();
          premium = premium.trim();
        }
        if (bank_margin) {
          bank_margin = bank_margin.toString();
          bank_margin = bank_margin.trim();
        }

       // bank_margin = bank_margin.toString();




        // if (userid) {

        json_ary.push({
          userid: (userid),
          type: type,
          company_name: company_name,
          invoice_no: invoice_no,
          bank_name: bank_name,
          currency: (currency),
          amount_in_fc: (amount_in_fc),
          start_date: (start_date),
          from_date: (from_date),
          to_date: (to_date),
          spot: (spot),
          premium: (premium),
          bank_margin: (bank_margin),
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 'admin',
          updated_by: 'admin',
        });


      
        // }
      }
      cnt++;
    });

    Pcfcexcel.collection.insertMany(json_ary, function (err, docs) {
      if (err) {
        //return console.error(err);
        res.json({ response: false, message: "Excel not uploaded" });
      } else {
        res.json({ response: true, message: "Excel has been successfully uploaded", filepath: filePath, count: json_ary.length });
      }
    });
  });

})


router.post('/getpcfctexceldata', function (req, res, next) {
  let userid = req.body.userid;
  let type = req.body.type;
  console.log({ userid: { '$eq': userid }, type: { '$eq': type } })
  Pcfcexcel.find({ userid: { '$eq': userid }, type: { '$eq': type } }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      
      res.json({ response: true, message: "Data found", details: user });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});


router.post('/upload_forexbuyexcel', upload.single('file'), function (req, res) {
  // var wb = new Excel.Workbook();
  var filename = "";
  var userid = "";
  if (req.file) {
    filename = req.file.filename;
    userid = req.body.userid;
    console.log('userid', req.body.userid);
  }


  var filePath = path.resolve(DIR + "/" + filename);


  var XLSX = require('xlsx')
  var workbook = XLSX.readFile(filePath);
  var sheet_name_list = workbook.SheetNames;
  var Excel = require("exceljs");
  var workbook = new Excel.Workbook();
  var cnt = 1;
  var json_ary = [];
  ///var batch_id = String(Math.floor(Math.random() * 100) + 2 + "" + new Date().getTime());
  workbook.xlsx.readFile(filePath).then(function () {
    var worksheet = workbook.getWorksheet(sheet_name_list[0]);
    worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
      currRow = worksheet.getRow(rowNumber);
      if (cnt > 1 && currRow.getCell(1).value && currRow.getCell(5).value && currRow.getCell(6).value && currRow.getCell(7).value  && currRow.getCell(9).value 
        && currRow.getCell(10).value ) {

        // && currRow.getCell(11).value && currRow.getCell(12).value

      //&& currRow.getCell(8).value


        var type = "";
        var company_name = "";
        var invoice_no = "";
        var bank_name = "";
        var currency = "";
        var amount_in_fc = "";
        var start_date = "";
        var from_date = "";
        var to_date = "";
        var spot = "";
        var premium = "";
        var bank_margin = "";
       
        type = currRow.getCell(1).value;
        invoice_no = currRow.getCell(2).value;
        company_name = currRow.getCell(3).value;
        bank_name = currRow.getCell(4).value;
        currency = currRow.getCell(5).value;
        amount_in_fc = currRow.getCell(6).value;
        start_date = currRow.getCell(7).value;
        from_date = currRow.getCell(8).value;
        to_date = currRow.getCell(9).value;
        spot = currRow.getCell(10).value;
        premium = currRow.getCell(11).value;
        bank_margin = currRow.getCell(12).value;

        if (type) {
          type = type.toString();
          type = type.trim();
        }
        if (company_name) {
          company_name = company_name.toString();
          company_name = company_name.trim();
        }
         if (invoice_no) {
          invoice_no = invoice_no.toString();
          invoice_no = invoice_no.trim();
        }
        if (bank_name) {
          bank_name = bank_name.toString();
          bank_name = bank_name.trim();
        }
        if (currency) {
          currency = currency.toString();
          currency = currency.trim();
        }
        if (amount_in_fc) {
          amount_in_fc = amount_in_fc.toString();
          amount_in_fc = amount_in_fc.trim();
        }
        if (start_date) {
          start_date = start_date.toString();
          start_date = start_date.trim();
        }
        if (from_date) {
          from_date = from_date.toString();
          from_date = from_date.trim();
        }

         if (to_date) {
          to_date = to_date.toString();
          to_date = to_date.trim();
        }
         if (spot) {
          spot = spot.toString();
          spot = spot.trim();
        }
         if (premium) {
          premium = premium.toString();
          premium = premium.trim();
        }
        if (bank_margin) {
          bank_margin = bank_margin.toString();
          bank_margin = bank_margin.trim();
        }

       // bank_margin = bank_margin.toString();




        // if (userid) {

        json_ary.push({
          userid: (userid),
          type: type,
          company_name: company_name,
          invoice_no: invoice_no,
          bank_name: bank_name,
          currency: (currency),
          amount_in_fc: (amount_in_fc),
          start_date: (start_date),
          from_date: (from_date),
          to_date: (to_date),
          spot: (spot),
          premium: (premium),
          bank_margin: (bank_margin),
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 'admin',
          updated_by: 'admin',
        });


      
        // }
      }
      cnt++;
    });

    Forexbuyexcel.collection.insertMany(json_ary, function (err, docs) {
      if (err) {
        //return console.error(err);
        res.json({ response: false, message: "Excel not uploaded" });
      } else {
        res.json({ response: true, message: "Excel has been successfully uploaded", filepath: filePath, count: json_ary.length });
      }
    });
  });

})


router.post('/getforexbuyexceldata', function (req, res, next) {
  let userid = req.body.userid;
  let type = req.body.type;
  console.log({ userid: { '$eq': userid }, type: { '$eq': type } })
  Forexbuyexcel.find({ userid: { '$eq': userid }, type: { '$eq': type } }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      
      res.json({ response: true, message: "Data found", details: user });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});






router.post('/upload_forexsellexcel', upload.single('file'), function (req, res) {
  // var wb = new Excel.Workbook();
  var filename = "";
  var userid = "";
  if (req.file) {
    filename = req.file.filename;
    userid = req.body.userid;
    console.log('userid', req.body.userid);
  }


  var filePath = path.resolve(DIR + "/" + filename);


  var XLSX = require('xlsx')
  var workbook = XLSX.readFile(filePath);
  var sheet_name_list = workbook.SheetNames;
  var Excel = require("exceljs");
  var workbook = new Excel.Workbook();
  var cnt = 1;
  var json_ary = [];
  ///var batch_id = String(Math.floor(Math.random() * 100) + 2 + "" + new Date().getTime());
  workbook.xlsx.readFile(filePath).then(function () {
    var worksheet = workbook.getWorksheet(sheet_name_list[0]);
    worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
      currRow = worksheet.getRow(rowNumber);
      if (cnt > 1 && currRow.getCell(1).value && currRow.getCell(5).value && currRow.getCell(6).value && currRow.getCell(7).value && currRow.getCell(9).value 
        && currRow.getCell(10).value ) {

        // && currRow.getCell(11).value && currRow.getCell(12).value

      // && currRow.getCell(8).value


        var type = "";
        var company_name = "";
        var invoice_no = "";
        var bank_name = "";
        var currency = "";
        var amount_in_fc = "";
        var start_date = "";
        var from_date = "";
        var to_date = "";
        var spot = "";
        var premium = "";
        var bank_margin = "";
       
        type = currRow.getCell(1).value;
        invoice_no = currRow.getCell(2).value;
        company_name = currRow.getCell(3).value;
        bank_name = currRow.getCell(4).value;
        currency = currRow.getCell(5).value;
         currency = currency.replace(/\s+/g,'');
        amount_in_fc = currRow.getCell(6).value;
        start_date = currRow.getCell(7).value;
        from_date = currRow.getCell(8).value;
        to_date = currRow.getCell(9).value;
        spot = currRow.getCell(10).value;
        premium = currRow.getCell(11).value;
        bank_margin = currRow.getCell(12).value;

        // console.log( premium = currRow.getCell(11).value);
        // console.log( bank_margin = currRow.getCell(12).value)

        //  type = type.trim();
        // invoice_no = invoice_no.trim();
        // company_name = company_name.trim();
        // bank_name = bank_name.trim();
        // currency = currency.trim(); 
        // amount_in_fc = amount_in_fc.trim();
        // start_date = start_date.trim();
        // from_date = from_date.trim();
        // to_date = to_date.trim();
        // spot = spot.trim();
        // premium = premium.trim();
        // bank_margin = bank_margin.trim();


        if (type) {
          type = type.toString();
          type = type.trim();
        }
        if (company_name) {
          company_name = company_name.toString();
          company_name = company_name.trim();
        }
         if (invoice_no) {
          invoice_no = invoice_no.toString();
          invoice_no = invoice_no.trim();
        }
        if (bank_name) {
          bank_name = bank_name.toString();
          bank_name = bank_name.trim();
        }
        if (currency) {
          currency = currency.toString();
          currency = currency.trim();
        }
      
        if (amount_in_fc) {
          amount_in_fc = amount_in_fc.toString();
          amount_in_fc = amount_in_fc.trim();
        }
        if (start_date) {
          start_date = start_date.toString();
          start_date = start_date.trim();
        }
        if (from_date) {
          from_date = from_date.toString();
          from_date = from_date.trim();
        }

         if (to_date) {
          to_date = to_date.toString();
          to_date = to_date.trim();
        }
         if (spot) {
          spot = spot.toString();
          spot = spot.trim();
        }
         if (premium) {
          premium = premium.toString();
          premium = premium.trim();
        }
        if (bank_margin) {
          bank_margin = bank_margin.toString();
          bank_margin = bank_margin.trim();
        }
         
        // premium = premium.toString();
        // bank_margin = bank_margin.toString();




        // if (userid) {

        json_ary.push({
          userid: (userid),
          type: type,
          company_name: company_name,
          invoice_no: invoice_no,
          bank_name: bank_name,
          currency: (currency),
          amount_in_fc: (amount_in_fc),
          start_date: (start_date),
          from_date: (from_date),
          to_date: (to_date),
          spot: (spot),
          premium: (premium),
          bank_margin: (bank_margin),
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 'admin',
          updated_by: 'admin',
        });


      
        // }
      }
      cnt++;
    });
   
   console.log('json_ary',json_ary)
    Forexsellexcel.collection.insertMany(json_ary, function (err, docs) {
      if (err) {
        //return console.error(err);
        res.json({ response: false, message: "Excel not uploaded" });
      } else {
        res.json({ response: true, message: "Excel has been successfully uploaded", filepath: filePath, count: json_ary.length });
      }
    });
  });

})


router.post('/getforexsellexceldata', function (req, res, next) {
  let userid = req.body.userid;
  let type = req.body.type;
  console.log({ userid: { '$eq': userid }, type: { '$eq': type } })
  Forexsellexcel.find({ userid: { '$eq': userid }, type: { '$eq': type } }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      
      res.json({ response: true, message: "Data found", details: user });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});





router.post('/getusdcalculation', function (req, res, next) {
  let applicable_date = req.body.applicable_date;
  let newapplicable_date = req.body.newapplicable_date;
  let due_date = req.body.due_date;
  let currency = req.body.currency;
  let premonthlastdate = req.body.premonthlastdate;
  let newdue_date = req.body.newdue_date;
  let choosedatemonthlast_date = req.body.choosedatemonthlast_date;
  let choosedatepremonthlast_date = req.body.choosedatepremonthlast_date;

  // console.log(req.body.currency)
  // console.log(req.body.applicable_date);
  // console.log(req.body.due_date);
  // console.log(premonthlastdate);

  // console.log('choosedatemonthlast_date',choosedatemonthlast_date);
  // console.log('choosedatepremonthlast_date',choosedatepremonthlast_date);


  if (currency == "USD") {


     var count1 = function (callback) {
      let app_date = applicable_date.split(" ");
      Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })
    };


      var count2 = function (callback) {
      let app_date = applicable_date.split(" ");
      Usdinrpremiumexcel.find({ settled_date: { '$eq': premonthlastdate }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)

           if (res1.length==0) {

             var premonthlastdate1=new Date(premonthlastdate);
           premonthlastdate1.setDate(premonthlastdate1.getDate() - 1);
            console.log("Prev Date="+premonthlastdate1);

            Usdinrpremiumexcel.find({ settled_date: { '$eq': premonthlastdate1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })



           } else {

             let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }


           }

         

          
        }
      })
    };


     var count3 = function (callback) {
      let app_date = applicable_date.split(" ");
      Usdinrpremiumexcel.find({ settled_date: { '$eq': due_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)

           if (res1.length==0) {

             var due_date1=new Date(due_date);
           due_date1.setDate(due_date1.getDate() - 1);
            console.log("Prev Date="+due_date1);
           
             Usdinrpremiumexcel.find({ settled_date: { '$eq': due_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {


             let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }
        }
  }
      })
    };





       var count4 = function (callback) {
      let app_date = newapplicable_date.split(" ");
      // Spotrateexcel.find({
      //   applicable_date: { '$regex': app_date[3] }
       Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
      }, function (err, res4) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res4)
          let arr = [];
          for (let i = 0; i < res4.length; i++) {
            var temp = res4[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res4.length; i++) {
           // console.log('arrdown',arr)
            var temp = res4[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res4[i]);
              arr = [];
              arr.push(res4[i])
              callback(null, arr); 
            }


          }

          
        }
      })
    };


     var count5 = function (callback) {
      let app_date = newapplicable_date.split(" ");
      Usdinrpremiumexcel.find({ settled_date: { '$eq': premonthlastdate }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)

           if (res1.length==0) {

             var premonthlastdate1=new Date(premonthlastdate);
           premonthlastdate1.setDate(premonthlastdate1.getDate() - 1);
            console.log("Prev Date="+premonthlastdate1);

            Usdinrpremiumexcel.find({ settled_date: { '$eq': premonthlastdate1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {


            let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }


          }

        }
      })
    };


    var count6 = function (callback) {
      let app_date = newapplicable_date.split(" ");
      Usdinrpremiumexcel.find({ settled_date: { '$eq': due_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          
          if (res1.length==0) {
               var due_date1=new Date(due_date);
               due_date1.setDate(due_date1.getDate() - 1);
            console.log("Prev Date="+due_date1);
              Usdinrpremiumexcel.find({ settled_date: { '$eq': due_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })



          } else {

             let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }
       }
     }

      })
    };


     var count7 = function (callback) {
      let app_date = newdue_date.split(" ");
      Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
      }, function (err, res7) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res7)
          let arr = [];
          for (let i = 0; i < res7.length; i++) {
            var temp = res7[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res7.length; i++) {
           // console.log('arrdown',arr)
            var temp = res7[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res7[i]);
              arr = [];
              arr.push(res7[i])
              callback(null, arr); 
            }


          }

          
        }
      })
    };


  var count8 = function (callback) {
      let app_date = applicable_date.split(" ");
      Usdinrpremiumexcel.find({ settled_date: { '$eq': choosedatemonthlast_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)

            if (res1.length==0) {

              var choosedatemonthlast_date1=new Date(choosedatemonthlast_date);
           choosedatemonthlast_date1.setDate(choosedatemonthlast_date1.getDate() - 1);
            console.log("Prev Date="+choosedatemonthlast_date1);
             Usdinrpremiumexcel.find({ settled_date: { '$eq': choosedatemonthlast_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


            } else {


               let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }
       }
    }
      })
    };



      var count9 = function (callback) {
      let app_date = applicable_date.split(" ");
      Usdinrpremiumexcel.find({ settled_date: { '$eq': choosedatepremonthlast_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)

           if (res1.length==0) {

             var choosedatepremonthlast_date1=new Date(choosedatepremonthlast_date);
           choosedatepremonthlast_date1.setDate(choosedatepremonthlast_date1.getDate() - 1);
            console.log("Prev Date="+choosedatepremonthlast_date1);

             Usdinrpremiumexcel.find({ settled_date: { '$eq': choosedatepremonthlast_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {

              let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }



           }

        
          
        }
      })
    };



  } else if (currency == "EUR") {
     var count1 = function (callback) {
      let app_date = applicable_date.split(" ");
      Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }


          }

          
        }
      })
    };


    var count2 = function (callback) {
      let app_date = applicable_date.split(" ");
      Eurinrpremiumexcel.find({ settled_date: { '$eq': premonthlastdate }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          
          if (res1.length==0) {

             var premonthlastdate1=new Date(premonthlastdate);
           premonthlastdate1.setDate(premonthlastdate1.getDate() - 1);
            console.log("Prev Date="+premonthlastdate1);

              Eurinrpremiumexcel.find({ settled_date: { '$eq': premonthlastdate1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })



          } else {


          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }


          }
       }
      })
    };


    var count3 = function (callback) {
      let app_date = applicable_date.split(" ");
      Eurinrpremiumexcel.find({ settled_date: { '$eq': due_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)

            if (res1.length==0) {

               var due_date1=new Date(due_date);
           due_date1.setDate(due_date1.getDate() - 1);
            console.log("Prev Date="+due_date1);
             
             Eurinrpremiumexcel.find({ settled_date: { '$eq': due_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


            } else {

                 let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }


            }
         }
      })
    };



     var count4 = function (callback) {
      let app_date = newapplicable_date.split(" ");
     Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
      }, function (err, res4) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res4)
          let arr = [];
          for (let i = 0; i < res4.length; i++) {
            var temp = res4[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          
          
          for (let i = 0; i < res4.length; i++) {
           // console.log('arrdown',arr)
            var temp = res4[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res4[i]);
              arr = [];
              arr.push(res4[i])
              callback(null, arr); 
            }


          }

          
        }
      })
    };


    var count5 = function (callback) {
      let app_date = newapplicable_date.split(" ");
      Eurinrpremiumexcel.find({ settled_date: { '$eq': premonthlastdate }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
           
           if (res1.length==0) {
          
            var premonthlastdate1=new Date(premonthlastdate);
           premonthlastdate1.setDate(premonthlastdate1.getDate() - 1);
            console.log("Prev Date="+premonthlastdate1);

      Eurinrpremiumexcel.find({ settled_date: { '$eq': premonthlastdate1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {

             let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }
       }
     }
      })
    };



     var count6 = function (callback) {
      let app_date = newapplicable_date.split(" ");
      Eurinrpremiumexcel.find({ settled_date: { '$eq': due_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)

            if (res1.length==0) {

               var due_date1=new Date(due_date);
           due_date1.setDate(due_date1.getDate() - 1);
            console.log("Prev Date="+due_date1);
             
              Eurinrpremiumexcel.find({ settled_date: { '$eq': due_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


            } else {

                let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }


            }
 }
      })
    };

      var count7 = function (callback) {
      let app_date = newdue_date.split(" ");
     Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
      }, function (err, res7) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res7)
          let arr = [];
          for (let i = 0; i < res7.length; i++) {
            var temp = res7[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          
          
          for (let i = 0; i < res7.length; i++) {
           // console.log('arrdown',arr)
            var temp = res7[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res7[i]);
              arr = [];
              arr.push(res7[i])
              callback(null, arr); 
            }


          }

          
        }
      })
    };



      var count8 = function (callback) {
      let app_date = applicable_date.split(" ");
      Eurinrpremiumexcel.find({ settled_date: { '$eq': choosedatemonthlast_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
           
           if (res1.length==0) {

             var choosedatemonthlast_date1=new Date(choosedatemonthlast_date);
           choosedatemonthlast_date1.setDate(choosedatemonthlast_date1.getDate() - 1);
            console.log("Prev Date="+choosedatemonthlast_date1);

             Eurinrpremiumexcel.find({ settled_date: { '$eq': choosedatemonthlast_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {

             let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }


           }
        }
      })
    };



  var count9 = function (callback) {
      let app_date = applicable_date.split(" ");
      Eurinrpremiumexcel.find({ settled_date: { '$eq': choosedatepremonthlast_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)

          if (res1.length==0) {

             var choosedatepremonthlast_date1=new Date(choosedatepremonthlast_date);
           choosedatepremonthlast_date1.setDate(choosedatepremonthlast_date1.getDate() - 1);
            console.log("Prev Date="+choosedatepremonthlast_date1);
         
          Eurinrpremiumexcel.find({ settled_date: { '$eq': choosedatepremonthlast_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


          } else {

             let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }




          }

         
          
        }
      })
    }

}if (currency == "GBP") {


  var count1 = function (callback) {
      let app_date = applicable_date.split(" ");
      Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }


          }

          
        }
      })
    };


    var count2 = function (callback) {
      let app_date = applicable_date.split(" ");
      Gbpinrpremiumexcel.find({ settled_date: { '$eq': premonthlastdate }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          
          if (res1.length==0) {

             var premonthlastdate1=new Date(premonthlastdate);
           premonthlastdate1.setDate(premonthlastdate1.getDate() - 1);
            console.log("Prev Date="+premonthlastdate1);

              Gbpinrpremiumexcel.find({ settled_date: { '$eq': premonthlastdate1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })



          } else {


          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }


          }
       }
      })
    };


    var count3 = function (callback) {
      let app_date = applicable_date.split(" ");
      Gbpinrpremiumexcel.find({ settled_date: { '$eq': due_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)

            if (res1.length==0) {

               var due_date1=new Date(due_date);
           due_date1.setDate(due_date1.getDate() - 1);
            console.log("Prev Date="+due_date1);
             
             Gbpinrpremiumexcel.find({ settled_date: { '$eq': due_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


            } else {

                 let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }


            }
         }
      })
    };



     var count4 = function (callback) {
      let app_date = newapplicable_date.split(" ");
     Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
      }, function (err, res4) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res4)
          let arr = [];
          for (let i = 0; i < res4.length; i++) {
            var temp = res4[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          
          
          for (let i = 0; i < res4.length; i++) {
           // console.log('arrdown',arr)
            var temp = res4[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res4[i]);
              arr = [];
              arr.push(res4[i])
              callback(null, arr); 
            }


          }

          
        }
      })
    };


    var count5 = function (callback) {
      let app_date = newapplicable_date.split(" ");
      Gbpinrpremiumexcel.find({ settled_date: { '$eq': premonthlastdate }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
           
           if (res1.length==0) {
          
            var premonthlastdate1=new Date(premonthlastdate);
           premonthlastdate1.setDate(premonthlastdate1.getDate() - 1);
            console.log("Prev Date="+premonthlastdate1);

      Gbpinrpremiumexcel.find({ settled_date: { '$eq': premonthlastdate1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {

             let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }
       }
     }
      })
    };



     var count6 = function (callback) {
      let app_date = newapplicable_date.split(" ");
      Gbpinrpremiumexcel.find({ settled_date: { '$eq': due_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)

            if (res1.length==0) {

               var due_date1=new Date(due_date);
           due_date1.setDate(due_date1.getDate() - 1);
            console.log("Prev Date="+due_date1);
             
              Gbpinrpremiumexcel.find({ settled_date: { '$eq': due_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


            } else {

                let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }


            }
 }
      })
    };

      var count7 = function (callback) {
      let app_date = newdue_date.split(" ");
     Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
      }, function (err, res7) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res7)
          let arr = [];
          for (let i = 0; i < res7.length; i++) {
            var temp = res7[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          
          
          for (let i = 0; i < res7.length; i++) {
           // console.log('arrdown',arr)
            var temp = res7[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res7[i]);
              arr = [];
              arr.push(res7[i])
              callback(null, arr); 
            }


          }

          
        }
      })
    };



      var count8 = function (callback) {
      let app_date = applicable_date.split(" ");
      Gbpinrpremiumexcel.find({ settled_date: { '$eq': choosedatemonthlast_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
           
           if (res1.length==0) {

             var choosedatemonthlast_date1=new Date(choosedatemonthlast_date);
           choosedatemonthlast_date1.setDate(choosedatemonthlast_date1.getDate() - 1);
            console.log("Prev Date="+choosedatemonthlast_date1);

             Gbpinrpremiumexcel.find({ settled_date: { '$eq': choosedatemonthlast_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {

             let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }


           }
        }
      })
    };



  var count9 = function (callback) {
      let app_date = applicable_date.split(" ");
      Gbpinrpremiumexcel.find({ settled_date: { '$eq': choosedatepremonthlast_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)

          if (res1.length==0) {

             var choosedatepremonthlast_date1=new Date(choosedatepremonthlast_date);
           choosedatepremonthlast_date1.setDate(choosedatepremonthlast_date1.getDate() - 1);
            console.log("Prev Date="+choosedatepremonthlast_date1);
         
          Gbpinrpremiumexcel.find({ settled_date: { '$eq': choosedatepremonthlast_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


          } else {

             let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }




          }

         
          
        }
      })
    }



}if (currency == "JPY") {

  var count1 = function (callback) {
      let app_date = applicable_date.split(" ");
      Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }


          }

          
        }
      })
    };


    var count2 = function (callback) {
      let app_date = applicable_date.split(" ");
      Yeninrpremiumexcel.find({ settled_date: { '$eq': premonthlastdate }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          
          if (res1.length==0) {

             var premonthlastdate1=new Date(premonthlastdate);
           premonthlastdate1.setDate(premonthlastdate1.getDate() - 1);
            console.log("Prev Date="+premonthlastdate1);

              Yeninrpremiumexcel.find({ settled_date: { '$eq': premonthlastdate1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })



          } else {


          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }


          }
       }
      })
    };


    var count3 = function (callback) {
      let app_date = applicable_date.split(" ");
      Yeninrpremiumexcel.find({ settled_date: { '$eq': due_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)

            if (res1.length==0) {

               var due_date1=new Date(due_date);
           due_date1.setDate(due_date1.getDate() - 1);
            console.log("Prev Date="+due_date1);
             
             Yeninrpremiumexcel.find({ settled_date: { '$eq': due_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


            } else {

                 let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }


            }
         }
      })
    };



     var count4 = function (callback) {
      let app_date = newapplicable_date.split(" ");
     Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
      }, function (err, res4) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res4)
          let arr = [];
          for (let i = 0; i < res4.length; i++) {
            var temp = res4[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          
          
          for (let i = 0; i < res4.length; i++) {
           // console.log('arrdown',arr)
            var temp = res4[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res4[i]);
              arr = [];
              arr.push(res4[i])
              callback(null, arr); 
            }


          }

          
        }
      })
    };


    var count5 = function (callback) {
      let app_date = newapplicable_date.split(" ");
      Yeninrpremiumexcel.find({ settled_date: { '$eq': premonthlastdate }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
           
           if (res1.length==0) {
          
            var premonthlastdate1=new Date(premonthlastdate);
           premonthlastdate1.setDate(premonthlastdate1.getDate() - 1);
            console.log("Prev Date="+premonthlastdate1);

      Yeninrpremiumexcel.find({ settled_date: { '$eq': premonthlastdate1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {

             let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }
       }
     }
      })
    };



     var count6 = function (callback) {
      let app_date = newapplicable_date.split(" ");
      Yeninrpremiumexcel.find({ settled_date: { '$eq': due_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)

            if (res1.length==0) {

               var due_date1=new Date(due_date);
           due_date1.setDate(due_date1.getDate() - 1);
            console.log("Prev Date="+due_date1);
             
              Yeninrpremiumexcel.find({ settled_date: { '$eq': due_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


            } else {

                let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }


            }
 }
      })
    };

      var count7 = function (callback) {
      let app_date = newdue_date.split(" ");
     Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
      }, function (err, res7) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res7)
          let arr = [];
          for (let i = 0; i < res7.length; i++) {
            var temp = res7[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          
          
          for (let i = 0; i < res7.length; i++) {
           // console.log('arrdown',arr)
            var temp = res7[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res7[i]);
              arr = [];
              arr.push(res7[i])
              callback(null, arr); 
            }


          }

          
        }
      })
    };



      var count8 = function (callback) {
      let app_date = applicable_date.split(" ");
      Yeninrpremiumexcel.find({ settled_date: { '$eq': choosedatemonthlast_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
           
           if (res1.length==0) {

             var choosedatemonthlast_date1=new Date(choosedatemonthlast_date);
           choosedatemonthlast_date1.setDate(choosedatemonthlast_date1.getDate() - 1);
            console.log("Prev Date="+choosedatemonthlast_date1);

             Yeninrpremiumexcel.find({ settled_date: { '$eq': choosedatemonthlast_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {

             let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }


           }
        }
      })
    };



  var count9 = function (callback) {
      let app_date = applicable_date.split(" ");
      Yeninrpremiumexcel.find({ settled_date: { '$eq': choosedatepremonthlast_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)

          if (res1.length==0) {

             var choosedatepremonthlast_date1=new Date(choosedatepremonthlast_date);
           choosedatepremonthlast_date1.setDate(choosedatepremonthlast_date1.getDate() - 1);
            console.log("Prev Date="+choosedatepremonthlast_date1);
         
          Yeninrpremiumexcel.find({ settled_date: { '$eq': choosedatepremonthlast_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


          } else {

             let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }




          }

         
          
        }
      })
    }



}if (currency == "EUR-USD") {

  var count1 = function (callback) {
      let app_date = applicable_date.split(" ");
      Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }


          }

          
        }
      })
    };


    var count2 = function (callback) {
      let app_date = applicable_date.split(" ");
      EurUsdinrpremiumexcel.find({ settled_date: { '$eq': premonthlastdate }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          
          if (res1.length==0) {

             var premonthlastdate1=new Date(premonthlastdate);
           premonthlastdate1.setDate(premonthlastdate1.getDate() - 1);
            console.log("Prev Date="+premonthlastdate1);

              EurUsdinrpremiumexcel.find({ settled_date: { '$eq': premonthlastdate1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })



          } else {


          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }


          }
       }
      })
    };


    var count3 = function (callback) {
      let app_date = applicable_date.split(" ");
      EurUsdinrpremiumexcel.find({ settled_date: { '$eq': due_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)

            if (res1.length==0) {

               var due_date1=new Date(due_date);
           due_date1.setDate(due_date1.getDate() - 1);
            console.log("Prev Date="+due_date1);
             
             EurUsdinrpremiumexcel.find({ settled_date: { '$eq': due_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


            } else {

                 let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }


            }
         }
      })
    };



     var count4 = function (callback) {
      let app_date = newapplicable_date.split(" ");
     Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
      }, function (err, res4) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res4)
          let arr = [];
          for (let i = 0; i < res4.length; i++) {
            var temp = res4[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          
          
          for (let i = 0; i < res4.length; i++) {
           // console.log('arrdown',arr)
            var temp = res4[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res4[i]);
              arr = [];
              arr.push(res4[i])
              callback(null, arr); 
            }


          }

          
        }
      })
    };


    var count5 = function (callback) {
      let app_date = newapplicable_date.split(" ");
      EurUsdinrpremiumexcel.find({ settled_date: { '$eq': premonthlastdate }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
           
           if (res1.length==0) {
          
            var premonthlastdate1=new Date(premonthlastdate);
           premonthlastdate1.setDate(premonthlastdate1.getDate() - 1);
            console.log("Prev Date="+premonthlastdate1);

      EurUsdinrpremiumexcel.find({ settled_date: { '$eq': premonthlastdate1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {

             let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }
       }
     }
      })
    };



     var count6 = function (callback) {
      let app_date = newapplicable_date.split(" ");
      EurUsdinrpremiumexcel.find({ settled_date: { '$eq': due_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)

            if (res1.length==0) {

               var due_date1=new Date(due_date);
           due_date1.setDate(due_date1.getDate() - 1);
            console.log("Prev Date="+due_date1);
             
              EurUsdinrpremiumexcel.find({ settled_date: { '$eq': due_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


            } else {

                let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }


            }
 }
      })
    };

      var count7 = function (callback) {
      let app_date = newdue_date.split(" ");
     Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
      }, function (err, res7) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res7)
          let arr = [];
          for (let i = 0; i < res7.length; i++) {
            var temp = res7[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          
          
          for (let i = 0; i < res7.length; i++) {
           // console.log('arrdown',arr)
            var temp = res7[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res7[i]);
              arr = [];
              arr.push(res7[i])
              callback(null, arr); 
            }


          }

          
        }
      })
    };



      var count8 = function (callback) {
      let app_date = applicable_date.split(" ");
      EurUsdinrpremiumexcel.find({ settled_date: { '$eq': choosedatemonthlast_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
           
           if (res1.length==0) {

             var choosedatemonthlast_date1=new Date(choosedatemonthlast_date);
           choosedatemonthlast_date1.setDate(choosedatemonthlast_date1.getDate() - 1);
            console.log("Prev Date="+choosedatemonthlast_date1);

             EurUsdinrpremiumexcel.find({ settled_date: { '$eq': choosedatemonthlast_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {

             let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }


           }
        }
      })
    };



  var count9 = function (callback) {
      let app_date = applicable_date.split(" ");
      EurUsdinrpremiumexcel.find({ settled_date: { '$eq': choosedatepremonthlast_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)

          if (res1.length==0) {

             var choosedatepremonthlast_date1=new Date(choosedatepremonthlast_date);
           choosedatepremonthlast_date1.setDate(choosedatepremonthlast_date1.getDate() - 1);
            console.log("Prev Date="+choosedatepremonthlast_date1);
         
          EurUsdinrpremiumexcel.find({ settled_date: { '$eq': choosedatepremonthlast_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


          } else {

             let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }




          }

         
          
        }
      })
    }



}if (currency == "GBP-USD") {


  var count1 = function (callback) {
      let app_date = applicable_date.split(" ");
      Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }


          }

          
        }
      })
    };


    var count2 = function (callback) {
      let app_date = applicable_date.split(" ");
      GbpUsdinrpremiumexcel.find({ settled_date: { '$eq': premonthlastdate }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          
          if (res1.length==0) {

             var premonthlastdate1=new Date(premonthlastdate);
           premonthlastdate1.setDate(premonthlastdate1.getDate() - 1);
            console.log("Prev Date="+premonthlastdate1);

              GbpUsdinrpremiumexcel.find({ settled_date: { '$eq': premonthlastdate1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })



          } else {


          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }


          }
       }
      })
    };


    var count3 = function (callback) {
      let app_date = applicable_date.split(" ");
      GbpUsdinrpremiumexcel.find({ settled_date: { '$eq': due_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)

            if (res1.length==0) {

               var due_date1=new Date(due_date);
           due_date1.setDate(due_date1.getDate() - 1);
            console.log("Prev Date="+due_date1);
             
             GbpUsdinrpremiumexcel.find({ settled_date: { '$eq': due_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


            } else {

                 let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }


            }
         }
      })
    };



     var count4 = function (callback) {
      let app_date = newapplicable_date.split(" ");
     Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
      }, function (err, res4) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res4)
          let arr = [];
          for (let i = 0; i < res4.length; i++) {
            var temp = res4[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          
          
          for (let i = 0; i < res4.length; i++) {
           // console.log('arrdown',arr)
            var temp = res4[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res4[i]);
              arr = [];
              arr.push(res4[i])
              callback(null, arr); 
            }


          }

          
        }
      })
    };


    var count5 = function (callback) {
      let app_date = newapplicable_date.split(" ");
      GbpUsdinrpremiumexcel.find({ settled_date: { '$eq': premonthlastdate }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
           
           if (res1.length==0) {
          
            var premonthlastdate1=new Date(premonthlastdate);
           premonthlastdate1.setDate(premonthlastdate1.getDate() - 1);
            console.log("Prev Date="+premonthlastdate1);

      GbpUsdinrpremiumexcel.find({ settled_date: { '$eq': premonthlastdate1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {

             let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }
       }
     }
      })
    };



     var count6 = function (callback) {
      let app_date = newapplicable_date.split(" ");
      GbpUsdinrpremiumexcel.find({ settled_date: { '$eq': due_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)

            if (res1.length==0) {

               var due_date1=new Date(due_date);
           due_date1.setDate(due_date1.getDate() - 1);
            console.log("Prev Date="+due_date1);
             
              GbpUsdinrpremiumexcel.find({ settled_date: { '$eq': due_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


            } else {

                let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }


            }
 }
      })
    };

      var count7 = function (callback) {
      let app_date = newdue_date.split(" ");
     Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
      }, function (err, res7) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res7)
          let arr = [];
          for (let i = 0; i < res7.length; i++) {
            var temp = res7[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          
          
          for (let i = 0; i < res7.length; i++) {
           // console.log('arrdown',arr)
            var temp = res7[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res7[i]);
              arr = [];
              arr.push(res7[i])
              callback(null, arr); 
            }


          }

          
        }
      })
    };



      var count8 = function (callback) {
      let app_date = applicable_date.split(" ");
      GbpUsdinrpremiumexcel.find({ settled_date: { '$eq': choosedatemonthlast_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
           
           if (res1.length==0) {

             var choosedatemonthlast_date1=new Date(choosedatemonthlast_date);
           choosedatemonthlast_date1.setDate(choosedatemonthlast_date1.getDate() - 1);
            console.log("Prev Date="+choosedatemonthlast_date1);

             GbpUsdinrpremiumexcel.find({ settled_date: { '$eq': choosedatemonthlast_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {

             let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }


           }
        }
      })
    };



  var count9 = function (callback) {
      let app_date = applicable_date.split(" ");
      GbpUsdinrpremiumexcel.find({ settled_date: { '$eq': choosedatepremonthlast_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)

          if (res1.length==0) {

             var choosedatepremonthlast_date1=new Date(choosedatepremonthlast_date);
           choosedatepremonthlast_date1.setDate(choosedatepremonthlast_date1.getDate() - 1);
            console.log("Prev Date="+choosedatepremonthlast_date1);
         
          GbpUsdinrpremiumexcel.find({ settled_date: { '$eq': choosedatepremonthlast_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


          } else {

             let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }




          }

         
          
        }
      })
    }


}

 async.parallel({ count1, count2, count3, count4, count5, count6, count7,count8,count9}, function (err, results) {
    // console.log(results);
    results['response'] = true;
    results['message'] = 'Data';
    res.json(results);
    res.end();
  });

});





// router.post('/getpcfccalculation', function (req, res, next) {
//   let applicable_date = req.body.choose_date;
//   let currency = req.body.currency;
// let from_date = req.body.from_date;


// console.log('applicable_date',applicable_date)
// console.log('from_date',from_date)

//   if (currency == "USD") {

//   var count1 = function (callback) {
//       let app_date = applicable_date.split(" ");
//      Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
//       }, function (err, res1) {
//         if (err) { callback(err, null); }
//         else {

//            // console.log('res1',res1)
//           let arr = [];
//           for (let i = 0; i < res1.length; i++) {
//             var temp = res1[i].applicable_date.split(" ");
//             if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
//               arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
//             }
//            // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
//           }
//           var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

//           //console.log('diffdate',diffdate)
        
//           arr.sort(function (a, b) {
//             var distancea = Math.abs(diffdate - a);
//             var distanceb = Math.abs(diffdate - b);
//             return distancea - distanceb; // sort a before b when the distance is smaller
//           });
//           // console.log('arrup',arr)

//           // for (var i = 0; i < arr.length; i++) {
//           //   console.log('inarray',arr[i])
//           // }
          
//           for (let i = 0; i < res1.length; i++) {
//            // console.log('arrdown',arr)
//             var temp = res1[i].applicable_date.split(" ");
//             if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
//              // console.log('1311',res1[i]);
//               arr = [];
//               arr.push(res1[i])
//               callback(null, arr); 
//             }


//           }

          
//         }
//       })
//     };

 

//   var count2 = function (callback) {
//       let app_date = from_date.split(" ");
//       Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
//       }, function (err, res2) {
//         if (err) { callback(err, null); }
//         else {

//            // console.log('res2',res2)
//           let arr = [];
//           for (let i = 0; i < res2.length; i++) {
//             var temp = res2[i].applicable_date.split(" ");
//             if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
//               arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
//             }
//            // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
//           }
//           var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

//           //console.log('diffdate',diffdate)
        
//           arr.sort(function (a, b) {
//             var distancea = Math.abs(diffdate - a);
//             var distanceb = Math.abs(diffdate - b);
//             return distancea - distanceb; // sort a before b when the distance is smaller
//           });
//           // console.log('arrup',arr)

//           // for (var i = 0; i < arr.length; i++) {
//           //   console.log('inarray',arr[i])
//           // }
          
//           for (let i = 0; i < res2.length; i++) {
//            // console.log('arrdown',arr)
//             var temp = res2[i].applicable_date.split(" ");
//             if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
//              // console.log('1311',res2[i]);
//               arr = [];
//               arr.push(res2[i])
//               callback(null, arr); 
//             }


//           }

          
//         }
//       })
//     };
 
  

//   } else {

//       var count1 = function (callback) {
//       let app_date = applicable_date.split(" ");
//      Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
//       }, function (err, res1) {
//         if (err) { callback(err, null); }
//         else {

//            // console.log('res1',res1)
//           let arr = [];
//           for (let i = 0; i < res1.length; i++) {
//             var temp = res1[i].applicable_date.split(" ");
//             if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
//               arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
//             }
//            // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
//           }
//           var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

//           //console.log('diffdate',diffdate)
        
//           arr.sort(function (a, b) {
//             var distancea = Math.abs(diffdate - a);
//             var distanceb = Math.abs(diffdate - b);
//             return distancea - distanceb; // sort a before b when the distance is smaller
//           });
//           // console.log('arrup',arr)

//           // for (var i = 0; i < arr.length; i++) {
//           //   console.log('inarray',arr[i])
//           // }
          
//           for (let i = 0; i < res1.length; i++) {
//            // console.log('arrdown',arr)
//             var temp = res1[i].applicable_date.split(" ");
//             if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
//              // console.log('1311',res1[i]);
//               arr = [];
//               arr.push(res1[i])
//               callback(null, arr); 
//             }


//           }

          
//         }
//       })
//     };



// var count2 = function (callback) {
//       let app_date = from_date.split(" ");
//      Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
//       }, function (err, res2) {
//         if (err) { callback(err, null); }
//         else {

//            // console.log('res2',res2)
//           let arr = [];
//           for (let i = 0; i < res2.length; i++) {
//             var temp = res2[i].applicable_date.split(" ");
//             if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
//               arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
//             }
//            // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
//           }
//           var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

//           //console.log('diffdate',diffdate)
        
//           arr.sort(function (a, b) {
//             var distancea = Math.abs(diffdate - a);
//             var distanceb = Math.abs(diffdate - b);
//             return distancea - distanceb; // sort a before b when the distance is smaller
//           });
//           // console.log('arrup',arr)

//           // for (var i = 0; i < arr.length; i++) {
//           //   console.log('inarray',arr[i])
//           // }
          
//           for (let i = 0; i < res2.length; i++) {
//            // console.log('arrdown',arr)
//             var temp = res2[i].applicable_date.split(" ");
//             if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
//              // console.log('1311',res2[i]);
//               arr = [];
//               arr.push(res2[i])
//               callback(null, arr); 
//             }


//           }

          
//         }
//       })
//     };
 
     

    


//   }

// async.parallel({ count1,count2}, function (err, results) {
//     // console.log(results);
//     results['response'] = true;
//     results['message'] = 'Data';
//     res.json(results);
//     res.end();
//   });

// });


router.post('/getpcfccalculation', function (req, res, next) {
//   let applicable_date = req.body.choose_date;
//   let currency = req.body.currency;
// let from_date = req.body.from_date;


// console.log('applicable_date',applicable_date)
// console.log('from_date',from_date)

 let applicable_date = req.body.choose_date;
  let currency = req.body.currency;
 let from_datepremonthlastdate = req.body.from_datepremonthlastdate;
   let from_datedatemonthlast_date = req.body.from_datedatemonthlast_date;



console.log('applicable_date',applicable_date)
console.log('from_datepremonthlastdate',from_datepremonthlastdate)


  if (currency == "USD") {

  var count1 = function (callback) {
      let app_date = applicable_date.split(" ");
     Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }


          }

          
        }
      })
    };


     var count2 = function (callback) {
      let app_date = applicable_date.split(" ");
      Usdinrpremiumexcel.find({ settled_date: { '$eq': from_datepremonthlastdate }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
            
            if (res1.length==0) {
               var from_datepremonthlastdate1=new Date(from_datepremonthlastdate);
           from_datepremonthlastdate1.setDate(from_datepremonthlastdate1.getDate() - 1);
            console.log("Prev Date="+from_datepremonthlastdate1);
             
              Usdinrpremiumexcel.find({ settled_date: { '$eq': from_datepremonthlastdate1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })



            } else {

           let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

            }
         }
      })
    };


      var count3 = function (callback) {
      let app_date = applicable_date.split(" ");
      Usdinrpremiumexcel.find({ settled_date: { '$eq': from_datedatemonthlast_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

          if (res1.length==0) {

             var from_datedatemonthlast_date1=new Date(from_datedatemonthlast_date);
           from_datedatemonthlast_date1.setDate(from_datedatemonthlast_date1.getDate() - 1);
            console.log("Prev Date="+from_datedatemonthlast_date1);

           Usdinrpremiumexcel.find({ settled_date: { '$eq': from_datedatemonthlast_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })

          } else {
           let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }



          }

          
        }
      })
    };

  } else if (currency == "EUR") {

      var count1 = function (callback) {
      let app_date = applicable_date.split(" ");
     Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }


          }

          
        }
      })
    };


      var count2 = function (callback) {
      let app_date = applicable_date.split(" ");
      Eurinrpremiumexcel.find({ settled_date: { '$eq': from_datepremonthlastdate }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)

           if (res1.length==0) {

             var from_datepremonthlastdate1=new Date(from_datepremonthlastdate);
           from_datepremonthlastdate1.setDate(from_datepremonthlastdate1.getDate() - 1);
            console.log("Prev Date="+from_datepremonthlastdate1);

            Eurinrpremiumexcel.find({ settled_date: { '$eq': from_datepremonthlastdate1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {

              let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }



           }
          
        }
      })
    };


      var count3 = function (callback) {
      let app_date = applicable_date.split(" ");
      Eurinrpremiumexcel.find({ settled_date: { '$eq': from_datedatemonthlast_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)

           if (res1.length==0) {

             var from_datedatemonthlast_date1=new Date(from_datedatemonthlast_date);
           from_datedatemonthlast_date1.setDate(from_datedatemonthlast_date1.getDate() - 1);
            console.log("Prev Date="+from_datedatemonthlast_date1);

      Eurinrpremiumexcel.find({ settled_date: { '$eq': from_datedatemonthlast_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {

            let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }


           }
         }
      })
    };

}else if (currency == "GBP") {

   var count1 = function (callback) {
      let app_date = applicable_date.split(" ");
     Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }


          }

          
        }
      })
    };


      var count2 = function (callback) {
      let app_date = applicable_date.split(" ");
      Gbpinrpremiumexcel.find({ settled_date: { '$eq': from_datepremonthlastdate }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)

           if (res1.length==0) {

             var from_datepremonthlastdate1=new Date(from_datepremonthlastdate);
           from_datepremonthlastdate1.setDate(from_datepremonthlastdate1.getDate() - 1);
            console.log("Prev Date="+from_datepremonthlastdate1);

            Gbpinrpremiumexcel.find({ settled_date: { '$eq': from_datepremonthlastdate1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {

              let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }



           }
          
        }
      })
    };


      var count3 = function (callback) {
      let app_date = applicable_date.split(" ");
      Gbpinrpremiumexcel.find({ settled_date: { '$eq': from_datedatemonthlast_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)

           if (res1.length==0) {

             var from_datedatemonthlast_date1=new Date(from_datedatemonthlast_date);
           from_datedatemonthlast_date1.setDate(from_datedatemonthlast_date1.getDate() - 1);
            console.log("Prev Date="+from_datedatemonthlast_date1);

      Gbpinrpremiumexcel.find({ settled_date: { '$eq': from_datedatemonthlast_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {

            let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }


           }
         }
      })
    };



}else if (currency == "JPY") {


  var count1 = function (callback) {
      let app_date = applicable_date.split(" ");
     Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }


          }

          
        }
      })
    };


      var count2 = function (callback) {
      let app_date = applicable_date.split(" ");
      Yeninrpremiumexcel.find({ settled_date: { '$eq': from_datepremonthlastdate }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)

           if (res1.length==0) {

             var from_datepremonthlastdate1=new Date(from_datepremonthlastdate);
           from_datepremonthlastdate1.setDate(from_datepremonthlastdate1.getDate() - 1);
            console.log("Prev Date="+from_datepremonthlastdate1);

            Yeninrpremiumexcel.find({ settled_date: { '$eq': from_datepremonthlastdate1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {

              let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }



           }
          
        }
      })
    };


      var count3 = function (callback) {
      let app_date = applicable_date.split(" ");
      Yeninrpremiumexcel.find({ settled_date: { '$eq': from_datedatemonthlast_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)

           if (res1.length==0) {

             var from_datedatemonthlast_date1=new Date(from_datedatemonthlast_date);
           from_datedatemonthlast_date1.setDate(from_datedatemonthlast_date1.getDate() - 1);
            console.log("Prev Date="+from_datedatemonthlast_date1);

      Yeninrpremiumexcel.find({ settled_date: { '$eq': from_datedatemonthlast_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {

            let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }


           }
         }
      })
    };


}else if (currency == "EUR-USD") {

  var count1 = function (callback) {
      let app_date = applicable_date.split(" ");
     Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }


          }

          
        }
      })
    };


      var count2 = function (callback) {
      let app_date = applicable_date.split(" ");
      EurUsdinrpremiumexcel.find({ settled_date: { '$eq': from_datepremonthlastdate }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)

           if (res1.length==0) {

             var from_datepremonthlastdate1=new Date(from_datepremonthlastdate);
           from_datepremonthlastdate1.setDate(from_datepremonthlastdate1.getDate() - 1);
            console.log("Prev Date="+from_datepremonthlastdate1);

            EurUsdinrpremiumexcel.find({ settled_date: { '$eq': from_datepremonthlastdate1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {

              let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }



           }
          
        }
      })
    };


      var count3 = function (callback) {
      let app_date = applicable_date.split(" ");
      EurUsdinrpremiumexcel.find({ settled_date: { '$eq': from_datedatemonthlast_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)

           if (res1.length==0) {

             var from_datedatemonthlast_date1=new Date(from_datedatemonthlast_date);
           from_datedatemonthlast_date1.setDate(from_datedatemonthlast_date1.getDate() - 1);
            console.log("Prev Date="+from_datedatemonthlast_date1);

      EurUsdinrpremiumexcel.find({ settled_date: { '$eq': from_datedatemonthlast_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {

            let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }


           }
         }
      })
    };


}else if (currency == "GBP-USD") {

  var count1 = function (callback) {
      let app_date = applicable_date.split(" ");
     Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

         // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }


          }

          
        }
      })
    };


      var count2 = function (callback) {
      let app_date = applicable_date.split(" ");
      GbpUsdinrpremiumexcel.find({ settled_date: { '$eq': from_datepremonthlastdate }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)

           if (res1.length==0) {

             var from_datepremonthlastdate1=new Date(from_datepremonthlastdate);
           from_datepremonthlastdate1.setDate(from_datepremonthlastdate1.getDate() - 1);
            console.log("Prev Date="+from_datepremonthlastdate1);

            GbpUsdinrpremiumexcel.find({ settled_date: { '$eq': from_datepremonthlastdate1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {

              let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }



           }
          
        }
      })
    };


      var count3 = function (callback) {
      let app_date = applicable_date.split(" ");
      GbpUsdinrpremiumexcel.find({ settled_date: { '$eq': from_datedatemonthlast_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)

           if (res1.length==0) {

             var from_datedatemonthlast_date1=new Date(from_datedatemonthlast_date);
           from_datedatemonthlast_date1.setDate(from_datedatemonthlast_date1.getDate() - 1);
            console.log("Prev Date="+from_datedatemonthlast_date1);

      GbpUsdinrpremiumexcel.find({ settled_date: { '$eq': from_datedatemonthlast_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {

            let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }


           }
         }
      })
    };


}

async.parallel({ count1,count2,count3}, function (err, results) {
    // console.log(results);
    results['response'] = true;
    results['message'] = 'Data';
    res.json(results);
    res.end();
  });

});





router.post('/getforexbuycalculation', function (req, res, next) {
  let applicable_date = req.body.choose_date;
  let currency = req.body.currency;
 let todatepremonthlastdate = req.body.todatepremonthlastdate;
   let todatedatemonthlast_date = req.body.todatedatemonthlast_date;



console.log('applicable_date',applicable_date)
console.log('todatepremonthlastdate',todatepremonthlastdate)

  if (currency == "USD") {

  var count1 = function (callback) {
      let app_date = applicable_date.split(" ");
    Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }


          }

          
        }
      })
    };


     var count2 = function (callback) {
      let app_date = applicable_date.split(" ");
      Usdinrpremiumexcel.find({ settled_date: { '$eq': todatepremonthlastdate }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          
          if (res1.length==0) {
             var todatepremonthlastdate1=new Date(todatepremonthlastdate);
           todatepremonthlastdate1.setDate(todatepremonthlastdate1.getDate() - 1);
            console.log("Prev Date="+todatepremonthlastdate1);

             Usdinrpremiumexcel.find({ settled_date: { '$eq': todatepremonthlastdate1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


          } else {

             let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }



          }
          
        }
      })
    };



  var count3 = function (callback) {
      let app_date = applicable_date.split(" ");
      Usdinrpremiumexcel.find({ settled_date: { '$eq': todatedatemonthlast_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)

           if (res1.length==0) {

             var todatedatemonthlast_date1=new Date(todatedatemonthlast_date);
           todatedatemonthlast_date1.setDate(todatedatemonthlast_date1.getDate() - 1);
            console.log("Prev Date="+todatedatemonthlast_date1);

             Usdinrpremiumexcel.find({ settled_date: { '$eq': todatedatemonthlast_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })




           } else {
            
            let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

         }

          
        }
      })
    };

  } else if (currency == "EUR"){

      var count1 = function (callback) {
      let app_date = applicable_date.split(" ");
     Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }


          }

          
        }
      })
    };

       var count2 = function (callback) {
      let app_date = applicable_date.split(" ");
      Eurinrpremiumexcel.find({ settled_date: { '$eq': todatepremonthlastdate }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          

          if (res1.length==0) {

             var todatepremonthlastdate1=new Date(todatepremonthlastdate);
           todatepremonthlastdate1.setDate(todatepremonthlastdate1.getDate() - 1);
            console.log("Prev Date="+todatepremonthlastdate1);

             Eurinrpremiumexcel.find({ settled_date: { '$eq': todatepremonthlastdate1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })

          } else {

                let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }
         
          }

        }
      })
    };


      var count3 = function (callback) {
      let app_date = applicable_date.split(" ");
      Eurinrpremiumexcel.find({ settled_date: { '$eq': todatedatemonthlast_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
           

           if (res1.length==0) {
             var todatedatemonthlast_date1=new Date(todatedatemonthlast_date);
           todatedatemonthlast_date1.setDate(todatedatemonthlast_date1.getDate() - 1);
            console.log("Prev Date="+todatedatemonthlast_date1);

             Eurinrpremiumexcel.find({ settled_date: { '$eq': todatedatemonthlast_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {

            let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }



           }

          
        }
      })
    }

  }else if (currency == "GBP"){
    // console.log('enter');

        var count1 = function (callback) {
      let app_date = applicable_date.split(" ");
     Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }


          }

          
        }
      })
    };

       var count2 = function (callback) {
      let app_date = applicable_date.split(" ");
      Gbpinrpremiumexcel.find({ settled_date: { '$eq': todatepremonthlastdate }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          

          if (res1.length==0) {

             var todatepremonthlastdate1=new Date(todatepremonthlastdate);
           todatepremonthlastdate1.setDate(todatepremonthlastdate1.getDate() - 1);
            console.log("Prev Date="+todatepremonthlastdate1);

             Gbpinrpremiumexcel.find({ settled_date: { '$eq': todatepremonthlastdate1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })

          } else {

                let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }
         
          }

        }
      })
    };


      var count3 = function (callback) {
      let app_date = applicable_date.split(" ");
      Gbpinrpremiumexcel.find({ settled_date: { '$eq': todatedatemonthlast_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
           

           if (res1.length==0) {
             var todatedatemonthlast_date1=new Date(todatedatemonthlast_date);
           todatedatemonthlast_date1.setDate(todatedatemonthlast_date1.getDate() - 1);
            console.log("Prev Date="+todatedatemonthlast_date1);

             Gbpinrpremiumexcel.find({ settled_date: { '$eq': todatedatemonthlast_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {

            let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }



           }

          
        }
      })
    }
  }else if (currency == "JPY"){

      var count1 = function (callback) {
      let app_date = applicable_date.split(" ");
     Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }


          }

          
        }
      })
    };

       var count2 = function (callback) {
      let app_date = applicable_date.split(" ");
      Yeninrpremiumexcel.find({ settled_date: { '$eq': todatepremonthlastdate }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          

          if (res1.length==0) {

             var todatepremonthlastdate1=new Date(todatepremonthlastdate);
           todatepremonthlastdate1.setDate(todatepremonthlastdate1.getDate() - 1);
            console.log("Prev Date="+todatepremonthlastdate1);

             Yeninrpremiumexcel.find({ settled_date: { '$eq': todatepremonthlastdate1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })

          } else {

                let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }
         
          }

        }
      })
    };


      var count3 = function (callback) {
      let app_date = applicable_date.split(" ");
      Yeninrpremiumexcel.find({ settled_date: { '$eq': todatedatemonthlast_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
           

           if (res1.length==0) {
             var todatedatemonthlast_date1=new Date(todatedatemonthlast_date);
           todatedatemonthlast_date1.setDate(todatedatemonthlast_date1.getDate() - 1);
            console.log("Prev Date="+todatedatemonthlast_date1);

             Yeninrpremiumexcel.find({ settled_date: { '$eq': todatedatemonthlast_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {

            let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }



           }

          
        }
      })
    }


  }else if (currency == "EUR-USD"){

        var count1 = function (callback) {
      let app_date = applicable_date.split(" ");
     Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
          }

          } 

          
        }
      })
    };

       var count2 = function (callback) {
      let app_date = applicable_date.split(" ");
      EurUsdinrpremiumexcel.find({ settled_date: { '$eq': todatepremonthlastdate }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          

          if (res1.length==0) {

             var todatepremonthlastdate1=new Date(todatepremonthlastdate);
           todatepremonthlastdate1.setDate(todatepremonthlastdate1.getDate() - 1);
            console.log("Prev Date="+todatepremonthlastdate1);

             EurUsdinrpremiumexcel.find({ settled_date: { '$eq': todatepremonthlastdate1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })

          } else {

                let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }
         
          }

        }
      })
    };


      var count3 = function (callback) {
      let app_date = applicable_date.split(" ");
      EurUsdinrpremiumexcel.find({ settled_date: { '$eq': todatedatemonthlast_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
           

           if (res1.length==0) {
             var todatedatemonthlast_date1=new Date(todatedatemonthlast_date);
           todatedatemonthlast_date1.setDate(todatedatemonthlast_date1.getDate() - 1);
            console.log("Prev Date="+todatedatemonthlast_date1);

             EurUsdinrpremiumexcel.find({ settled_date: { '$eq': todatedatemonthlast_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {

            let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }



           }

          
        }
      })
    }


  }else if (currency == "GBP-USD"){

        var count1 = function (callback) {
      let app_date = applicable_date.split(" ");
     Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }


          }

          
        }
      })
    };

       var count2 = function (callback) {
      let app_date = applicable_date.split(" ");
      GbpUsdinrpremiumexcel.find({ settled_date: { '$eq': todatepremonthlastdate }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          

          if (res1.length==0) {

             var todatepremonthlastdate1=new Date(todatepremonthlastdate);
           todatepremonthlastdate1.setDate(todatepremonthlastdate1.getDate() - 1);
            console.log("Prev Date="+todatepremonthlastdate1);

             GbpUsdinrpremiumexcel.find({ settled_date: { '$eq': todatepremonthlastdate1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })

          } else {

                let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }
         
          }

        }
      })
    };


      var count3 = function (callback) {
      let app_date = applicable_date.split(" ");
      GbpUsdinrpremiumexcel.find({ settled_date: { '$eq': todatedatemonthlast_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
           

           if (res1.length==0) {
             var todatedatemonthlast_date1=new Date(todatedatemonthlast_date);
           todatedatemonthlast_date1.setDate(todatedatemonthlast_date1.getDate() - 1);
            console.log("Prev Date="+todatedatemonthlast_date1);

             GbpUsdinrpremiumexcel.find({ settled_date: { '$eq': todatedatemonthlast_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {

            let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }



           }

          
        }
      })
    }


  }

async.parallel({ count1,count2,count3}, function (err, results) {
    // console.log(results);
    results['response'] = true;
    results['message'] = 'Data';
    res.json(results);
    res.end();
  });

});



router.post('/getforexsellcalculation', function (req, res, next) {
  let applicable_date = req.body.choose_date;
  let currency = req.body.currency;
  let from_datepremonthlastdate = req.body.from_datepremonthlastdate;
   let from_datedatemonthlast_date = req.body.from_datedatemonthlast_date;



console.log('applicable_date',applicable_date)
console.log('from_datepremonthlastdate',from_datepremonthlastdate)


  if (currency == "USD") {

  var count1 = function (callback) {
      let app_date = applicable_date.split(" ");
     Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }


          }

          
        }
      })
    };


     var count2 = function (callback) {
      let app_date = applicable_date.split(" ");
      Usdinrpremiumexcel.find({ settled_date: { '$eq': from_datepremonthlastdate }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)

           if (res1.length==0) {

             var from_datepremonthlastdate1=new Date(from_datepremonthlastdate);
           from_datepremonthlastdate1.setDate(from_datepremonthlastdate1.getDate() - 1);
            console.log("Prev Date="+from_datepremonthlastdate1);

              Usdinrpremiumexcel.find({ settled_date: { '$eq': from_datepremonthlastdate1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        } 
      })


           } else {

               let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }



           }

        } 
      })
    };


      var count3 = function (callback) {
      let app_date = applicable_date.split(" ");
      Usdinrpremiumexcel.find({ settled_date: { '$eq': from_datedatemonthlast_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
           
           if (res1.length==0) {
           //  var date1=new Date(from_datedatemonthlast_date);
           // date1.setDate(date1.getDate() - 1);
           //  console.log("Prev Date="+date1.getDate());

            var from_datedatemonthlast_date1=new Date(from_datedatemonthlast_date);
           from_datedatemonthlast_date1.setDate(from_datedatemonthlast_date1.getDate() - 1);
            console.log("Prev Date="+from_datedatemonthlast_date1);

            Usdinrpremiumexcel.find({ settled_date: { '$eq': from_datedatemonthlast_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
            let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })

           } else {


             let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }


           }

        

          
        }
      })
    };

  } else if (currency == "EUR"){

      var count1 = function (callback) {
      let app_date = applicable_date.split(" ");
     Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }


          }

          
        }
      })
    };


      var count2 = function (callback) {
      let app_date = applicable_date.split(" ");
      Eurinrpremiumexcel.find({ settled_date: { '$eq': from_datepremonthlastdate }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)

           if (res1.length==0) {
            var from_datepremonthlastdate1=new Date(from_datepremonthlastdate);
           from_datepremonthlastdate1.setDate(from_datepremonthlastdate1.getDate() - 1);
            console.log("Prev Date="+from_datepremonthlastdate1);
           
           Eurinrpremiumexcel.find({ settled_date: { '$eq': from_datepremonthlastdate1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {

              let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

       }
         
 }
      })
    };


      var count3 = function (callback) {
      let app_date = applicable_date.split(" ");
      Eurinrpremiumexcel.find({ settled_date: { '$eq': from_datedatemonthlast_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
           if (res1.length==0) {

            var from_datedatemonthlast_date1=new Date(from_datedatemonthlast_date);
           from_datedatemonthlast_date1.setDate(from_datedatemonthlast_date1.getDate() - 1);
            console.log("Prev Date="+from_datedatemonthlast_date1);

         Eurinrpremiumexcel.find({ settled_date: { '$eq': from_datedatemonthlast_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {

              let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }


           }
        }
      })

    }



  }else if (currency == "GBP"){


     var count1 = function (callback) {
      let app_date = applicable_date.split(" ");
     Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }


          }

          
        }
      })
    };


      var count2 = function (callback) {
      let app_date = applicable_date.split(" ");
      Gbpinrpremiumexcel.find({ settled_date: { '$eq': from_datepremonthlastdate }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)

           if (res1.length==0) {
            var from_datepremonthlastdate1=new Date(from_datepremonthlastdate);
           from_datepremonthlastdate1.setDate(from_datepremonthlastdate1.getDate() - 1);
            console.log("Prev Date="+from_datepremonthlastdate1);
           
           Gbpinrpremiumexcel.find({ settled_date: { '$eq': from_datepremonthlastdate1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {

              let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

       }
         
 }
      })
    };


      var count3 = function (callback) {
      let app_date = applicable_date.split(" ");
      Gbpinrpremiumexcel.find({ settled_date: { '$eq': from_datedatemonthlast_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
           if (res1.length==0) {

            var from_datedatemonthlast_date1=new Date(from_datedatemonthlast_date);
           from_datedatemonthlast_date1.setDate(from_datedatemonthlast_date1.getDate() - 1);
            console.log("Prev Date="+from_datedatemonthlast_date1);

         Gbpinrpremiumexcel.find({ settled_date: { '$eq': from_datedatemonthlast_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {

              let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }


           }
        }
      })

    }






  }else if (currency == "JPY"){


     var count1 = function (callback) {
      let app_date = applicable_date.split(" ");
     Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }


          }

          
        }
      })
    };


      var count2 = function (callback) {
      let app_date = applicable_date.split(" ");
      Yeninrpremiumexcel.find({ settled_date: { '$eq': from_datepremonthlastdate }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)

           if (res1.length==0) {
            var from_datepremonthlastdate1=new Date(from_datepremonthlastdate);
           from_datepremonthlastdate1.setDate(from_datepremonthlastdate1.getDate() - 1);
            console.log("Prev Date="+from_datepremonthlastdate1);
           
           Yeninrpremiumexcel.find({ settled_date: { '$eq': from_datepremonthlastdate1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {

              let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

       }
         
 }
      })
    };


      var count3 = function (callback) {
      let app_date = applicable_date.split(" ");
      Yeninrpremiumexcel.find({ settled_date: { '$eq': from_datedatemonthlast_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
           if (res1.length==0) {

            var from_datedatemonthlast_date1=new Date(from_datedatemonthlast_date);
           from_datedatemonthlast_date1.setDate(from_datedatemonthlast_date1.getDate() - 1);
            console.log("Prev Date="+from_datedatemonthlast_date1);

         Yeninrpremiumexcel.find({ settled_date: { '$eq': from_datedatemonthlast_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {

              let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }


           }
        }
      })

    }





  }else if (currency == "EUR-USD"){


     var count1 = function (callback) {
      let app_date = applicable_date.split(" ");
     Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }


          }

          
        }
      })
    };


      var count2 = function (callback) {
      let app_date = applicable_date.split(" ");
      EurUsdinrpremiumexcel.find({ settled_date: { '$eq': from_datepremonthlastdate }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)

           if (res1.length==0) {
            var from_datepremonthlastdate1=new Date(from_datepremonthlastdate);
           from_datepremonthlastdate1.setDate(from_datepremonthlastdate1.getDate() - 1);
            console.log("Prev Date="+from_datepremonthlastdate1);
           
           EurUsdinrpremiumexcel.find({ settled_date: { '$eq': from_datepremonthlastdate1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {

              let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

       }
         
 }
      })
    };


      var count3 = function (callback) {
      let app_date = applicable_date.split(" ");
      EurUsdinrpremiumexcel.find({ settled_date: { '$eq': from_datedatemonthlast_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
           if (res1.length==0) {

            var from_datedatemonthlast_date1=new Date(from_datedatemonthlast_date);
           from_datedatemonthlast_date1.setDate(from_datedatemonthlast_date1.getDate() - 1);
            console.log("Prev Date="+from_datedatemonthlast_date1);

         EurUsdinrpremiumexcel.find({ settled_date: { '$eq': from_datedatemonthlast_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {

              let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }


           }
        }
      })

    }





  }else if (currency == "GBP-USD"){


     var count1 = function (callback) {
      let app_date = applicable_date.split(" ");
     Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }


          }

          
        }
      })
    };


      var count2 = function (callback) {
      let app_date = applicable_date.split(" ");
      GbpUsdinrpremiumexcel.find({ settled_date: { '$eq': from_datepremonthlastdate }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)

           if (res1.length==0) {
            var from_datepremonthlastdate1=new Date(from_datepremonthlastdate);
           from_datepremonthlastdate1.setDate(from_datepremonthlastdate1.getDate() - 1);
            console.log("Prev Date="+from_datepremonthlastdate1);
           
           GbpUsdinrpremiumexcel.find({ settled_date: { '$eq': from_datepremonthlastdate1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {

              let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

       }
         
 }
      })
    };


      var count3 = function (callback) {
      let app_date = applicable_date.split(" ");
      GbpUsdinrpremiumexcel.find({ settled_date: { '$eq': from_datedatemonthlast_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
           if (res1.length==0) {

            var from_datedatemonthlast_date1=new Date(from_datedatemonthlast_date);
           from_datedatemonthlast_date1.setDate(from_datedatemonthlast_date1.getDate() - 1);
            console.log("Prev Date="+from_datedatemonthlast_date1);

         GbpUsdinrpremiumexcel.find({ settled_date: { '$eq': from_datedatemonthlast_date1 }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })


           } else {

              let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }


           }
        }
      })

    }




  }

async.parallel({ count1,count2,count3}, function (err, results) {
    // console.log(results);
    results['response'] = true;
    results['message'] = 'Data';
    res.json(results);
    res.end();
  });

});




router.post('/getpopupcalculation', function (req, res, next) {
  let applicable_date = req.body.applicable_date;
  let due_date = req.body.due_date;
  let currency = req.body.currency;
    // let due_datemonthlast_date = req.body.due_datemonthlast_date;
    let due_datepremonthlast_date = req.body.due_datepremonthlast_date;


  if (currency == "USD") {

  var count1 = function (callback) {
      let app_date = applicable_date.split(" ");
Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }


          }

          
        }
      })
    };

  // var count2 = function (callback) {
  //     Usdinrpremiumexcel.find({
  //       settled_date: { '$eq': due_date }, applicable_date: { '$eq': applicable_date }
  //     }, function (err, res2) {
  //       if (err) { callback(err, null); }
  //       else {
  //         callback(null, res2);
  //         console.log('res2', res2);
  //       }
  //     })
  //   };


 var count2 = function (callback) {
      let app_date = applicable_date.split(" ");
      Usdinrpremiumexcel.find({ settled_date: { '$eq': due_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })
    };




    // var count3 = function (callback) {
    //   Usdinrpremiumexcel.find({
    //     settled_date: { '$eq': due_datepremonthlast_date }, applicable_date: { '$eq': applicable_date }
    //   }, function (err, res3) {
    //     if (err) { callback(err, null); }
    //     else {
    //       callback(null, res3);
    //       console.log('res3', res3);
    //     }
    //   })
    // };


 var count3 = function (callback) {
      let app_date = applicable_date.split(" ");
      Usdinrpremiumexcel.find({ settled_date: { '$eq': due_datepremonthlast_date }, $or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
       
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
           // console.log('temp',temp)
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }

            // var firstdate = new Date(temp[3], monthNum(temp[1]), temp[2]).toString();
            // var seconddate =  new Date(arr[0]).toString();

            // console.log('firstdate,seconddate',firstdate,seconddate)


          }

          
        }
      })
    };

  
 
  

  } else {

      var count1 = function (callback) {
      let app_date = applicable_date.split(" ");
      Spotrateexcel.find({$or:[{ applicable_date: { '$regex': app_date[3] }},{ applicable_date: { '$regex': app_date[3]-1 }}]
      }, function (err, res1) {
        if (err) { callback(err, null); }
        else {

           // console.log('res1',res1)
          let arr = [];
          for (let i = 0; i < res1.length; i++) {
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]) <= new Date(app_date[3], monthNum(app_date[1]), app_date[2])) {
              arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
            }
           // arr.push(new Date(temp[3], monthNum(temp[1]), temp[2]))
          }
          var diffdate = new Date(app_date[3], monthNum(app_date[1]), app_date[2]);

          //console.log('diffdate',diffdate)
        
          arr.sort(function (a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
          });
          // console.log('arrup',arr)

          // for (var i = 0; i < arr.length; i++) {
          //   console.log('inarray',arr[i])
          // }
          
          for (let i = 0; i < res1.length; i++) {
           // console.log('arrdown',arr)
            var temp = res1[i].applicable_date.split(" ");
            if (new Date(temp[3], monthNum(temp[1]), temp[2]).getTime() == new Date(arr[0]).getTime()){
             // console.log('1311',res1[i]);
              arr = [];
              arr.push(res1[i])
              callback(null, arr); 
            }


          }

          
        }
      })
    };


 var count2 = function (callback) {
      Eurinrpremiumexcel.find({
        settled_date: { '$eq': due_date }, applicable_date: { '$eq': applicable_date }
      }, function (err, res2) {
        if (err) { callback(err, null); }
        else {
          callback(null, res2);
          console.log('res2', res2);
        }
      })
    };


    var count3 = function (callback) {
      Eurinrpremiumexcel.find({
        settled_date: { '$eq': due_datepremonthlast_date }, applicable_date: { '$eq': applicable_date }
      }, function (err, res3) {
        if (err) { callback(err, null); }
        else {
          callback(null, res3);
          console.log('res3', res3);
        }
      })
    };

     

    


  }

async.parallel({ count1,count2,count3}, function (err, results) {
    // console.log(results);
    results['response'] = true;
    results['message'] = 'Data';
    res.json(results);
    res.end();
  });

});






router.post('/getexposureaddition', function (req, res, next) {
 let userid = req.body.userid;
  let currency = req.body.currency;

    var count1 = function (callback) {
     Importinputexcel.aggregate([
      { $match: { currency: currency,userid: userid } },
      {
    $group: {
       _id: null,
       TotalPrice: {
        $sum: {

           $toDouble: "$amount_in_fc"
            }
         }
       }
    }
 ]).exec(function(err,res1){
  if (err) {callback(err,null);}
  else{
    callback(null,res1)
  }

});

};

    var count2 = function (callback) {
     Exportinputexcel.aggregate([
      { $match: { currency: currency,userid: userid } },
      {
    $group: {
       _id: null,
       TotalPrice: {
        $sum: {
           $toDouble: "$amount_in_fc"
            }
         }
       }
    }
 ]).exec(function(err,res2){
  if (err) {callback(err,null);}
  else{
    callback(null,res2)
  }

});

};


var count3 = function (callback) {
     Settledimportdata.aggregate([
      { $match: { currency: currency,userid: userid } },
      {
    $group: {
       _id: null,
       TotalPrice: {
        $sum: {
           $toDouble: "$amount_in_fc"
            }
         }
       }
    }
 ]).exec(function(err,res3){
  if (err) {callback(err,null);}
  else{
    callback(null,res3)
  }

});

};

var count4 = function (callback) {
     Settleddata.aggregate([
      { $match: { currency: currency,userid: userid } },
      {
    $group: {
       _id: null,
       TotalPrice: {
        $sum: {
           $toDouble: "$amount_in_fc"
            }
         }
       }
    }
 ]).exec(function(err,res4){
  if (err) {callback(err,null);}
  else{
    callback(null,res4)
  }

});

};



var count5 = function (callback) {
     Saveimportcalculation.aggregate([
      { $match: { currency: currency,userid: userid } },
      {
    $group: {
       _id: null,
       TotalPrice: {
        $sum: {
           $toDouble: "$profit_loss"
            }
         }
       }
    }
 ]).exec(function(err,res5){
  if (err) {callback(err,null);}
  else{
    console.log('res5',res5)
    callback(null,res5)
  }

});

};

var count6 = function (callback) {
     Saveexportcalculation.aggregate([
      { $match: { currency: currency,userid: userid } },
      {
    $group: {
       _id: null,
       TotalPrice: {
        $sum: {
           $toDouble: "$profit_loss"
            }
         }
       }
    }
 ]).exec(function(err,res6){
  if (err) {callback(err,null);}
  else{
    callback(null,res6)
  }

});

};



var count7 = function (callback) {
     Settledimportdata.aggregate([
      { $match: { currency: currency,userid: userid } },
      {
    $group: {
       _id: null,
       TotalPrice: {
        $sum: {
           $toDouble: "$profit_loss"
            }
         }
       }
    }
 ]).exec(function(err,res7){
  if (err) {callback(err,null);}
  else{
    callback(null,res7)
  }

});

};

var count8 = function (callback) {
     Settleddata.aggregate([
      { $match: { currency: currency,userid: userid } },
      {
    $group: {
       _id: null,
       TotalPrice: {
        $sum: {
           $toDouble: "$profit_loss"
            }
         }
       }
    }
 ]).exec(function(err,res8){
  if (err) {callback(err,null);}
  else{
    callback(null,res8)
  }

});

};


//*************top Exposure Amount***********//


var count17 = function (callback) {
     Saveimportcalculation.aggregate([
      { $match: { currency: currency,userid: userid } },
      {
    $group: {
       _id: null,
       TotalPrice: {
        $sum: {
           $toDouble: "$amount_in_fc"
            }
         }
       }
    }
 ]).exec(function(err,res17){
  if (err) {callback(err,null);}
  else{
    callback(null,res17)
  }

});

};

var count18 = function (callback) {
     Saveexportcalculation.aggregate([
      { $match: { currency: currency,userid: userid } },
      {
    $group: {
       _id: null,
       TotalPrice: {
        $sum: {
           $toDouble: "$amount_in_fc"
            }
         }
       }
    }
 ]).exec(function(err,res18){
  if (err) {callback(err,null);}
  else{
    callback(null,res18)
  }

});

};


//*************top Exposure Amount end***********//

//*******************Hedges*******************



    var count9 = function (callback) {
     Forexbuyexcel.aggregate([
      { $match: { currency: currency,userid: userid } },
      {
    $group: {
       _id: null,
       TotalPrice: {
        $sum: {
           $toDouble: "$amount_in_fc"
            }
         }
       }
    }
 ]).exec(function(err,res9){
  if (err) {callback(err,null);}
  else{
    callback(null,res9)
  }

});

};

    var count10 = function (callback) {
     Forexsellexcel.aggregate([
      { $match: { currency: currency,userid: userid } },
      {
    $group: {
       _id: null,
       TotalPrice: {
        $sum: {
           $toDouble: "$amount_in_fc"
            }
         }
       }
    }
 ]).exec(function(err,res10){
  if (err) {callback(err,null);}
  else{
    callback(null,res10)
  }

});

};


var count11 = function (callback) {
     Settledforexbuydata.aggregate([
      { $match: { currency: currency,userid: userid } },
      {
    $group: {
       _id: null,
       TotalPrice: {
        $sum: {
           $toDouble: "$amount_in_fc"
            }
         }
       }
    }
 ]).exec(function(err,res11){
  if (err) {callback(err,null);}
  else{
    callback(null,res11)
  }

});

};



var count12 = function (callback) {
     Settledforexselldata.aggregate([
      { $match: { currency: currency,userid: userid } },
      {
    $group: {
       _id: null,
       TotalPrice: {
        $sum: {
            $toDouble: "$amount_in_fc"
            }
         }
       }
    }
 ]).exec(function(err,res12){
  if (err) {callback(err,null);}
  else{
    callback(null,res12)
  }

});

};



var count13 = function (callback) {
     Saveforexbuycalculation.aggregate([
      { $match: { currency: currency,userid: userid } },
      {
    $group: {
       _id: null,
       TotalPrice: {
        $sum: {
           $toDouble: "$profit_loss"
            }
         }
       }
    }
 ]).exec(function(err,res13){
  if (err) {callback(err,null);}
  else{
    callback(null,res13)
  }

});

};

var count14 = function (callback) {
     Saveforexsellcalculation.aggregate([
      { $match: { currency: currency,userid: userid } },
      {
    $group: {
       _id: null,
       TotalPrice: {
        $sum: {
           $toDouble: "$profit_loss"
            }
         }
       }
    }
 ]).exec(function(err,res14){
  if (err) {callback(err,null);}
  else{
    callback(null,res14)
  }

});

};



var count15 = function (callback) {
     Settledforexbuydata.aggregate([
      { $match: { currency: currency,userid: userid,status:'Cancelled' } },
      {
    $group: {
       _id: null,
       TotalPrice: {
        $sum: {
           $toDouble: "$profit_loss"
            }
         }
       }
    }
 ]).exec(function(err,res15){
  if (err) {callback(err,null);}
  else{
    callback(null,res15)
  }

});

};

var count16 = function (callback) {
     Settledforexselldata.aggregate([
      { $match: { currency: currency,userid: userid,status:'Cancelled' } },
      {
    $group: {
       _id: null,
       TotalPrice: {
        $sum: {
           $toDouble: "$profit_loss"
            }
         }
       }
    }
 ]).exec(function(err,res16){
  if (err) {callback(err,null);}
  else{
    callback(null,res16)
  }

});

};



//*************top Hedges Amount***********//


var count19 = function (callback) {
     Saveforexbuycalculation.aggregate([
      { $match: { currency: currency,userid: userid } },
      {
    $group: {
       _id: null,
       TotalPrice: {
        $sum: {
           $toDouble: "$amount_in_fc"
            }
         }
       }
    }
 ]).exec(function(err,res19){
  if (err) {callback(err,null);}
  else{
    callback(null,res19)
  }

});

};

var count20 = function (callback) {
     Saveforexsellcalculation.aggregate([
      { $match: { currency: currency,userid: userid } },
      {
    $group: {
       _id: null,
       TotalPrice: {
        $sum: {
           $toDouble: "$amount_in_fc"
            }
         }
       }
    }
 ]).exec(function(err,res20){
  if (err) {callback(err,null);}
  else{
    callback(null,res20)
  }

});

};


//*************top Hedges Amount end***********//






async.parallel({ count1,count2,count3,count4,count5,count6,count7,count8,count9,count10,count11,count12,count13,count14,count15,count16,count17,count18,count19,count20}, function (err, results) {
    // console.log(results);
    results['response'] = true;
    results['message'] = 'Data';
    res.json(results);
    res.end();
  });

});


router.post('/getspotexceldata', function (req, res, next) {
  let userid = req.body.userid;
 var mymanualArray = [];

  Spotrateexcel.find({ userid: { '$eq': userid } }, async function (err, users) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (users) {
      // res.json({ response: true, message: "Data found", details: users });
for (var i = 0; i < users.length; i++) {
        // console.log(users[i]);
        let temp = {}

         //********start date******//
         let  date = new Date(users[i].applicable_date);
         let year = date.getFullYear();
         let month = date.getMonth()+1;
         let dt = date.getDate();
         if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }
        //********start date end******//

        
        
        temp['_id']=users[i]._id;
        temp['userid']=users[i].userid;
        temp['applicable_converdate']=users[i].applicable_converdate;
        temp['applicable_date']=users[i].applicable_date;
        temp['spotin_usd']=users[i].spotin_usd;
        temp['spotin_gbp']=users[i].spotin_gbp;
        temp['spotin_eur']=users[i].spotin_eur;
        temp['spotin_yen']=users[i].spotin_yen;
        temp['spotin_eur_usd']=users[i].spotin_eur_usd;
        temp['spotin_gbp_usd']=users[i].spotin_gbp_usd;
        temp['myconvertstart']=(dt+'-' + month + '-'+year);
      
        mymanualArray.push(temp);
      }
      console.log(mymanualArray)

      var XLSX = require('xlsx')
      var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/admindata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
        { header: "S no.", key: "s_no" },
        { header: "Applicable date", key: "myconvertstart" },
        { header: "USD Spot", key: "spotin_usd" },
        { header: "GBP Spot", key: "spotin_gbp" },
        { header: "EUR Spot", key: "spotin_eur" },
        { header: "YEN Spot", key: "spotin_yen" },
        { header: "EUR/USD Spot", key: "spotin_eur_usd" },
        { header: "GBP/USD Spot", key: "spotin_gbp_usd" },
        
      ];
      // Looping through User data
      let counter = 1;
      mymanualArray.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
        await workbook.xlsx.writeFile(`${path}/spotexceldata.xlsx`)
          .then(() => {
            console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
      } catch (err) {
        console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }
      res.json({ response: true, message: "Data found", details: users });


    } else {
      res.json({ response: false, message: "No Data found" });
    }
  })
});

// router.post('/getusdexceldata', function (req, res, next) {
//   let userid = req.body.userid;
//   Usdinrpremiumexcel.find({ userid: { '$eq': userid } }, async function (err, users) {
//     if (err) {
//       res.json({ response: false, message: err });
//     }
//     if (users) {
//       // res.json({ response: true, message: "Data found", details: users });

//        var XLSX = require('xlsx')
//       var Excel = require("exceljs");
//       const workbook = new Excel.Workbook();  // Create a new workbook
//       const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
//       const path = "./uploads/admindata";  // Path to download excel
//       // Column for data in excel. key must match data key
//       worksheet.columns = [
//         { header: "S no.", key: "s_no" },
//         { header: "Applicable date", key: "applicable_date" },
//          { header: "Currency", key: "currency" },
//         { header: "spotin_usd", key: "settled_date" },
//         { header: "Bid rate", key: "bid_rate" },
//          { header: "Offer rate", key: "offer_rate" },
        
//       ];
//       // Looping through User data

      
//       let counter = 1;
//       users.forEach((user) => {
        
//         user.s_no = counter;
//         worksheet.addRow(user); // Add data in worksheet
//         counter++;
//         //console.log(counter)
//       });

//       // console.log('worksheet',worksheet)
//       // Making first line in excel bold
//       worksheet.getRow(1).eachCell((cell) => {
//         cell.font = { bold: true };
//       });
//       try {
//          const data = await workbook.xlsx.writeFile(`${path}/usdpremiumexceldata.xlsx`)
//           .then(() => {
//             console.log("Success",users);
//             //res.json({ response: true, message: message, data: users });
//           });
//       } catch (err) {
//         console.log("Error");
//         //res.json({ response: false, message: "Something went wrong" });
//       }
//       res.json({ response: true, message: "Data found", details: users });


//     } else {
//       res.json({ response: false, message: "No Data found" });
//     }
//   })
// });

router.post('/getusdexceldata', function (req, res, next) {
  let userid = req.body.userid;
  var mymanualArray = [];

  Usdinrpremiumexcel.find({ userid: { '$eq': userid } }, async function (err, users) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (users) {
      // res.json({ response: true, message: "Data found", details: users });

      for (var i = 0; i < users.length; i++) {
        // console.log(users[i]);
        let temp = {}

         //********start date******//
         let  date = new Date(users[i].applicable_date);
         let year = date.getFullYear();
         let month = date.getMonth()+1;
         let dt = date.getDate();
         if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }
        //********start date end******//

          //********from date******//
          let  fromdate = new Date(users[i].settled_date);
          let fromyear = fromdate.getFullYear();
          let frommonth = fromdate.getMonth()+1;
          let fromdt = fromdate.getDate();
          if (fromdt < 10) {
            fromdt = '0' + fromdt;
          }
          if (frommonth < 10) {
            frommonth = '0' + frommonth;
          }
        //********from date end******//
        
        temp['_id']=users[i]._id;
        temp['userid']=users[i].userid;
        temp['applicable_converdate']=users[i].applicable_converdate;
        temp['applicable_date']=users[i].applicable_date;
        temp['bid_rate']=users[i].bid_rate;
        temp['currency']=users[i].currency;
        temp['offer_rate']=users[i].offer_rate;
        temp['settled_date']=users[i].settled_date;
        temp['source']=users[i].source;
        temp['tenor']=users[i].tenor;
        temp['myconvertstart']=(dt+'-' + month + '-'+year);
        temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
        mymanualArray.push(temp);
      }
      console.log(mymanualArray)

      var XLSX = require('xlsx')
      var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/admindata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
      { header: "S no.", key: "s_no" },
      { header: "Applicable date", key: "myconvertstart" },
      { header: "Currency", key: "currency" },
      { header: "Settled date", key: "myconvertfromdate" },
      { header: "Bid rate", key: "bid_rate" },
      { header: "Offer rate", key: "offer_rate" },

      ];
      // Looping through User data
      let counter = 1;
      mymanualArray.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
        await workbook.xlsx.writeFile(`${path}/usdpremiumexceldata.xlsx`)
        .then(() => {
          console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
      } catch (err) {
        console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }
      res.json({ response: true, message: "Data found", details: users });


    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});




// router.post('/geteurexceldata', function (req, res, next) {
//   let userid = req.body.userid;


//   Eurinrpremiumexcel.find({ userid: { '$eq': userid } }, async function (err, users) {
//     if (err) {
//       res.json({ response: false, message: err });
//     }
//     if (users) {
//       // res.json({ response: true, message: "Data found", details: users });

//   var XLSX = require('xlsx')
//       var Excel = require("exceljs");
//       const workbook = new Excel.Workbook();  // Create a new workbook
//       const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
//       const path = "./uploads/admindata";  // Path to download excel
//       // Column for data in excel. key must match data key
//       worksheet.columns = [
//         { header: "S no.", key: "s_no" },
//         { header: "Applicable date", key: "applicable_date" },
//          { header: "Currency", key: "currency" },
//         { header: "Settled date", key: "settled_date" },
//         { header: "Bid rate", key: "bid_rate" },
//          { header: "Offer rate", key: "offer_rate" },
        
//       ];
//       // Looping through User data
//       let counter = 1;
//       users.forEach((user) => {
//         user.s_no = counter;
//         worksheet.addRow(user); // Add data in worksheet
//         counter++;
//       });
//       // Making first line in excel bold
//       worksheet.getRow(1).eachCell((cell) => {
//         cell.font = { bold: true };
//       });
//       try {
//         await workbook.xlsx.writeFile(`${path}/eurpremiumexceldata.xlsx`)
//           .then(() => {
//             console.log("Success");
//             //res.json({ response: true, message: message, data: users });
//           });
//       } catch (err) {
//         console.log("Error");
//         //res.json({ response: false, message: "Something went wrong" });
//       }
//       res.json({ response: true, message: "Data found", details: users });


//     } else {
//       res.json({ response: false, message: "No Data found" });
//     }
//   });
// });


router.post('/geteurexceldata', function (req, res, next) {
  let userid = req.body.userid;
  var mymanualArray = [];

  Eurinrpremiumexcel.find({ userid: { '$eq': userid } }, async function (err, users) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (users) {
      // res.json({ response: true, message: "Data found", details: users });

      for (var i = 0; i < users.length; i++) {
        // console.log(users[i]);
        let temp = {}

         //********start date******//
         let  date = new Date(users[i].applicable_date);
         let year = date.getFullYear();
         let month = date.getMonth()+1;
         let dt = date.getDate();
         if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }
        //********start date end******//

          //********from date******//
          let  fromdate = new Date(users[i].settled_date);
          let fromyear = fromdate.getFullYear();
          let frommonth = fromdate.getMonth()+1;
          let fromdt = fromdate.getDate();
          if (fromdt < 10) {
            fromdt = '0' + fromdt;
          }
          if (frommonth < 10) {
            frommonth = '0' + frommonth;
          }
        //********from date end******//
        
        temp['_id']=users[i]._id;
        temp['userid']=users[i].userid;
        temp['applicable_converdate']=users[i].applicable_converdate;
        temp['applicable_date']=users[i].applicable_date;
        temp['bid_rate']=users[i].bid_rate;
        temp['currency']=users[i].currency;
        temp['offer_rate']=users[i].offer_rate;
        temp['settled_date']=users[i].settled_date;
        temp['source']=users[i].source;
        temp['tenor']=users[i].tenor;
        temp['myconvertstart']=(dt+'-' + month + '-'+year);
        temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
        mymanualArray.push(temp);
      }
     // console.log(mymanualArray)

     var XLSX = require('xlsx')
     var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/admindata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
      { header: "S no.", key: "s_no" },
      { header: "Applicable date", key: "myconvertstart" },
      { header: "Currency", key: "currency" },
      { header: "Settled date", key: "myconvertfromdate" },
      { header: "Bid rate", key: "bid_rate" },
      { header: "Offer rate", key: "offer_rate" },

      ];
      // Looping through User data
      let counter = 1;
      mymanualArray.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
        await workbook.xlsx.writeFile(`${path}/eurpremiumexceldata.xlsx`)
        .then(() => {
          console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
      } catch (err) {
        console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }
      res.json({ response: true, message: "Data found", details: users });


    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});


// router.post('/getspotexceldatewise', function (req, res, next) {
//   let userid = req.body.userid;
//   let applicable_date = req.body.applicable_date;
//   let applicable_date1 = req.body.applicable_date1;
//   Spotrateexcel.find({ applicable_converdate:{'$gte':new Date(applicable_date),'$lt':new Date(applicable_date1) }}, function (err, user) {
//    if (err) throw err
//         else {

//     if (user) {
//       res.json({ response: true, message: "Data found", details: user });
//     } else {
//       res.json({ response: false, message: "No Data found" });
//     }       

          
//         }
//       })
  




  
    
//   });



// router.post('/getspotexceldatewise', function (req, res, next) {
//  let userid = req.body.userid;
//   let applicable_date = req.body.applicable_date;
//   let applicable_date1 = req.body.applicable_date1;


//  Spotrateexcel.find({ applicable_converdate:{'$gte':new Date(applicable_date),'$lt':new Date(applicable_date1) }},async function (err, users) {
//     if (err) {
//       res.json({ response: false, message: err });
//     }
//     if (users) {
//       // res.json({ response: true, message: "Data found", details: user });

//      var XLSX = require('xlsx')
//       var Excel = require("exceljs");
//       const workbook = new Excel.Workbook();  // Create a new workbook
//       const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
//       const path = "./uploads/admindata/downloaddata";  // Path to download excel
//       // Column for data in excel. key must match data key
//       worksheet.columns = [
//         { header: "S no.", key: "s_no" },
//         { header: "Applicable date", key: "applicable_date" },
//          { header: "spotin eur", key: "spotin_eur" },
//         { header: "spotin usd", key: "spotin_usd" },
        
//       ];
//       // Looping through User data
//       let counter = 1;
//       users.forEach((user) => {
//         user.s_no = counter;
//         worksheet.addRow(user); // Add data in worksheet
//         counter++;
//       });
//       // Making first line in excel bold
//       worksheet.getRow(1).eachCell((cell) => {
//         cell.font = { bold: true };
//       });
//       try {
//         await workbook.xlsx.writeFile(`${path}/spotexceldata.xlsx`)
//           .then(() => {
//             console.log("Success");
//             //res.json({ response: true, message: message, data: users });
//           });
//       } catch (err) {
//         console.log("Error");
//         //res.json({ response: false, message: "Something went wrong" });
//       }
//       res.json({ response: true, message: "Data found", details: users });


//     } else {
//       res.json({ response: false, message: "No Data found" });
//     }
//   });
// });


router.post('/getspotexceldatewise', function (req, res, next) {
 let userid = req.body.userid;
 let applicable_date = req.body.applicable_date;
 let applicable_date1 = req.body.applicable_date1;
 var mymanualArray= [];

 Spotrateexcel.find({ applicable_converdate:{'$gte':new Date(applicable_date),'$lt':new Date(applicable_date1) }},async function (err, users) {
  if (err) {
    res.json({ response: false, message: err });
  }
  if (users) {
      // res.json({ response: true, message: "Data found", details: user });

      for (var i = 0; i < users.length; i++) {
        // console.log(users[i]);
        let temp = {}

         //********start date******//
         let  date = new Date(users[i].applicable_date);
         let year = date.getFullYear();
         let month = date.getMonth()+1;
         let dt = date.getDate();
         if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }
        //********start date end******//
        
        temp['_id']=users[i]._id;
        temp['userid']=users[i].userid;
        temp['applicable_converdate']=users[i].applicable_converdate;
        temp['applicable_date']=users[i].applicable_date;
        temp['spotin_eur']=users[i].spotin_eur;
        temp['spotin_usd']=users[i].spotin_usd;
        temp['spotin_gbp']=users[i].spotin_gbp;
        temp['spotin_gbp_usd']=users[i].spotin_gbp_usd;
        temp['spotin_yen']=users[i].spotin_yen;
        temp['spotin_eur_usd']=users[i].spotin_eur_usd;
        temp['offer_rate']=users[i].offer_rate;
        temp['settled_date']=users[i].settled_date;
        temp['myconvertstart']=(dt+'-' + month + '-'+year);
        mymanualArray.push(temp);
      }
     // console.log(mymanualArray)

     var XLSX = require('xlsx')
     var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/admindata/downloaddata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
      { header: "S no.", key: "s_no" },
      { header: "Applicable date", key: "myconvertstart" },
      { header: "spotin usd", key: "spotin_usd" },
      { header: "spotin GBP", key: "spotin_gbp" },
      { header: "spotin eur", key: "spotin_eur" },
      { header: "spotin YEN", key: "spotin_yen" },
      { header: "spotin EUR/USD", key: "spotin_eur_usd" },
      { header: "spotin GBP/USD", key: "spotin_gbp_usd" },
     

      ];
      // Looping through User data
      let counter = 1;
      mymanualArray.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
        await workbook.xlsx.writeFile(`${path}/spotexceldata.xlsx`)
        .then(() => {
          console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
      } catch (err) {
        console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }
      res.json({ response: true, message: "Data found", details: users });


    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});



// router.post('/getusdpremiumexceldatewise', function (req, res, next) {
//  let userid = req.body.userid;
//   let applicable_date = req.body.applicable_date;
//   let applicable_date1 = req.body.applicable_date1;


//  Usdinrpremiumexcel.find({ applicable_converdate:{'$gte':new Date(applicable_date),'$lt':new Date(applicable_date1) }},async function (err, users) {
//     if (err) {
//       res.json({ response: false, message: err });
//     }
//     if (users) {
//       // res.json({ response: true, message: "Data found", details: user });

//      var XLSX = require('xlsx')
//       var Excel = require("exceljs");
//       const workbook = new Excel.Workbook();  // Create a new workbook
//       const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
//       const path = "./uploads/admindata/downloaddata";  // Path to download excel
//       // Column for data in excel. key must match data key
//       worksheet.columns = [
//         { header: "S no.", key: "s_no" },
//         { header: "Applicable date", key: "applicable_date" },
//         { header: "Currency", key: "currency" },
//          { header: "Settled date", key: "settled_date" },
//          { header: "Tenor", key: "tenor" },
//         { header: "Bid rate", key: "bid_rate" },
//          { header: "offer rate", key: "offer_rate" },
        
//       ];
//       // Looping through User data
//       let counter = 1;
//       users.forEach((user) => {
//         user.s_no = counter;
//         worksheet.addRow(user); // Add data in worksheet
//         counter++;
//       });
//       // Making first line in excel bold
//       worksheet.getRow(1).eachCell((cell) => {
//         cell.font = { bold: true };
//       });
//       try {
//         await workbook.xlsx.writeFile(`${path}/usdpremiumexceldata.xlsx`)
//           .then(() => {
//             console.log("Success");
//             //res.json({ response: true, message: message, data: users });
//           });
//       } catch (err) {
//         console.log("Error");
//         //res.json({ response: false, message: "Something went wrong" });
//       }
//       res.json({ response: true, message: "Data found", details: users });


//     } else {
//       res.json({ response: false, message: "No Data found" });
//     }
//   });
// });


router.post('/getusdpremiumexceldatewise', function (req, res, next) {
 let userid = req.body.userid;
 let applicable_date = req.body.applicable_date;
 let applicable_date1 = req.body.applicable_date1;
 var mymanualArray = [];


 Usdinrpremiumexcel.find({ applicable_converdate:{'$gte':new Date(applicable_date),'$lt':new Date(applicable_date1) }},async function (err, users) {
  if (err) {
    res.json({ response: false, message: err });
  }
  if (users) {
      // res.json({ response: true, message: "Data found", details: user });

      for (var i = 0; i < users.length; i++) {
        // console.log(users[i]);
        let temp = {}

         //********start date******//
         let  date = new Date(users[i].applicable_date);
         let year = date.getFullYear();
         let month = date.getMonth()+1;
         let dt = date.getDate();
         if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }
        //********start date end******//

          //********from date******//
          let  fromdate = new Date(users[i].settled_date);
          let fromyear = fromdate.getFullYear();
          let frommonth = fromdate.getMonth()+1;
          let fromdt = fromdate.getDate();
          if (fromdt < 10) {
            fromdt = '0' + fromdt;
          }
          if (frommonth < 10) {
            frommonth = '0' + frommonth;
          }
        //********from date end******//
        
        temp['_id']=users[i]._id;
        temp['userid']=users[i].userid;
        temp['applicable_converdate']=users[i].applicable_converdate;
        temp['applicable_date']=users[i].applicable_date;
        temp['bid_rate']=users[i].bid_rate;
        temp['currency']=users[i].currency;
        temp['offer_rate']=users[i].offer_rate;
        temp['settled_date']=users[i].settled_date;
        temp['source']=users[i].source;
        temp['tenor']=users[i].tenor;
        temp['myconvertstart']=(dt+'-' + month + '-'+year);
        temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
        mymanualArray.push(temp);
      }
     // console.log(mymanualArray)

     var XLSX = require('xlsx')
     var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/admindata/downloaddata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
      { header: "S no.", key: "s_no" },
      { header: "Applicable date", key: "myconvertstart" },
      { header: "Currency", key: "currency" },
      { header: "Settled date", key: "myconvertfromdate" },
      { header: "Tenor", key: "tenor" },
      { header: "Bid rate", key: "bid_rate" },
      { header: "offer rate", key: "offer_rate" },

      ];
      // Looping through User data
      let counter = 1;
      mymanualArray.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
        await workbook.xlsx.writeFile(`${path}/usdpremiumexceldata.xlsx`)
        .then(() => {
          console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
      } catch (err) {
        console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }
      res.json({ response: true, message: "Data found", details: users });


    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});




// router.post('/geteurpremiumexceldatewise', function (req, res, next) {
//  let userid = req.body.userid;
//   let applicable_date = req.body.applicable_date;
//   let applicable_date1 = req.body.applicable_date1;


//  Eurinrpremiumexcel.find({ applicable_converdate:{'$gte':new Date(applicable_date),'$lt':new Date(applicable_date1) }},async function (err, users) {
//     if (err) {
//       res.json({ response: false, message: err });
//     }
//     if (users) {
//       // res.json({ response: true, message: "Data found", details: user });

//      var XLSX = require('xlsx')
//       var Excel = require("exceljs");
//       const workbook = new Excel.Workbook();  // Create a new workbook
//       const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
//       const path = "./uploads/admindata/downloaddata";  // Path to download excel
//       // Column for data in excel. key must match data key
//       worksheet.columns = [
//         { header: "S no.", key: "s_no" },
//         { header: "Applicable date", key: "applicable_date" },
//         { header: "Currency", key: "currency" },
//          { header: "Settled date", key: "settled_date" },
//          { header: "Tenor", key: "tenor" },
//         { header: "Bid rate", key: "bid_rate" },
//          { header: "offer rate", key: "offer_rate" },
        
//       ];
//       // Looping through User data
//       let counter = 1;
//       users.forEach((user) => {
//         user.s_no = counter;
//         worksheet.addRow(user); // Add data in worksheet
//         counter++;
//       });
//       // Making first line in excel bold
//       worksheet.getRow(1).eachCell((cell) => {
//         cell.font = { bold: true };
//       });
//       try {
//         await workbook.xlsx.writeFile(`${path}/eurpremiumexceldata.xlsx`)
//           .then(() => {
//             console.log("Success");
//             //res.json({ response: true, message: message, data: users });
//           });
//       } catch (err) {
//         console.log("Error");
//         //res.json({ response: false, message: "Something went wrong" });
//       }
//       res.json({ response: true, message: "Data found", details: users });


//     } else {
//       res.json({ response: false, message: "No Data found" });
//     }
//   });
// });


router.post('/geteurpremiumexceldatewise', function (req, res, next) {
 let userid = req.body.userid;
 let applicable_date = req.body.applicable_date;
 let applicable_date1 = req.body.applicable_date1;
 var mymanualArray = [];

 Eurinrpremiumexcel.find({ applicable_converdate:{'$gte':new Date(applicable_date),'$lt':new Date(applicable_date1) }},async function (err, users) {
  if (err) {
    res.json({ response: false, message: err });
  }
  if (users) {
      // res.json({ response: true, message: "Data found", details: user });

      for (var i = 0; i < users.length; i++) {
        // console.log(users[i]);
        let temp = {}

         //********start date******//
         let  date = new Date(users[i].applicable_date);
         let year = date.getFullYear();
         let month = date.getMonth()+1;
         let dt = date.getDate();
         if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }
        //********start date end******//

          //********from date******//
          let  fromdate = new Date(users[i].settled_date);
          let fromyear = fromdate.getFullYear();
          let frommonth = fromdate.getMonth()+1;
          let fromdt = fromdate.getDate();
          if (fromdt < 10) {
            fromdt = '0' + fromdt;
          }
          if (frommonth < 10) {
            frommonth = '0' + frommonth;
          }
        //********from date end******//
        
        temp['_id']=users[i]._id;
        temp['userid']=users[i].userid;
        temp['applicable_converdate']=users[i].applicable_converdate;
        temp['applicable_date']=users[i].applicable_date;
        temp['bid_rate']=users[i].bid_rate;
        temp['currency']=users[i].currency;
        temp['offer_rate']=users[i].offer_rate;
        temp['settled_date']=users[i].settled_date;
        temp['source']=users[i].source;
        temp['tenor']=users[i].tenor;
        temp['myconvertstart']=(dt+'-' + month + '-'+year);
        temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
        mymanualArray.push(temp);
      }
     // console.log(mymanualArray)

     var XLSX = require('xlsx')
     var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/admindata/downloaddata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
      { header: "S no.", key: "s_no" },
      { header: "Applicable date", key: "myconvertstart" },
      { header: "Currency", key: "currency" },
      { header: "Settled date", key: "myconvertfromdate" },
      { header: "Tenor", key: "tenor" },
      { header: "Bid rate", key: "bid_rate" },
      { header: "offer rate", key: "offer_rate" },

      ];
      // Looping through User data
      let counter = 1;
      mymanualArray.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
        await workbook.xlsx.writeFile(`${path}/eurpremiumexceldata.xlsx`)
        .then(() => {
          console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
      } catch (err) {
        console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }
      res.json({ response: true, message: "Data found", details: users });


    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});




router.post('/updateImportCalculation', function (req, res, next) {
  let amount_in_fc = req.body.amount_in_fc;
  let start_date = req.body.start_date;
  let due_date = req.body.due_date;
  let forwardon_date = req.body.forwardon_date;
  let costing_spot = req.body.costing_spot;
  let costing_premium = req.body.costing_premium;
  let costed_rate = req.body.costed_rate;
  let mtm_spot = req.body.mtm_spot;
  let mtm_premium = req.body.mtm_premium;
  let current_forwardrate = req.body.current_forwardrate;
  let profit_loss = req.body.profit_loss;
   let id = req.body.id;

  Saveimportcalculation.findOneAndUpdate({ _id: new ObjectId(id) }, {
    $set: {
       amount_in_fc: amount_in_fc, start_date: start_date,
      due_date: due_date, forwardon_date: forwardon_date, costing_spot: costing_spot, costing_premium: costing_premium, costed_rate: costed_rate,
      mtm_spot: mtm_spot,mtm_premium: mtm_premium, current_forwardrate: current_forwardrate, profit_loss: profit_loss
    }
  }, { returnOriginal: false }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "User updated" });
    }
  });
})



router.post('/updateExportCalculation', function (req, res, next) {
  let amount_in_fc = req.body.amount_in_fc;
  let start_date = req.body.start_date;
  let due_date = req.body.due_date;
  let forwardon_date = req.body.forwardon_date;
  let costing_spot = req.body.costing_spot;
  let costing_premium = req.body.costing_premium;
   let costed_rate = req.body.costed_rate;
   let mtm_spot = req.body.mtm_spot;
  let mtm_premium = req.body.mtm_premium;
  let current_forwardrate = req.body.current_forwardrate;
  let profit_loss = req.body.profit_loss;
   let id = req.body.id;


  Saveexportcalculation.findOneAndUpdate({ _id: new ObjectId(id) }, {
    $set: {
       amount_in_fc: amount_in_fc, start_date: start_date,
      due_date: due_date, forwardon_date: forwardon_date, costing_spot: costing_spot, costing_premium: costing_premium, costed_rate: costed_rate,
      mtm_spot: mtm_spot,mtm_premium: mtm_premium, current_forwardrate: current_forwardrate, profit_loss: profit_loss
    }
  }, { returnOriginal: false }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "User updated" });
    }
  });
})





router.post('/updateForexbuyCalculation', function (req, res, next) {
  
  let amount_in_fc = req.body.amount_in_fc;
  let start_date = req.body.start_date;
  let from_date = req.body.from_date;
   let to_date = req.body.to_date;
  let forwardon_date = req.body.forwardon_date;
  let costing_spot = req.body.costing_spot;
  let costing_premium = req.body.costing_premium;
   let bank_margin = req.body.bank_margin;
  let booking_rate = req.body.booking_rate;
  let mtm_spot = req.body.mtm_spot;
  let mtm_premium = req.body.mtm_premium;
  let current_forwardrate = req.body.current_forwardrate;
  let profit_loss = req.body.profit_loss;
   let id = req.body.id;

  Saveforexbuycalculation.findOneAndUpdate({ _id: new ObjectId(id) }, {
    $set: {
       amount_in_fc: amount_in_fc, start_date: start_date,
      from_date: from_date, to_date: to_date, forwardon_date: forwardon_date, costing_spot: costing_spot, costing_premium: costing_premium, bank_margin: bank_margin,
      booking_rate: booking_rate,mtm_spot: mtm_spot,mtm_premium: mtm_premium, current_forwardrate: current_forwardrate, profit_loss: profit_loss
    }
  }, { returnOriginal: false }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "User updated" });
    }
  });
})



router.post('/updateForexsellCalculation', function (req, res, next) {
  let amount_in_fc = req.body.amount_in_fc;
  let start_date = req.body.start_date;
  let from_date = req.body.from_date;
   let to_date = req.body.to_date;
  let forwardon_date = req.body.forwardon_date;
  let costing_spot = req.body.costing_spot;
  let costing_premium = req.body.costing_premium;
   let bank_margin = req.body.bank_margin;
  let booking_rate = req.body.booking_rate;
  let mtm_spot = req.body.mtm_spot;
  let mtm_premium = req.body.mtm_premium;
  let current_forwardrate = req.body.current_forwardrate;
  let profit_loss = req.body.profit_loss;
   let id = req.body.id;
  Saveforexsellcalculation.findOneAndUpdate({ _id: new ObjectId(id) }, {
    $set: {
       amount_in_fc: amount_in_fc, start_date: start_date,
      from_date: from_date, to_date: to_date, forwardon_date: forwardon_date, costing_spot: costing_spot, costing_premium: costing_premium, bank_margin: bank_margin,
      booking_rate: booking_rate,mtm_spot: mtm_spot,mtm_premium: mtm_premium, current_forwardrate: current_forwardrate, profit_loss: profit_loss
    }
  }, { returnOriginal: false }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "User updated" });
    }
  });
})

//********************New***************//


router.post('/deleteImportupentery', function (req, res, next) {
  let id = req.body.id;
  console.log(id);
  console.log({ _id: new ObjectId(id) })
  Importinputexcel.findOneAndDelete({ _id: new ObjectId(id) }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "Deleted" });
    }
  });
});


router.post('/deleteExportupentery', function (req, res, next) {
  let id = req.body.id;
  console.log(id);
  console.log({ _id: new ObjectId(id) })
  Exportinputexcel.findOneAndDelete({ _id: new ObjectId(id) }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "Deleted" });
    }
  });
});



router.post('/deletePCFCupentery', function (req, res, next) {
  let id = req.body.id;
  console.log(id);
  console.log({ _id: new ObjectId(id) })
  Pcfcexcel.findOneAndDelete({ _id: new ObjectId(id) }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "Deleted" });
    }
  });
});

router.post('/deleteForexbuyupentery', function (req, res, next) {
  let id = req.body.id;
  console.log(id);
  console.log({ _id: new ObjectId(id) })
  Forexbuyexcel.findOneAndDelete({ _id: new ObjectId(id) }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "Deleted" });
    }
  });
});

router.post('/deleteForexsellupentery', function (req, res, next) {
  let id = req.body.id;
  console.log(id);
  console.log({ _id: new ObjectId(id) })
  Forexsellexcel.findOneAndDelete({ _id: new ObjectId(id) }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "Deleted" });
    }
  });
});


router.post('/deleteImportsettledentery', function (req, res, next) {
  let id = req.body.id;
  console.log(id);
  console.log({ _id: new ObjectId(id) })
  Settledimportdata.findOneAndDelete({ _id: new ObjectId(id) }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "Deleted" });
    }
  });
});


router.post('/deleteExportsettledentery', function (req, res, next) {
  let id = req.body.id;
  console.log(id);
  console.log({ _id: new ObjectId(id) })
  Settleddata.findOneAndDelete({ _id: new ObjectId(id) }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "Deleted" });
    }
  });
});

router.post('/deleteForexbuysettledentery', function (req, res, next) {
  let id = req.body.id;
  console.log(id);
  console.log({ _id: new ObjectId(id) })
  Settledforexbuydata.findOneAndDelete({ _id: new ObjectId(id) }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "Deleted" });
    }
  });
});

router.post('/deleteForexsellsettledentery', function (req, res, next) {
  let id = req.body.id;
  console.log(id);
  console.log({ _id: new ObjectId(id) })
  Settledforexselldata.findOneAndDelete({ _id: new ObjectId(id) }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "Deleted" });
    }
  });
});

router.post('/deletePCFCsettledentery', function (req, res, next) {
  let id = req.body.id;
  console.log(id);
  console.log({ _id: new ObjectId(id) })
  Settledpcfcdata.findOneAndDelete({ _id: new ObjectId(id) }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "Deleted" });
    }
  });
});


router.post('/deleteImportsavecalentery', function (req, res, next) {
  let id = req.body.id;
  console.log(id);
  console.log({ _id: new ObjectId(id) })
  Saveimportcalculation.findOneAndDelete({ _id: new ObjectId(id) }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "Deleted" });
    }
  });
});


router.post('/deleteExportsavecalentery', function (req, res, next) {
  let id = req.body.id;
  console.log(id);
  console.log({ _id: new ObjectId(id) })
  Saveexportcalculation.findOneAndDelete({ _id: new ObjectId(id) }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "Deleted" });
    }
  });
});

router.post('/deleteForexbuysavecalentery', function (req, res, next) {
  let id = req.body.id;
  console.log(id);
  console.log({ _id: new ObjectId(id) })
  Saveforexbuycalculation.findOneAndDelete({ _id: new ObjectId(id) }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "Deleted" });
    }
  });
});

router.post('/deleteForexsellsavecalentery', function (req, res, next) {
  let id = req.body.id;
  console.log(id);
  console.log({ _id: new ObjectId(id) })
  Saveforexsellcalculation.findOneAndDelete({ _id: new ObjectId(id) }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "Deleted" });
    }
  });
});

router.post('/deletePCFCsavecalentery', function (req, res, next) {
  let id = req.body.id;
  console.log(id);
  console.log({ _id: new ObjectId(id) })
  Savepcfccalculation.findOneAndDelete({ _id: new ObjectId(id) }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "Deleted" });
    }
  });
});


router.post('/editImportinputentery', function (req, res, next) {
 let userid = req.body.userid ;
 let id = req.body.id;
 let type = req.body.type;
 let cunter_party_name = req.body.cunter_party_name;
 let invoice_no = req.body.invoice_no;
 let currency = req.body.currency;
 let amount_in_fc = req.body.amount_in_fc.trim();
 let start_date = req.body.start_date;
 let due_date = req.body.due_date;
 let bank_name = req.body.bank_name;
 Importinputexcel.findOneAndUpdate({ _id: new ObjectId(id) }, {
  $set: {
    type: type, cunter_party_name: cunter_party_name, invoice_no: invoice_no, currency: currency, amount_in_fc: amount_in_fc,
    start_date: start_date, due_date: due_date, bank_name: bank_name
  }
}, { returnOriginal: false }, function (err, user) {
  if (err) {
    res.json({ response: false, message: err });
  }
  if (user) {
    res.json({ response: true, message: "Import input entery updated" });
  }
});
});


router.post('/editExportinputentery', function (req, res, next) {
 let userid = req.body.userid ;
 let id = req.body.id;
 let type = req.body.type;
 let cunter_party_name = req.body.cunter_party_name;
 let invoice_no = req.body.invoice_no;
 let currency = req.body.currency;
 let amount_in_fc = req.body.amount_in_fc.trim();
 let start_date = req.body.start_date;
 let due_date = req.body.due_date;
 let bank_name = req.body.bank_name;
 Exportinputexcel.findOneAndUpdate({ _id: new ObjectId(id) }, {
  $set: {
    type: type, cunter_party_name: cunter_party_name, invoice_no: invoice_no, currency: currency, amount_in_fc: amount_in_fc,
    start_date: start_date, due_date: due_date, bank_name: bank_name
  }
}, { returnOriginal: false }, function (err, user) {
  if (err) {
    res.json({ response: false, message: err });
  }
  if (user) {
    res.json({ response: true, message: "Export input entery updated" });
  }
});
});


router.post('/editPcfcinputentery', function (req, res, next) {
  let userid = req.body.userid ;
  let id = req.body.id;
  let type = req.body.type;
  let company_name = req.body.company_name;
  let invoice_no = req.body.invoice_no;
  let currency = req.body.currency;
  let amount_in_fc = req.body.amount_in_fc.trim();
  let start_date = req.body.start_date;
  let from_date = req.body.from_date;
  let to_date = req.body.to_date;
  let spot = req.body.spot;
  let premium = req.body.premium;
  let bank_margin = req.body.bank_margin;
  let bank_name = req.body.bank_name;
  Pcfcexcel.findOneAndUpdate({ _id: new ObjectId(id) }, {
    $set: {
      type: type, company_name: company_name, invoice_no: invoice_no, currency: currency, amount_in_fc: amount_in_fc,
      start_date: start_date, from_date: from_date,to_date: to_date,spot: spot,premium: premium,
      bank_margin: bank_margin, bank_name: bank_name
    }
  }, { returnOriginal: false }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "PCFC input entery updated" });
    }
  });
});


router.post('/editForexbuyinputentery', function (req, res, next) {
  let userid = req.body.userid ;
  let id = req.body.id;
  let type = req.body.type;
  let company_name = req.body.company_name;
  let invoice_no = req.body.invoice_no;
  let currency = req.body.currency;
  let amount_in_fc = req.body.amount_in_fc.trim();
  let start_date = req.body.start_date;
  let from_date = req.body.from_date;
  let to_date = req.body.to_date;
  let spot = req.body.spot;
  let premium = req.body.premium;
  let bank_margin = req.body.bank_margin;
  let bank_name = req.body.bank_name;
  Forexbuyexcel.findOneAndUpdate({ _id: new ObjectId(id) }, {
    $set: {
      type: type, company_name: company_name, invoice_no: invoice_no, currency: currency, amount_in_fc: amount_in_fc,
      start_date: start_date, from_date: from_date,to_date: to_date,spot: spot,premium: premium,
      bank_margin: bank_margin, bank_name: bank_name
    }
  }, { returnOriginal: false }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "Forex-buy input entery updated" });
    }
  });
});

router.post('/editForexsellinputentery', function (req, res, next) {
  let userid = req.body.userid ;
  let id = req.body.id;
  let type = req.body.type;
  let company_name = req.body.company_name;
  let invoice_no = req.body.invoice_no;
  let currency = req.body.currency;
  let amount_in_fc = req.body.amount_in_fc.trim();
  let start_date = req.body.start_date;
  let from_date = req.body.from_date;
  let to_date = req.body.to_date;
  let spot = req.body.spot;
  let premium = req.body.premium;
  let bank_margin = req.body.bank_margin;
  let bank_name = req.body.bank_name;
  Forexsellexcel.findOneAndUpdate({ _id: new ObjectId(id) }, {
    $set: {
      type: type, company_name: company_name, invoice_no: invoice_no, currency: currency, amount_in_fc: amount_in_fc,
      start_date: start_date, from_date: from_date,to_date: to_date,spot: spot,premium: premium,
      bank_margin: bank_margin, bank_name: bank_name
    }
  }, { returnOriginal: false }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "Forex-sell input entery updated" });
    }
  });
});


router.post('/editImportsettledentery', function (req, res, next) {
  let userid = req.body.userid ;
  let id = req.body.id;
  let type = req.body.type;
  let invoice_no = req.body.invoice_no;
  let currency = req.body.currency;
  let cunter_party_name = req.body.cunter_party_name;
  let amount_in_fc = req.body.amount_in_fc.trim();
  let start_date = req.body.start_date;
  let due_date = req.body.due_date;
  let forwardon_date = req.body.forwardon_date;
  let previous_spot = req.body.previous_spot;
  let previous_premium = req.body.previous_premium;
  let costed_rate = req.body.costed_rate;
  let current_forwardrate = req.body.current_forwardrate;
  let profit_loss = req.body.profit_loss;
  let remark = req.body.remark;
  Settledimportdata.findOneAndUpdate({ _id: new ObjectId(id) }, {
    $set: {
      type: type,invoice_no: invoice_no,currency: currency, cunter_party_name: cunter_party_name,amount_in_fc: amount_in_fc,
      start_date: start_date, due_date: due_date,forwardon_date: forwardon_date, previous_spot: previous_spot,
      previous_premium: previous_premium,costed_rate: costed_rate,current_forwardrate: current_forwardrate,
      profit_loss: profit_loss,remark:remark, start_date_convert:start_date,
    }
  }, { returnOriginal: false }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "Import settled entery updated" });
    }
  });
});


router.post('/editExportsettledentery', function (req, res, next) {
  let userid = req.body.userid ;
  let id = req.body.id;
  let type = req.body.type;
  let invoice_no = req.body.invoice_no;
  let currency = req.body.currency;
  let cunter_party_name = req.body.cunter_party_name;
  let amount_in_fc = req.body.amount_in_fc.trim();
  let start_date = req.body.start_date;
  let due_date = req.body.due_date;
  let forwardon_date = req.body.forwardon_date;
  let previous_spot = req.body.previous_spot;
  let previous_premium = req.body.previous_premium;
  let costed_rate = req.body.costed_rate;
  let current_forwardrate = req.body.current_forwardrate;
  let profit_loss = req.body.profit_loss;
  let remark = req.body.remark;
  Settleddata.findOneAndUpdate({ _id: new ObjectId(id) }, {
    $set: {
      type: type,invoice_no: invoice_no,currency: currency, cunter_party_name: cunter_party_name,amount_in_fc: amount_in_fc,
      start_date: start_date, due_date: due_date,forwardon_date: forwardon_date, previous_spot: previous_spot,
      previous_premium: previous_premium,costed_rate: costed_rate,current_forwardrate: current_forwardrate,
      profit_loss: profit_loss,remark:remark,start_date_convert:start_date,
    }
  }, { returnOriginal: false }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "Import settled entery updated" });
    }
  });
});


router.post('/editForexbuysettledentery', function (req, res, next) {
  let userid = req.body.userid ;
  let id = req.body.id;
  let type = req.body.type;
  let invoice_no = req.body.invoice_no;
  let currency = req.body.currency;
  let cunter_party_name = req.body.cunter_party_name;
  let amount_in_fc = req.body.amount_in_fc.trim();
  let start_date = req.body.start_date;
  let from_date = req.body.from_date;
  let to_date = req.body.to_date;
  let forwardon_date = req.body.forwardon_date;
  let previous_spot = req.body.previous_spot;
  let previous_premium = req.body.previous_premium;
  let booking_rate = req.body.booking_rate;
  let current_forwardrate = req.body.current_forwardrate;
  let edc = req.body.edc;
  let status = req.body.status;
  let profit_loss = req.body.profit_loss;
  let gain_loss = req.body.gain_loss;
  Settledforexbuydata.findOneAndUpdate({ _id: new ObjectId(id) }, {
    $set: {
      type: type,invoice_no: invoice_no,currency: currency, cunter_party_name: cunter_party_name,amount_in_fc: amount_in_fc,
      start_date: start_date, from_date: from_date,to_date: to_date,forwardon_date: forwardon_date,
      previous_spot: previous_spot,previous_premium: previous_premium,booking_rate: booking_rate,
      current_forwardrate: current_forwardrate,profit_loss: profit_loss,edc:edc,status:status,
      start_date_convert:start_date,gain_loss:gain_loss,
    }
  }, { returnOriginal: false }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "Import settled entery updated" });
    }
  });
});


router.post('/editForexsellsettledentery', function (req, res, next) {
  let userid = req.body.userid ;
  let id = req.body.id;
  let type = req.body.type;
  let invoice_no = req.body.invoice_no;
  let currency = req.body.currency;
  let cunter_party_name = req.body.cunter_party_name;
  let amount_in_fc = req.body.amount_in_fc.trim();
  let start_date = req.body.start_date;
  let from_date = req.body.from_date;
  let to_date = req.body.to_date; 
  let forwardon_date = req.body.forwardon_date;
  let previous_spot = req.body.previous_spot;
  let previous_premium = req.body.previous_premium;
  let booking_rate = req.body.booking_rate;
  let current_forwardrate = req.body.current_forwardrate;
  let edc = req.body.edc;
  let status = req.body.status;
  let profit_loss = req.body.profit_loss;
  let gain_loss = req.body.gain_loss;
  Settledforexselldata.findOneAndUpdate({ _id: new ObjectId(id) }, {
    $set: {
      type: type,invoice_no: invoice_no,currency: currency, cunter_party_name: cunter_party_name,amount_in_fc: amount_in_fc,
      start_date: start_date, from_date: from_date,to_date: to_date,forwardon_date: forwardon_date,
      previous_spot: previous_spot,previous_premium: previous_premium,booking_rate: booking_rate,
      current_forwardrate: current_forwardrate,profit_loss: profit_loss,edc:edc,status:status,
      start_date_convert:start_date,gain_loss:gain_loss,
    }
  }, { returnOriginal: false }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "Import settled entery updated" });
    }
  });
});


router.post('/editPCFCsettledentery', function (req, res, next) {
  let userid = req.body.userid ;
  let id = req.body.id;
  let type = req.body.type;
  let invoice_no = req.body.invoice_no;
  let currency = req.body.currency;
  let cunter_party_name = req.body.cunter_party_name;
  let amount_in_fc = req.body.amount_in_fc.trim();
  let start_date = req.body.start_date;
  let from_date = req.body.from_date;
  let to_date = req.body.to_date;
  let forwardon_date = req.body.forwardon_date;
  let previous_spot = req.body.previous_spot;
  let previous_premium = req.body.previous_premium;
  let booking_rate = req.body.booking_rate;
  let current_forwardrate = req.body.current_forwardrate;
  let edc = req.body.edc;
  let status = req.body.status;
  let profit_loss = req.body.profit_loss;
  Settledpcfcdata.findOneAndUpdate({ _id: new ObjectId(id) }, {
    $set: {
      type: type,invoice_no: invoice_no,currency: currency, cunter_party_name: cunter_party_name,amount_in_fc: amount_in_fc,
      start_date: start_date, from_date: from_date,to_date: to_date,forwardon_date: forwardon_date,
      previous_spot: previous_spot,previous_premium: previous_premium,booking_rate: booking_rate,
      current_forwardrate: current_forwardrate,profit_loss: profit_loss,edc:edc,status:status,
      start_date_convert:start_date,
    }
  }, { returnOriginal: false }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "PCFC settled entery updated" });
    }
  });
});


router.post('/cash_report_insert', function (req, res, next) {
  let userid = req.body.userid ;
  let type = req.body.type;
  let date = req.body.date;
  let currency = req.body.currency;
  let amount_in_fc = req.body.amount_in_fc;
  let bank_name = req.body.bank_name;
  let spot_rate = req.body.spot_rate;
  let cash_spot = req.body.cash_spot;
  let bank_margin = req.body.bank_margin;
  let net_rate = req.body.net_rate;
  let rbi_ref_rate = req.body.rbi_ref_rate;
  let cash_spot_margin = req.body.cash_spot_margin;
  let net_ref_rate = req.body.net_ref_rate;
  let gain_loss = req.body.gain_loss;

  var json_ary = {
    userid: userid,
    type: type,
    date: date,
    currency: currency,
    amount_in_fc: amount_in_fc,
    bank_name: bank_name,
    spot_rate: spot_rate,
    cash_spot: cash_spot,
    bank_margin: bank_margin,
    net_rate: net_rate,
    rbi_ref_rate: rbi_ref_rate,
    cash_spot_margin: cash_spot_margin,
    net_ref_rate: net_ref_rate,
    gain_loss: gain_loss,
    created_at: new Date(),
    updated_at: new Date(),
    created_by: 'admin',
    updated_by: 'admin',

  }
  Savecashratereport.create(json_ary, function (err, docs) {
    if (err) {
      res.json({ response: false, message: err });
    } else {
      res.json({ response: true, message: "Data Inserted", docs: docs });

    }
  });
});

router.post('/getCashreportdata', function (req, res, next) {
  let userid = req.body.userid;
  Savecashratereport.find({ userid: { '$eq': userid } }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      var amount_in_fc_total = 0;
      var gain_loss_total = 0;
      for (var i in user) {
       amount_in_fc_total += parseFloat(user[i].amount_in_fc);
       gain_loss_total += parseFloat(user[i].gain_loss);
     }

     console.log(amount_in_fc_total);
     console.log(gain_loss_total)
     let obj ={data:user,amount_in_fc_total:amount_in_fc_total,gain_loss_total:gain_loss_total}

     res.json({ response: true, message: "Data found", details: obj });
   } else {
    res.json({ response: false, message: "No Data found" });
  }
});
});


router.post('/deleteCashreportdata', function (req, res, next) {
  let id = req.body.id;
  console.log(id);
  console.log({ _id: new ObjectId(id) })
  Savecashratereport.findOneAndDelete({ _id: new ObjectId(id) }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "Deleted" });
    }
  });
});


router.post('/importcalculation_excel_data', function (req, res, next) {
  let users = JSON.parse(req.body.arr);

  console.log('asjdsajfjalf',users)

  var temp1 = []
  if (users) {
    for (var i = 0; i < users.length; i++) {



     var temp = {};

      //***********start Date convert*********//

      var mycovertstartate = new Date(users[i].start_date);
      console.log(mycovertstartate)
      var  startday = mycovertstartate.getDate();        
      var  startmonth = mycovertstartate.getMonth();     
      var startyear = mycovertstartate.getFullYear();
      const startnewdate = new Date(Date.UTC(startyear, startmonth, startday))
      const resultstart = startnewdate.toISOString().split('T')[0]
      console.log(resultstart) 
      var myresultsplitresultstart = resultstart.split('-');
      console.log(myresultsplitresultstart)
      var startfinal=myresultsplitresultstart[2]+"-"+myresultsplitresultstart[1]+"-"+myresultsplitresultstart[0];
      console.log('startfinal',startfinal)

       //***********start Date convert end*********//


         //***********Due Date convert*********//

         var mycovertduedate = new Date(users[i].due_date);
         console.log(mycovertduedate)
         var  dueday = mycovertduedate.getDate();        
         var  duemonth = mycovertduedate.getMonth();     
         var dueyear = mycovertduedate.getFullYear();
         const duenewdate = new Date(Date.UTC(dueyear, duemonth, dueday))
         const resultdue = duenewdate.toISOString().split('T')[0]
         console.log(resultdue) 
         var myresultsplitresultdue = resultdue.split('-');
         console.log(myresultsplitresultdue)
         var duefinal=myresultsplitresultdue[2]+"-"+myresultsplitresultdue[1]+"-"+myresultsplitresultdue[0];
         console.log('duefinal',duefinal)

       //***********Due Date convert end*********//

   //***********forwardon Date convert*********//

   var mycovertforwardon = new Date(users[i].forwardon_date);
   console.log(mycovertforwardon)
   var  forwardonday = mycovertforwardon.getDate();        
   var  forwardonmonth = mycovertforwardon.getMonth();     
   var forwardonyear = mycovertforwardon.getFullYear();
   const forwardonnewdate = new Date(Date.UTC(forwardonyear, forwardonmonth, forwardonday))
   const resultforwardon = forwardonnewdate.toISOString().split('T')[0]
   console.log(resultforwardon) 
   var myresultsplitresultforwardon = resultforwardon.split('-');
   console.log(myresultsplitresultforwardon)
   var forwardonfinal=myresultsplitresultforwardon[2]+"-"+myresultsplitresultforwardon[1]+"-"+myresultsplitresultforwardon[0];
   console.log('forwardonfinal',forwardonfinal)

       //***********forwardon Date convert end*********//



       temp['_id']=users[i]._id;
       temp['type']=users[i].type;
       temp['invoice_no']=users[i].invoice_no;
       temp['currency']=users[i].currency ;
       temp['cunter_party_name']=users[i].cunter_party_name;
       temp['amount_in_fc']=users[i].amount_in_fc; 
       temp['start_date']=users[i].start_date ;
       temp['due_date']=users[i].due_date ;
       temp['forwardon_date']=users[i].forwardon_date;
       temp['costing_spot']=users[i].costing_spot ;
       temp['costing_premium']=users[i].costing_premium ;
       temp['costed_rate']=users[i].costed_rate ;
       temp['mtm_spot']=users[i].mtm_spot ;
       temp['mtm_premium']=users[i].mtm_premium ;
       temp['current_forwardrate']=users[i].current_forwardrate; 
       temp['profit_loss']=users[i].profit_loss ;
       temp['savecalcualtionid']=users[i].savecalcualtionid ;
       temp['userid']=users[i].userid ;
       temp['created_at']=users[i].created_at ;
       temp['updated_at']=users[i].updated_at ;
       temp['updated_by']=users[i].updated_by ;
       temp['created_by']=users[i].created_by ;
       temp['myconvertstart']= startfinal;
       temp['myconvertdue']= duefinal;
       temp['myconvertforwardon']= forwardonfinal;
       temp1.push(temp);

     }
     var XLSX = require('xlsx')
     var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/caculationdata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
      { header: "S no.", key: "s_no" },
      { header: "Txn Type", key: "type" },
      { header: "Trade ref no.", key: "invoice_no" },
      { header: "Currency", key: "currency" },
      { header: "Counterparty", key: "cunter_party_name" },
      { header: "Open amount", key: "amount_in_fc" },
      { header: "Recognition date", key: "myconvertstart" },
      { header: "Due date", key: "myconvertdue" },
      { header: "Forward as on date", key: "myconvertforwardon" },
      { header: "Costing Spot", key: "costing_spot" },
      { header: "Costing Premium", key: "costing_premium" },
      { header: "Costed Rate", key: "costed_rate" },
      { header: "MTM Spot", key: "mtm_spot" },
      { header: "MTM Premium", key: "mtm_premium" },
      { header: "Current forward rate", key: "current_forwardrate" },
      { header: "100% Hedge P&L", key: "profit_loss" },
      ];
      // Looping through User data

      // console.log('temp1',temp1);
      let counter = 1;
      temp1.forEach((user) => {
        // console.log('user',user)

        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
       workbook.xlsx.writeFile(`${path}/importcalcualtiondata.xlsx`)
       .then(() => {
        console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
     } catch (err) {
      console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }



      res.json({ response: true, message: "Data found", details: users });
    } else {
      res.json({ response: false, message: "No Data found" });
    }

  });


router.post('/exportcalculation_saveexcel_data', function (req, res, next) {
 let users = JSON.parse(req.body.arr);
 var mymanualArray = [];

  // Saveexportcalculation.find({ userid: { '$eq': userid } },async function (err, users) {
  //   if (err) {
  //     res.json({ response: false, message: err });
  //   }
  if (users) {

    for (var i = 0; i < users.length; i++) {
        // console.log(users[i]);
        let temp = {}

         //********start date******//
         let  date = new Date(users[i].start_date);
         let year = date.getFullYear();
         let month = date.getMonth()+1;
         let dt = date.getDate();
         if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }
        //********start date end******//

          //********from date******//
          let  fromdate = new Date(users[i].due_date);
          let fromyear = fromdate.getFullYear();
          let frommonth = fromdate.getMonth()+1;
          let fromdt = fromdate.getDate();
          if (fromdt < 10) {
            fromdt = '0' + fromdt;
          }
          if (frommonth < 10) {
            frommonth = '0' + frommonth;
          }
        //********from date end******//


          //******** forwardon date******//
          let  forwardondate = new Date(users[i].forwardon_date);
          let forwardonyear = forwardondate.getFullYear();
          let forwardonmonth = forwardondate.getMonth()+1;
          let forwardondt = forwardondate.getDate();
          if (forwardondt < 10) {
            forwardondt = '0' + forwardondt;
          }
          if (forwardonmonth < 10) {
            forwardonmonth = '0' + forwardonmonth;
          }
        //********forwardon date end******//

        temp['_id']=users[i]._id;
        temp['type']=users[i].type;
        temp['invoice_no']=users[i].invoice_no;
        temp['currency']=users[i].currency;
        temp['cunter_party_name']=users[i].cunter_party_name;
        temp['amount_in_fc']=users[i].amount_in_fc;
        temp['start_date']=users[i].start_date;
        temp['due_date']=users[i].due_date;
        temp['forwardon_date']=users[i].forwardon_date;
        temp['costing_spot']=users[i].costing_spot;
        temp['costing_premium']=users[i].costing_premium;
        temp['costed_rate']=users[i].costed_rate;
        temp['mtm_spot']=users[i].mtm_spot;
        temp['mtm_premium']=users[i].mtm_premium;
        temp['current_forwardrate']=users[i].current_forwardrate;
        temp['profit_loss']=users[i].profit_loss;
        temp['userid']=users[i].userid;
        temp['myconvertstart']=(dt+'-' + month + '-'+year);
        temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
        temp['myconvertforwardon']=(forwardondt+'-' + forwardonmonth + '-'+forwardonyear);
        mymanualArray.push(temp);
      }

      var XLSX = require('xlsx')
      var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/caculationdata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
      { header: "S no.", key: "s_no" },
      { header: "Txn Type", key: "type" },
      { header: "Trade ref no.", key: "invoice_no" },
      { header: "Currency", key: "currency" },
      { header: "Counterparty", key: "cunter_party_name" },
      { header: "Open amount", key: "amount_in_fc" },
      { header: "Recognition date", key: "myconvertstart" },
      { header: "Due date", key: "myconvertfromdate" },
      { header: "Forward as on date", key: "myconvertforwardon" },
      { header: "Costing Spot", key: "costing_spot" },
      { header: "Costing Premium", key: "costing_premium" },
      { header: "Costed Rate", key: "costed_rate" },
      { header: "MTM Spot", key: "mtm_spot" },
      { header: "MTM Premium", key: "mtm_premium" },
      { header: "Current forward rate", key: "current_forwardrate" },
      { header: "100% Hedge P&L", key: "profit_loss" },
      ];
      // Looping through User data
      let counter = 1;
      mymanualArray.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
        workbook.xlsx.writeFile(`${path}/exportcalcualtiondata.xlsx`)
        .then(() => {
          console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
      } catch (err) {
        console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }




      res.json({ response: true, message: "Data found", details: users });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  // });
});




router.post('/pcfcsavedata_excel', function (req, res, next) {
  let users = JSON.parse(req.body.arr);
  // console.log('users',users)
  var mymanualArray = [];
  // Savepcfccalculation.find({ userid: { '$eq': userid } },async function (err, users) {

    if (users) {


     for (var i = 0; i < users.length; i++) {
          // console.log(users[i]);
          let temp = {}

         //********start date******//
         let  date = new Date(users[i].start_date);
         let year = date.getFullYear();
         let month = date.getMonth()+1;
         let dt = date.getDate();
         if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }
        //********start date end******//

          //********from date******//
          let  fromdate = new Date(users[i].from_date);
          let fromyear = fromdate.getFullYear();
          let frommonth = fromdate.getMonth()+1;
          let fromdt = fromdate.getDate();
          if (fromdt < 10) {
            fromdt = '0' + fromdt;
          }
          if (frommonth < 10) {
            frommonth = '0' + frommonth;
          }
        //********from date end******//
          //********to date******//
          let  todate = new Date(users[i].to_date);
          let toyear = todate.getFullYear();
          let tomonth = todate.getMonth()+1;
          let todt = todate.getDate();
          if (todt < 10) {
            todt = '0' + todt;
          }
          if (tomonth < 10) {
            tomonth = '0' + tomonth;
          }
        //********to date end******//

          //******** forwardon date******//
          let  forwardondate = new Date(users[i].forwardon_date);
          let forwardonyear = forwardondate.getFullYear();
          let forwardonmonth = forwardondate.getMonth()+1;
          let forwardondt = forwardondate.getDate();
          if (forwardondt < 10) {
            forwardondt = '0' + forwardondt;
          }
          if (forwardonmonth < 10) {
            forwardonmonth = '0' + forwardonmonth;
          }
        //********forwardon date end******//

        temp['_id']=users[i]._id;
        temp['type']=users[i].type;
        temp['company_name']=users[i].company_name;
        temp['bank_name']=users[i].bank_name;
        temp['currency']=users[i].currency;
        temp['amount_in_fc']=users[i].amount_in_fc;
        temp['start_date']=users[i].start_date;
        temp['from_date']=users[i].from_date;
        temp['to_date']=users[i].to_date;
        temp['forwardon_date']=users[i].forwardon_date;
        temp['costing_spot']=users[i].costing_spot;
        temp['costing_premium']=users[i].costing_premium;
        temp['booking_rate']=users[i].booking_rate;
        temp['bank_margin']=users[i].bank_margin;
        temp['mtm_spot']=users[i].mtm_spot;
        temp['mtm_premium']=users[i].mtm_premium;
        temp['current_forwardrate']=users[i].nextforwordrate;
        temp['profit_loss']=users[i].profit_loss;
        temp['userid']=users[i].userid;
        temp['myconvertstart']=(dt+'-' + month + '-'+year);
        temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
        temp['myconverttodate']=(todt+'-' + tomonth + '-'+toyear);
        temp['myconvertforwardon']=(forwardondt+'-' + forwardonmonth + '-'+forwardonyear);
        mymanualArray.push(temp);
      }
     // console.log(mymanualArray)


     var XLSX = require('xlsx')
     var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/caculationdata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
      { header: "S no.", key: "s_no" },
      { header: "Txn Type", key: "type" },
      { header: "Company Name", key: "company_name" },
      { header: "Bank Name", key: "bank_name" },
      { header: "Currency", key: "currency" },
      { header: "Open amount", key: "amount_in_fc" },
      { header: "Start date", key: "myconvertstart" },
      { header: "From date", key: "myconvertfromdate" },
      { header: "To Date", key: "myconverttodate" },
      { header: "Forward as on date", key: "myconvertforwardon" },
      { header: "Costing Spot", key: "costing_spot" },
      { header: "Costing Premium", key: "costing_premium" },
      { header: "Bank Margin", key: "bank_margin" },
      { header: "Booking Rate", key: "booking_rate" },
      { header: "MTM Spot", key: "mtm_spot" },
      { header: "MTM Premium", key: "mtm_premium" },
      { header: "Current forward rate", key: "current_forwardrate" },
      { header: "100% Hedge P&L", key: "profit_loss" },
      ];
      // Looping through User data
      let counter = 1;
      mymanualArray.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
       workbook.xlsx.writeFile(`${path}/pcfccalcualtiondata.xlsx`)
       .then(() => {
        console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
     } catch (err) {
      console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }


      res.json({ response: true, message: "Data found", details: users });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  // });
});




router.post('/forexbuysave_excel_data', function (req, res, next) {
 let users = JSON.parse(req.body.arr);
 var mymanualArray = [];

  // Saveforexbuycalculation.find({ userid: { '$eq': userid } }, async function (err, users) {
  //   if (err) {
  //     res.json({ response: false, message: err });
  //   }
  if (users) {

    for (var i = 0; i < users.length; i++) {
        // console.log(users[i]);
        let temp = {}

         //********start date******//
         let  date = new Date(users[i].start_date);
         let year = date.getFullYear();
         let month = date.getMonth()+1;
         let dt = date.getDate();
         if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }
        //********start date end******//

          //********from date******//
          let  fromdate = new Date(users[i].from_date);
          let fromyear = fromdate.getFullYear();
          let frommonth = fromdate.getMonth()+1;
          let fromdt = fromdate.getDate();
          if (fromdt < 10) {
            fromdt = '0' + fromdt;
          }
          if (frommonth < 10) {
            frommonth = '0' + frommonth;
          }
        //********from date end******//
          //********to date******//
          let  todate = new Date(users[i].to_date);
          let toyear = todate.getFullYear();
          let tomonth = todate.getMonth()+1;
          let todt = todate.getDate();
          if (todt < 10) {
            todt = '0' + todt;
          }
          if (tomonth < 10) {
            tomonth = '0' + tomonth;
          }
        //********to date end******//

          //******** forwardon date******//
          let  forwardondate = new Date(users[i].forwardon_date);
          let forwardonyear = forwardondate.getFullYear();
          let forwardonmonth = forwardondate.getMonth()+1;
          let forwardondt = forwardondate.getDate();
          if (forwardondt < 10) {
            forwardondt = '0' + forwardondt;
          }
          if (forwardonmonth < 10) {
            forwardonmonth = '0' + forwardonmonth;
          }
        //********forwardon date end******//

        temp['_id']=users[i]._id;
        temp['type']=users[i].type;
        temp['company_name']=users[i].company_name;
        temp['currency']=users[i].currency;
        temp['amount_in_fc']=users[i].amount_in_fc;
        temp['start_date']=users[i].start_date;
        temp['from_date']=users[i].from_date;
        temp['to_date']=users[i].to_date;
        temp['forwardon_date']=users[i].forwardon_date;
        temp['costing_spot']=users[i].costing_spot;
        temp['costing_premium']=users[i].costing_premium;
        temp['bank_margin']=users[i].bank_margin;
        temp['booking_rate']=users[i].booking_rate;
        temp['mtm_spot']=users[i].mtm_spot;
        temp['mtm_premium']=users[i].mtm_premium;
        temp['current_forwardrate']=users[i].nextforwordrate;
        temp['userid']=users[i].userid;
        temp['profit_loss']=users[i].profit_loss;
        temp['myconvertstart']=(dt+'-' + month + '-'+year);
        temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
        temp['myconverttodate']=(todt+'-' + tomonth + '-'+toyear);
        temp['myconvertforwardon']=(forwardondt+'-' + forwardonmonth + '-'+forwardonyear);
        mymanualArray.push(temp);
      }

      var XLSX = require('xlsx')
      var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/caculationdata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
      { header: "S no.", key: "s_no" },
      { header: "Txn Type", key: "type" },
      { header: "Company Name", key: "company_name" },
      { header: "Currency", key: "currency" },
      { header: "Open amount", key: "amount_in_fc" },
      { header: "Start date", key: "myconvertstart" },
      { header: "From date", key: "myconvertfromdate" },
      { header: "To Date", key: "myconverttodate" },
      { header: "Forward as on date", key: "myconvertforwardon" },
      { header: "Costing Spot", key: "costing_spot" },
      { header: "Costing Premium", key: "costing_premium" },
      { header: "Bank Margin", key: "bank_margin" },
      { header: "Booking Rate", key: "booking_rate" },
      { header: "MTM Spot", key: "mtm_spot" },
      { header: "MTM Premium", key: "mtm_premium" },
      { header: "Current forward rate", key: "current_forwardrate" },
      { header: "100% Hedge P&L", key: "profit_loss" },
      ];
      // Looping through User data
      let counter = 1;
      mymanualArray.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
       workbook.xlsx.writeFile(`${path}/forexbuycalcualtiondata.xlsx`)
       .then(() => {
        console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
     } catch (err) {
      console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }


      res.json({ response: true, message: "Data found", details: users });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  // });
});


router.post('/forexsellcalculationsave_excel_data', function (req, res, next) {
 let users = JSON.parse(req.body.arr);
 var mymanualArray = [];
  // Saveforexsellcalculation.find({ userid: { '$eq': userid } },async function (err, users) {
  //   if (err) {
  //     res.json({ response: false, message: err });
  //   }
  if (users) {


   for (var i = 0; i < users.length; i++) {
        // console.log(users[i]);
        let temp = {}

         //********start date******//
         let  date = new Date(users[i].start_date);
         let year = date.getFullYear();
         let month = date.getMonth()+1;
         let dt = date.getDate();
         if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }
        //********start date end******//

          //********from date******//
          let  fromdate = new Date(users[i].from_date);
          let fromyear = fromdate.getFullYear();
          let frommonth = fromdate.getMonth()+1;
          let fromdt = fromdate.getDate();
          if (fromdt < 10) {
            fromdt = '0' + fromdt;
          }
          if (frommonth < 10) {
            frommonth = '0' + frommonth;
          }
        //********from date end******//
          //********to date******//
          let  todate = new Date(users[i].to_date);
          let toyear = todate.getFullYear();
          let tomonth = todate.getMonth()+1;
          let todt = todate.getDate();
          if (todt < 10) {
            todt = '0' + todt;
          }
          if (tomonth < 10) {
            tomonth = '0' + tomonth;
          }
        //********to date end******//

          //******** forwardon date******//
          let  forwardondate = new Date(users[i].forwardon_date);
          let forwardonyear = forwardondate.getFullYear();
          let forwardonmonth = forwardondate.getMonth()+1;
          let forwardondt = forwardondate.getDate();
          if (forwardondt < 10) {
            forwardondt = '0' + forwardondt;
          }
          if (forwardonmonth < 10) {
            forwardonmonth = '0' + forwardonmonth;
          }
        //********forwardon date end******//

        temp['_id']=users[i]._id;
        temp['type']=users[i].type;
        temp['company_name']=users[i].company_name;
        temp['bank_name']=users[i].bank_name;
        temp['currency']=users[i].currency;
        temp['amount_in_fc']=users[i].amount_in_fc;
        temp['start_date']=users[i].start_date;
        temp['from_date']=users[i].from_date;
        temp['to_date']=users[i].to_date;
        temp['forwardon_date']=users[i].forwardon_date;
        temp['costing_spot']=users[i].costing_spot;
        temp['costing_premium']=users[i].costing_premium;
        temp['booking_rate']=users[i].booking_rate;
        temp['bank_margin']=users[i].bank_margin;
        temp['mtm_spot']=users[i].mtm_spot;
        temp['mtm_premium']=users[i].mtm_premium;
        temp['current_forwardrate']=users[i].nextforwordrate;
        temp['profit_loss']=users[i].profit_loss;
        temp['userid']=users[i].userid;
        temp['myconvertstart']=(dt+'-' + month + '-'+year);
        temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
        temp['myconverttodate']=(todt+'-' + tomonth + '-'+toyear);
        temp['myconvertforwardon']=(forwardondt+'-' + forwardonmonth + '-'+forwardonyear);
        mymanualArray.push(temp);
      }
     // console.log(mymanualArray)


     var XLSX = require('xlsx')
     var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/caculationdata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
      { header: "S no.", key: "s_no" },
      { header: "Txn Type", key: "type" },
      { header: "Company Name", key: "company_name" },
      { header: "Bank Name", key: "bank_name" },
      { header: "Currency", key: "currency" },
      { header: "Open amount", key: "amount_in_fc" },
      { header: "Start date", key: "myconvertstart" },
      { header: "From date", key: "myconvertfromdate" },
      { header: "To Date", key: "myconverttodate" },
      { header: "Forward as on date", key: "myconvertforwardon" },
      { header: "Costing Spot", key: "costing_spot" },
      { header: "Costing Premium", key: "costing_premium" },
      { header: "Bank Margin", key: "bank_margin" },
      { header: "Booking Rate", key: "booking_rate" },
      { header: "MTM Spot", key: "mtm_spot" },
      { header: "MTM Premium", key: "mtm_premium" },
      { header: "Current forward rate", key: "current_forwardrate" },
      { header: "100% Hedge P&L", key: "profit_loss" },
      ];
      // Looping through User data
      let counter = 1;
      mymanualArray.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
       workbook.xlsx.writeFile(`${path}/forexsellcalcualtiondata.xlsx`)
       .then(() => {
        console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
     } catch (err) {
      console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }


      res.json({ response: true, message: "Data found", details: users });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  // });
});


router.post('/import_settled_exceldatewise_filter', function (req, res, next) {
 let userid = req.body.userid;
 let start_date = req.body.start_date;
 let start_date1 = req.body.start_date1;
 var mymanualArray = [];
 Settledimportdata.find({  userid: { '$eq': userid },start_date_convert:{'$gte':new Date(start_date),'$lt':new Date(start_date1) }},async function (err, users) {
  if (err) {
    res.json({ response: false, message: err });
  }
  if (users) {

    for (var i = 0; i < users.length; i++) {
        // console.log(users[i]);
        let temp = {} 

         //********start date******//
         let  date = new Date(users[i].start_date);
         let year = date.getFullYear();
         let month = date.getMonth()+1;
         let dt = date.getDate();
         if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }
        //********start date end******//

          //********from date******//
          let  fromdate = new Date(users[i].due_date);
          let fromyear = fromdate.getFullYear();
          let frommonth = fromdate.getMonth()+1;
          let fromdt = fromdate.getDate();
          if (fromdt < 10) {
            fromdt = '0' + fromdt;
          }
          if (frommonth < 10) {
            frommonth = '0' + frommonth;
          }
        //********from date end******//

          //******** forwardon date******//
          let  forwardondate = new Date(users[i].forwardon_date);
          let forwardonyear = forwardondate.getFullYear();
          let forwardonmonth = forwardondate.getMonth()+1;
          let forwardondt = forwardondate.getDate();
          if (forwardondt < 10) {
            forwardondt = '0' + forwardondt;
          }
          if (forwardonmonth < 10) {
            forwardonmonth = '0' + forwardonmonth;
          }
        //********forwardon date end******//

        temp['_id']=users[i]._id;
        temp['type']=users[i].type;
        temp['invoice_no']=users[i].invoice_no;
        temp['currency']=users[i].currency;
        temp['cunter_party_name']=users[i].cunter_party_name;
        temp['amount_in_fc']=users[i].amount_in_fc;
        temp['start_date']=users[i].start_date;
        temp['due_date']=users[i].due_date;
        temp['forwardon_date']=users[i].forwardon_date;
        temp['previous_spot']=users[i].previous_spot;
        temp['previous_premium']=users[i].previous_premium;
        temp['costed_rate']=users[i].costed_rate;
        temp['current_forwardrate']=users[i].current_forwardrate;
        temp['profit_loss']=users[i].profit_loss;
        temp['userid']=users[i].userid;
        temp['myconvertstart']=(dt+'-' + month + '-'+year);
        temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
        temp['myconvertforwardon']=(forwardondt+'-' + forwardonmonth + '-'+forwardonyear);
        mymanualArray.push(temp);
      }


      var XLSX = require('xlsx')
      var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/settleddata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
      { header: "S no.", key: "s_no" },
      { header: "Txn Type", key: "type" },
      { header: "Trade ref no.", key: "invoice_no" },
      { header: "Currency", key: "currency" },
      { header: "Counterparty", key: "cunter_party_name" },
      { header: "Open amount", key: "amount_in_fc" },
      { header: "Recognition date", key: "myconvertstart" },
      { header: "Due date", key: "myconvertfromdate" },
      { header: "Forward as on date", key: "myconvertforwardon" },
      { header: "Spot", key: "previous_spot" },
      { header: "Premium", key: "previous_premium" },
      { header: "Costed Rate", key: "costed_rate" },
      { header: "Current forward rate", key: "current_forwardrate" },
      { header: "100% Hedge P&L", key: "profit_loss" },
      ];
      // Looping through User data
      let counter = 1;
      mymanualArray.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
        await workbook.xlsx.writeFile(`${path}/importfiltersettleddata.xlsx`)
        .then(() => {
          console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
      } catch (err) {
        console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }
      res.json({ response: true, message: "Data found", details: users });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});


router.post('/export_settled_exceldatewise_filter', function (req, res, next) {
  let userid = req.body.userid;
  let start_date = req.body.start_date;
  let start_date1 = req.body.start_date1;
  var mymanualArray = [];
  Settleddata.find({  userid: { '$eq': userid },start_date_convert:{'$gte':new Date(start_date),'$lt':new Date(start_date1) }},async function (err, users) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (users) {

      for (var i = 0; i < users.length; i++) {
        // console.log(users[i]);
        let temp = {}

         //********start date******//
         let  date = new Date(users[i].start_date);
         let year = date.getFullYear();
         let month = date.getMonth()+1;
         let dt = date.getDate();
         if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }
        //********start date end******//

          //********from date******//
          let  fromdate = new Date(users[i].from_date);
          let fromyear = fromdate.getFullYear();
          let frommonth = fromdate.getMonth()+1;
          let fromdt = fromdate.getDate();
          if (fromdt < 10) {
            fromdt = '0' + fromdt;
          }
          if (frommonth < 10) {
            frommonth = '0' + frommonth;
          }
        //********from date end******//

          //******** forwardon date******//
          let  forwardondate = new Date(users[i].forwardon_date);
          let forwardonyear = forwardondate.getFullYear();
          let forwardonmonth = forwardondate.getMonth()+1;
          let forwardondt = forwardondate.getDate();
          if (forwardondt < 10) {
            forwardondt = '0' + forwardondt;
          }
          if (forwardonmonth < 10) {
            forwardonmonth = '0' + forwardonmonth;
          }
        //********forwardon date end******//

        temp['_id']=users[i]._id;
        temp['type']=users[i].type;
        temp['invoice_no']=users[i].invoice_no;
        temp['currency']=users[i].currency;
        temp['cunter_party_name']=users[i].cunter_party_name;
        temp['amount_in_fc']=users[i].amount_in_fc;
        temp['start_date']=users[i].start_date;
        temp['from_date']=users[i].from_date;
        temp['forwardon_date']=users[i].forwardon_date;
        temp['previous_spot']=users[i].previous_spot;
        temp['previous_premium']=users[i].previous_premium;
        temp['costed_rate']=users[i].costed_rate;
        temp['current_forwardrate']=users[i].current_forwardrate;
        temp['profit_loss']=users[i].profit_loss;
        temp['userid']=users[i].userid;
        temp['myconvertstart']=(dt+'-' + month + '-'+year);
        temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
        temp['myconvertforwardon']=(forwardondt+'-' + forwardonmonth + '-'+forwardonyear);
        mymanualArray.push(temp);
      }

      var XLSX = require('xlsx')
      var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/settleddata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
      { header: "S no.", key: "s_no" },
      { header: "Txn Type", key: "type" },
      { header: "Trade ref no.", key: "invoice_no" },
      { header: "Currency", key: "currency" },
      { header: "Counterparty", key: "cunter_party_name" },
      { header: "Open amount", key: "amount_in_fc" },
      { header: "Recognition date", key: "start_date" },
      { header: "Due date", key: "from_date" },
      { header: "Forward as on date", key: "forwardon_date" },
      { header: "Spot", key: "previous_spot" },
      { header: "Premium", key: "previous_premium" },
      { header: "Costed Rate", key: "costed_rate" },
      { header: "Current forward rate", key: "current_forwardrate" },
      { header: "100% Hedge P&L", key: "profit_loss" },
      ];
      // Looping through User data
      let counter = 1;
      mymanualArray.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
        await workbook.xlsx.writeFile(`${path}/exportfiltersettleddata.xlsx`)
        .then(() => {
          console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
      } catch (err) {
        console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }
      res.json({ response: true, message: "Data found", details: users });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});


router.post('/pcfc_settled_exceldatewise_filter', function (req, res, next) {
  let userid = req.body.userid;
  let start_date = req.body.start_date;
  let start_date1 = req.body.start_date1;
  var mymanualArray = [];
  Settledpcfcdata.find({  userid: { '$eq': userid },start_date_convert:{'$gte':new Date(start_date),'$lt':new Date(start_date1) }},async function (err, users) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (users) {
      // console.log('sdfhsdkskkjs',users)
      for (var i = 0; i < users.length; i++) {
        // console.log(users[i]);
        let temp = {}

         //********start date******//
         let  date = new Date(users[i].start_date);
         let year = date.getFullYear();
         let month = date.getMonth()+1;
         let dt = date.getDate();
         if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }
        //********start date end******//

          //********from date******//
          let  fromdate = new Date(users[i].from_date);
          let fromyear = fromdate.getFullYear();
          let frommonth = fromdate.getMonth()+1;
          let fromdt = fromdate.getDate();
          if (fromdt < 10) {
            fromdt = '0' + fromdt;
          }
          if (frommonth < 10) {
            frommonth = '0' + frommonth;
          }
        //********from date end******//
          //********to date******//
          let  todate = new Date(users[i].to_date);
          let toyear = todate.getFullYear();
          let tomonth = todate.getMonth()+1;
          let todt = todate.getDate();
          if (todt < 10) {
            todt = '0' + todt;
          }
          if (tomonth < 10) {
            tomonth = '0' + tomonth;
          }
        //********to date end******//

          //******** forwardon date******//
          let  forwardondate = new Date(users[i].forwardon_date);
          let forwardonyear = forwardondate.getFullYear();
          let forwardonmonth = forwardondate.getMonth()+1;
          let forwardondt = forwardondate.getDate();
          if (forwardondt < 10) {
            forwardondt = '0' + forwardondt;
          }
          if (forwardonmonth < 10) {
            forwardonmonth = '0' + forwardonmonth;
          }
        //********forwardon date end******//

        temp['_id']=users[i]._id;
        temp['type']=users[i].type;
        temp['cunter_party_name']=users[i].cunter_party_name;
        temp['currency']=users[i].currency;
        temp['amount_in_fc']=users[i].amount_in_fc;
        temp['start_date']=users[i].start_date;
        temp['from_date']=users[i].from_date;
        temp['to_date']=users[i].to_date;
        temp['forwardon_date']=users[i].forwardon_date;
        temp['previous_spot']=users[i].previous_spot;
        temp['previous_premium']=users[i].previous_premium;
        temp['booking_rate']=users[i].booking_rate;
        temp['current_forwardrate']=users[i].current_forwardrate;
        temp['status']=users[i].status;
        temp['profit_loss']=users[i].profit_loss;
        temp['settledid']=users[i].settledid;
        temp['userid']=users[i].userid;
        temp['created_at']=users[i].created_at;
        temp['updated_at']=users[i].updated_at;
        temp['created_by']=users[i].created_by;
        temp['updated_by']=users[i].updated_by;
        temp['myconvertstart']=(dt+'-' + month + '-'+year);
        temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
        temp['myconverttodate']=(todt+'-' + tomonth + '-'+toyear);
        temp['myconvertforwardon']=(forwardondt+'-' + forwardonmonth + '-'+forwardonyear);
        mymanualArray.push(temp);
      }
      console.log(mymanualArray)
      var XLSX = require('xlsx')
      var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/settleddata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
      { header: "S no.", key: "s_no" },
      { header: "Txn Type", key: "type" },
        // { header: "Trade ref no.", key: "invoice_no" },
        { header: "Currency", key: "currency" },
        { header: "Counterparty", key: "cunter_party_name" },
        { header: "Open amount", key: "amount_in_fc" },
        { header: "Start date", key: "myconvertstart" },
        { header: "From date", key: "myconvertfromdate" },
        { header: "To date", key: "myconverttodate" },
        { header: "Forward as on date", key: "myconvertforwardon" },
        { header: "Spot", key: "previous_spot" },
        { header: "Premium", key: "previous_premium" },
        { header: "Bookking Rate", key: "booking_rate" },
        { header: "Current forward rate", key: "current_forwardrate" },
        { header: "EDC", key: "edc" },
        { header: "Status", key: "status" },
        { header: "100% Hedge P&L", key: "profit_loss" },
        ];
      // Looping through User data
      let counter = 1;
      mymanualArray.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
        await workbook.xlsx.writeFile(`${path}/pcfcfiltersettleddata.xlsx`)
        .then(() => {
          console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
      } catch (err) {
        console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }
      res.json({ response: true, message: "Data found", details: users });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});


router.post('/forexbuy_settled_exceldatewise_filter', function (req, res, next) {
  let userid = req.body.userid;
  let start_date = req.body.start_date;
  let start_date1 = req.body.start_date1;
  var mymanualArray = [];
  Settledforexbuydata.find({  userid: { '$eq': userid },start_date_convert:{'$gte':new Date(start_date),'$lt':new Date(start_date1) }},async function (err, users) {

    if (err) {
      res.json({ response: false, message: err });
    }
    if (users) {


      for (var i = 0; i < users.length; i++) {
        // console.log(users[i]);
        let temp = {}

         //********start date******//
         let  date = new Date(users[i].start_date);
         let year = date.getFullYear();
         let month = date.getMonth()+1;
         let dt = date.getDate();
         if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }
        //********start date end******//

          //********from date******//
          let  fromdate = new Date(users[i].from_date);
          let fromyear = fromdate.getFullYear();
          let frommonth = fromdate.getMonth()+1;
          let fromdt = fromdate.getDate();
          if (fromdt < 10) {
            fromdt = '0' + fromdt;
          }
          if (frommonth < 10) {
            frommonth = '0' + frommonth;
          }
        //********from date end******//
          //********to date******//
          let  todate = new Date(users[i].to_date);
          let toyear = todate.getFullYear();
          let tomonth = todate.getMonth()+1;
          let todt = todate.getDate();
          if (todt < 10) {
            todt = '0' + todt;
          }
          if (tomonth < 10) {
            tomonth = '0' + tomonth;
          }
        //********to date end******//

          //******** forwardon date******//
          let  forwardondate = new Date(users[i].forwardon_date);
          let forwardonyear = forwardondate.getFullYear();
          let forwardonmonth = forwardondate.getMonth()+1;
          let forwardondt = forwardondate.getDate();
          if (forwardondt < 10) {
            forwardondt = '0' + forwardondt;
          }
          if (forwardonmonth < 10) {
            forwardonmonth = '0' + forwardonmonth;
          }
        //********forwardon date end******//

        temp['_id']=users[i]._id;
        temp['type']=users[i].type;
        temp['cunter_party_name']=users[i].cunter_party_name;
        temp['currency']=users[i].currency;
        temp['amount_in_fc']=users[i].amount_in_fc;
        temp['start_date']=users[i].start_date;
        temp['from_date']=users[i].from_date;
        temp['to_date']=users[i].to_date;
        temp['forwardon_date']=users[i].forwardon_date;
        temp['previous_spot']=users[i].previous_spot;
        temp['previous_premium']=users[i].previous_premium;
        temp['booking_rate']=users[i].booking_rate;
        temp['current_forwardrate']=users[i].current_forwardrate;
        temp['status']=users[i].status;
        temp['profit_loss']=users[i].profit_loss;
        temp['edc']=users[i].edc;
        temp['userid']=users[i].userid;
        temp['myconvertstart']=(dt+'-' + month + '-'+year);
        temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
        temp['myconverttodate']=(todt+'-' + tomonth + '-'+toyear);
        temp['myconvertforwardon']=(forwardondt+'-' + forwardonmonth + '-'+forwardonyear);
        mymanualArray.push(temp);
      }
        // console.log(mymanualArray)

        var XLSX = require('xlsx')
        var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/settleddata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
      { header: "S no.", key: "s_no" },
      { header: "Txn Type", key: "type" },
      { header: "Currency", key: "currency" },
      { header: "Counterparty", key: "cunter_party_name" },
      { header: "Open amount", key: "amount_in_fc" },
      { header: "Start date", key: "myconvertstart" },
      { header: "From date", key: "myconvertfromdate" },
      { header: "To date", key: "myconverttodate" },
      { header: "Forward as on date", key: "myconvertforwardon" },
      { header: "Spot", key: "previous_spot" },
      { header: "Premium", key: "previous_premium" },
      { header: "Booking Rate", key: "booking_rate" },
      { header: "Current forward rate", key: "current_forwardrate" },
      { header: "EDC", key: "edc" },
      { header: "Status", key: "status" },
      { header: "100% Hedge P&L", key: "profit_loss" },
      ];
      // Looping through User data
      let counter = 1;
      mymanualArray.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
        await workbook.xlsx.writeFile(`${path}/forexbuyfiltersettleddata.xlsx`)
        .then(() => {
          console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
      } catch (err) {
        console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }
      res.json({ response: true, message: "Data found", details: users });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});


router.post('/forexsell_settled_exceldatewise_filter', function (req, res, next) {
 let userid = req.body.userid;
 let start_date = req.body.start_date;
 let start_date1 = req.body.start_date1;
 var mymanualArray = [];
 Settledforexselldata.find({  userid: { '$eq': userid },start_date_convert:{'$gte':new Date(start_date),'$lt':new Date(start_date1) }},async function (err, users) {
  if (err) {
    res.json({ response: false, message: err });
  }
  if (users) {
   for (var i = 0; i < users.length; i++) {
        // console.log(users[i]);
        let temp = {}

         //********start date******//
         let  date = new Date(users[i].start_date);
         let year = date.getFullYear();
         let month = date.getMonth()+1;
         let dt = date.getDate();
         if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }
        //********start date end******//

          //********from date******//
          let  fromdate = new Date(users[i].from_date);
          let fromyear = fromdate.getFullYear();
          let frommonth = fromdate.getMonth()+1;
          let fromdt = fromdate.getDate();
          if (fromdt < 10) {
            fromdt = '0' + fromdt;
          }
          if (frommonth < 10) {
            frommonth = '0' + frommonth;
          }
        //********from date end******//
          //********to date******//
          let  todate = new Date(users[i].to_date);
          let toyear = todate.getFullYear();
          let tomonth = todate.getMonth()+1;
          let todt = todate.getDate();
          if (todt < 10) {
            todt = '0' + todt;
          }
          if (tomonth < 10) {
            tomonth = '0' + tomonth;
          }
        //********to date end******//

          //******** forwardon date******//
          let  forwardondate = new Date(users[i].forwardon_date);
          let forwardonyear = forwardondate.getFullYear();
          let forwardonmonth = forwardondate.getMonth()+1;
          let forwardondt = forwardondate.getDate();
          if (forwardondt < 10) {
            forwardondt = '0' + forwardondt;
          }
          if (forwardonmonth < 10) {
            forwardonmonth = '0' + forwardonmonth;
          }
        //********forwardon date end******//

        temp['_id']=users[i]._id;
        temp['type']=users[i].type;
        temp['cunter_party_name']=users[i].cunter_party_name;
        temp['bank_name']=users[i].bank_name;
        temp['currency']=users[i].currency;
        temp['amount_in_fc']=users[i].amount_in_fc;
        temp['start_date']=users[i].start_date;
        temp['from_date']=users[i].from_date;
        temp['to_date']=users[i].to_date;
        temp['forwardon_date']=users[i].forwardon_date;
        temp['previous_spot']=users[i].previous_spot;
        temp['previous_premium']=users[i].previous_premium;
        temp['booking_rate']=users[i].booking_rate;
        temp['current_forwardrate']=users[i].current_forwardrate;
        temp['status']=users[i].status;
        temp['profit_loss']=users[i].profit_loss;
        temp['settledid']=users[i].settledid;
        temp['userid']=users[i].userid;
        temp['created_at']=users[i].created_at;
        temp['updated_at']=users[i].updated_at;
        temp['created_by']=users[i].created_by;
        temp['updated_by']=users[i].updated_by;
        temp['myconvertstart']=(dt+'-' + month + '-'+year);
        temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
        temp['myconverttodate']=(todt+'-' + tomonth + '-'+toyear);
        temp['myconvertforwardon']=(forwardondt+'-' + forwardonmonth + '-'+forwardonyear);
        mymanualArray.push(temp);
      }
      // console.log(mymanualArray)
      var XLSX = require('xlsx')
      var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/settleddata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
      { header: "S no.", key: "s_no" },
      { header: "Txn Type", key: "type" },
      { header: "Currency", key: "currency" },
      { header: "Counterparty", key: "cunter_party_name" },
      { header: "Bank Name", key: "bank_name" },
      { header: "Open amount", key: "amount_in_fc" },
      { header: "Start date", key: "myconvertstart" },
      { header: "From date", key: "myconvertfromdate" },
      { header: "To date", key: "myconverttodate" },
      { header: "Forward as on date", key: "myconvertforwardon" },
      { header: "Spot", key: "previous_spot" },
      { header: "Premium", key: "previous_premium" },
      { header: "Booking Rate", key: "booking_rate" },
      { header: "Current forward rate", key: "current_forwardrate" },
      { header: "EDC", key: "edc" },
      { header: "Status", key: "status" },
      { header: "100% Hedge P&L", key: "profit_loss" },
      ];
      // Looping through User data
      let counter = 1;
      mymanualArray.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
        await workbook.xlsx.writeFile(`${path}/forexsellfiltersettleddata.xlsx`)
        .then(() => {
          console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
      } catch (err) {
        console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }
      res.json({ response: true, message: "Data found", details: users });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});


router.post('/importcalculation_filter_excel_data', function (req, res, next) {
  let users = JSON.parse(req.body.arr);
  let start_date = req.body.start_date;
  let start_date1 = req.body.start_date1;
  var temp1 = []
  if (users) {
    for (var i = 0; i < users.length; i++) {
      var temp = {};

      //***********start Date convert*********//

      var mycovertstartate = new Date(users[i].start_date);
       // console.log(mycovertstartate)
       var  startday = mycovertstartate.getDate();        
       var  startmonth = mycovertstartate.getMonth();     
       var startyear = mycovertstartate.getFullYear();
       const startnewdate = new Date(Date.UTC(startyear, startmonth, startday))
       const resultstart = startnewdate.toISOString().split('T')[0]
      //  console.log(resultstart) 
      var myresultsplitresultstart = resultstart.split('-');
      //  console.log(myresultsplitresultstart)
      var startfinal=myresultsplitresultstart[2]+"-"+myresultsplitresultstart[1]+"-"+myresultsplitresultstart[0];
      //  console.log('startfinal',startfinal)
      var startfinal1=myresultsplitresultstart[0] +"-"+myresultsplitresultstart[1]+"-"+myresultsplitresultstart[2];
        //console.log('startfinal1',startfinal1)

       //***********start Date convert end*********//


         //***********Due Date convert*********//

         var mycovertduedate = new Date(users[i].due_date);
       // console.log(mycovertduedate)
       var  dueday = mycovertduedate.getDate();        
       var  duemonth = mycovertduedate.getMonth();     
       var dueyear = mycovertduedate.getFullYear();
       const duenewdate = new Date(Date.UTC(dueyear, duemonth, dueday))
       const resultdue = duenewdate.toISOString().split('T')[0]
       // console.log(resultdue) 
       var myresultsplitresultdue = resultdue.split('-');
       // console.log(myresultsplitresultdue)
       var duefinal=myresultsplitresultdue[2]+"-"+myresultsplitresultdue[1]+"-"+myresultsplitresultdue[0];
       // console.log('duefinal',duefinal)

       //***********Due Date convert end*********//

   //***********forwardon Date convert*********//

   var mycovertforwardon = new Date(users[i].forwardon_date);
        //console.log(mycovertforwardon)
        var  forwardonday = mycovertforwardon.getDate();        
        var  forwardonmonth = mycovertforwardon.getMonth();     
        var forwardonyear = mycovertforwardon.getFullYear();
        const forwardonnewdate = new Date(Date.UTC(forwardonyear, forwardonmonth, forwardonday))
        const resultforwardon = forwardonnewdate.toISOString().split('T')[0]
       // console.log(resultforwardon) 
       var myresultsplitresultforwardon = resultforwardon.split('-');
        //console.log(myresultsplitresultforwardon)
        var forwardonfinal=myresultsplitresultforwardon[2]+"-"+myresultsplitresultforwardon[1]+"-"+myresultsplitresultforwardon[0];
        //console.log('forwardonfinal',forwardonfinal)
        
       //***********forwardon Date convert end*********//

       var startone = new Date(start_date);
       var starttwo =   new Date(start_date1);
       var mydate = new Date(startfinal1);
       if (mydate>=startone && mydate<=starttwo) {
        temp['_id']=users[i]._id;
        temp['type']=users[i].type;
        temp['invoice_no']=users[i].invoice_no;
        temp['currency']=users[i].currency ;
        temp['cunter_party_name']=users[i].cunter_party_name;
        temp['amount_in_fc']=users[i].amount_in_fc; 
        temp['start_date']=users[i].start_date ;
        temp['due_date']=users[i].due_date ;
        temp['forwardon_date']=users[i].forwardon_date;
        temp['costing_spot']=users[i].costing_spot ;
        temp['costing_premium']=users[i].costing_premium ;
        temp['costed_rate']=users[i].costed_rate ;
        temp['mtm_spot']=users[i].mtm_spot ;
        temp['mtm_premium']=users[i].mtm_premium ;
        temp['current_forwardrate']=users[i].current_forwardrate; 
        temp['profit_loss']=users[i].profit_loss ;
        temp['savecalcualtionid']=users[i].savecalcualtionid ;
        temp['userid']=users[i].userid ;
        temp['created_at']=users[i].created_at ;
        temp['updated_at']=users[i].updated_at ;
        temp['updated_by']=users[i].updated_by ;
        temp['created_by']=users[i].created_by ;
        temp['myconvertstart']= startfinal;
        temp['myconvertdue']= duefinal;
        temp['myconvertforwardon']= forwardonfinal;
        temp['myconvertstart1']=startfinal1;
        temp1.push(temp);
      }





    }

    console.log(temp1)
    var XLSX = require('xlsx')
    var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/caculationdata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
      { header: "S no.", key: "s_no" },
      { header: "Txn Type", key: "type" },
      { header: "Trade ref no.", key: "invoice_no" },
      { header: "Currency", key: "currency" },
      { header: "Counterparty", key: "cunter_party_name" },
      { header: "Open amount", key: "amount_in_fc" },
      { header: "Recognition date", key: "myconvertstart" },
      { header: "Due date", key: "myconvertdue" },
      { header: "Forward as on date", key: "myconvertforwardon" },
      { header: "Costing Spot", key: "costing_spot" },
      { header: "Costing Premium", key: "costing_premium" },
      { header: "Costed Rate", key: "costed_rate" },
      { header: "MTM Spot", key: "mtm_spot" },
      { header: "MTM Premium", key: "mtm_premium" },
      { header: "Current forward rate", key: "current_forwardrate" },
      { header: "100% Hedge P&L", key: "profit_loss" },
      ];
      // Looping through User data

      // console.log('temp1',temp1);
      let counter = 1;
      temp1.forEach((user) => {
        console.log('user',user)

        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
       workbook.xlsx.writeFile(`${path}/importfiltercalcualtiondata.xlsx`)
       .then(() => {
        console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
     } catch (err) {
      console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }



      res.json({ response: true, message: "Data found", details: users });
    } else {
      res.json({ response: false, message: "No Data found" });
    }

  });


router.post('/exportcalculation_filter_excel_data', function (req, res, next) {
  let users = JSON.parse(req.body.arr);
  let start_date = req.body.start_date;
  let start_date1 = req.body.start_date1;
  var temp1 = []
  if (users) {
    for (var i = 0; i < users.length; i++) {
      var temp = {};

      //***********start Date convert*********//

      var mycovertstartate = new Date(users[i].start_date);
       // console.log(mycovertstartate)
       var  startday = mycovertstartate.getDate();        
       var  startmonth = mycovertstartate.getMonth();     
       var startyear = mycovertstartate.getFullYear();
       const startnewdate = new Date(Date.UTC(startyear, startmonth, startday))
       const resultstart = startnewdate.toISOString().split('T')[0]
      //  console.log(resultstart) 
      var myresultsplitresultstart = resultstart.split('-');
      //  console.log(myresultsplitresultstart)
      var startfinal=myresultsplitresultstart[2]+"-"+myresultsplitresultstart[1]+"-"+myresultsplitresultstart[0];
      //  console.log('startfinal',startfinal)
      var startfinal1=myresultsplitresultstart[0] +"-"+myresultsplitresultstart[1]+"-"+myresultsplitresultstart[2];
        //console.log('startfinal1',startfinal1)

       //***********start Date convert end*********//


         //***********Due Date convert*********//

         var mycovertduedate = new Date(users[i].due_date);
       // console.log(mycovertduedate)
       var  dueday = mycovertduedate.getDate();        
       var  duemonth = mycovertduedate.getMonth();     
       var dueyear = mycovertduedate.getFullYear();
       const duenewdate = new Date(Date.UTC(dueyear, duemonth, dueday))
       const resultdue = duenewdate.toISOString().split('T')[0]
       // console.log(resultdue) 
       var myresultsplitresultdue = resultdue.split('-');
       // console.log(myresultsplitresultdue)
       var duefinal=myresultsplitresultdue[2]+"-"+myresultsplitresultdue[1]+"-"+myresultsplitresultdue[0];
       // console.log('duefinal',duefinal)

       //***********Due Date convert end*********//

   //***********forwardon Date convert*********//

   var mycovertforwardon = new Date(users[i].forwardon_date);
        //console.log(mycovertforwardon)
        var  forwardonday = mycovertforwardon.getDate();        
        var  forwardonmonth = mycovertforwardon.getMonth();     
        var forwardonyear = mycovertforwardon.getFullYear();
        const forwardonnewdate = new Date(Date.UTC(forwardonyear, forwardonmonth, forwardonday))
        const resultforwardon = forwardonnewdate.toISOString().split('T')[0]
       // console.log(resultforwardon) 
       var myresultsplitresultforwardon = resultforwardon.split('-');
        //console.log(myresultsplitresultforwardon)
        var forwardonfinal=myresultsplitresultforwardon[2]+"-"+myresultsplitresultforwardon[1]+"-"+myresultsplitresultforwardon[0];
        //console.log('forwardonfinal',forwardonfinal)
        
       //***********forwardon Date convert end*********//

       var startone = new Date(start_date);
       var starttwo =   new Date(start_date1);
       var mydate = new Date(startfinal1);
       if (mydate>=startone && mydate<=starttwo) {
        temp['_id']=users[i]._id;
        temp['type']=users[i].type;
        temp['invoice_no']=users[i].invoice_no;
        temp['currency']=users[i].currency ;
        temp['cunter_party_name']=users[i].cunter_party_name;
        temp['amount_in_fc']=users[i].amount_in_fc; 
        temp['start_date']=users[i].start_date ;
        temp['due_date']=users[i].due_date ;
        temp['forwardon_date']=users[i].forwardon_date;
        temp['costing_spot']=users[i].costing_spot ;
        temp['costing_premium']=users[i].costing_premium ;
        temp['costed_rate']=users[i].costed_rate ;
        temp['mtm_spot']=users[i].mtm_spot ;
        temp['mtm_premium']=users[i].mtm_premium ;
        temp['current_forwardrate']=users[i].current_forwardrate; 
        temp['profit_loss']=users[i].profit_loss ;
        temp['savecalcualtionid']=users[i].savecalcualtionid ;
        temp['userid']=users[i].userid ;
        temp['created_at']=users[i].created_at ;
        temp['updated_at']=users[i].updated_at ;
        temp['updated_by']=users[i].updated_by ;
        temp['created_by']=users[i].created_by ;
        temp['myconvertstart']= startfinal;
        temp['myconvertdue']= duefinal;
        temp['myconvertforwardon']= forwardonfinal;
        temp['myconvertstart1']=startfinal1;
        temp1.push(temp);
      }





    }

    console.log(temp1)
    var XLSX = require('xlsx')
    var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/caculationdata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
      { header: "S no.", key: "s_no" },
      { header: "Txn Type", key: "type" },
      { header: "Trade ref no.", key: "invoice_no" },
      { header: "Currency", key: "currency" },
      { header: "Counterparty", key: "cunter_party_name" },
      { header: "Open amount", key: "amount_in_fc" },
      { header: "Recognition date", key: "myconvertstart" },
      { header: "Due date", key: "myconvertdue" },
      { header: "Forward as on date", key: "myconvertforwardon" },
      { header: "Costing Spot", key: "costing_spot" },
      { header: "Costing Premium", key: "costing_premium" },
      { header: "Costed Rate", key: "costed_rate" },
      { header: "MTM Spot", key: "mtm_spot" },
      { header: "MTM Premium", key: "mtm_premium" },
      { header: "Current forward rate", key: "current_forwardrate" },
      { header: "100% Hedge P&L", key: "profit_loss" },
      ];
      // Looping through User data

      // console.log('temp1',temp1);
      let counter = 1;
      temp1.forEach((user) => {
        console.log('user',user)

        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
       workbook.xlsx.writeFile(`${path}/exportfiltercalcualtiondata.xlsx`)
       .then(() => {
        console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
     } catch (err) {
      console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }



      res.json({ response: true, message: "Data found", details: users });
    } else {
      res.json({ response: false, message: "No Data found" });
    }

  });



router.post('/pcfcsave_filter_data_excel', function (req, res, next) {
 let users = JSON.parse(req.body.arr);
 let start_date = req.body.start_date;
 let start_date1 = req.body.start_date1;
 var mymanualArray = [];
  // Savepcfccalculation.find({ userid: { '$eq': userid } },async function (err, users) {

    if (users) {


     for (var i = 0; i < users.length; i++) {
          // console.log(users[i]);
          let temp = {}

         //********start date******//
         let  date = new Date(users[i].start_date);
         let year = date.getFullYear();
         let month = date.getMonth()+1;
         let dt = date.getDate();
         if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }
        //********start date end******//

          //********from date******//
          let  fromdate = new Date(users[i].from_date);
          let fromyear = fromdate.getFullYear();
          let frommonth = fromdate.getMonth()+1;
          let fromdt = fromdate.getDate();
          if (fromdt < 10) {
            fromdt = '0' + fromdt;
          }
          if (frommonth < 10) {
            frommonth = '0' + frommonth;
          }
        //********from date end******//
          //********to date******//
          let  todate = new Date(users[i].to_date);
          let toyear = todate.getFullYear();
          let tomonth = todate.getMonth()+1;
          let todt = todate.getDate();
          if (todt < 10) {
            todt = '0' + todt;
          }
          if (tomonth < 10) {
            tomonth = '0' + tomonth;
          }
        //********to date end******//

          //******** forwardon date******//
          let  forwardondate = new Date(users[i].forwardon_date);
          let forwardonyear = forwardondate.getFullYear();
          let forwardonmonth = forwardondate.getMonth()+1;
          let forwardondt = forwardondate.getDate();
          if (forwardondt < 10) {
            forwardondt = '0' + forwardondt;
          }
          if (forwardonmonth < 10) {
            forwardonmonth = '0' + forwardonmonth;
          }
        //********forwardon date end******//

        var startone = new Date(start_date);
        var starttwo =   new Date(start_date1);
        var startfinal1 = (year+'-' + month + '-'+dt);
        var mydate = new Date(startfinal1);
        if (mydate>=startone && mydate<=starttwo) {
        // console.log(startone,);
        // console.log(starttwo);
        // console.log(mydate)
        temp['_id']=users[i]._id;
        temp['type']=users[i].type;
        temp['company_name']=users[i].company_name;
        temp['bank_name']=users[i].bank_name;
        temp['currency']=users[i].currency;
        temp['amount_in_fc']=users[i].amount_in_fc;
        temp['start_date']=users[i].start_date;
        temp['from_date']=users[i].from_date;
        temp['to_date']=users[i].to_date;
        temp['forwardon_date']=users[i].forwardon_date;
        temp['costing_spot']=users[i].costing_spot;
        temp['costing_premium']=users[i].costing_premium;
        temp['booking_rate']=users[i].booking_rate;
        temp['bank_margin']=users[i].bank_margin;
        temp['mtm_spot']=users[i].mtm_spot;
        temp['mtm_premium']=users[i].mtm_premium;
        temp['current_forwardrate']=users[i].current_forwardrate;
        temp['profit_loss']=users[i].profit_loss;
        temp['userid']=users[i].userid;
        temp['myconvertstart']=(dt+'-' + month + '-'+year);
        temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
        temp['myconverttodate']=(todt+'-' + tomonth + '-'+toyear);
        temp['myconvertforwardon']=(forwardondt+'-' + forwardonmonth + '-'+forwardonyear);
        mymanualArray.push(temp);

      }


    }
     // console.log(mymanualArray)


     var XLSX = require('xlsx')
     var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/caculationdata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
      { header: "S no.", key: "s_no" },
      { header: "Txn Type", key: "type" },
      { header: "Company Name", key: "company_name" },
      { header: "Bank Name", key: "bank_name" },
      { header: "Currency", key: "currency" },
      { header: "Open amount", key: "amount_in_fc" },
      { header: "Start date", key: "myconvertstart" },
      { header: "From date", key: "myconvertfromdate" },
      { header: "To Date", key: "myconverttodate" },
      { header: "Forward as on date", key: "myconvertforwardon" },
      { header: "Costing Spot", key: "costing_spot" },
      { header: "Costing Premium", key: "costing_premium" },
      { header: "Bank Margin", key: "bank_margin" },
      { header: "Booking Rate", key: "booking_rate" },
      { header: "MTM Spot", key: "mtm_spot" },
      { header: "MTM Premium", key: "mtm_premium" },
      { header: "Current forward rate", key: "current_forwardrate" },
      { header: "100% Hedge P&L", key: "profit_loss" },
      ];
      // Looping through User data
      let counter = 1;
      mymanualArray.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
       workbook.xlsx.writeFile(`${path}/pcfcsavecalcualtionfilterdata.xlsx`)
       .then(() => {
        console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
     } catch (err) {
      console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }


      res.json({ response: true, message: "Data found", details: users });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  // });
});




router.post('/forexbuysave_filter_excel_data', function (req, res, next) {
  let users = JSON.parse(req.body.arr);
  let start_date = req.body.start_date;
  let start_date1 = req.body.start_date1;
  var mymanualArray = [];

  // Saveforexbuycalculation.find({ userid: { '$eq': userid } }, async function (err, users) {
  //   if (err) {
  //     res.json({ response: false, message: err });
  //   }
  if (users) {

    for (var i = 0; i < users.length; i++) {
        // console.log(users[i]);
        let temp = {}

         //********start date******//
         let  date = new Date(users[i].start_date);
         let year = date.getFullYear();
         let month = date.getMonth()+1;
         let dt = date.getDate();
         if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }
        //********start date end******//

          //********from date******//
          let  fromdate = new Date(users[i].from_date);
          let fromyear = fromdate.getFullYear();
          let frommonth = fromdate.getMonth()+1;
          let fromdt = fromdate.getDate();
          if (fromdt < 10) {
            fromdt = '0' + fromdt;
          }
          if (frommonth < 10) {
            frommonth = '0' + frommonth;
          }
        //********from date end******//
          //********to date******//
          let  todate = new Date(users[i].to_date);
          let toyear = todate.getFullYear();
          let tomonth = todate.getMonth()+1;
          let todt = todate.getDate();
          if (todt < 10) {
            todt = '0' + todt;
          }
          if (tomonth < 10) {
            tomonth = '0' + tomonth;
          }
        //********to date end******//

          //******** forwardon date******//
          let  forwardondate = new Date(users[i].forwardon_date);
          let forwardonyear = forwardondate.getFullYear();
          let forwardonmonth = forwardondate.getMonth()+1;
          let forwardondt = forwardondate.getDate();
          if (forwardondt < 10) {
            forwardondt = '0' + forwardondt;
          }
          if (forwardonmonth < 10) {
            forwardonmonth = '0' + forwardonmonth;
          }
        //********forwardon date end******//

        var startone = new Date(start_date);
        var starttwo =   new Date(start_date1);
        var startfinal1 = (year+'-' + month + '-'+dt);
        var mydate = new Date(startfinal1);
        if (mydate>=startone && mydate<=starttwo) {
          temp['_id']=users[i]._id;
          temp['type']=users[i].type;
          temp['company_name']=users[i].company_name;
          temp['currency']=users[i].currency;
          temp['amount_in_fc']=users[i].amount_in_fc;
          temp['start_date']=users[i].start_date;
          temp['from_date']=users[i].from_date;
          temp['to_date']=users[i].to_date;
          temp['forwardon_date']=users[i].forwardon_date;
          temp['costing_spot']=users[i].costing_spot;
          temp['costing_premium']=users[i].costing_premium;
          temp['bank_margin']=users[i].bank_margin;
          temp['booking_rate']=users[i].booking_rate;
          temp['mtm_spot']=users[i].mtm_spot;
          temp['mtm_premium']=users[i].mtm_premium;
          temp['current_forwardrate']=users[i].current_forwardrate;
          temp['userid']=users[i].userid;
          temp['profit_loss']=users[i].profit_loss;
          temp['myconvertstart']=(dt+'-' + month + '-'+year);
          temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
          temp['myconverttodate']=(todt+'-' + tomonth + '-'+toyear);
          temp['myconvertforwardon']=(forwardondt+'-' + forwardonmonth + '-'+forwardonyear);
          mymanualArray.push(temp);

        }


      }

      var XLSX = require('xlsx')
      var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/caculationdata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
      { header: "S no.", key: "s_no" },
      { header: "Txn Type", key: "type" },
      { header: "Company Name", key: "company_name" },
      { header: "Currency", key: "currency" },
      { header: "Open amount", key: "amount_in_fc" },
      { header: "Start date", key: "myconvertstart" },
      { header: "From date", key: "myconvertfromdate" },
      { header: "To Date", key: "myconverttodate" },
      { header: "Forward as on date", key: "myconvertforwardon" },
      { header: "Costing Spot", key: "costing_spot" },
      { header: "Costing Premium", key: "costing_premium" },
      { header: "Bank Margin", key: "bank_margin" },
      { header: "Booking Rate", key: "booking_rate" },
      { header: "MTM Spot", key: "mtm_spot" },
      { header: "MTM Premium", key: "mtm_premium" },
      { header: "Current forward rate", key: "current_forwardrate" },
      { header: "100% Hedge P&L", key: "profit_loss" },
      ];
      // Looping through User data
      let counter = 1;
      mymanualArray.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
       workbook.xlsx.writeFile(`${path}/forexbuysavecalcualtionfilterdata.xlsx`)
       .then(() => {
        console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
     } catch (err) {
      console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }


      res.json({ response: true, message: "Data found", details: users });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  // });
});


router.post('/forexsellcalculationsave_filter_excel_data', function (req, res, next) {
 let users = JSON.parse(req.body.arr);
 let start_date = req.body.start_date;
 let start_date1 = req.body.start_date1;
 var mymanualArray = [];
  // Saveforexsellcalculation.find({ userid: { '$eq': userid } },async function (err, users) {
  //   if (err) {
  //     res.json({ response: false, message: err });
  //   }
  if (users) {


   for (var i = 0; i < users.length; i++) {
        // console.log(users[i]);
        let temp = {}

         //********start date******//
         let  date = new Date(users[i].start_date);
         let year = date.getFullYear();
         let month = date.getMonth()+1;
         let dt = date.getDate();
         if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }
        //********start date end******//

          //********from date******//
          let  fromdate = new Date(users[i].from_date);
          let fromyear = fromdate.getFullYear();
          let frommonth = fromdate.getMonth()+1;
          let fromdt = fromdate.getDate();
          if (fromdt < 10) {
            fromdt = '0' + fromdt;
          }
          if (frommonth < 10) {
            frommonth = '0' + frommonth;
          }
        //********from date end******//
          //********to date******//
          let  todate = new Date(users[i].to_date);
          let toyear = todate.getFullYear();
          let tomonth = todate.getMonth()+1;
          let todt = todate.getDate();
          if (todt < 10) {
            todt = '0' + todt;
          }
          if (tomonth < 10) {
            tomonth = '0' + tomonth;
          }
        //********to date end******//

          //******** forwardon date******//
          let  forwardondate = new Date(users[i].forwardon_date);
          let forwardonyear = forwardondate.getFullYear();
          let forwardonmonth = forwardondate.getMonth()+1;
          let forwardondt = forwardondate.getDate();
          if (forwardondt < 10) {
            forwardondt = '0' + forwardondt;
          }
          if (forwardonmonth < 10) {
            forwardonmonth = '0' + forwardonmonth;
          }
        //********forwardon date end******//

        var startone = new Date(start_date);
        var starttwo =   new Date(start_date1);
        var startfinal1 = (year+'-' + month + '-'+dt);
        var mydate = new Date(startfinal1);
        console.log("startone",startone)
        if (mydate>=startone && mydate<=starttwo) {

         temp['_id']=users[i]._id;
         temp['type']=users[i].type;
         temp['company_name']=users[i].company_name;
         temp['bank_name']=users[i].bank_name;
         temp['currency']=users[i].currency;
         temp['amount_in_fc']=users[i].amount_in_fc;
         temp['start_date']=users[i].start_date;
         temp['from_date']=users[i].from_date;
         temp['to_date']=users[i].to_date;
         temp['forwardon_date']=users[i].forwardon_date;
         temp['costing_spot']=users[i].costing_spot;
         temp['costing_premium']=users[i].costing_premium;
         temp['booking_rate']=users[i].booking_rate;
         temp['bank_margin']=users[i].bank_margin;
         temp['mtm_spot']=users[i].mtm_spot;
         temp['mtm_premium']=users[i].mtm_premium;
         temp['current_forwardrate']=users[i].current_forwardrate;
         temp['profit_loss']=users[i].profit_loss;
         temp['userid']=users[i].userid;
         temp['myconvertstart']=(dt+'-' + month + '-'+year);
         temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
         temp['myconverttodate']=(todt+'-' + tomonth + '-'+toyear);
         temp['myconvertforwardon']=(forwardondt+'-' + forwardonmonth + '-'+forwardonyear);
         mymanualArray.push(temp);

       }


     }
     // console.log(mymanualArray)


     var XLSX = require('xlsx')
     var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/caculationdata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
      { header: "S no.", key: "s_no" },
      { header: "Txn Type", key: "type" },
      { header: "Company Name", key: "company_name" },
      { header: "Bank Name", key: "bank_name" },
      { header: "Currency", key: "currency" },
      { header: "Open amount", key: "amount_in_fc" },
      { header: "Start date", key: "myconvertstart" },
      { header: "From date", key: "myconvertfromdate" },
      { header: "To Date", key: "myconverttodate" },
      { header: "Forward as on date", key: "myconvertforwardon" },
      { header: "Costing Spot", key: "costing_spot" },
      { header: "Costing Premium", key: "costing_premium" },
      { header: "Bank Margin", key: "bank_margin" },
      { header: "Booking Rate", key: "booking_rate" },
      { header: "MTM Spot", key: "mtm_spot" },
      { header: "MTM Premium", key: "mtm_premium" },
      { header: "Current forward rate", key: "current_forwardrate" },
      { header: "100% Hedge P&L", key: "profit_loss" },
      ];
      // Looping through User data
      let counter = 1;
      mymanualArray.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
       workbook.xlsx.writeFile(`${path}/forexsellsavecalcualtionfilterdata.xlsx`)
       .then(() => {
        console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
     } catch (err) {
      console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }


      res.json({ response: true, message: "Data found", details: users });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  // });
});


router.post('/upload_rbireferenceexcel', upload.single('file'), function (req, res) {
  // var wb = new Excel.Workbook();
  var filename = "";
  var userid = "";
  if (req.file) {
    filename = req.file.filename;
    userid = req.body.userid;
    console.log('userid', req.body.userid);
  }

  var filePath = path.resolve(DIR + "/" + filename);
  var XLSX = require('xlsx')
  var workbook = XLSX.readFile(filePath);
  var sheet_name_list = workbook.SheetNames;
  var Excel = require("exceljs");
  var workbook = new Excel.Workbook();
  var cnt = 1;
  var json_ary = [];
  var flag = false;
  ///var batch_id = String(Math.floor(Math.random() * 100) + 2 + "" + new Date().getTime());
  workbook.xlsx.readFile(filePath).then(function () {
    var worksheet = workbook.getWorksheet(sheet_name_list[0]);
    const promises = [];
    worksheet.eachRow(function (row, rowNumber) {
      console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
      
    });

    
    worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
      currRow = worksheet.getRow(rowNumber);
      if (cnt > 1 && currRow.getCell(1).value && currRow.getCell(2).value && currRow.getCell(3).value && currRow.getCell(4).value
       && currRow.getCell(5).value && currRow.getCell(6).value && currRow.getCell(7).value) {
        var applicable_date = "";
      var spotin_usd = "";
      var spotin_gbp = "";
      var spotin_euro = "";
      var spotin_yen = "";
      var spotin_eur_usd = "";
      var spotin_gbp_usd = "";

      applicable_date = currRow.getCell(1).value;
      spotin_usd = currRow.getCell(2).value;
      spotin_gbp = currRow.getCell(3).value;
      spotin_euro = currRow.getCell(4).value;
      spotin_yen = currRow.getCell(5).value;
      spotin_eur_usd = currRow.getCell(6).value;
      spotin_gbp_usd = currRow.getCell(7).value;
      console.log(spotin_eur_usd)

      var applicable_converdate = currRow.getCell(1).value;

      if (applicable_date) {
        applicable_date = applicable_date.toString();
         applicable_date = applicable_date.trim();
      }
      if (spotin_usd) {
        spotin_usd = spotin_usd.toString();
         spotin_usd = spotin_usd.trim();
      }
      if (spotin_gbp) {
        spotin_gbp = spotin_gbp.toString();
         spotin_gbp = spotin_gbp.trim();
      }
      if (spotin_euro) {
        spotin_euro = spotin_euro.toString();
         spotin_euro = spotin_euro.trim();
      }
      if (spotin_yen) {
        spotin_yen = spotin_yen.toString();
         spotin_yen = spotin_yen.trim();
      }
      // if (spotin_eur_usd) {
      //   spotin_eur_usd = spotin_eur_usd.result.toFixed(4).toString();
      // }
      // if (spotin_gbp_usd) {
      //   spotin_gbp_usd = spotin_gbp_usd.result.toFixed(4).toString();
      // }

       if (spotin_eur_usd) {
        spotin_eur_usd = spotin_eur_usd.toFixed(4).toString();
         spotin_eur_usd = spotin_eur_usd.trim();
      }
      if (spotin_gbp_usd) {
        spotin_gbp_usd = spotin_gbp_usd.toFixed(4).toString();
         spotin_gbp_usd = spotin_gbp_usd.trim();
      }

      Rbireferencemaster.countDocuments({ applicable_date: applicable_date }, function (err, count) {
         // console.log(count)
         if (count == 0) {
          json_ary.push({
            userid: (userid),
            applicable_date: applicable_date,
            applicable_converdate:applicable_converdate,
            spotin_usd: (spotin_usd),
            spotin_gbp: (spotin_gbp),
            spotin_euro: (spotin_euro),
            spotin_yen: (spotin_yen),
            spotin_eur_usd: (spotin_eur_usd),
            spotin_gbp_usd: (spotin_gbp_usd),
            created_at: new Date(),
            updated_at: new Date(),
            created_by: 'admin',
            updated_by: 'admin',
          });
          const promise = Rbireferencemaster.collection.insertOne({
            userid: (userid),
            applicable_date: applicable_date,
            applicable_converdate:applicable_converdate,
            spotin_usd: (spotin_usd),
            spotin_gbp: (spotin_gbp),
            spotin_euro: (spotin_euro),
            spotin_yen: (spotin_yen),
            spotin_eur_usd: (spotin_eur_usd),
            spotin_gbp_usd: (spotin_gbp_usd),
            created_at: new Date(),
            updated_at: new Date(),
            created_by: 'admin',
            updated_by: 'admin',
            }); // <-- whatever async operation you have here
          promises.push(promise);
        }
      })
    }

    cnt++;
  });
   // console.log('promises',promises.length)
   Promise.all(promises).then((result) => {
      // console.log("Done")
      res.json({ response: true, message: "Excel has been successfully uploaded" });
    }).catch((err) => {
      console.log("An error occurred while inserting data", err);
    });

  });

})



router.post('/getrbirefexceldata', function (req, res, next) {
  let userid = req.body.userid;
  var mymanualArray = [];
  Rbireferencemaster.find({ userid: { '$eq': userid } }, async function (err, users) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (users) {
      // res.json({ response: true, message: "Data found", details: users });

 for (var i = 0; i < users.length; i++) {
        // console.log(users[i]);
        let temp = {}

         //********start date******//
         let  date = new Date(users[i].applicable_date);
         let year = date.getFullYear();
         let month = date.getMonth()+1;
         let dt = date.getDate();
         if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }
        //********start date end******//

         
        
        temp['_id']=users[i]._id;
        temp['userid']=users[i].userid;
        temp['applicable_converdate']=users[i].applicable_converdate;
        temp['applicable_date']=users[i].applicable_date;
        temp['spotin_usd']=users[i].spotin_usd;
        temp['spotin_gbp']=users[i].spotin_gbp;
        temp['spotin_euro']=users[i].spotin_euro;
        temp['spotin_yen']=users[i].spotin_yen;
        temp['spotin_eur_usd']=users[i].spotin_eur_usd;
        temp['spotin_gbp_usd']=users[i].spotin_gbp_usd;
        temp['myconvertstart']=(dt+'-' + month + '-'+year);
       
        mymanualArray.push(temp);
      }

      var XLSX = require('xlsx')
      var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/admindata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
      { header: "S no.", key: "s_no" },
      { header: "Applicable date", key: "myconvertstart" },
      { header: "USD", key: "spotin_usd" },
      { header: "GBP", key: "spotin_gbp" },
      { header: "EURO", key: "spotin_euro" },
      { header: "YEN", key: "spotin_yen" },
      { header: "EUR/USD", key: "spotin_eur_usd" },
      { header: "GBP/USD", key: "spotin_gbp_usd" },

      ];
      // Looping through User data
      let counter = 1;
      mymanualArray.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
        await workbook.xlsx.writeFile(`${path}/rbirefexceldata.xlsx`)
        .then(() => {
          console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
      } catch (err) {
        console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }
      res.json({ response: true, message: "Data found", details: users });


    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});


router.post('/getrbirefexceldatewise', function (req, res, next) {
 let userid = req.body.userid;
 let applicable_date = req.body.applicable_date;
 let applicable_date1 = req.body.applicable_date1;
 var mymanualArray= [];

 Rbireferencemaster.find({ applicable_converdate:{'$gte':new Date(applicable_date),'$lt':new Date(applicable_date1) }},async function (err, users) {
  if (err) {
    res.json({ response: false, message: err });
  }
  if (users) {
      // res.json({ response: true, message: "Data found", details: user });
     // console.log('users',users)

     for (var i = 0; i < users.length; i++) {
        // console.log(users[i]);
        let temp = {}

         //********start date******//
         let  date = new Date(users[i].applicable_date);
         let year = date.getFullYear();
         let month = date.getMonth()+1;
         let dt = date.getDate();
         if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }
        //********start date end******//
        
        temp['_id']=users[i]._id;
        temp['userid']=users[i].userid;
        temp['applicable_converdate']=users[i].applicable_converdate;
        temp['applicable_date']=users[i].applicable_date;
        temp['spotin_usd']=users[i].spotin_usd;
        temp['spotin_gbp']=users[i].spotin_gbp;
        temp['spotin_euro']=users[i].spotin_euro;
        temp['spotin_yen']=users[i].spotin_yen;
        temp['spotin_eur_usd']=users[i].spotin_eur_usd;
        temp['spotin_gbp_usd']=users[i].spotin_gbp_usd;
        temp['myconvertstart']=(dt+'-' + month + '-'+year);
        mymanualArray.push(temp);
      }
      // console.log(mymanualArray)

      var XLSX = require('xlsx')
      var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/admindata/downloaddata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
      { header: "S no.", key: "s_no" },
      { header: "Applicable date", key: "myconvertstart" },
      { header: "USD", key: "spotin_usd" },
      { header: "GBP", key: "spotin_gbp" },
      { header: "EURO", key: "spotin_euro" },
      { header: "YEN", key: "spotin_yen" },
      { header: "EUR/USD", key: "spotin_eur_usd" },
      { header: "GBP/USD", key: "spotin_gbp_usd" },

      ];
      // Looping through User data
      let counter = 1;
      mymanualArray.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
        await workbook.xlsx.writeFile(`${path}/rbirefexceldatewisedata.xlsx`)
        .then(() => {
          console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
      } catch (err) {
        console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }
      res.json({ response: true, message: "Data found", details: users });


    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});



router.post('/getrbirefexceldataforcal', function (req, res, next) {
 Rbireferencemaster.find({ updated_by: { '$eq': 'admin' } }, async function (err, users) {
  if (err) {
    res.json({ response: false, message: err });
  }
  if (users) {
    res.json({ response: true, message: "Data found", details: users });
  } else {
    res.json({ response: false, message: "No Data found" });
  }
});
});


router.post('/getrbirefexceldataforcal1', function (req, res, next) {
   let applicable_converdate = req.body.applicable_converdate;
    let applicable_converdate1 = new Date(applicable_converdate).toISOString(); 
    console.log('applicable_converdate1',applicable_converdate1)
 Rbireferencemaster.find({ applicable_converdate: { '$eq': applicable_converdate1 } }, async function (err, users) {
  if (err) {
    res.json({ response: false, message: err });
  }
  if (users) {
    res.json({ response: true, message: "Data found", details: users });
  } else {
    res.json({ response: false, message: "No Data found" });
  }
});
});

router.post('/getadminimportexceldata', function(req, res, next) {
  let updated_by = req.body.updated_by;
  let type = req.body.type;
 Importinputexcel.aggregate([
  { $match: { updated_by: {'$eq':updated_by}, type: {'$eq':type} }},
  {
        $lookup:
            {
                from: "almus_users",
                let: { pid: "$userid" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$_id", { $toObjectId: "$$pid" }]
                            }
                        }
                    }
                ],
                as: "client"
            }
    },
    
]).exec(function(err,user){
  if (err) {
     res.json({ response: false, message: "No Data found" });
  }
  else{
   res.json({ response: true, message: "Data found", details: user });
  }

});

});



router.post('/getadminimportsettleddata', function(req, res, next) {
  let updated_by = req.body.updated_by;
  // let type = req.body.type;
 Settledimportdata.aggregate([
   { $match: { updated_by: {'$eq':updated_by} }},
  {
        $lookup:
            {
                from: "almus_users",
                let: { pid: "$userid" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$_id", { $toObjectId: "$$pid" }]
                            }
                        }
                    }
                ],
                as: "client"
            }
    },
    
]).exec(function(err,user){
  if (err) {
     res.json({ response: false, message: "No Data found" });
  }
  else{
   res.json({ response: true, message: "Data found", details: user });
  }

});

});


router.post('/getadmin_import_settled_exceldatewise_filter', function (req, res, next) {
 let updated_by = req.body.updated_by;
  let start_date = req.body.start_date;
  let start_date1 = req.body.start_date1;
  var mymanualArray = [];
  Settledimportdata.find({  updated_by: { '$eq': updated_by },start_date_convert:{'$gte':new Date(start_date),'$lt':new Date(start_date1) }},async function (err, users) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (users) {

        for (var i = 0; i < users.length; i++) {
        // console.log(users[i]);
         let temp = {} 

         //********start date******//
         let  date = new Date(users[i].start_date);
         let year = date.getFullYear();
         let month = date.getMonth()+1;
         let dt = date.getDate();
          if (dt < 10) {
            dt = '0' + dt;
          }
          if (month < 10) {
            month = '0' + month;
          }
        //********start date end******//

          //********from date******//
         let  fromdate = new Date(users[i].due_date);
         let fromyear = fromdate.getFullYear();
         let frommonth = fromdate.getMonth()+1;
         let fromdt = fromdate.getDate();
          if (fromdt < 10) {
            fromdt = '0' + fromdt;
          }
          if (frommonth < 10) {
            frommonth = '0' + frommonth;
          }
        //********from date end******//
       
          //******** forwardon date******//
         let  forwardondate = new Date(users[i].forwardon_date);
         let forwardonyear = forwardondate.getFullYear();
         let forwardonmonth = forwardondate.getMonth()+1;
         let forwardondt = forwardondate.getDate();
          if (forwardondt < 10) {
            forwardondt = '0' + forwardondt;
          }
          if (forwardonmonth < 10) {
            forwardonmonth = '0' + forwardonmonth;
          }
        //********forwardon date end******//
 
      temp['_id']=users[i]._id;
      temp['type']=users[i].type;
      temp['invoice_no']=users[i].invoice_no;
      temp['currency']=users[i].currency;
      temp['cunter_party_name']=users[i].cunter_party_name;
      temp['amount_in_fc']=users[i].amount_in_fc;
      temp['start_date']=users[i].start_date;
      temp['due_date']=users[i].due_date;
      temp['forwardon_date']=users[i].forwardon_date;
      temp['previous_spot']=users[i].previous_spot;
      temp['previous_premium']=users[i].previous_premium;
      temp['costed_rate']=users[i].costed_rate;
      temp['current_forwardrate']=users[i].current_forwardrate;
      temp['profit_loss']=users[i].profit_loss;
      temp['userid']=users[i].userid;
      temp['myconvertstart']=(dt+'-' + month + '-'+year);
      temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
      temp['myconvertforwardon']=(forwardondt+'-' + forwardonmonth + '-'+forwardonyear);
      mymanualArray.push(temp);
      }


      var XLSX = require('xlsx')
      var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/settleddata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
        { header: "S no.", key: "s_no" },
        { header: "Txn Type", key: "type" },
        { header: "Trade ref no.", key: "invoice_no" },
        { header: "Currency", key: "currency" },
        { header: "Counterparty", key: "cunter_party_name" },
        { header: "Open amount", key: "amount_in_fc" },
        { header: "Recognition date", key: "myconvertstart" },
        { header: "Due date", key: "myconvertfromdate" },
        { header: "Forward as on date", key: "myconvertforwardon" },
        { header: "Spot", key: "previous_spot" },
        { header: "Premium", key: "previous_premium" },
        { header: "Costed Rate", key: "costed_rate" },
        { header: "Current forward rate", key: "current_forwardrate" },
        { header: "100% Hedge P&L", key: "profit_loss" },
      ];
      // Looping through User data
      let counter = 1;
      mymanualArray.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
        await workbook.xlsx.writeFile(`${path}/adminimportfiltersettleddata.xlsx`)
          .then(() => {
            console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
      } catch (err) {
        console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }
      res.json({ response: true, message: "Data found", details: users });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});


// router.post('/getadminexportexceldata', function(req, res, next) {
// let updated_by = req.body.updated_by;
// let type = req.body.type;
//   Exportinputexcel.find({ updated_by: {'$eq':updated_by}, type: {'$eq':type} }, function (err, user) {
//     if (err) {
//       res.json({ response: false, message: err });
//     }
//     if (user) {
//        var mydata = [];
//        mydata.push(user);

//        console.log(user)
//       res.json({ response: true, message: "Data found", details: user });
//     } else {
//       res.json({ response: false, message: "No Data found" });
//     }
//   });
// });


router.post('/getadminexportexceldata', function(req, res, next) {
  let updated_by = req.body.updated_by;
  let type = req.body.type;
 Exportinputexcel.aggregate([
  { $match: { updated_by: {'$eq':updated_by}, type: {'$eq':type} }},
  {
        $lookup:
            {
                from: "almus_users",
                let: { pid: "$userid" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$_id", { $toObjectId: "$$pid" }]
                            }
                        }
                    }
                ],
                as: "client"
            }
    },
    
]).exec(function(err,user){
  if (err) {
     res.json({ response: false, message: "No Data found" });
  }
  else{
   res.json({ response: true, message: "Data found", details: user });
  }

});

});


// router.post('/getadminexportsettleddata', function (req, res, next) {
//   let updated_by = req.body.updated_by;
//    var mymanualArray = [];
//    var mymanualArray1 = [];
//   Settleddata.find({ updated_by: { '$eq': updated_by } }, async function (err, users) {
//     if (err) {
//       res.json({ response: false, message: err });
//     }
//     if (users) {

//        var amount_in_fc_total = 0;
//        var profit_loss_total = 0;
//        for (var i = 0; i < users.length; i++) {
//         // amount_in_fc_total += parseFloat(users[i].amount_in_fc);
//         //  profit_loss_total += parseFloat(users[i].profit_loss);
//         // console.log(users[i]);
//          let temp = {}

//          //********start date******//
//          let  date = new Date(users[i].start_date);
//          let year = date.getFullYear();
//          let month = date.getMonth()+1;
//          let dt = date.getDate();
//           if (dt < 10) {
//             dt = '0' + dt;
//           }
//           if (month < 10) {
//             month = '0' + month;
//           }
//         //********start date end******//

//           //********from date******//
//          let  fromdate = new Date(users[i].from_date);
//          let fromyear = fromdate.getFullYear();
//          let frommonth = fromdate.getMonth()+1;
//          let fromdt = fromdate.getDate();
//           if (fromdt < 10) {
//             fromdt = '0' + fromdt;
//           }
//           if (frommonth < 10) {
//             frommonth = '0' + frommonth;
//           }
//         //********from date end******//
       
//           //******** forwardon date******//
//          let  forwardondate = new Date(users[i].forwardon_date);
//          let forwardonyear = forwardondate.getFullYear();
//          let forwardonmonth = forwardondate.getMonth()+1;
//          let forwardondt = forwardondate.getDate();
//           if (forwardondt < 10) {
//             forwardondt = '0' + forwardondt;
//           }
//           if (forwardonmonth < 10) {
//             forwardonmonth = '0' + forwardonmonth;
//           }
//         //********forwardon date end******//
 
//       temp['_id']=users[i]._id;
//       temp['type']=users[i].type;
//       temp['invoice_no']=users[i].invoice_no;
//       temp['currency']=users[i].currency;
//       temp['cunter_party_name']=users[i].cunter_party_name;
//       temp['amount_in_fc']=users[i].amount_in_fc;
//       temp['start_date']=users[i].start_date;
//       temp['from_date']=users[i].from_date;
//       temp['forwardon_date']=users[i].forwardon_date;
//       temp['previous_spot']=users[i].previous_spot;
//       temp['previous_premium']=users[i].previous_premium;
//       temp['costed_rate']=users[i].costed_rate;
//       temp['current_forwardrate']=users[i].current_forwardrate;
//       temp['profit_loss']=users[i].profit_loss;
//       temp['userid']=users[i].userid;
//       temp['myconvertstart']=(dt+'-' + month + '-'+year);
//       temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
//       temp['myconvertforwardon']=(forwardondt+'-' + forwardonmonth + '-'+forwardonyear);
//       mymanualArray.push(temp);
//       }

     
      
//       var XLSX = require('xlsx')
//       var Excel = require("exceljs");
//       const workbook = new Excel.Workbook();  // Create a new workbook
//       const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
//       const path = "./uploads/settleddata";  // Path to download excel
//       // Column for data in excel. key must match data key
//       worksheet.columns = [
//         { header: "S no.", key: "s_no" },
//         { header: "Txn Type", key: "type" },
//         { header: "Trade ref no.", key: "invoice_no" },
//         { header: "Currency", key: "currency" },
//         { header: "Counterparty", key: "cunter_party_name" },
//         { header: "Open amount", key: "amount_in_fc" },
//         { header: "Recognition date", key: "start_date" },
//         { header: "Due date", key: "from_date" },
//         { header: "Forward as on date", key: "forwardon_date" },
//         { header: "Spot", key: "previous_spot" },
//         { header: "Premium", key: "previous_premium" },
//         { header: "Costed Rate", key: "costed_rate" },
//         { header: "Current forward rate", key: "current_forwardrate" },
//         { header: "100% Hedge P&L", key: "profit_loss" },
//       ];
//       // Looping through User data
//       let counter = 1;
//       mymanualArray.forEach((user) => {
//         user.s_no = counter;
//         worksheet.addRow(user); // Add data in worksheet
//         counter++;
//       });

//       worksheet.getRow(1).eachCell((cell) => {
//         cell.font = { bold: true };
//       });
//       try {
//         await workbook.xlsx.writeFile(`${path}/adminexportsettleddata.xlsx`)
//           .then(() => {
//             console.log("Success");
//             //res.json({ response: true, message: message, data: users });
//           });
//       } catch (err) {
//         console.log("Error");
//         //res.json({ response: false, message: "Something went wrong" });
//       }
//       var mydata = {"users":users,"profit_loss_total":profit_loss_total,"amount_in_fc_total":amount_in_fc_total}
//        res.json({ response: true, message: "Data found", details: mydata });
//     } else {
//       res.json({ response: false, message: "No Data found" });
//     }
//   });
// });


router.post('/getadminexportsettleddata', function(req, res, next) {
  let updated_by = req.body.updated_by;
  // let type = req.body.type;
 Settleddata.aggregate([
   { $match: { updated_by: {'$eq':updated_by} }},
  {
        $lookup:
            {
                from: "almus_users",
                let: { pid: "$userid" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$_id", { $toObjectId: "$$pid" }]
                            }
                        }
                    }
                ],
                as: "client"
            }
    },
    
]).exec(function(err,user){
  if (err) {
     res.json({ response: false, message: "No Data found" });
  }
  else{
   res.json({ response: true, message: "Data found", details: user });
  }

});

});



router.post('/getadmin_export_settled_exceldatewise_filter', function (req, res, next) {
 let updated_by = req.body.updated_by;
  let start_date = req.body.start_date;
  let start_date1 = req.body.start_date1;
  var mymanualArray = [];
  Settleddata.find({  updated_by: { '$eq': updated_by },start_date_convert:{'$gte':new Date(start_date),'$lt':new Date(start_date1) }},async function (err, users) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (users) {

        for (var i = 0; i < users.length; i++) {
        // console.log(users[i]);
         let temp = {} 

         //********start date******//
         let  date = new Date(users[i].start_date);
         let year = date.getFullYear();
         let month = date.getMonth()+1;
         let dt = date.getDate();
          if (dt < 10) {
            dt = '0' + dt;
          }
          if (month < 10) {
            month = '0' + month;
          }
        //********start date end******//

          //********from date******//
         let  fromdate = new Date(users[i].due_date);
         let fromyear = fromdate.getFullYear();
         let frommonth = fromdate.getMonth()+1;
         let fromdt = fromdate.getDate();
          if (fromdt < 10) {
            fromdt = '0' + fromdt;
          }
          if (frommonth < 10) {
            frommonth = '0' + frommonth;
          }
        //********from date end******//
       
          //******** forwardon date******//
         let  forwardondate = new Date(users[i].forwardon_date);
         let forwardonyear = forwardondate.getFullYear();
         let forwardonmonth = forwardondate.getMonth()+1;
         let forwardondt = forwardondate.getDate();
          if (forwardondt < 10) {
            forwardondt = '0' + forwardondt;
          }
          if (forwardonmonth < 10) {
            forwardonmonth = '0' + forwardonmonth;
          }
        //********forwardon date end******//
 
      temp['_id']=users[i]._id;
      temp['type']=users[i].type;
      temp['invoice_no']=users[i].invoice_no;
      temp['currency']=users[i].currency;
      temp['cunter_party_name']=users[i].cunter_party_name;
      temp['amount_in_fc']=users[i].amount_in_fc;
      temp['start_date']=users[i].start_date;
      temp['due_date']=users[i].due_date;
      temp['forwardon_date']=users[i].forwardon_date;
      temp['previous_spot']=users[i].previous_spot;
      temp['previous_premium']=users[i].previous_premium;
      temp['costed_rate']=users[i].costed_rate;
      temp['current_forwardrate']=users[i].current_forwardrate;
      temp['profit_loss']=users[i].profit_loss;
      temp['userid']=users[i].userid;
      temp['myconvertstart']=(dt+'-' + month + '-'+year);
      temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
      temp['myconvertforwardon']=(forwardondt+'-' + forwardonmonth + '-'+forwardonyear);
      mymanualArray.push(temp);
      }


      var XLSX = require('xlsx')
      var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/settleddata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
        { header: "S no.", key: "s_no" },
        { header: "Txn Type", key: "type" },
        { header: "Trade ref no.", key: "invoice_no" },
        { header: "Currency", key: "currency" },
        { header: "Counterparty", key: "cunter_party_name" },
        { header: "Open amount", key: "amount_in_fc" },
        { header: "Recognition date", key: "myconvertstart" },
        { header: "Due date", key: "myconvertfromdate" },
        { header: "Forward as on date", key: "myconvertforwardon" },
        { header: "Spot", key: "previous_spot" },
        { header: "Premium", key: "previous_premium" },
        { header: "Costed Rate", key: "costed_rate" },
        { header: "Current forward rate", key: "current_forwardrate" },
        { header: "100% Hedge P&L", key: "profit_loss" },
      ];
      // Looping through User data
      let counter = 1;
      mymanualArray.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
        await workbook.xlsx.writeFile(`${path}/adminexportfiltersettleddata.xlsx`)
          .then(() => {
            console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
      } catch (err) {
        console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }
      res.json({ response: true, message: "Data found", details: users });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});


router.post('/getadminpcfcexceldata', function(req, res, next) {
  let updated_by = req.body.updated_by;
  let type = req.body.type;
 Pcfcexcel.aggregate([
  { $match: { updated_by: {'$eq':updated_by}, type: {'$eq':type} }},
  {
        $lookup:
            {
                from: "almus_users",
                let: { pid: "$userid" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$_id", { $toObjectId: "$$pid" }]
                            }
                        }
                    }
                ],
                as: "client"
            }
    },
    
]).exec(function(err,user){
  if (err) {
     res.json({ response: false, message: "No Data found" });
  }
  else{
   res.json({ response: true, message: "Data found", details: user });
  }

});

});

router.post('/getadminpcfcsettleddata', function(req, res, next) {
  let updated_by = req.body.updated_by;
  // let type = req.body.type;
 Settledpcfcdata.aggregate([
   { $match: { updated_by: {'$eq':updated_by} }},
  {
        $lookup:
            {
                from: "almus_users",
                let: { pid: "$userid" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$_id", { $toObjectId: "$$pid" }]
                            }
                        }
                    }
                ],
                as: "client"
            }
    },
    
]).exec(function(err,user){
  if (err) {
     res.json({ response: false, message: "No Data found" });
  }
  else{
   res.json({ response: true, message: "Data found", details: user });
  }

});

});


// router.post('/getadminpcfcexceldata', function (req, res, next) {
//    let updated_by = req.body.updated_by;
//   let type = req.body.type;
 
//   Pcfcexcel.find({ updated_by: { '$eq': updated_by }, type: { '$eq': type } }, function (err, user) {
//     if (err) {
//       res.json({ response: false, message: err });
//     }
//     if (user) {
      
//       res.json({ response: true, message: "Data found", details: user });
//     } else {
//       res.json({ response: false, message: "No Data found" });
//     }
//   });
// });


// router.post('/getadminpcfcsettleddata', function (req, res, next) {
//   let updated_by = req.body.updated_by;
//   var mymanualArray = [];
//    var mymanualArray1 = [];

//   Settledpcfcdata.find({ updated_by: { '$eq': updated_by } },async function (err, users) {
//     if (err) {
//       res.json({ response: false, message: err });
//     }
//     if (users) {
//       // console.log('sdfhsdkskkjs',users)
//         var amount_in_fc_total = 0;
//        var profit_loss_total = 0;
//        for (var i = 0; i < users.length; i++) {
//         // amount_in_fc_total += parseFloat(users[i].amount_in_fc);
//         //  profit_loss_total += parseFloat(users[i].profit_loss);
//         // console.log(users[i]);
//          let temp = {}

//          //********start date******//
//          let  date = new Date(users[i].start_date);
//          let year = date.getFullYear();
//          let month = date.getMonth()+1;
//          let dt = date.getDate();
//           if (dt < 10) {
//             dt = '0' + dt;
//           }
//           if (month < 10) {
//             month = '0' + month;
//           }
//         //********start date end******//

//           //********from date******//
//          let  fromdate = new Date(users[i].from_date);
//          let fromyear = fromdate.getFullYear();
//          let frommonth = fromdate.getMonth()+1;
//          let fromdt = fromdate.getDate();
//           if (fromdt < 10) {
//             fromdt = '0' + fromdt;
//           }
//           if (frommonth < 10) {
//             frommonth = '0' + frommonth;
//           }
//         //********from date end******//
//           //********to date******//
//          let  todate = new Date(users[i].to_date);
//          let toyear = todate.getFullYear();
//          let tomonth = todate.getMonth()+1;
//          let todt = todate.getDate();
//           if (todt < 10) {
//             todt = '0' + todt;
//           }
//           if (tomonth < 10) {
//             tomonth = '0' + tomonth;
//           }
//         //********to date end******//

//           //******** forwardon date******//
//          let  forwardondate = new Date(users[i].forwardon_date);
//          let forwardonyear = forwardondate.getFullYear();
//          let forwardonmonth = forwardondate.getMonth()+1;
//          let forwardondt = forwardondate.getDate();
//           if (forwardondt < 10) {
//             forwardondt = '0' + forwardondt;
//           }
//           if (forwardonmonth < 10) {
//             forwardonmonth = '0' + forwardonmonth;
//           }
//         //********forwardon date end******//
 
//       temp['_id']=users[i]._id;
//       temp['type']=users[i].type;
//       temp['cunter_party_name']=users[i].cunter_party_name;
//       temp['currency']=users[i].currency;
//       temp['amount_in_fc']=users[i].amount_in_fc;
//       temp['start_date']=users[i].start_date;
//       temp['from_date']=users[i].from_date;
//       temp['to_date']=users[i].to_date;
//       temp['forwardon_date']=users[i].forwardon_date;
//       temp['previous_spot']=users[i].previous_spot;
//       temp['previous_premium']=users[i].previous_premium;
//       temp['booking_rate']=users[i].booking_rate;
//       temp['current_forwardrate']=users[i].current_forwardrate;
//       temp['status']=users[i].status;
//       temp['profit_loss']=users[i].profit_loss;
//       temp['settledid']=users[i].settledid;
//       temp['userid']=users[i].userid;
//       temp['created_at']=users[i].created_at;
//       temp['updated_at']=users[i].updated_at;
//       temp['created_by']=users[i].created_by;
//       temp['updated_by']=users[i].updated_by;
//       temp['myconvertstart']=(dt+'-' + month + '-'+year);
//       temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
//       temp['myconverttodate']=(todt+'-' + tomonth + '-'+toyear);
//       temp['myconvertforwardon']=(forwardondt+'-' + forwardonmonth + '-'+forwardonyear);
//       mymanualArray.push(temp);
//       }
//       // console.log(mymanualArray)
//       // let temp1 = {};
//       // temp1['_id']='';
//       // temp1['type']='';
//       // temp1['cunter_party_name']='';
//       // temp1['currency']='';
//       // temp1['amount_in_fc']=amount_in_fc_total;
//       // temp1['start_date']='';
//       // temp1['from_date']='';
//       // temp1['to_date']='';
//       // temp1['forwardon_date']='';
//       // temp1['previous_spot']='';
//       // temp1['previous_premium']='';
//       // temp1['booking_rate']='';
//       // temp1['current_forwardrate']='';
//       // temp1['status']='';
//       // temp1['profit_loss']=profit_loss_total;
//       // temp1['settledid']='';
//       // temp1['userid']='';
//       // temp1['created_at']='';
//       // temp1['updated_at']='';
//       // temp1['created_by']='';
//       // temp1['updated_by']='';
//       // temp1['myconvertstart']='';
//       // temp1['myconvertfromdate']='';
//       // temp1['myconverttodate']='';
//       // temp1['myconvertforwardon']='';
//       // mymanualArray1.push(temp1);

//         var XLSX = require('xlsx')
//       var Excel = require("exceljs");
//       const workbook = new Excel.Workbook();  // Create a new workbook
//       const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
//       const path = "./uploads/settleddata";  // Path to download excel
//       // Column for data in excel. key must match data key
//       worksheet.columns = [
//         { header: "S no.", key: "s_no" },
//         { header: "Txn Type", key: "type" },
//         // { header: "Trade ref no.", key: "invoice_no" },
//         { header: "Currency", key: "currency" },
//         { header: "Counterparty", key: "cunter_party_name" },
//         { header: "Open amount", key: "amount_in_fc" },
//         { header: "Start date", key: "myconvertstart" },
//         { header: "From date", key: "myconvertfromdate" },
//         { header: "To date", key: "myconverttodate" },
//         { header: "Forward as on date", key: "myconvertforwardon" },
//         { header: "Spot", key: "previous_spot" },
//         { header: "Premium", key: "previous_premium" },
//         { header: "Bookking Rate", key: "booking_rate" },
//         { header: "Current forward rate", key: "current_forwardrate" },
//         { header: "EDC", key: "edc" },
//         { header: "Status", key: "status" },
//         { header: "100% Hedge P&L", key: "profit_loss" },
//       ];
//       // Looping through User data
//       let counter = 1;
//       mymanualArray.forEach((user) => {
//         user.s_no = counter;
//         worksheet.addRow(user); // Add data in worksheet
//         counter++;
//       });

//        // var mylenght =mymanualArray.length;
//        //   var mylenght1 =mylenght+2;
//        //  console.log('mylenght',mylenght1)
//        //   mymanualArray1.forEach((user) => {
//        //  user.s_no = '';
//        //  worksheet.addRow(user); // Add data in worksheet
//        //     worksheet.getRow(mylenght1).eachCell(function(cell) {
//        //          cell.fill = {
//        //             type: 'pattern',
//        //            pattern: 'solid',
//        //            fgColor: { argb:'B2BEB5' }
//        //          };
//        //      });
//        //   });
//       // Making first line in excel bold
//       worksheet.getRow(1).eachCell((cell) => {
//         cell.font = { bold: true };
//       });
//       try {
//         await workbook.xlsx.writeFile(`${path}/adminpcfcsettleddata.xlsx`)
//           .then(() => {
//             console.log("Success");
//             //res.json({ response: true, message: message, data: users });
//           });
//       } catch (err) {
//         console.log("Error");
//         //res.json({ response: false, message: "Something went wrong" });
//       }
//       var mydata = {"users":users,"profit_loss_total":profit_loss_total,"amount_in_fc_total":amount_in_fc_total}
//        res.json({ response: true, message: "Data found", details: mydata });
//     } else {
//       res.json({ response: false, message: "No Data found" });
//     }
//   });
// });


router.post('/getadmin_pcfc_settled_exceldatewise_filter', function (req, res, next) {
  let updated_by = req.body.updated_by;
  let start_date = req.body.start_date;
  let start_date1 = req.body.start_date1;
  var mymanualArray = [];
  Settledpcfcdata.find({  updated_by: { '$eq': updated_by },start_date_convert:{'$gte':new Date(start_date),'$lt':new Date(start_date1) }},async function (err, users) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (users) {
      // console.log('sdfhsdkskkjs',users)
      for (var i = 0; i < users.length; i++) {
        // console.log(users[i]);
         let temp = {}

         //********start date******//
         let  date = new Date(users[i].start_date);
         let year = date.getFullYear();
         let month = date.getMonth()+1;
         let dt = date.getDate();
          if (dt < 10) {
            dt = '0' + dt;
          }
          if (month < 10) {
            month = '0' + month;
          }
        //********start date end******//

          //********from date******//
         let  fromdate = new Date(users[i].from_date);
         let fromyear = fromdate.getFullYear();
         let frommonth = fromdate.getMonth()+1;
         let fromdt = fromdate.getDate();
          if (fromdt < 10) {
            fromdt = '0' + fromdt;
          }
          if (frommonth < 10) {
            frommonth = '0' + frommonth;
          }
        //********from date end******//
          //********to date******//
         let  todate = new Date(users[i].to_date);
         let toyear = todate.getFullYear();
         let tomonth = todate.getMonth()+1;
         let todt = todate.getDate();
          if (todt < 10) {
            todt = '0' + todt;
          }
          if (tomonth < 10) {
            tomonth = '0' + tomonth;
          }
        //********to date end******//

          //******** forwardon date******//
         let  forwardondate = new Date(users[i].forwardon_date);
         let forwardonyear = forwardondate.getFullYear();
         let forwardonmonth = forwardondate.getMonth()+1;
         let forwardondt = forwardondate.getDate();
          if (forwardondt < 10) {
            forwardondt = '0' + forwardondt;
          }
          if (forwardonmonth < 10) {
            forwardonmonth = '0' + forwardonmonth;
          }
        //********forwardon date end******//
 
      temp['_id']=users[i]._id;
      temp['type']=users[i].type;
      temp['cunter_party_name']=users[i].cunter_party_name;
      temp['currency']=users[i].currency;
      temp['amount_in_fc']=users[i].amount_in_fc;
      temp['start_date']=users[i].start_date;
      temp['from_date']=users[i].from_date;
      temp['to_date']=users[i].to_date;
      temp['forwardon_date']=users[i].forwardon_date;
      temp['previous_spot']=users[i].previous_spot;
      temp['previous_premium']=users[i].previous_premium;
      temp['booking_rate']=users[i].booking_rate;
      temp['current_forwardrate']=users[i].current_forwardrate;
      temp['status']=users[i].status;
      temp['profit_loss']=users[i].profit_loss;
      temp['settledid']=users[i].settledid;
      temp['userid']=users[i].userid;
      temp['created_at']=users[i].created_at;
      temp['updated_at']=users[i].updated_at;
      temp['created_by']=users[i].created_by;
      temp['updated_by']=users[i].updated_by;
      temp['myconvertstart']=(dt+'-' + month + '-'+year);
      temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
      temp['myconverttodate']=(todt+'-' + tomonth + '-'+toyear);
      temp['myconvertforwardon']=(forwardondt+'-' + forwardonmonth + '-'+forwardonyear);
      mymanualArray.push(temp);
      }
      console.log(mymanualArray)
        var XLSX = require('xlsx')
      var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/settleddata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
        { header: "S no.", key: "s_no" },
        { header: "Txn Type", key: "type" },
        // { header: "Trade ref no.", key: "invoice_no" },
        { header: "Currency", key: "currency" },
        { header: "Counterparty", key: "cunter_party_name" },
        { header: "Open amount", key: "amount_in_fc" },
        { header: "Start date", key: "myconvertstart" },
        { header: "From date", key: "myconvertfromdate" },
        { header: "To date", key: "myconverttodate" },
        { header: "Forward as on date", key: "myconvertforwardon" },
        { header: "Spot", key: "previous_spot" },
        { header: "Premium", key: "previous_premium" },
        { header: "Bookking Rate", key: "booking_rate" },
        { header: "Current forward rate", key: "current_forwardrate" },
        { header: "EDC", key: "edc" },
        { header: "Status", key: "status" },
        { header: "100% Hedge P&L", key: "profit_loss" },
      ];
      // Looping through User data
      let counter = 1;
      mymanualArray.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
        await workbook.xlsx.writeFile(`${path}/adminpcfcfiltersettleddata.xlsx`)
          .then(() => {
            console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
      } catch (err) {
        console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }
      res.json({ response: true, message: "Data found", details: users });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});


router.post('/getadminforexbuyexceldata', function(req, res, next) {
  let updated_by = req.body.updated_by;
  let type = req.body.type;
 Forexbuyexcel.aggregate([
  { $match: { updated_by: {'$eq':updated_by}, type: {'$eq':type} }},
  {
        $lookup:
            {
                from: "almus_users",
                let: { pid: "$userid" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$_id", { $toObjectId: "$$pid" }]
                            }
                        }
                    }
                ],
                as: "client"
            }
    },
    
]).exec(function(err,user){
  if (err) {
     res.json({ response: false, message: "No Data found" });
  }
  else{
   res.json({ response: true, message: "Data found", details: user });
  }

});

});

router.post('/getadminforexbuysettleddata', function(req, res, next) {
  let updated_by = req.body.updated_by;
  // let type = req.body.type;
 Settledforexbuydata.aggregate([
   { $match: { updated_by: {'$eq':updated_by} }},
  {
        $lookup:
            {
                from: "almus_users",
                let: { pid: "$userid" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$_id", { $toObjectId: "$$pid" }]
                            }
                        }
                    }
                ],
                as: "client"
            }
    },
    
]).exec(function(err,user){
  if (err) {
     res.json({ response: false, message: "No Data found" });
  }
  else{
   res.json({ response: true, message: "Data found", details: user });
  }

});

});



// router.post('/getadminforexbuyexceldata', function (req, res, next) {
//    let updated_by = req.body.updated_by;
//   let type = req.body.type;
//   Forexbuyexcel.find({ updated_by: { '$eq': updated_by }, type: { '$eq': type } }, function (err, user) {
//     if (err) {
//       res.json({ response: false, message: err });
//     }
//     if (user) {
      
//       res.json({ response: true, message: "Data found", details: user });
//     } else {
//       res.json({ response: false, message: "No Data found" });
//     }
//   });
// });

// router.post('/getadminforexbuysettleddata', function (req, res, next) {
//   let updated_by = req.body.updated_by;
//    var mymanualArray = [];
//     var mymanualArray1 = [];
//   Settledforexbuydata.find({ updated_by: { '$eq': updated_by } }, async function (err, users) {
//     if (err) {
//       res.json({ response: false, message: err });
//     }
//     if (users) {
//       var amount_in_fc_total = 0;
//        var profit_loss_total = 0;
//         var gain_loss_total = 0;
//        for (var i = 0; i < users.length; i++) {
//          // amount_in_fc_total += parseFloat(users[i].amount_in_fc);
//          // profit_loss_total += parseFloat(users[i].profit_loss);
//          //   gain_loss_total += parseFloat(users[i].gain_loss);
//          let temp = {}

//          //********start date******//
//          let  date = new Date(users[i].start_date);
//          let year = date.getFullYear();
//          let month = date.getMonth()+1;
//          let dt = date.getDate();
//           if (dt < 10) {
//             dt = '0' + dt;
//           }
//           if (month < 10) {
//             month = '0' + month;
//           }
//         //********start date end******//

//           //********from date******//
//          let  fromdate = new Date(users[i].from_date);
//          let fromyear = fromdate.getFullYear();
//          let frommonth = fromdate.getMonth()+1;
//          let fromdt = fromdate.getDate();
//           if (fromdt < 10) {
//             fromdt = '0' + fromdt;
//           }
//           if (frommonth < 10) {
//             frommonth = '0' + frommonth;
//           }
//         //********from date end******//
//           //********to date******//
//          let  todate = new Date(users[i].to_date);
//          let toyear = todate.getFullYear();
//          let tomonth = todate.getMonth()+1;
//          let todt = todate.getDate();
//           if (todt < 10) {
//             todt = '0' + todt;
//           }
//           if (tomonth < 10) {
//             tomonth = '0' + tomonth;
//           }
//         //********to date end******//

//           //******** forwardon date******//
//          let  forwardondate = new Date(users[i].forwardon_date);
//          let forwardonyear = forwardondate.getFullYear();
//          let forwardonmonth = forwardondate.getMonth()+1;
//          let forwardondt = forwardondate.getDate();
//           if (forwardondt < 10) {
//             forwardondt = '0' + forwardondt;
//           }
//           if (forwardonmonth < 10) {
//             forwardonmonth = '0' + forwardonmonth;
//           }
//         //********forwardon date end******//
 
//       temp['_id']=users[i]._id;
//       temp['type']=users[i].type;
//       temp['cunter_party_name']=users[i].cunter_party_name;
//       temp['currency']=users[i].currency;
//       temp['amount_in_fc']=users[i].amount_in_fc;
//       temp['start_date']=users[i].start_date;
//       temp['from_date']=users[i].from_date;
//       temp['to_date']=users[i].to_date;
//       temp['forwardon_date']=users[i].forwardon_date;
//       temp['previous_spot']=users[i].previous_spot;
//       temp['previous_premium']=users[i].previous_premium;
//       temp['booking_rate']=users[i].booking_rate;
//       temp['current_forwardrate']=users[i].current_forwardrate;
//       temp['status']=users[i].status;
//       temp['profit_loss']=users[i].profit_loss;
//       temp['edc']=users[i].edc;
//       temp['userid']=users[i].userid;
//       temp['gain_loss']=users[i].gain_loss;
//       temp['myconvertstart']=(dt+'-' + month + '-'+year);
//       temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
//       temp['myconverttodate']=(todt+'-' + tomonth + '-'+toyear);
//       temp['myconvertforwardon']=(forwardondt+'-' + forwardonmonth + '-'+forwardonyear);
//       mymanualArray.push(temp);
//       }
//         // console.log(mymanualArray)
//       // let temp1 = {};
//       // temp1['_id']='';
//       // temp1['type']='';
//       // temp1['cunter_party_name']='';
//       // temp1['currency']='';
//       // temp1['amount_in_fc']=amount_in_fc_total;
//       // temp1['start_date']='';
//       // temp1['from_date']='';
//       // temp1['to_date']='';
//       // temp1['forwardon_date']='';
//       // temp1['previous_spot']='';
//       // temp1['previous_premium']='';
//       // temp1['booking_rate']='';
//       // temp1['current_forwardrate']='';
//       // temp1['status']='';
//       // temp1['profit_loss']=profit_loss_total;
//       // temp1['edc']='';
//       // temp1['userid']='';
//       // temp1['gain_loss']=gain_loss_total;
//       // temp1['myconvertstart']='';
//       // temp1['myconvertfromdate']='';
//       // temp1['myconverttodate']='';
//       // temp1['myconvertforwardon']='';
//       // mymanualArray1.push(temp1);

//       var XLSX = require('xlsx')
//       var Excel = require("exceljs");
//       const workbook = new Excel.Workbook();  // Create a new workbook
//       const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
//       const path = "./uploads/settleddata";  // Path to download excel
//       // Column for data in excel. key must match data key
//       worksheet.columns = [
//         { header: "S no.", key: "s_no" },
//         { header: "Txn Type", key: "type" },
//         { header: "Currency", key: "currency" },
//         { header: "Counterparty", key: "cunter_party_name" },
//         { header: "Open amount", key: "amount_in_fc" },
//         { header: "Start date", key: "myconvertstart" },
//         { header: "From date", key: "myconvertfromdate" },
//         { header: "To date", key: "myconverttodate" },
//         { header: "Forward as on date", key: "myconvertforwardon" },
//         { header: "Spot", key: "previous_spot" },
//         { header: "Premium", key: "previous_premium" },
//         { header: "Booking Rate", key: "booking_rate" },
//         { header: "Current forward rate", key: "current_forwardrate" },
//         { header: "EDC", key: "edc" },
//         { header: "Status", key: "status" },
//         { header: "100% Hedge P&L", key: "profit_loss" },
//         { header: "Gain/Loss", key: "gain_loss" },
//       ];
//       // Looping through User data
//       let counter = 1;
//       mymanualArray.forEach((user) => {
//         user.s_no = counter;
//         worksheet.addRow(user); // Add data in worksheet
//         counter++;
//       });
//       // var mylenght =mymanualArray.length;
//       //    var mylenght1 =mylenght+2;
//       //   console.log('mylenght',mylenght1)
//       //    mymanualArray1.forEach((user) => {
//       //   user.s_no = '';
//       //   worksheet.addRow(user); // Add data in worksheet
//       //      worksheet.getRow(mylenght1).eachCell(function(cell) {
//       //           cell.fill = {
//       //              type: 'pattern',
//       //             pattern: 'solid',
//       //             fgColor: { argb:'B2BEB5' }
//       //           };
//       //       });
//       //    });
//       // Making first line in excel bold
//       worksheet.getRow(1).eachCell((cell) => {
//         cell.font = { bold: true };
//       });
//       try {
//         await workbook.xlsx.writeFile(`${path}/adminforexbuysettleddata.xlsx`)
//           .then(() => {
//             console.log("Success");
//             //res.json({ response: true, message: message, data: users });
//           });
//       } catch (err) {
//         console.log("Error");
//         //res.json({ response: false, message: "Something went wrong" });
//       }
//         var mydata = {"users":users,"profit_loss_total":profit_loss_total,"amount_in_fc_total":amount_in_fc_total,"gain_loss_total":gain_loss_total}
//        res.json({ response: true, message: "Data found", details: mydata });
//     } else {
//       res.json({ response: false, message: "No Data found" });
//     }
//   });
// });


router.post('/getadmin_forexbuy_settled_exceldatewise_filter', function (req, res, next) {
    let updated_by = req.body.updated_by;
  let start_date = req.body.start_date;
  let start_date1 = req.body.start_date1;
  var mymanualArray = [];
  Settledforexbuydata.find({  updated_by: { '$eq': updated_by },start_date_convert:{'$gte':new Date(start_date),'$lt':new Date(start_date1) }},async function (err, users) {
 
    if (err) {
      res.json({ response: false, message: err });
    }
    if (users) {


          for (var i = 0; i < users.length; i++) {
        // console.log(users[i]);
         let temp = {}

         //********start date******//
         let  date = new Date(users[i].start_date);
         let year = date.getFullYear();
         let month = date.getMonth()+1;
         let dt = date.getDate();
          if (dt < 10) {
            dt = '0' + dt;
          }
          if (month < 10) {
            month = '0' + month;
          }
        //********start date end******//

          //********from date******//
         let  fromdate = new Date(users[i].from_date);
         let fromyear = fromdate.getFullYear();
         let frommonth = fromdate.getMonth()+1;
         let fromdt = fromdate.getDate();
          if (fromdt < 10) {
            fromdt = '0' + fromdt;
          }
          if (frommonth < 10) {
            frommonth = '0' + frommonth;
          }
        //********from date end******//
          //********to date******//
         let  todate = new Date(users[i].to_date);
         let toyear = todate.getFullYear();
         let tomonth = todate.getMonth()+1;
         let todt = todate.getDate();
          if (todt < 10) {
            todt = '0' + todt;
          }
          if (tomonth < 10) {
            tomonth = '0' + tomonth;
          }
        //********to date end******//

          //******** forwardon date******//
         let  forwardondate = new Date(users[i].forwardon_date);
         let forwardonyear = forwardondate.getFullYear();
         let forwardonmonth = forwardondate.getMonth()+1;
         let forwardondt = forwardondate.getDate();
          if (forwardondt < 10) {
            forwardondt = '0' + forwardondt;
          }
          if (forwardonmonth < 10) {
            forwardonmonth = '0' + forwardonmonth;
          }
        //********forwardon date end******//
 
      temp['_id']=users[i]._id;
      temp['type']=users[i].type;
      temp['cunter_party_name']=users[i].cunter_party_name;
      temp['currency']=users[i].currency;
      temp['amount_in_fc']=users[i].amount_in_fc;
      temp['start_date']=users[i].start_date;
      temp['from_date']=users[i].from_date;
      temp['to_date']=users[i].to_date;
      temp['forwardon_date']=users[i].forwardon_date;
      temp['previous_spot']=users[i].previous_spot;
      temp['previous_premium']=users[i].previous_premium;
      temp['booking_rate']=users[i].booking_rate;
      temp['current_forwardrate']=users[i].current_forwardrate;
      temp['status']=users[i].status;
      temp['profit_loss']=users[i].profit_loss;
      temp['edc']=users[i].edc;
      temp['userid']=users[i].userid;
      temp['gain_loss']=users[i].gain_loss;
      temp['myconvertstart']=(dt+'-' + month + '-'+year);
      temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
      temp['myconverttodate']=(todt+'-' + tomonth + '-'+toyear);
      temp['myconvertforwardon']=(forwardondt+'-' + forwardonmonth + '-'+forwardonyear);
      mymanualArray.push(temp);
      }
        // console.log(mymanualArray)

      var XLSX = require('xlsx')
      var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/settleddata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
        { header: "S no.", key: "s_no" },
        { header: "Txn Type", key: "type" },
        { header: "Currency", key: "currency" },
        { header: "Counterparty", key: "cunter_party_name" },
        { header: "Open amount", key: "amount_in_fc" },
        { header: "Start date", key: "myconvertstart" },
        { header: "From date", key: "myconvertfromdate" },
        { header: "To date", key: "myconverttodate" },
        { header: "Forward as on date", key: "myconvertforwardon" },
        { header: "Spot", key: "previous_spot" },
        { header: "Premium", key: "previous_premium" },
        { header: "Booking Rate", key: "booking_rate" },
        { header: "Current forward rate", key: "current_forwardrate" },
        { header: "EDC", key: "edc" },
        { header: "Status", key: "status" },
        { header: "100% Hedge P&L", key: "profit_loss" },
        { header: "Gain/Loss", key: "gain_loss" },
        
      ];
      // Looping through User data
      let counter = 1;
      mymanualArray.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
        await workbook.xlsx.writeFile(`${path}/adminforexbuyfiltersettleddata.xlsx`)
          .then(() => {
            console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
      } catch (err) {
        console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }
      res.json({ response: true, message: "Data found", details: users });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});


router.post('/getadminforexsellexceldata', function(req, res, next) {
  let updated_by = req.body.updated_by;
  let type = req.body.type;
 Forexsellexcel.aggregate([
  { $match: { updated_by: {'$eq':updated_by}, type: {'$eq':type} }},
  {
        $lookup:
            {
                from: "almus_users",
                let: { pid: "$userid" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$_id", { $toObjectId: "$$pid" }]
                            }
                        }
                    }
                ],
                as: "client"
            }
    },
    
]).exec(function(err,user){
  if (err) {
     res.json({ response: false, message: "No Data found" });
  }
  else{
   res.json({ response: true, message: "Data found", details: user });
  }

});

});

router.post('/getadminforexsellsettleddata', function(req, res, next) {
  let updated_by = req.body.updated_by;
  // let type = req.body.type;
 Settledforexselldata.aggregate([
   { $match: { updated_by: {'$eq':updated_by} }},
  {
        $lookup:
            {
                from: "almus_users",
                let: { pid: "$userid" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$_id", { $toObjectId: "$$pid" }]
                            }
                        }
                    }
                ],
                as: "client"
            }
    },
    
]).exec(function(err,user){
  if (err) {
     res.json({ response: false, message: "No Data found" });
  }
  else{
   res.json({ response: true, message: "Data found", details: user });
  }

});

});



// router.post('/getadminforexsellsettleddata', function (req, res, next) {
//   let updated_by = req.body.updated_by;
//    var mymanualArray = [];
//    var mymanualArray1 = [];
//   Settledforexselldata.find({ updated_by: { '$eq': updated_by } }, async function (err, users) {
//     if (err) {
//       res.json({ response: false, message: err });
//     }
//     if (users) {
//        var amount_in_fc_total = 0;
//        var profit_loss_total = 0;
//         var gain_loss_total = 0;
//        for (var i = 0; i < users.length; i++) {
//         // amount_in_fc_total += parseFloat(users[i].amount_in_fc);
//         //  profit_loss_total += parseFloat(users[i].profit_loss);
//         //    gain_loss_total += parseFloat(users[i].gain_loss);
//         // console.log(users[i]);
//          let temp = {};
      
//          //********start date******//
//          let  date = new Date(users[i].start_date);
//          let year = date.getFullYear();
//          let month = date.getMonth()+1;
//          let dt = date.getDate();
//           if (dt < 10) {
//             dt = '0' + dt;
//           }
//           if (month < 10) {
//             month = '0' + month;
//           }
//         //********start date end******//

//           //********from date******//
//          let  fromdate = new Date(users[i].from_date);
//          let fromyear = fromdate.getFullYear();
//          let frommonth = fromdate.getMonth()+1;
//          let fromdt = fromdate.getDate();
//           if (fromdt < 10) {
//             fromdt = '0' + fromdt;
//           }
//           if (frommonth < 10) {
//             frommonth = '0' + frommonth;
//           }
//         //********from date end******//
//           //********to date******//
//          let  todate = new Date(users[i].to_date);
//          let toyear = todate.getFullYear();
//          let tomonth = todate.getMonth()+1;
//          let todt = todate.getDate();
//           if (todt < 10) {
//             todt = '0' + todt;
//           }
//           if (tomonth < 10) {
//             tomonth = '0' + tomonth;
//           }
//         //********to date end******//

//           //******** forwardon date******//
//          let  forwardondate = new Date(users[i].forwardon_date);
//          let forwardonyear = forwardondate.getFullYear();
//          let forwardonmonth = forwardondate.getMonth()+1;
//          let forwardondt = forwardondate.getDate();
//           if (forwardondt < 10) {
//             forwardondt = '0' + forwardondt;
//           }
//           if (forwardonmonth < 10) {
//             forwardonmonth = '0' + forwardonmonth;
//           }
//         //********forwardon date end******//
 
//       temp['_id']=users[i]._id;
//       temp['type']=users[i].type;
//       temp['cunter_party_name']=users[i].cunter_party_name;
//        temp['bank_name']=users[i].bank_name;
//       temp['currency']=users[i].currency;
//       temp['amount_in_fc']=users[i].amount_in_fc;
//       temp['start_date']=users[i].start_date;
//       temp['from_date']=users[i].from_date;
//       temp['to_date']=users[i].to_date;
//       temp['forwardon_date']=users[i].forwardon_date;
//       temp['previous_spot']=users[i].previous_spot;
//       temp['previous_premium']=users[i].previous_premium;
//       temp['booking_rate']=users[i].booking_rate;
//       temp['current_forwardrate']=users[i].current_forwardrate;
//       temp['status']=users[i].status;
//       temp['edc']=users[i].edc;;
//       temp['profit_loss']=users[i].profit_loss;
//       temp['settledid']=users[i].settledid;
//       temp['userid']=users[i].userid;
//       temp['gain_loss']=users[i].gain_loss;
//       temp['created_at']=users[i].created_at;
//       temp['updated_at']=users[i].updated_at;
//       temp['created_by']=users[i].created_by;
//       temp['updated_by']=users[i].updated_by;
//       temp['myconvertstart']=(dt+'-' + month + '-'+year);
//       temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
//       temp['myconverttodate']=(todt+'-' + tomonth + '-'+toyear);
//       temp['myconvertforwardon']=(forwardondt+'-' + forwardonmonth + '-'+forwardonyear);
//       mymanualArray.push(temp);

//       }
//       // console.log(mymanualArray)

//       //  let temp1 = {};
//       // temp1['_id']='';
//       // temp1['type']='';
//       // temp1['cunter_party_name']='';
//       // temp1['bank_name']='';
//       // temp1['currency']='';
//       // temp1['amount_in_fc']=amount_in_fc_total;
//       // temp1['start_date']='';
//       // temp1['from_date']='';
//       // temp1['to_date']='';
//       // temp1['forwardon_date']='';
//       // temp1['previous_spot']='';
//       // temp1['previous_premium']='';
//       // temp1['booking_rate']='';
//       // temp1['current_forwardrate']='';
//       // temp1['status']='';
//       // temp1['edc']='';
//       // temp1['profit_loss']=profit_loss_total;
//       // temp1['settledid']='';
//       // temp1['userid']='';
//       // temp1['gain_loss']=gain_loss_total;
//       // temp1['created_at']='';
//       // temp1['updated_at']='';
//       // temp1['created_by']='';
//       // temp1['updated_by']='';
//       // temp1['myconvertstart']='';
//       // temp1['myconvertfromdate']='';
//       // temp1['myconverttodate']='';
//       // temp1['myconvertforwardon']='';
//       // mymanualArray1.push(temp1);

//       var XLSX = require('xlsx')
//       var Excel = require("exceljs");
//       const workbook = new Excel.Workbook();  // Create a new workbook
//       const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
//       const path = "./uploads/settleddata";  // Path to download excel
//       // Column for data in excel. key must match data key
//       worksheet.columns = [
//         { header: "S no.", key: "s_no" },
//         { header: "Txn Type", key: "type" },
//         { header: "Currency", key: "currency" },
//         { header: "Counterparty", key: "cunter_party_name" },
//          { header: "Bank Name", key: "bank_name" },
//         { header: "Open amount", key: "amount_in_fc" },
//         { header: "Start date", key: "myconvertstart" },
//         { header: "From date", key: "myconvertfromdate" },
//         { header: "To date", key: "myconverttodate" },
//         { header: "Forward as on date", key: "myconvertforwardon" },
//         { header: "Spot", key: "previous_spot" },
//         { header: "Premium", key: "previous_premium" },
//         { header: "Booking Rate", key: "booking_rate" },
//         { header: "Current forward rate", key: "current_forwardrate" },
//         { header: "EDC", key: "edc" },
//         { header: "Status", key: "status" },
//         { header: "100% Hedge P&L", key: "profit_loss" },
//         { header: "Gain/Loss", key: "gain_loss" },
//         ];
//       // Looping through User data
//       let counter = 1;
//       mymanualArray.forEach((user) => {
//         user.s_no = counter;
//         worksheet.addRow(user); // Add data in worksheet
//         counter++;
//       });

//        // var mylenght =mymanualArray.length;
//        //   var mylenght1 =mylenght+2;
//        //  console.log('mylenght',mylenght1)
//        //   mymanualArray1.forEach((user) => {
//        //  user.s_no = '';
//        //  worksheet.addRow(user); // Add data in worksheet
//        //     worksheet.getRow(mylenght1).eachCell(function(cell) {
//        //          cell.fill = {
//        //             type: 'pattern',
//        //            pattern: 'solid',
//        //            fgColor: { argb:'B2BEB5' }
//        //          };
//        //      });
//        //    });
//       // Making first line in excel bold
//       worksheet.getRow(1).eachCell((cell) => {
//         cell.font = { bold: true };
//       });
//       try {
//         await workbook.xlsx.writeFile(`${path}/adminforexsellsettleddata.xlsx`)
//           .then(() => {
//             console.log("Success");
//             //res.json({ response: true, message: message, data: users });
//           });
//       } catch (err) {
//         console.log("Error");
//         //res.json({ response: false, message: "Something went wrong" });
//       }
//        var mydata = {"users":users,"profit_loss_total":profit_loss_total,"amount_in_fc_total":amount_in_fc_total,"gain_loss_total":gain_loss_total}
//        res.json({ response: true, message: "Data found", details: mydata });
//     } else {
//       res.json({ response: false, message: "No Data found" });
//     }
//   });
// });





router.post('/getadmin_forexsell_settled_exceldatewise_filter', function (req, res, next) {
    let updated_by = req.body.updated_by;
  let start_date = req.body.start_date;
  let start_date1 = req.body.start_date1;
  var mymanualArray = [];
  Settledforexselldata.find({  updated_by: { '$eq': updated_by },start_date_convert:{'$gte':new Date(start_date),'$lt':new Date(start_date1) }},async function (err, users) {
 
    if (err) {
      res.json({ response: false, message: err });
    }
    if (users) {


          for (var i = 0; i < users.length; i++) {
        // console.log(users[i]);
         let temp = {}

         //********start date******//
         let  date = new Date(users[i].start_date);
         let year = date.getFullYear();
         let month = date.getMonth()+1;
         let dt = date.getDate();
          if (dt < 10) {
            dt = '0' + dt;
          }
          if (month < 10) {
            month = '0' + month;
          }
        //********start date end******//

          //********from date******//
         let  fromdate = new Date(users[i].from_date);
         let fromyear = fromdate.getFullYear();
         let frommonth = fromdate.getMonth()+1;
         let fromdt = fromdate.getDate();
          if (fromdt < 10) {
            fromdt = '0' + fromdt;
          }
          if (frommonth < 10) {
            frommonth = '0' + frommonth;
          }
        //********from date end******//
          //********to date******//
         let  todate = new Date(users[i].to_date);
         let toyear = todate.getFullYear();
         let tomonth = todate.getMonth()+1;
         let todt = todate.getDate();
          if (todt < 10) {
            todt = '0' + todt;
          }
          if (tomonth < 10) {
            tomonth = '0' + tomonth;
          }
        //********to date end******//

          //******** forwardon date******//
         let  forwardondate = new Date(users[i].forwardon_date);
         let forwardonyear = forwardondate.getFullYear();
         let forwardonmonth = forwardondate.getMonth()+1;
         let forwardondt = forwardondate.getDate();
          if (forwardondt < 10) {
            forwardondt = '0' + forwardondt;
          }
          if (forwardonmonth < 10) {
            forwardonmonth = '0' + forwardonmonth;
          }
        //********forwardon date end******//
 
      temp['_id']=users[i]._id;
      temp['type']=users[i].type;
      temp['cunter_party_name']=users[i].cunter_party_name;
      temp['currency']=users[i].currency;
      temp['amount_in_fc']=users[i].amount_in_fc;
      temp['start_date']=users[i].start_date;
      temp['from_date']=users[i].from_date;
      temp['to_date']=users[i].to_date;
      temp['forwardon_date']=users[i].forwardon_date;
      temp['previous_spot']=users[i].previous_spot;
      temp['previous_premium']=users[i].previous_premium;
      temp['booking_rate']=users[i].booking_rate;
      temp['current_forwardrate']=users[i].current_forwardrate;
      temp['status']=users[i].status;
      temp['profit_loss']=users[i].profit_loss;
      temp['edc']=users[i].edc;
      temp['userid']=users[i].userid;
      temp['gain_loss']=users[i].gain_loss;
      temp['myconvertstart']=(dt+'-' + month + '-'+year);
      temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
      temp['myconverttodate']=(todt+'-' + tomonth + '-'+toyear);
      temp['myconvertforwardon']=(forwardondt+'-' + forwardonmonth + '-'+forwardonyear);
      mymanualArray.push(temp);
      }
        // console.log(mymanualArray)

      var XLSX = require('xlsx')
      var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/settleddata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
        { header: "S no.", key: "s_no" },
        { header: "Txn Type", key: "type" },
        { header: "Currency", key: "currency" },
        { header: "Counterparty", key: "cunter_party_name" },
        { header: "Open amount", key: "amount_in_fc" },
        { header: "Start date", key: "myconvertstart" },
        { header: "From date", key: "myconvertfromdate" },
        { header: "To date", key: "myconverttodate" },
        { header: "Forward as on date", key: "myconvertforwardon" },
        { header: "Spot", key: "previous_spot" },
        { header: "Premium", key: "previous_premium" },
        { header: "Booking Rate", key: "booking_rate" },
        { header: "Current forward rate", key: "current_forwardrate" },
        { header: "EDC", key: "edc" },
        { header: "Status", key: "status" },
        { header: "100% Hedge P&L", key: "profit_loss" },
        { header: "Gain/Loss", key: "gain_loss" },
      ];
      // Looping through User data
      let counter = 1;
      mymanualArray.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
        await workbook.xlsx.writeFile(`${path}/adminforexsellfiltersettleddata.xlsx`)
          .then(() => {
            console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
      } catch (err) {
        console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }
      res.json({ response: true, message: "Data found", details: users });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});


router.post('/getExposurehedgelist', function (req, res, next) {
 let userid = req.body.userid;
    var Importcount1 = function (callback) {
     Importinputexcel.aggregate([
       { $match: {type:'Import',userid: userid } },
    
 ]).exec(function(err,res1){
  if (err) {callback(err,null);}
  else{
    callback(null,res1)
  }

});

};
    var Saveimportcount2 = function (callback) {
     Saveimportcalculation.aggregate([
       { $match: {type:'Import',userid: userid } },
    
 ]).exec(function(err,res2){
  if (err) {callback(err,null);}
  else{
    callback(null,res2)
  }

});

};

var Exportcount3 = function (callback) {
     Exportinputexcel.aggregate([
       { $match: {type:'Export',userid: userid } },
    
 ]).exec(function(err,res3){
  if (err) {callback(err,null);}
  else{
    callback(null,res3)
  }

});

};

var Saveexportcount4 = function (callback) {
     Saveexportcalculation.aggregate([
       { $match: {type:'Export',userid: userid } },
    
 ]).exec(function(err,res4){
  if (err) {callback(err,null);}
  else{
    callback(null,res4)
  }

});

};

var Forexbuyexcelcount5 = function (callback) {
     Forexbuyexcel.aggregate([
       { $match: {type:'Forex-Buy',userid: userid } },
    
 ]).exec(function(err,res5){
  if (err) {callback(err,null);}
  else{
    callback(null,res5)
  }

});

};

var Saveforexbuycount6 = function (callback) {
     Saveforexbuycalculation.aggregate([
       { $match: {type:'Forex-Buy',userid: userid } },
    
 ]).exec(function(err,res6){
  if (err) {callback(err,null);}
  else{
    callback(null,res6)
  }

});

};

var Forexsellexcelcount7 = function (callback) {
     Forexsellexcel.aggregate([
       { $match: {type:'Forex-Sell',userid: userid } },
    
 ]).exec(function(err,res7){
  if (err) {callback(err,null);}
  else{
    callback(null,res7)
  }

});

};

var Saveforexsellcount8 = function (callback) {
     Saveforexsellcalculation.aggregate([
       { $match: {type:'Forex-Sell',userid: userid } },
    
 ]).exec(function(err,res8){
  if (err) {callback(err,null);}
  else{
    callback(null,res8)
  }

});

};


async.parallel({ Importcount1,Saveimportcount2,Exportcount3,Saveexportcount4,Forexbuyexcelcount5,
Saveforexbuycount6,Forexsellexcelcount7,Saveforexsellcount8}, function (err, results) {
     // console.log(results); 
    results['response'] = true;
    results['message'] = 'Data';
    res.json(results);
    res.end();
  });

});


router.post('/updateImportsaveprofit', function (req, res, next) {
 
  let id = req.body.id;
  let profit_loss = req.body.profit_loss;
  Saveimportcalculation.findOneAndUpdate({ _id: new ObjectId(id) }, {
    $set: {
       profit_loss: profit_loss
      }
  }, { returnOriginal: false }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "updated" });
    }
  });
});


router.post('/updateExportsaveprofit', function (req, res, next) {
 
  let id = req.body.id;
  let profit_loss = req.body.profit_loss;
  Saveexportcalculation.findOneAndUpdate({ _id: new ObjectId(id) }, {
    $set: {
       profit_loss: profit_loss
      }
  }, { returnOriginal: false }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "updated" });
    }
  });
});

router.post('/updatePCFCsaveprofit', function (req, res, next) {
 
  let id = req.body.id;
  let profit_loss = req.body.profit_loss;
  Savepcfccalculation.findOneAndUpdate({ _id: new ObjectId(id) }, {
    $set: {
       profit_loss: profit_loss
      }
  }, { returnOriginal: false }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "updated" });
    }
  });
});


router.post('/updateForexbuysaveprofit', function (req, res, next) {
 
  let id = req.body.id;
  let profit_loss = req.body.profit_loss;
  Saveforexbuycalculation.findOneAndUpdate({ _id: new ObjectId(id) }, {
    $set: {
       profit_loss: profit_loss
      }
  }, { returnOriginal: false }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "updated" });
    }
  });
});

router.post('/updateForexsellsaveprofit', function (req, res, next) {
 
  let id = req.body.id;
  let profit_loss = req.body.profit_loss;
  Saveforexsellcalculation.findOneAndUpdate({ _id: new ObjectId(id) }, {
    $set: {
       profit_loss: profit_loss
      }
  }, { returnOriginal: false }, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "updated" });
    }
  });
});



router.post('/upload_gbppremiumexcel', upload.single('file'), function (req, res) {
  // var wb = new Excel.Workbook();
  var filename = "";
  var userid = "";
  if (req.file) {
    filename = req.file.filename;
    userid = req.body.userid;
    console.log('userid', req.body.userid);
  }
   var filePath = path.resolve(DIR + "/" + filename);
   var XLSX = require('xlsx')
   var workbook = XLSX.readFile(filePath);
   var sheet_name_list = workbook.SheetNames;
   var Excel = require("exceljs");
   var workbook = new Excel.Workbook();
   var cnt = 1;
   var json_ary = [];
  ///var batch_id = String(Math.floor(Math.random() * 100) + 2 + "" + new Date().getTime());
   workbook.xlsx.readFile(filePath).then(function () {
    var worksheet = workbook.getWorksheet(sheet_name_list[0]);
    const promises = [];
    worksheet.eachRow(function (row, rowNumber) {
      console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
      
    });
      worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
      currRow = worksheet.getRow(rowNumber);
      if (cnt > 1 && currRow.getCell(1).value && currRow.getCell(2).value && currRow.getCell(3).value) {
        
        var applicable_date = "";
        var currency = "";
        var tenor = "";
        var settled_date = "";
        var bid_rate = "";
        var offer_rate = "";
        var source = "";
        
        applicable_date = currRow.getCell(1).value;
        currency = currRow.getCell(2).value;
        tenor = currRow.getCell(3).value;
        settled_date = currRow.getCell(4).value;
        bid_rate = currRow.getCell(5).value;
        offer_rate = currRow.getCell(6).value;
        source = currRow.getCell(7).value;
        var applicable_converdate = currRow.getCell(1).value;

        if (applicable_date) {
          applicable_date = applicable_date.toString();
           applicable_date = applicable_date.trim();
        }
        if (currency) {
          currency = currency.toString();
           currency = currency.trim();
        }
        if (tenor) {
          tenor = tenor.toString();
           tenor = tenor.trim();
        }
        if (settled_date) {
          settled_date = settled_date.toString();
           settled_date = settled_date.trim();
        }
        if (bid_rate) {
          bid_rate = bid_rate.toString();
           bid_rate = bid_rate.trim();
        }
        if (offer_rate) {
          offer_rate = offer_rate.toString();
           offer_rate = offer_rate.trim();
        }
        if (source) {
          source = source.toString();
           source = source.trim();
        }

      Gbpinrpremiumexcel.countDocuments({ applicable_date: applicable_date,settled_date: settled_date }, function (err, count) {
         console.log(count)
          if (count == 0) {
            json_ary.push({
          userid: (userid),
          applicable_date: applicable_date,
          applicable_converdate:applicable_converdate,
          currency: (currency),
          tenor: (tenor),
          settled_date: (settled_date),
          bid_rate: (bid_rate),
          offer_rate: (offer_rate),
          source: (source),
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 'admin',
          updated_by: 'admin',
            });
            const promise = Gbpinrpremiumexcel.collection.insertOne({
          userid: (userid),
          applicable_date: applicable_date,
          applicable_converdate:applicable_converdate,
          currency: (currency),
          tenor: (tenor),
          settled_date: (settled_date),
          bid_rate: (bid_rate),
          offer_rate: (offer_rate),
          source: (source),
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 'admin',
          updated_by: 'admin',
            }); // <-- whatever async operation you have here
            promises.push(promise);
          }
        })
      }

      cnt++;
    });

    console.log('promises',promises.length)
    Promise.all(promises).then((result) => {
       console.log("Done")
      res.json({ response: true, message: "Excel has been successfully uploaded" });
    }).catch((err) => {
      console.log("An error occurred while inserting data", err);
    });
  });

});


router.post('/getgbppremiumexceldata', function (req, res, next) {
  let userid = req.body.userid;
  var mymanualArray = [];

  Gbpinrpremiumexcel.find({ userid: { '$eq': userid } }, async function (err, users) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (users) {
      // res.json({ response: true, message: "Data found", details: users });

      for (var i = 0; i < users.length; i++) {
        // console.log(users[i]);
        let temp = {}

         //********start date******//
         let  date = new Date(users[i].applicable_date);
         let year = date.getFullYear();
         let month = date.getMonth()+1;
         let dt = date.getDate();
         if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }
        //********start date end******//

          //********from date******//
          let  fromdate = new Date(users[i].settled_date);
          let fromyear = fromdate.getFullYear();
          let frommonth = fromdate.getMonth()+1;
          let fromdt = fromdate.getDate();
          if (fromdt < 10) {
            fromdt = '0' + fromdt;
          }
          if (frommonth < 10) {
            frommonth = '0' + frommonth;
          }
        //********from date end******//
        
        temp['_id']=users[i]._id;
        temp['userid']=users[i].userid;
        temp['applicable_converdate']=users[i].applicable_converdate;
        temp['applicable_date']=users[i].applicable_date;
        temp['bid_rate']=users[i].bid_rate;
        temp['currency']=users[i].currency;
        temp['offer_rate']=users[i].offer_rate;
        temp['settled_date']=users[i].settled_date;
        temp['source']=users[i].source;
        temp['tenor']=users[i].tenor;
        temp['myconvertstart']=(dt+'-' + month + '-'+year);
        temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
        mymanualArray.push(temp);
      }
      console.log(mymanualArray)

      var XLSX = require('xlsx')
      var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/admindata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
      { header: "S no.", key: "s_no" },
      { header: "Applicable date", key: "myconvertstart" },
      { header: "Currency", key: "currency" },
      { header: "Settled date", key: "myconvertfromdate" },
      { header: "Bid rate", key: "bid_rate" },
      { header: "Offer rate", key: "offer_rate" },

      ];
      // Looping through User data
      let counter = 1;
      mymanualArray.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
        await workbook.xlsx.writeFile(`${path}/gbppremiumexceldata.xlsx`)
        .then(() => {
          console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
      } catch (err) {
        console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }
      res.json({ response: true, message: "Data found", details: users });


    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});



router.post('/getgbppremiumexceldatewise', function (req, res, next) {
 let userid = req.body.userid;
 let applicable_date = req.body.applicable_date;
 let applicable_date1 = req.body.applicable_date1;
 var mymanualArray = [];


 Gbpinrpremiumexcel.find({ applicable_converdate:{'$gte':new Date(applicable_date),'$lt':new Date(applicable_date1) }},async function (err, users) {
  if (err) {
    res.json({ response: false, message: err });
  }
  if (users) {
    //console.log('users',users)
      // res.json({ response: true, message: "Data found", details: user });

      for (var i = 0; i < users.length; i++) {
        // console.log(users[i]);
        let temp = {}

         //********start date******//
         let  date = new Date(users[i].applicable_date);
         let year = date.getFullYear();
         let month = date.getMonth()+1;
         let dt = date.getDate();
         if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }
        //********start date end******//

          //********from date******//
          let  fromdate = new Date(users[i].settled_date);
          let fromyear = fromdate.getFullYear();
          let frommonth = fromdate.getMonth()+1;
          let fromdt = fromdate.getDate();
          if (fromdt < 10) {
            fromdt = '0' + fromdt;
          }
          if (frommonth < 10) {
            frommonth = '0' + frommonth;
          }
        //********from date end******//
        
        temp['_id']=users[i]._id;
        temp['userid']=users[i].userid;
        temp['applicable_converdate']=users[i].applicable_converdate;
        temp['applicable_date']=users[i].applicable_date;
        temp['bid_rate']=users[i].bid_rate;
        temp['currency']=users[i].currency;
        temp['offer_rate']=users[i].offer_rate;
        temp['settled_date']=users[i].settled_date;
        temp['source']=users[i].source;
        temp['tenor']=users[i].tenor;
        temp['myconvertstart']=(dt+'-' + month + '-'+year);
        temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
        mymanualArray.push(temp);
      }
     // console.log(mymanualArray)

     var XLSX = require('xlsx')
     var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/admindata/downloaddata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
      { header: "S no.", key: "s_no" },
      { header: "Applicable date", key: "myconvertstart" },
      { header: "Currency", key: "currency" },
      { header: "Settled date", key: "myconvertfromdate" },
      { header: "Tenor", key: "tenor" },
      { header: "Bid rate", key: "bid_rate" },
      { header: "offer rate", key: "offer_rate" },

      ];
      // Looping through User data
      let counter = 1;
      mymanualArray.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
        await workbook.xlsx.writeFile(`${path}/gbpdatewisepremiumexceldata.xlsx`)
        .then(() => {
          console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
      } catch (err) {
        console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }
      res.json({ response: true, message: "Data found", details: users });


    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});





router.post('/upload_yenpremiumexcel', upload.single('file'), function (req, res) {
  // var wb = new Excel.Workbook();
  var filename = "";
  var userid = "";
  if (req.file) {
    filename = req.file.filename;
    userid = req.body.userid;
    console.log('userid', req.body.userid);
  }
   var filePath = path.resolve(DIR + "/" + filename);
   var XLSX = require('xlsx')
   var workbook = XLSX.readFile(filePath);
   var sheet_name_list = workbook.SheetNames;
   var Excel = require("exceljs");
   var workbook = new Excel.Workbook();
   var cnt = 1;
   var json_ary = [];
  ///var batch_id = String(Math.floor(Math.random() * 100) + 2 + "" + new Date().getTime());
   workbook.xlsx.readFile(filePath).then(function () {
    var worksheet = workbook.getWorksheet(sheet_name_list[0]);
    const promises = [];
    worksheet.eachRow(function (row, rowNumber) {
      console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
      
    });
      worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
      currRow = worksheet.getRow(rowNumber);
      if (cnt > 1 && currRow.getCell(1).value && currRow.getCell(2).value && currRow.getCell(3).value) {
        
        var applicable_date = "";
        var currency = "";
        var tenor = "";
        var settled_date = "";
        var bid_rate = "";
        var offer_rate = "";
        var source = "";
        
        applicable_date = currRow.getCell(1).value;
        currency = currRow.getCell(2).value;
        tenor = currRow.getCell(3).value;
        settled_date = currRow.getCell(4).value;
        bid_rate = currRow.getCell(5).value;
        offer_rate = currRow.getCell(6).value;
        source = currRow.getCell(7).value;
        var applicable_converdate = currRow.getCell(1).value;

        if (applicable_date) {
          applicable_date = applicable_date.toString();
            applicable_date = applicable_date.trim();
        }
        if (currency) {
          currency = currency.toString();
            currency = currency.trim();
        }
        if (tenor) {
          tenor = tenor.toString();
            tenor = tenor.trim();
        }
        if (settled_date) {
          settled_date = settled_date.toString();
            settled_date = settled_date.trim();
        }
        if (bid_rate) {
          bid_rate = bid_rate.toString();
            bid_rate = bid_rate.trim();
        }
        if (offer_rate) {
          offer_rate = offer_rate.toString();
            offer_rate = offer_rate.trim();
        }
        if (source) {
          source = source.toString();
            source = source.trim();
        }

      Yeninrpremiumexcel.countDocuments({ applicable_date: applicable_date,settled_date: settled_date }, function (err, count) {
         console.log(count)
          if (count == 0) {
            json_ary.push({
          userid: (userid),
          applicable_date: applicable_date,
          applicable_converdate:applicable_converdate,
          currency: (currency),
          tenor: (tenor),
          settled_date: (settled_date),
          bid_rate: (bid_rate),
          offer_rate: (offer_rate),
          source: (source),
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 'admin',
          updated_by: 'admin',
            });
            const promise = Yeninrpremiumexcel.collection.insertOne({
          userid: (userid),
          applicable_date: applicable_date,
          applicable_converdate:applicable_converdate,
          currency: (currency),
          tenor: (tenor),
          settled_date: (settled_date),
          bid_rate: (bid_rate),
          offer_rate: (offer_rate),
          source: (source),
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 'admin',
          updated_by: 'admin',
            }); // <-- whatever async operation you have here
            promises.push(promise);
          }
        })
      }

      cnt++;
    });

    console.log('promises',promises.length)
    Promise.all(promises).then((result) => {
       console.log("Done")
      res.json({ response: true, message: "Excel has been successfully uploaded" });
    }).catch((err) => {
      console.log("An error occurred while inserting data", err);
    });
  });

})


router.post('/getyenpremiumexceldata', function (req, res, next) {
  let userid = req.body.userid;
  var mymanualArray = [];

  Yeninrpremiumexcel.find({ userid: { '$eq': userid } }, async function (err, users) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (users) {
      // res.json({ response: true, message: "Data found", details: users });

      for (var i = 0; i < users.length; i++) {
        // console.log(users[i]);
        let temp = {}

         //********start date******//
         let  date = new Date(users[i].applicable_date);
         let year = date.getFullYear();
         let month = date.getMonth()+1;
         let dt = date.getDate();
         if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }
        //********start date end******//

          //********from date******//
          let  fromdate = new Date(users[i].settled_date);
          let fromyear = fromdate.getFullYear();
          let frommonth = fromdate.getMonth()+1;
          let fromdt = fromdate.getDate();
          if (fromdt < 10) {
            fromdt = '0' + fromdt;
          }
          if (frommonth < 10) {
            frommonth = '0' + frommonth;
          }
        //********from date end******//
        
        temp['_id']=users[i]._id;
        temp['userid']=users[i].userid;
        temp['applicable_converdate']=users[i].applicable_converdate;
        temp['applicable_date']=users[i].applicable_date;
        temp['bid_rate']=users[i].bid_rate;
        temp['currency']=users[i].currency;
        temp['offer_rate']=users[i].offer_rate;
        temp['settled_date']=users[i].settled_date;
        temp['source']=users[i].source;
        temp['tenor']=users[i].tenor;
        temp['myconvertstart']=(dt+'-' + month + '-'+year);
        temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
        mymanualArray.push(temp);
      }
      console.log(mymanualArray)

      var XLSX = require('xlsx')
      var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/admindata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
      { header: "S no.", key: "s_no" },
      { header: "Applicable date", key: "myconvertstart" },
      { header: "Currency", key: "currency" },
      { header: "Settled date", key: "myconvertfromdate" },
      { header: "Bid rate", key: "bid_rate" },
      { header: "Offer rate", key: "offer_rate" },

      ];
      // Looping through User data
      let counter = 1;
      mymanualArray.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
        await workbook.xlsx.writeFile(`${path}/yenpremiumexceldata.xlsx`)
        .then(() => {
          console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
      } catch (err) {
        console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }
      res.json({ response: true, message: "Data found", details: users });


    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});


router.post('/getyenpremiumexceldatewise', function (req, res, next) {
 let userid = req.body.userid;
 let applicable_date = req.body.applicable_date;
 let applicable_date1 = req.body.applicable_date1;
 var mymanualArray = [];


 Yeninrpremiumexcel.find({ applicable_converdate:{'$gte':new Date(applicable_date),'$lt':new Date(applicable_date1) }},async function (err, users) {
  if (err) {
    res.json({ response: false, message: err });
  }
  if (users) {
      // res.json({ response: true, message: "Data found", details: user });

      for (var i = 0; i < users.length; i++) {
        // console.log(users[i]);
        let temp = {}

         //********start date******//
         let  date = new Date(users[i].applicable_date);
         let year = date.getFullYear();
         let month = date.getMonth()+1;
         let dt = date.getDate();
         if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }
        //********start date end******//

          //********from date******//
          let  fromdate = new Date(users[i].settled_date);
          let fromyear = fromdate.getFullYear();
          let frommonth = fromdate.getMonth()+1;
          let fromdt = fromdate.getDate();
          if (fromdt < 10) {
            fromdt = '0' + fromdt;
          }
          if (frommonth < 10) {
            frommonth = '0' + frommonth;
          }
        //********from date end******//
        
        temp['_id']=users[i]._id;
        temp['userid']=users[i].userid;
        temp['applicable_converdate']=users[i].applicable_converdate;
        temp['applicable_date']=users[i].applicable_date;
        temp['bid_rate']=users[i].bid_rate;
        temp['currency']=users[i].currency;
        temp['offer_rate']=users[i].offer_rate;
        temp['settled_date']=users[i].settled_date;
        temp['source']=users[i].source;
        temp['tenor']=users[i].tenor;
        temp['myconvertstart']=(dt+'-' + month + '-'+year);
        temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
        mymanualArray.push(temp);
      }
     // console.log(mymanualArray)

     var XLSX = require('xlsx')
     var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/admindata/downloaddata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
      { header: "S no.", key: "s_no" },
      { header: "Applicable date", key: "myconvertstart" },
      { header: "Currency", key: "currency" },
      { header: "Settled date", key: "myconvertfromdate" },
      { header: "Tenor", key: "tenor" },
      { header: "Bid rate", key: "bid_rate" },
      { header: "offer rate", key: "offer_rate" },

      ];
      // Looping through User data
      let counter = 1;
      mymanualArray.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
        await workbook.xlsx.writeFile(`${path}/yendatewisepremiumexceldata.xlsx`)
        .then(() => {
          console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
      } catch (err) {
        console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }
      res.json({ response: true, message: "Data found", details: users });


    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});




router.post('/upload_eurusdpremiumexcel', upload.single('file'), function (req, res) {
  // var wb = new Excel.Workbook();
  var filename = "";
  var userid = "";
  if (req.file) {
    filename = req.file.filename;
    userid = req.body.userid;
    console.log('userid', req.body.userid);
  }
   var filePath = path.resolve(DIR + "/" + filename);
   var XLSX = require('xlsx')
   var workbook = XLSX.readFile(filePath);
   var sheet_name_list = workbook.SheetNames;
   var Excel = require("exceljs");
   var workbook = new Excel.Workbook();
   var cnt = 1;
   var json_ary = [];
  ///var batch_id = String(Math.floor(Math.random() * 100) + 2 + "" + new Date().getTime());
   workbook.xlsx.readFile(filePath).then(function () {
    var worksheet = workbook.getWorksheet(sheet_name_list[0]);
    const promises = [];
    worksheet.eachRow(function (row, rowNumber) {
      console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
      
    });
      worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
      currRow = worksheet.getRow(rowNumber);
      if (cnt > 1 && currRow.getCell(1).value && currRow.getCell(2).value && currRow.getCell(3).value) {
        
        var applicable_date = "";
        var currency = "";
        var tenor = "";
        var settled_date = "";
        var bid_rate = "";
        var offer_rate = "";
        var source = "";
        
        applicable_date = currRow.getCell(1).value;
        currency = currRow.getCell(2).value;
        tenor = currRow.getCell(3).value;
        settled_date = currRow.getCell(4).value;
        bid_rate = currRow.getCell(5).value;
        offer_rate = currRow.getCell(6).value;
        source = currRow.getCell(7).value;
        var applicable_converdate = currRow.getCell(1).value;

        if (applicable_date) {
          applicable_date = applicable_date.toString();
           applicable_date = applicable_date.trim();
        }
        if (currency) {
          currency = currency.toString();
           currency = currency.trim();
        }
        if (tenor) {
          tenor = tenor.toString();
           tenor = tenor.trim();
        }
        if (settled_date) {
          settled_date = settled_date.toString();
           settled_date = settled_date.trim();
        }
        if (bid_rate) {
          bid_rate = bid_rate.toString();
           bid_rate = bid_rate.trim();
        }
        if (offer_rate) {
          offer_rate = offer_rate.toString();
           offer_rate = offer_rate.trim();
        }
        if (source) {
          source = source.toString();
           source = source.trim();
        }

      EurUsdinrpremiumexcel.countDocuments({ applicable_date: applicable_date,settled_date: settled_date }, function (err, count) {
         console.log(count)
          if (count == 0) {
            json_ary.push({
          userid: (userid),
          applicable_date: applicable_date,
          applicable_converdate:applicable_converdate,
          currency: (currency),
          tenor: (tenor),
          settled_date: (settled_date),
          bid_rate: (bid_rate),
          offer_rate: (offer_rate),
          source: (source),
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 'admin',
          updated_by: 'admin',
            });
            const promise = EurUsdinrpremiumexcel.collection.insertOne({
          userid: (userid),
          applicable_date: applicable_date,
          applicable_converdate:applicable_converdate,
          currency: (currency),
          tenor: (tenor),
          settled_date: (settled_date),
          bid_rate: (bid_rate),
          offer_rate: (offer_rate),
          source: (source),
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 'admin',
          updated_by: 'admin',
            }); // <-- whatever async operation you have here
            promises.push(promise);
          }
        })
      }

      cnt++;
    });

    console.log('promises',promises.length)
    Promise.all(promises).then((result) => {
       console.log("Done")
      res.json({ response: true, message: "Excel has been successfully uploaded" });
    }).catch((err) => {
      console.log("An error occurred while inserting data", err);
    });
  });

});


router.post('/geteurusdpremiumexceldata', function (req, res, next) {
  let userid = req.body.userid;
  var mymanualArray = [];

  EurUsdinrpremiumexcel.find({ userid: { '$eq': userid } }, async function (err, users) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (users) {
      // res.json({ response: true, message: "Data found", details: users });

      for (var i = 0; i < users.length; i++) {
        // console.log(users[i]);
        let temp = {}

         //********start date******//
         let  date = new Date(users[i].applicable_date);
         let year = date.getFullYear();
         let month = date.getMonth()+1;
         let dt = date.getDate();
         if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }
        //********start date end******//

          //********from date******//
          let  fromdate = new Date(users[i].settled_date);
          let fromyear = fromdate.getFullYear();
          let frommonth = fromdate.getMonth()+1;
          let fromdt = fromdate.getDate();
          if (fromdt < 10) {
            fromdt = '0' + fromdt;
          }
          if (frommonth < 10) {
            frommonth = '0' + frommonth;
          }
        //********from date end******//
        
        temp['_id']=users[i]._id;
        temp['userid']=users[i].userid;
        temp['applicable_converdate']=users[i].applicable_converdate;
        temp['applicable_date']=users[i].applicable_date;
        temp['bid_rate']=users[i].bid_rate;
        temp['currency']=users[i].currency;
        temp['offer_rate']=users[i].offer_rate;
        temp['settled_date']=users[i].settled_date;
        temp['source']=users[i].source;
        temp['tenor']=users[i].tenor;
        temp['myconvertstart']=(dt+'-' + month + '-'+year);
        temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
        mymanualArray.push(temp);
      }
      console.log(mymanualArray)

      var XLSX = require('xlsx')
      var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/admindata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
      { header: "S no.", key: "s_no" },
      { header: "Applicable date", key: "myconvertstart" },
      { header: "Currency", key: "currency" },
      { header: "Settled date", key: "myconvertfromdate" },
      { header: "Bid rate", key: "bid_rate" },
      { header: "Offer rate", key: "offer_rate" },

      ];
      // Looping through User data
      let counter = 1;
      mymanualArray.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
        await workbook.xlsx.writeFile(`${path}/eurusdpremiumexceldata.xlsx`)
        .then(() => {
          console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
      } catch (err) {
        console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }
      res.json({ response: true, message: "Data found", details: users });


    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});


router.post('/geteurusdpremiumexceldatewise', function (req, res, next) {
 let userid = req.body.userid;
 let applicable_date = req.body.applicable_date;
 let applicable_date1 = req.body.applicable_date1;
 var mymanualArray = [];


 EurUsdinrpremiumexcel.find({ applicable_converdate:{'$gte':new Date(applicable_date),'$lt':new Date(applicable_date1) }},async function (err, users) {
  if (err) {
    res.json({ response: false, message: err });
  }
  if (users) {
      // res.json({ response: true, message: "Data found", details: user });

      for (var i = 0; i < users.length; i++) {
        // console.log(users[i]);
        let temp = {}

         //********start date******//
         let  date = new Date(users[i].applicable_date);
         let year = date.getFullYear();
         let month = date.getMonth()+1;
         let dt = date.getDate();
         if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }
        //********start date end******//

          //********from date******//
          let  fromdate = new Date(users[i].settled_date);
          let fromyear = fromdate.getFullYear();
          let frommonth = fromdate.getMonth()+1;
          let fromdt = fromdate.getDate();
          if (fromdt < 10) {
            fromdt = '0' + fromdt;
          }
          if (frommonth < 10) {
            frommonth = '0' + frommonth;
          }
        //********from date end******//
        
        temp['_id']=users[i]._id;
        temp['userid']=users[i].userid;
        temp['applicable_converdate']=users[i].applicable_converdate;
        temp['applicable_date']=users[i].applicable_date;
        temp['bid_rate']=users[i].bid_rate;
        temp['currency']=users[i].currency;
        temp['offer_rate']=users[i].offer_rate;
        temp['settled_date']=users[i].settled_date;
        temp['source']=users[i].source;
        temp['tenor']=users[i].tenor;
        temp['myconvertstart']=(dt+'-' + month + '-'+year);
        temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
        mymanualArray.push(temp);
      }
     // console.log(mymanualArray)

     var XLSX = require('xlsx')
     var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/admindata/downloaddata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
      { header: "S no.", key: "s_no" },
      { header: "Applicable date", key: "myconvertstart" },
      { header: "Currency", key: "currency" },
      { header: "Settled date", key: "myconvertfromdate" },
      { header: "Tenor", key: "tenor" },
      { header: "Bid rate", key: "bid_rate" },
      { header: "offer rate", key: "offer_rate" },

      ];
      // Looping through User data
      let counter = 1;
      mymanualArray.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
        await workbook.xlsx.writeFile(`${path}/eurusddatewisepremiumexceldata.xlsx`)
        .then(() => {
          console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
      } catch (err) {
        console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }
      res.json({ response: true, message: "Data found", details: users });


    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});


router.post('/upload_gbpusdpremiumexcel', upload.single('file'), function (req, res) {
  // var wb = new Excel.Workbook();
  var filename = "";
  var userid = "";
  if (req.file) {
    filename = req.file.filename;
    userid = req.body.userid;
    console.log('userid', req.body.userid);
  }
   var filePath = path.resolve(DIR + "/" + filename);
   var XLSX = require('xlsx')
   var workbook = XLSX.readFile(filePath);
   var sheet_name_list = workbook.SheetNames;
   var Excel = require("exceljs");
   var workbook = new Excel.Workbook();
   var cnt = 1;
   var json_ary = [];
  ///var batch_id = String(Math.floor(Math.random() * 100) + 2 + "" + new Date().getTime());
   workbook.xlsx.readFile(filePath).then(function () {
    var worksheet = workbook.getWorksheet(sheet_name_list[0]);
    const promises = [];
    worksheet.eachRow(function (row, rowNumber) {
      console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
      
    });
      worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
      currRow = worksheet.getRow(rowNumber);
      if (cnt > 1 && currRow.getCell(1).value && currRow.getCell(2).value && currRow.getCell(3).value) {
        
        var applicable_date = "";
        var currency = "";
        var tenor = "";
        var settled_date = "";
        var bid_rate = "";
        var offer_rate = "";
        var source = "";
        
        applicable_date = currRow.getCell(1).value;
        currency = currRow.getCell(2).value;
        tenor = currRow.getCell(3).value;
        settled_date = currRow.getCell(4).value;
        bid_rate = currRow.getCell(5).value;
        offer_rate = currRow.getCell(6).value;
        source = currRow.getCell(7).value;
        var applicable_converdate = currRow.getCell(1).value;

        if (applicable_date) {
          applicable_date = applicable_date.toString();
           applicable_date = applicable_date.trim();
        }
        if (currency) {
          currency = currency.toString();
           currency = currency.trim();
        }
        if (tenor) {
          tenor = tenor.toString();
           tenor = tenor.trim();
        }
        if (settled_date) {
          settled_date = settled_date.toString();
           settled_date = settled_date.trim();
        }
        if (bid_rate) {
          bid_rate = bid_rate.toString();
           bid_rate = bid_rate.trim();
        }
        if (offer_rate) {
          offer_rate = offer_rate.toString();
           offer_rate = offer_rate.trim();
        }
        if (source) {
          source = source.toString();
           source = source.trim();
        }

      GbpUsdinrpremiumexcel.countDocuments({ applicable_date: applicable_date,settled_date: settled_date }, function (err, count) {
         console.log(count)
          if (count == 0) {
            json_ary.push({
          userid: (userid),
          applicable_date: applicable_date,
          applicable_converdate:applicable_converdate,
          currency: (currency),
          tenor: (tenor),
          settled_date: (settled_date),
          bid_rate: (bid_rate),
          offer_rate: (offer_rate),
          source: (source),
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 'admin',
          updated_by: 'admin',
            });
            const promise = GbpUsdinrpremiumexcel.collection.insertOne({
          userid: (userid),
          applicable_date: applicable_date,
          applicable_converdate:applicable_converdate,
          currency: (currency),
          tenor: (tenor),
          settled_date: (settled_date),
          bid_rate: (bid_rate),
          offer_rate: (offer_rate),
          source: (source),
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 'admin',
          updated_by: 'admin',
            }); // <-- whatever async operation you have here
            promises.push(promise);
          }
        })
      }

      cnt++;
    });

    console.log('promises',promises.length)
    Promise.all(promises).then((result) => {
       console.log("Done")
      res.json({ response: true, message: "Excel has been successfully uploaded" });
    }).catch((err) => {
      console.log("An error occurred while inserting data", err);
    });
  });

});


router.post('/getgbpusdpremiumexceldata', function (req, res, next) {
  let userid = req.body.userid;
  var mymanualArray = [];

  GbpUsdinrpremiumexcel.find({ userid: { '$eq': userid } }, async function (err, users) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (users) {
      // res.json({ response: true, message: "Data found", details: users });

      for (var i = 0; i < users.length; i++) {
        // console.log(users[i]);
        let temp = {}

         //********start date******//
         let  date = new Date(users[i].applicable_date);
         let year = date.getFullYear();
         let month = date.getMonth()+1;
         let dt = date.getDate();
         if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }
        //********start date end******//

          //********from date******//
          let  fromdate = new Date(users[i].settled_date);
          let fromyear = fromdate.getFullYear();
          let frommonth = fromdate.getMonth()+1;
          let fromdt = fromdate.getDate();
          if (fromdt < 10) {
            fromdt = '0' + fromdt;
          }
          if (frommonth < 10) {
            frommonth = '0' + frommonth;
          }
        //********from date end******//
        
        temp['_id']=users[i]._id;
        temp['userid']=users[i].userid;
        temp['applicable_converdate']=users[i].applicable_converdate;
        temp['applicable_date']=users[i].applicable_date;
        temp['bid_rate']=users[i].bid_rate;
        temp['currency']=users[i].currency;
        temp['offer_rate']=users[i].offer_rate;
        temp['settled_date']=users[i].settled_date;
        temp['source']=users[i].source;
        temp['tenor']=users[i].tenor;
        temp['myconvertstart']=(dt+'-' + month + '-'+year);
        temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
        mymanualArray.push(temp);
      }
      console.log(mymanualArray)

      var XLSX = require('xlsx')
      var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/admindata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
      { header: "S no.", key: "s_no" },
      { header: "Applicable date", key: "myconvertstart" },
      { header: "Currency", key: "currency" },
      { header: "Settled date", key: "myconvertfromdate" },
      { header: "Bid rate", key: "bid_rate" },
      { header: "Offer rate", key: "offer_rate" },

      ];
      // Looping through User data
      let counter = 1;
      mymanualArray.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
        await workbook.xlsx.writeFile(`${path}/gbpusdpremiumexceldata.xlsx`)
        .then(() => {
          console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
      } catch (err) {
        console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }
      res.json({ response: true, message: "Data found", details: users });


    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});



router.post('/getgbpusdpremiumexceldatewise', function (req, res, next) {
 let userid = req.body.userid;
 let applicable_date = req.body.applicable_date;
 let applicable_date1 = req.body.applicable_date1;
 var mymanualArray = [];


 GbpUsdinrpremiumexcel.find({ applicable_converdate:{'$gte':new Date(applicable_date),'$lt':new Date(applicable_date1) }},async function (err, users) {
  if (err) {
    res.json({ response: false, message: err });
  }
  if (users) {
      // res.json({ response: true, message: "Data found", details: user });

      for (var i = 0; i < users.length; i++) {
        // console.log(users[i]);
        let temp = {}

         //********start date******//
         let  date = new Date(users[i].applicable_date);
         let year = date.getFullYear();
         let month = date.getMonth()+1;
         let dt = date.getDate();
         if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }
        //********start date end******//

          //********from date******//
          let  fromdate = new Date(users[i].settled_date);
          let fromyear = fromdate.getFullYear();
          let frommonth = fromdate.getMonth()+1;
          let fromdt = fromdate.getDate();
          if (fromdt < 10) {
            fromdt = '0' + fromdt;
          }
          if (frommonth < 10) {
            frommonth = '0' + frommonth;
          }
        //********from date end******//
        
        temp['_id']=users[i]._id;
        temp['userid']=users[i].userid;
        temp['applicable_converdate']=users[i].applicable_converdate;
        temp['applicable_date']=users[i].applicable_date;
        temp['bid_rate']=users[i].bid_rate;
        temp['currency']=users[i].currency;
        temp['offer_rate']=users[i].offer_rate;
        temp['settled_date']=users[i].settled_date;
        temp['source']=users[i].source;
        temp['tenor']=users[i].tenor;
        temp['myconvertstart']=(dt+'-' + month + '-'+year);
        temp['myconvertfromdate']=(fromdt+'-' + frommonth + '-'+fromyear);
        mymanualArray.push(temp);
      }
     // console.log(mymanualArray)

     var XLSX = require('xlsx')
     var Excel = require("exceljs");
      const workbook = new Excel.Workbook();  // Create a new workbook
      const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
      const path = "./uploads/admindata/downloaddata";  // Path to download excel
      // Column for data in excel. key must match data key
      worksheet.columns = [
      { header: "S no.", key: "s_no" },
      { header: "Applicable date", key: "myconvertstart" },
      { header: "Currency", key: "currency" },
      { header: "Settled date", key: "myconvertfromdate" },
      { header: "Tenor", key: "tenor" },
      { header: "Bid rate", key: "bid_rate" },
      { header: "offer rate", key: "offer_rate" },

      ];
      // Looping through User data
      let counter = 1;
      mymanualArray.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      try {
        await workbook.xlsx.writeFile(`${path}/gbpusddatewisepremiumexceldata.xlsx`)
        .then(() => {
          console.log("Success");
            //res.json({ response: true, message: message, data: users });
          });
      } catch (err) {
        console.log("Error");
        //res.json({ response: false, message: "Something went wrong" });
      }
      res.json({ response: true, message: "Data found", details: users });


    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});


router.post('/deleteImportSelectinput', function (req, res, next) {
  let idarr = req.body.idarr;
  // console.log(idarr)
  Importinputexcel.deleteMany({'_id':{'$in':idarr}}, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "Record Deleted successfully"});
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});

router.post('/deleteExportSelectinput', function (req, res, next) {
  let idarr = req.body.idarr;
  // console.log(idarr)
  Exportinputexcel.deleteMany({'_id':{'$in':idarr}}, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "Record Deleted successfully"});
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});


router.post('/deletePCFCSelectinput', function (req, res, next) {
  let idarr = req.body.idarr;
  // console.log(idarr)
  Pcfcexcel.deleteMany({'_id':{'$in':idarr}}, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "Record Deleted successfully"});
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});

router.post('/deleteForexbuySelectinput', function (req, res, next) {
  let idarr = req.body.idarr;
  // console.log(idarr)
  Forexbuyexcel.deleteMany({'_id':{'$in':idarr}}, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "Record Deleted successfully"});
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
});

router.post('/deleteForexsellSelectinput', function (req, res, next) {
  let idarr = req.body.idarr;
  // console.log(idarr)
  Forexsellexcel.deleteMany({'_id':{'$in':idarr}}, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
      res.json({ response: true, message: "Record Deleted successfully"});
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
}); 




router.post('/findImportinput', function (req, res, next) {
  let idarr = req.body.idarr;
  let type = req.body.type;
  Importinputexcel.find({'userid':{'$in':idarr},type: { '$eq': type }}, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
       res.json({ response: true, message: "Data found", details: user });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
}); 

router.post('/findExportinput', function (req, res, next) {
  let idarr = req.body.idarr;
  let type = req.body.type;
  Exportinputexcel.find({'userid':{'$in':idarr},type: { '$eq': type }}, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
       res.json({ response: true, message: "Data found", details: user });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
}); 

router.post('/findPCFCinput', function (req, res, next) {
  let idarr = req.body.idarr;
  let type = req.body.type;
  Pcfcexcel.find({'userid':{'$in':idarr},type: { '$eq': type }}, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
       res.json({ response: true, message: "Data found", details: user });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
}); 


router.post('/findForexbuyinput', function (req, res, next) {
  let idarr = req.body.idarr;
  let type = req.body.type;
  Forexbuyexcel.find({'userid':{'$in':idarr},type: { '$eq': type }}, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
       res.json({ response: true, message: "Data found", details: user });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
}); 


router.post('/findForexsellinput', function (req, res, next) {
  let idarr = req.body.idarr;
  let type = req.body.type;
  Forexsellexcel.find({'userid':{'$in':idarr},type: { '$eq': type }}, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
       res.json({ response: true, message: "Data found", details: user });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
}); 


router.post('/findImportsettleddata', function (req, res, next) {
  let idarr = req.body.idarr;
  let type = req.body.type;
  Settledimportdata.find({'userid':{'$in':idarr},type: { '$eq': type }}, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
       res.json({ response: true, message: "Data found", details: user });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
}); 


router.post('/findExportsettleddata', function (req, res, next) {
  let idarr = req.body.idarr;
  let type = req.body.type;
  Settleddata.find({'userid':{'$in':idarr},type: { '$eq': type }}, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
       res.json({ response: true, message: "Data found", details: user });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
}); 


router.post('/findPCFCsettleddata', function (req, res, next) {
  let idarr = req.body.idarr;
  let type = req.body.type;
  Settledpcfcdata.find({'userid':{'$in':idarr},type: { '$eq': type }}, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
       res.json({ response: true, message: "Data found", details: user });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
}); 


router.post('/findForexbuysettleddata', function (req, res, next) {
  let idarr = req.body.idarr;
  let type = req.body.type;
  Settledforexbuydata.find({'userid':{'$in':idarr},type: { '$eq': type }}, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
       res.json({ response: true, message: "Data found", details: user });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
}); 


router.post('/findForexsellsettleddata', function (req, res, next) {
  let idarr = req.body.idarr;
  let type = req.body.type;
  Settledforexselldata.find({'userid':{'$in':idarr},type: { '$eq': type }}, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
       res.json({ response: true, message: "Data found", details: user });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
}); 

router.post('/get_Admin_import_calculation_data', function (req, res, next) {
  let idarr = req.body.idarr;
  let type = req.body.type;
  Saveimportcalculation.find({'userid':{'$in':idarr},type: { '$eq': type }}, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
       res.json({ response: true, message: "Data found", details: user });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
}); 


router.post('/get_Admin_export_calculation_data', function (req, res, next) {
  let idarr = req.body.idarr;
  let type = req.body.type;
  Saveexportcalculation.find({'userid':{'$in':idarr},type: { '$eq': type }}, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
       res.json({ response: true, message: "Data found", details: user });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
}); 


router.post('/get_Admin_PCFC_calculation_data', function (req, res, next) {
  let idarr = req.body.idarr;
  let type = req.body.type;
  Savepcfccalculation.find({'userid':{'$in':idarr},type: { '$eq': type }}, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
       res.json({ response: true, message: "Data found", details: user });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
}); 

router.post('/get_Admin_forexbuycalculation_data', function (req, res, next) {
  let idarr = req.body.idarr;
  let type = req.body.type;
  Saveforexbuycalculation.find({'userid':{'$in':idarr},type: { '$eq': type }}, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
       res.json({ response: true, message: "Data found", details: user });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
}); 

 router.post('/get_Admin_forexsellcalculation_data', function (req, res, next) {
  let idarr = req.body.idarr;
  let type = req.body.type;
  Saveforexsellcalculation.find({'userid':{'$in':idarr},type: { '$eq': type }}, function (err, user) {
    if (err) {
      res.json({ response: false, message: err });
    }
    if (user) {
       res.json({ response: true, message: "Data found", details: user });
    } else {
      res.json({ response: false, message: "No Data found" });
    }
  });
}); 





function monthNum(month){
  var mon = 0;
  switch (month) {
    case "Jan":
      mon = 0;
      break;
    case "Feb":
      mon = 1;
      break;
    case "Mar":
      mon = 2;
      break;
    case "Apr":
      mon = 3;
      break;
    case "May":
      mon = 4;
      break;
    case "Jun":
      mon = 5;
      break;
    case "Jul":
      mon = 6;
      break;
    case "Aug":
      mon = 7;
      break;
    case "Sep":
      mon = 8;
      break;
    case "Oct":
      mon = 9;
      break;
    case "Nov":
      mon = 10;
      break;
    case "Dec":
      mon = 11;
      break;
  }
  return mon;
}
 

module.exports = router;
