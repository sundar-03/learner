
import '../assets/style.css';
import { useNavigate } from "react-router-dom";

function MenuComponent()
{
    let navigate = useNavigate(); 
    const play = (e) => 
        {
            navigate('/play');
        }

    const addQuestion = (e) => 
        {
            navigate('/addQuestion');
        }
    
        return (
        <div className='menu'>
                    <div>
                        <h1>
                            <i>
                                <b>
                                    LEARNER GAME
                                </b>
                            </i>
                        </h1>
                    </div>

                    <div>
                        <div>
                            <button onClick={play}>
                                Play
                            </button>
                        </div>
                        <br />
                        <div>
                            <button onClick={addQuestion}>
                                Add Question
                            </button>
                        </div>
                        <br />
                    </div>
                </div>
    )
}

export default MenuComponent