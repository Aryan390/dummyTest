const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
});

const Faculty = mongoose.model('Faculty', facultySchema);

module.exports = Faculty;
