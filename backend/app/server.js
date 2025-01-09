const express = require("express");
const fileUpload = require('express-fileupload');
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const mongoose = require('mongoose');

const { initDatabase } = require('./utils');

const auth = require('./middleware/auth');
const error = require('./middleware/error');

const fileCtrl = require('./controllers/file');
const filePDFCtrl = require('./controllers/filepdf');
const fileImageCtrl = require('./controllers/fileimage');
const userCtrl = require('./controllers/user');
const noteCtrl = require('./controllers/note');
const gadgetCtrl = require('./controllers/gadget');
const staticCtrl = require('./controllers/static');
const sinkCtrl = require('./controllers/sink');

mongoose.connect(process.env.MONGO_URL ? process.env.MONGO_URL : 'mongodb://localhost:27017/csptplayground_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to the database!");

  console.log("Database initialization...");
  initDatabase();
})
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

mongoose.Promise = global.Promise;
mongoose.set('sanitizeFilter', true);

const app = express();

app.use(cors({ origin: '*' }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(mongoSanitize());

app.use(fileUpload());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Damn Vulnerable CSPT application." });
});


var router = express.Router();

app.set('etag', false);

app.use(auth.verifyToken);

app.use('/api', router);
app.use('/api/v1', noteCtrl);
app.use('/api/v1', userCtrl);
app.use('/api/gadget', gadgetCtrl);
app.use('/api/gadget', fileCtrl);
app.use('/api/gadget', filePDFCtrl);
app.use('/api/gadget', fileImageCtrl);
app.use('/api/', staticCtrl);
app.use('/api/', sinkCtrl);

app.use(error.errorHandler);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


