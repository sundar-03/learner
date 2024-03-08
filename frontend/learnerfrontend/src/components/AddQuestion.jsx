import { useNavigate } from "react-router-dom";
import { useState } from "react";
import '../assets/style.css';
import axios from "axios";

function AddQuestion()
{
    let navigate = useNavigate(); 
    const returnToHome = (e) => 
        {
            navigate('/');
        }
    const [questionData, changeQuestionData] = useState("")
    const [answerData, changeAnswerData] = useState("")
    const [explanationData, changeExplanationData] = useState("") 
    const [displayStatus, changeDisplayState] = useState(false)
    const [displayMessage, changeDisplayMessage] = useState()
    
    
    const inputAnswerChange = (e) => {
        changeAnswerData(e.target.value)
    }
    
    const inputQuestionChange = (e) => {
        changeQuestionData(e.target.value)
    }

    const inputExplanationChange = (e) => {
        changeExplanationData(e.target.value)
    }

    const submission = (e) =>
    {
        // make a post request with data. if it can be created, alert created successfully
        axios.post("http://localhost:8080/addQuestion", {
            "id": 2,
            "answer": answerData,
            "question": questionData,
             "explanation": explanationData
            }).then((response) => 
            { 
                changeDisplayState(true)
                changeDisplayMessage("Question added successfully")
                changeAnswerData("")
                changeExplanationData("")
                changeQuestionData("")
            }).catch(
                (error) => {
                    changeDisplayState(true)
                    changeDisplayMessage("Question failed to be added.")
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
            <div className="fieldContainer">
            <div className="inputField">
                            Question
                            <input type="text" onChange={inputQuestionChange} className="inputTag" value={questionData}/>        
                    </div>  
             <div className="inputField">
                            Explanation
                            <input type="text" onChange={inputExplanationChange} className="inputTag" value={explanationData}/>        
                    </div>  
            <div className="inputField">
                    Answer
                    <input type="text" onChange={inputAnswerChange} className="inputTag" value={answerData}/>        
            </div>  
            </div>
            
             <br />
             <button onClick={submission}>
                Submit
             </button>
             {
                    displayStatus === true &&
                    <div >
                            <br />
                            <br />
                            Status: {displayMessage}   
                    </div>
                }
            
        </div>
    )
    
}

export default AddQuestion