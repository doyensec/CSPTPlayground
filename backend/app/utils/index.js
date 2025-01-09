const bcrypt = require("bcrypt");

const Users = require('../models/user');
const Notes = require('../models/note');
const Files = require('../models/file');

const initDatabase = () => {
  try {
    // Setup default users

    Users.deleteMany({}).then(() => {
      new Users({ _id: '66fc8c17d29c4a98a44a4a86', username: 'admin', password: bcrypt.hashSync('admin123', 10), role: 'admin' }).save();
      new Users({ _id: '66fc8c17d29c4a98a44a4a87', username: 'member', password: bcrypt.hashSync('member123', 10), role: 'member' }).save();
      console.log('Users created');
    });

    // Setup default notes
    Notes.deleteMany({}).then(() => {
      new Notes({ _id: '66fc8c8b1bcf0dd223467b9f', title: 'Intro', description: 'Multiple CSPTs can be exploited in this app.' }).save();
      new Notes({ _id: '66fc8c8b1bcf0dd223467ba0', title: 'Lorem ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' }).save();
      console.log('Notes created');
    });

    // Setup file needed for gadget
    Files.deleteMany({}).then(() => {
      new Files({ _id: '66fc8d071bcf0dd223467bba', content: '{"_id":"../../../../api/sink/promote/lax_in_extra_param_promote/66fc8c17d29c4a98a44a4a87?","title":"I\'m a File not a Note","description":"We will use this gadget to return a malicious id"}' }).save();
      new Files({ _id: '66fc8d0755cf0db1bcfab29c', content: '{"_id":"../../../../api/sink/promote/body_or_query?id=66fc8c17d29c4a98a44a4a87","title":"I\'m a File not a Note","description":"We will use this gadget to targe the body_or_query endpoint"}' }).save();
      new Files({ _id: '66fc8d0755cf0d5f4cf25ba1', content: '{"_id":"../../../../api/sink/demote/66fc8c17d29c4a98a44a4a86","title":"I\'m a File not a Note","description":"We will use this gadget to target demote the admin"}' }).save();
      new Files({ _id: '66fc8d071bcf0db1bcfab67c', content: '{"_id":"CSPT2XSS","title":"<img src=x onerror=\\"alert(localStorage.getItem(\'token\'))\\" />","description":"<img src=x onerror=\\"alert(localStorage.getItem(\'token\'))\\" />"}' }).save();

      console.log('Files created');
    });
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

module.exports = { initDatabase }

