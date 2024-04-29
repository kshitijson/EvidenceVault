//Local module imports
const { web3StorageUpload } = require('./web3Storage.js')
/* const { verifyContent } = require('./ipfsMod.js') */
const { db_insert_case, add_admin, delete_admin, delete_user, fetch_caseName } = require('./database.js')
const { check_id } = require('./database.js')
const { find_evidences } = require('./database.js')
const { blockchainInsert, insertLog, chainOfCustody } = require('./blockchainConnect.js')
const { getEvidencesLink } = require('./blockchainConnect.js')
const { authToken, hashPasswd, validateUser, authUser } = require('./auth.js')
const { add_user } = require('./database.js')
// 

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');  // cors allows us to receive api from different port no
const path = require('path');
const fs = require("fs");


// Multer for handling files from post request
const multer = require('multer');
// Setting the default name of the processed file as the original name
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// using the imported modules
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// giving green signal to localhost:3000 which is the react app
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));


app.post('/api/login', upload.none(), async (req, res) => {

  const result = await validateUser(req.body)

  res.send({
    messageType: result === 'invalid' ? 'error' : 'success',
    messageContent: result === 'success' ? 'Login Successfull' : 'Invalid Credentials',
    token: result === 'success' ? authToken(req.body.id) : null,
    user: req.body.userType
  })
})

/* app.post('/api/chpass', upload.none(), async (req, res) => {



  const result = ""  

  res.send({
    messageType: result,
    messageContent: result === 'success' ? 'Password Changed Successfull' : 'Invalid Password',
  })
}) */


//for handling post request at /api/upload
app.post('/api/upload', authUser, upload.single('evidence'), async (req, res) => {
   // access form fields
  let case_no = req.body.caseNo;
  let id = req.user;
  let case_name = req.body.caseName;

  let file_name = req.file.originalname;
  let file_type = req.file.mimetype;
  let file_path = path.join(__dirname, `./uploads/${file_name}`);


  let is_id_valid = "";
  await check_id(id).then((res) => {
    is_id_valid = res;
  });


  if (is_id_valid) {


    let result = false;
    await db_insert_case(case_no, case_name, file_name, file_type)  // insert into database
      .then((res) => {
        result = res;
      });

    // Check if DB insertion is successfull
    if (result === true) {
      //Upload to ipfs
      let cid = '';
      await web3StorageUpload().then((res) => {
        cid = res;
      })
      await blockchainInsert(id, case_no, case_name, file_name, file_type, cid, "Upload");  // insert into blockchain
      res.send({
        messageType: "success",
        messageContent: "File inserted"
      });
    } else {
      res.send({
        messageType: "error",
        messageContent: "Case number and Case name does not match"
      });
    }


    // Delete the file received from the POST request
    setTimeout(() => {
      fs.unlink(file_path, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('File deleted successfully');
      });
    }, 1000);

  }
  else {
    res.send({
      messageType: "error",
      messageContent: "Invalid ID"
    });

    // Delete the file received from the POST request
    setTimeout(() => {
      fs.unlink(file_path, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('File deleted successfully');
      });
    }, 1000);
  }
});
//


app.post('/api/view', upload.none(), async (req, res) => {
  let caseNo = req.body.caseNo;

  let fileNames;
  let fileTypes;
  let fileLinks;
  await find_evidences(caseNo).then((res) => {
    fileNames = res[0];
    fileTypes = res[1];
  });


  if (!fileNames) {
    res.send(false)
  } else {
    await getEvidencesLink(caseNo, fileNames).then((res) => {
      fileLinks = res;
    });


    if (!fileLinks) {
      res.send(false);
    } else {
      const fileList = fileNames.map((fileName, index) => ({
        key: index + 1,
        id: fileLinks[fileName].id,
        fileName: fileName,
        fileType: fileTypes[index],
        fileLink: fileLinks[fileName].file_hash_ipfs,
      }));
      res.send(fileList);
    }
  }
});

app.post('/api/delete', authUser, upload.none(), async (req, res) => {

  console.log(req.user)

})

app.post('/api/coc', authUser, upload.none(), async (req, res) => {
  const id = req.user
  const caseNo = req.body.caseNo

  const caseName = await fetch_caseName(caseNo.toString())

  const fileName = req.body.fileName
  const fileType = req.body.fileType
  const _status_ = "View"

  await insertLog(id, caseNo, caseName, fileName, fileType, _status_)

})


//for admin 

app.post('/api/admin/add', upload.none(), async (req, res) => {

  const passwd = hashPasswd(req.body.id)

  let result
  if (req.body.userType === "admin") {
    result = await add_admin(req.body, passwd)
  } else {
    result = await add_user(req.body, passwd)
  }

  res.send({
    messageType: result,
    messageContent: result === 'success' ? 'User Created' : 'Error adding user'
  })
})

app.post('/api/admin/delete', upload.none(), async (req, res) => {

  let result
  if (req.body.userType === "admin") {
    result = await delete_admin(req.body)
  } else {
    result = await delete_user(req.body)
  }

  res.send({
    messageType: result,
    messageContent: result === 'success' ? 'User Deleted' : 'Error deleting user'
  })
})

app.post('/api/admin/logs', upload.none(), async (req, res) => {
  const caseNo = req.body.caseNo
  const result = await chainOfCustody(caseNo)

  res.send(result)
})

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
