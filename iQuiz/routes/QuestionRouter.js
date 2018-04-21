const express = require('express');
const app = express();
const QuestionRouter = express.Router();
const Question = require('../models/Question.model');

QuestionRouter.route('/').get(function (req, res) {
   Question.find(function (err, questions){
      if(err){
        console.log(err);
      }
      else {
        console.log(questions);
        res.render('question1', {questions: questions});
      }
    });
});

QuestionRouter.route('/result1').get(function (req, res) {
    	console.log('result1 parameters: ',req.query);
        res.render('result1',{selected_option: req.query.selected_option});
});

module.exports = QuestionRouter;
