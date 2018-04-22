const express = require('express');
const app = express();
const QuestionRouter = express.Router();
const Question = require('../models/Question.model');
var ServerController = require('../server');
var QuizController = require('../controllers/QuizController');

QuestionRouter.route('/').get(function (req, res) {
   Question.find(function (err, questions){
      if(err){
        console.log(err);
      }
      else {
        console.log(questions);
        req.session.questions=questions;
        req.session.correct=0;
        req.session.answers=[];
        res.render('question1', {questions: questions});
      }
    });
});

QuestionRouter.route('/question2').get(function (req, res) {
   Question.find(function (err, questions){
      if(err){
        console.log(err);
      }
      else {
        res.render('question2', {questions: questions});
      }
    });
});

QuestionRouter.route('/result1').get(function (req, res) {
    	console.log('result1 parameters: ',req.query);
        res.render('result1',{selected_option: req.query.selected_option});
});

//QuestionRouter.post('/record_selected_option', ServerController.selectedOption);
//app.post('/recordSelectedOption', QuizController.selectedOption);
// QuestionRouter.route('/recordSelectedOption').post(function(req,res){
//   console.log("in selected option post");
//   QuizController.selectedOption;
// });


 module.exports = QuestionRouter;
