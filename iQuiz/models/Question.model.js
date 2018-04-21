const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Question = new Schema({
  question_no: {
     type: Number
  },
  question_text: {
    type: String
  },
  options: {
		option_1: {
      type: String
    },
    option_2: {
      type: String
    },
    option_3: {
      type: String
    },
    option_4: {
      type: String
    }
	}
},{
    collection: 'questions'
});

module.exports = mongoose.model('Question', Question);
