package com.learner.learnerBackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.learner.learnerBackend.exception.ResourceNotFoundException;
import com.learner.learnerBackend.model.Question;
import com.learner.learnerBackend.repository.QuestionRepository;
import com.learner.learnerBackend.helpers.DistributedRandomNumberGenerator;

import com.learner.learnerBackend.helpers.PostData;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class CrosswordController {

	private DistributedRandomNumberGenerator rg = new DistributedRandomNumberGenerator(2);
	
    
	@Autowired
	private QuestionRepository questionRepository;
		
	@PostMapping("/updateStatus")
	public ResponseEntity<String> UpdateStatus(@RequestBody PostData data) {
		if(data.getStatus().equals("true"))
		{
			// reduce probability here
			rg.reduceProbability(Integer.parseInt(data.getId()));
		}
		else
		{
			//increase probability here
			rg.increaseProbability(Integer.parseInt(data.getId()));
		}
		return ResponseEntity.ok("Success");
	}
	
	
	// get question by id rest api
	@GetMapping("/question")
	public ResponseEntity<Question> getQuestion() {
		
		long id = (long)rg.getDistributedRandomNumber();
		Question q = questionRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Question not exist with id :" + id));
		return ResponseEntity.ok(q);
	}
	
	@PostMapping("/questionID")
	public ResponseEntity<Question> getQuestionByID(@RequestBody PostData data) {
		
		for(int i = 0; i < 5; i++)
		{
			long id = (long)rg.getDistributedRandomNumber();
			if(id != Long.parseLong(data.getId()))
			{
				Question q = questionRepository.findById(id)
						.orElseThrow(() -> new ResourceNotFoundException("Question not exist with id :" + id));
				return ResponseEntity.ok(q);
			}
		}
		long id = (long)rg.getDistributedRandomNumber();
		Question q = questionRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Question not exist with id :" + id));
		return ResponseEntity.ok(q);
	}
	
	@PostMapping("/addQuestion")
	public Question createEmployee(@RequestBody Question question) {
		question.setId(rg.getNoOfElements() + 1);
		rg.changeDistribution();
		return questionRepository.save(question);
	}
	
}