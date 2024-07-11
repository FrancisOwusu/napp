const multer = require("multer");
const path = require("path");
const maxSize = 1000000000; //2 * 1024 * 1024;
//set up storage engine using multar
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

//Initialized upload
const upload = multer({
  storage: storage,
  limits: { fileSize: maxSize }, //Limit size to 10MB  10000000
  fileFilter:function(req,file,cb){
    checkFileType(file,cb)
  }
}).any()
// single("file"); // 'myFiles' is the field name, allowing up to 10 files

//check file type
const checkFileType = (file, cb) => {
  const filetypes = /jpeg|jpg|png|gif|pdf|zip|xlsm|doc|docx|xls|xlsx/;
  const fileExtname = path.extname(file.originalname).toLowerCase();
  const fileMimetype = file.mimetype;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Unsupported file type!" +fileExtname);
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
      // Create ticket
      const newTicket = await Ticket.create({ title, subject });

      // Create ticket files
      // const ticketFiles = req.files.map(file => ({
      //     filePath: file.path,
      //     ticketId: newTicket.id
      // }));

      // await TicketFile.bulkCreate(ticketFiles);

      // Attach ticket and files to request object
      // req.ticket = newTicket;
      // req.ticketFiles = ticketFiles;
      req.ticketFiles = req.files;
      next();
    } catch (error) {
      console.error("Error creating ticket:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
};
module.exports = { upload, uploadMiddleware };
