const multer = require("multer");
const path = require("path");
const maxSize = 1000000000; //2 * 1024 * 1024;
//set up storage engine using multar
const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__basedir, './public/uploads/tickets/'));
// },
  destination: "./public/uploads/tickets/",
  //"./public/uploads/tickets/",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)+path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix)
  },
});

//Initialized upload
const upload = multer({
  storage: storage,
  limits: { fileSize: maxSize }, //Limit size to 10MB  10000000
  fileFilter:function(req,file,cb){
    checkFileType(file,cb)
  }
}).single('files');
// console.log(upload);
// single("file"); // 'myFiles' is the field name, allowing up to 10 files

//check file type
const checkFileType = (file, cb) => {
  const filetypes = /jpeg|jpg|png|gif|pdf|zip|.xlsm|doc|docx|xls|xlsx/;
  const fileExtname = path.extname(file.originalname).toLowerCase();
  const fileMimetype = file.mimetype;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Unsupported file type! " + fileExtname);
  }
};

const uploadMiddleware = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files selected" });
    }

    // const { title, subject } = req.body;

    // if (!title || !subject) {
    //     return res.status(400).json({ error: 'Title and subject are required' });
    // }
    try {
   
      req.ticketFiles = req.files;
      next();
    } catch (error) {
      console.error("Error creating ticket:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
};
const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";
  

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};
// const downloadFile = async (req, res) => {
//   try {
//       const { id } = req.params;

//       // Find the file entry by its ID
//       const ticketFile = await TicketFile.findByPk(id);

//       if (!ticketFile) {
//           return res.status(404).json({ error: 'File not found' });
//       }

//       // Get the file path
//       const filePath = path.resolve(ticketFile.filePath);

//       // Send the file
//       res.download(filePath, (err) => {
//           if (err) {
//               console.error('Error downloading file:', err);
//               return res.status(500).json({ error: 'Internal server error' });
//           }
//       });
//   } catch (error) {
//       console.error('Error downloading file:', error);
//       res.status(500).json({ error: 'Internal server error' });
//   }
// };

module.exports = { upload, uploadMiddleware,download };
