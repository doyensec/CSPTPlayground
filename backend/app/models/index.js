const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.notes = require("./note.js")(mongoose);
db.users = require("./user.js")(mongoose);
db.files = require("./file.js")(mongoose);

module.exports = db;