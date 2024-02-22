import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";

function PlayComponent()
{
    let navigate = useNavigate(); 
    const [questionMode, changeQuestionState] = useState(true)
    const [answerData, changeAnswerData] = useState("")


    const returnToHome = (e) => 
        {
            navigate('/');
        }
    
    const [questionInfo, changeQuestionInfo] = useState({
        "id" : '',
        "question": '',
        "explanation": '',
        "answer": ''
    })
    
    //equivalent to component did mount
    React.useEffect(() => {
        axios.get("http://13.233.21.79:8080/question").then((response) => {
            const questionData = { "id" : response.data.id,  "question": response.data.question, "explanation": response.data.explanation, "answer": response.data.answer};
            changeQuestionInfo(questionData);
          });
      }, []);

    const check = (e) => {
        changeQuestionState(!questionMode)
        var status = "false"
        if(answerData.toLowerCase() === questionInfo.answer.toLowerCase())
        {
           status = "true"
        }
         // update that answer found correct or not
        axios.post("http://13.233.21.79:8080/updateStatus", {
            "id": questionInfo.id,
            "status": status
            }).then((response) => 
            { 
            }).catch(
                (error) => {
                    if (error.response) { 
                      console.log("Data :" , error.response.data);
                      console.log("Status :" + error.response.status);
                    } else if (error.request) { 
                      console.log(error.request);
                    } else {
                      console.log('Error', error.message);
                    }
                  }
            );
    }

    const next = (e) => {
        changeQuestionState(!questionMode)

        axios.post("http://13.233.21.79:8080/questionID", {
            "id": questionInfo.id,
            "status": "someValue"
            }).then((response) => 
            { 
                const questionData = { "id" : response.data.id,  "question": response.data.question, "explanation": response.data.explanation, "answer": response.data.answer};
                changeQuestionInfo(questionData);
                changeAnswerData("")
            }).catch(
                (error) => {
                    if (error.response) { 
                      console.log("Data :" , error.response.data);
                      console.log("Status :" + error.response.status);
                    } else if (error.request) { 
                      console.log(error.request);
                    } else {
                      console.log('Error', error.message);
                    }
                  }
            );

    }

    const inputChange = (e) => {
        changeAnswerData(e.target.value)
    }

        return (
        <div className="playContainer">
            <div className="heading">
                <div className="appName">
                    LEARNER
                </div>
                <div>
                    <button className="returnButton" onClick={returnToHome}>
                        Home
                    </button>
                </div>
            </div>
            <div className="gameArea">
                <div className="question">
                Question:
                <br />
                {questionInfo.question}
                </div>
                {
                    questionMode === true &&
                    <div>
                        <div className="inputField">
                            Answer
                            <input type="text" onChange={inputChange} className="inputTag" value={answerData}/>        
                    </div>  
                      <div className="checkButton">
                      <button onClick={check}>
                          Check
                      </button> 
                      </div>
                    </div>
                }
              
                
                
                {
                    questionMode === false &&
                    <div>
                        <div className="answer">
                            Answer:
                            < br />
                            {questionInfo.answer}
                        </div>
                        
                        <div className="explanation">
                            Explanation:
                            <br />
                            {questionInfo.explanation}
                        </div>
                        
                        <div className="nextButton">
                            <button onClick={next}>
                                Next
                            </button>
                        </div>
                    </div>
                }
                
            </div>
        </div>
    )
}

export default PlayComponent