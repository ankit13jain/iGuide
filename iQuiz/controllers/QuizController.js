exports.selectedOption1 = function(req,res){
	correct_ans = req.session.questions[0].question_answer;
	selected_ans = req.body.question_selected;
	if(selected_ans == correct_ans)
		req.session.correct = req.session.correct +1;
	req.session.answers.push([correct_ans,selected_ans]);
	console.log("req.session.answers"+req.session.answers[0]);
	console.log("req.session.correct",req.session.correct);
	res.send("selection saved successfully");
}

exports.selectedOption2 = function(req,res){
	correct_ans = req.session.questions[0].question_answer;
	selected_ans = req.body.question_selected;
	if(selected_ans == correct_ans)
		req.session.correct = req.session.correct +1;
	req.session.answers.push([correct_ans,selected_ans]);
	console.log("req.session.answers"+req.session.answers[0]);
	console.log("req.session.correct",req.session.correct);
	res.send("selection saved successfully");
}

exports.selectedOption3 = function(req,res){
	correct_ans = req.session.questions[0].question_answer;
	selected_ans = req.body.question_selected;
	if(selected_ans == correct_ans)
		req.session.correct = req.session.correct +1;
	req.session.answers.push([correct_ans,selected_ans]);
	console.log("req.session.answers"+req.session.answers[0]);
	console.log("req.session.correct",req.session.correct);
	data={};
	data["answers"]=req.session.answers;
	data["accuracy"]=req.session.correct*100/req.session.answers.length;
	console.log("data",data);
	res.setHeader('Content-Type', 'application/json');
	res.send(data);
}
