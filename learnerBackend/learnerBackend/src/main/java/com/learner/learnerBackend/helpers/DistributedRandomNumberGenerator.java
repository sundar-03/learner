package com.learner.learnerBackend.helpers;

import java.util.HashMap;
import java.util.Map;

public class DistributedRandomNumberGenerator {

    private Map<Long, Double> distribution;
    private long noOfElements;
    

    public DistributedRandomNumberGenerator(long n) {
        distribution = new HashMap<>();
        for(long i = 1; i <= n; i++ )
        {
        	distribution.put(i, (double)1/n);
        }
        noOfElements = n;
    }

    public long getNoOfElements()
    {
    	return this.noOfElements;
    }
    
    
    public void reduceProbability(long id) {
    	System.out.println("In reduce probability");
        if(this.distribution.get(id) >= (0.8/this.noOfElements))
    	{
    		Map<Long, Double> temp = new HashMap<>();
    		double reducingFactor = 0.01/this.noOfElements;
            for(long i = 1; i <= this.noOfElements; i++ )
            {
            	if(i == id)
            		temp.put(i, this.distribution.get(i) - reducingFactor);
            	else
            		temp.put(i, this.distribution.get(i) + (reducingFactor/(this.noOfElements - 1)));
            }
            this.distribution = temp;
    	}
        System.out.println(this.distribution);
    }
    
    public void increaseProbability(long id) {
    	System.out.println("In increase probability");
    	if(this.distribution.get(id) <= (1.2/this.noOfElements))
    	{
    		Map<Long, Double> temp = new HashMap<>();
    		double increasingFactor = 0.02/this.noOfElements;
            
            for(long i = 1; i <= this.noOfElements; i++ )
            {
            	if(i == id)
            		temp.put(i, this.distribution.get(i) + increasingFactor);
            	else
            		temp.put(i, this.distribution.get(i) - (increasingFactor/(this.noOfElements - 1)));
            }
            this.distribution = temp;
    	}
    	System.out.println(this.distribution);
    }

    
    public long getDistributedRandomNumber() {
        double rand = Math.random();
        double tempDist = 0;
        for (Long i : this.distribution.keySet()) {
            tempDist += this.distribution.get(i);
            if (rand  <= tempDist) {
                return i;
            }
        }
        return 0;
    }
    
    public void changeDistribution()
    {
    	Map<Long, Double> temp = new HashMap<>();
    	long n = this.noOfElements;
    	double reducingFactor = (double) 1/((n*n) + n);
    	
        for(long i = 1; i <= this.noOfElements; i++ )
        {
        	temp.put(i, this.distribution.get(i) - reducingFactor);
        }
        temp.put(n + 1, (double)1/(n + 1));
        
        this.distribution = temp;
        this.noOfElements = n + 1;
        
        System.out.println(this.distribution);
        
    }

}