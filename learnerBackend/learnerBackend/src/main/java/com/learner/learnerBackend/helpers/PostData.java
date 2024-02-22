package com.learner.learnerBackend.helpers;

public class PostData {

	private String id;
	private String status;
	
	public PostData(String id, String status) {
		super();
		this.id = id;
		this.status = status;
	}

	public String getId() {
		return id;
	}

	public String getStatus() {
		return status;
	}	
	
}
