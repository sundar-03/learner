package com.learner.learnerBackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "crosswordinfo")
public class Question {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "Question")
	private String question;

	@Column(name = "Answer")
	private String answer;
	
	@Column(name = "Explanation")
	private String explanation;
	
	public Question() {
		
	}
	
	public Question(long id, String question, String answer, String explanation) {
		super();
		this.answer = answer;
		this.id = id;
		this.question = question;
		this.explanation = explanation;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public String getExplanation() {
		return explanation;
	}

	public void setExplanation(String explanation) {
		this.explanation = explanation;
	}
	
	
}