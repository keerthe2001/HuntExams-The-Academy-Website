import { useState,useEffect } from "react";
import feedbackContext from "./feedbackContext";

const FeedbackState = (props) =>{

  useEffect(() => {
    handleFeedbackget(); 
 }, [])
    const feedbackinitial = [];
    const [feedback, setfeedback] = useState(feedbackinitial);
    const host = "http://localhost:5000";
    const handleFeedbackget = async () =>{
        try{
    const response =  await fetch(`${host}/api/feedback/getfeedback`, {
      method: "GET",
      headers:{
          "Content-Type":"application/json",
          "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setfeedback([json])
}
catch(error) {
    setfeedback(feedbackinitial)
    console.error('Error fetching notes:', error.message);
  }
  }
    return (
        <feedbackContext.Provider value={{ feedback,handleFeedbackget }}>
          {props.children}
        </feedbackContext.Provider>
      );
}

export default FeedbackState;

