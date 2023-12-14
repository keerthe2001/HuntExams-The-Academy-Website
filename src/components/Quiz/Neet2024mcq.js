import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddQuestionsForm from './AddQuestionsForm';

import './Neet2024mcq.css'; // Import the CSS file

export default function Neet2024mcq() {
  const [questions, setQuestions] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const host = process.env.REACT_APP_API_URL
  const fetchQuestions = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${host}/api/questions/getquestions`);
      const data = await response.json();
      setQuestions(data);
    }

    catch (error) {
      console.error('Error fetching questions:', error);
    }

    finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };
  useEffect(() => {
    // Fetch questions from your API
    setLoading(true)
    fetchQuestions();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []); // Run once on component mount

  const handleSubjectClick = async (subject) => {
    setSelectedSubject(selectedSubject === subject ? null : subject);
    const subjectname = await subject;
    if (subjectname != null) {
      const subjects = await document.getElementById(`${subjectname}`);
      const subjectsfind = await document.querySelector(`.chapter-list.active`);

      if (subjects != null && subjectsfind == undefined) {
        await subjects.classList.add('active');
      } else if (subjectsfind) {
        await subjects.classList.remove('active');
      }
    }
  };

  const handleShowAnswers = () => {
    setShowAnswers(!showAnswers);
    setShowExplanation(false); // Hide explanation when showing answers
  };

  const handleNextClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  const handleShowScore = () => {
    
    calculateScore();
  };

  const handlePreviousClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleShowExplanation = () => {
    setShowExplanation(!showExplanation);
    setShowAnswers(false); // Hide answers when showing explanation
  };

  const handleOptionClick = (optionIndex) => {

    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestionIndex] = optionIndex;
    setUserAnswers(updatedUserAnswers);
    // Check if the answer is correct and apply color change
    const correctAnswerIndex = questions[currentQuestionIndex].correctAnswerIndex;
    const isCorrect = optionIndex === correctAnswerIndex;
    setSubmitted(true);
    setIsCorrectAnswer(isCorrect);

  };

  const calculateScore = () => {
    setLoading(true);
    let newScore = 0;
    questions.forEach((question, index) => {
      const correctAnswerIndex = question.correctAnswerIndex;
      const userAnswerIndex = userAnswers[index];
      if (correctAnswerIndex === userAnswerIndex) {
        newScore += 4;
      }
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setScore(newScore);
  };

  return (
    <div>
      <h2 className='text-center p-2 bg-dark text-light fw-bold'> NEET 2024 MCQs</h2>
      {loading ? (
        <div className='d-flex justify-content-center align-items-center'>
          <div className="overlay"></div>

          <div className=' mx-auto text-center bg-light rounded shadow' style={{ position: 'absolute', zIndex: 2, top: '30%', left: '42%', width: "200px" }}>

            <img className='absolute' style={{ zIndex: 2 }} src="https://huntexams.000webhostapp.com/live-previews/images/logoloading2.gif" alt="Loading" />

            <div style={{ zIndex: 2 }} className='text-center fw-bold pb-2'>Hunting..</div>
          </div>
        </div>
      ) : ('')}

      <div className='container-fluid'>
        <div className='row'>
          {/* Sidebar */}
          <div className='col-md-3 bg-light col-sm-12'>
          <div className='bg-dark text-dark shadow p-2 rounded'>
              <h2 className='text-center bg-dark text-light'>SUBJECT</h2>
              <ul className='chapter-container'>
                <li>
                  <div className='subject' onClick={() => handleSubjectClick('physics')}>
                    Physics
                  </div>
                  {selectedSubject === 'physics' && (
                    <ul className='chapter-list' id='physics'>
                      <li className='p-2 m-1 shadow'>
                        <Link to='/'>Physics Chapter 1</Link>
                      </li>
                      <li className='p-2 m-1 shadow'>
                        <Link to='/'>Physics Chapter 2</Link>
                      </li>
                      {/* Add more physics chapters as needed */}
                    </ul>
                  )}
                </li>
                <li>
                  <div className='subject' onClick={() => handleSubjectClick('chemistry')}>
                    Chemistry
                  </div>
                  {selectedSubject === 'chemistry' && (
                    <ul className='chapter-list' id='chemistry'>
                      <li>
                        <Link to='/'>Chemistry Chapter 1</Link>
                      </li>
                      <li>
                        <Link to='/'>Chemistry Chapter 2</Link>
                      </li>
                      {/* Add more chemistry chapters as needed */}
                    </ul>
                  )}
                </li>
                <li>
                  <div className='subject' onClick={() => handleSubjectClick('biology')}>
                    Biology
                  </div>
                  {selectedSubject === 'biology' && (
                    <ul className='chapter-list' id='biology'>
                      <li>
                        <Link to='/'>Biology Chapter 1</Link>
                      </li>
                      <li>
                        <Link to='/'>Biology Chapter 2</Link>
                      </li>
                      {/* Add more biology chapters as needed */}
                    </ul>
                  )}
                </li>
              </ul>
            </div>
          </div>

          {/* Main Container */}
          <div className='col-md-6 col-sm-12'>
            {questions.length > 0 && (
              <div className=' bg-dark text-light p-2 rounded mcqcontainer shadow'>
                <div className='mcqheader rounded'>
                  <div className='mcqquestions rounded p-2 fw-font bg-dark text-light'>
                    <span>{currentQuestionIndex + 1}.</span> {questions[currentQuestionIndex].question}
                  </div>
                  <div className='mcqoptions rounded p-2'>
                    {questions[currentQuestionIndex].options.map((option, optionIndex) => {
                      const isSelected = userAnswers[currentQuestionIndex] === optionIndex;
                      const isCorrect = (showAnswers && optionIndex === questions[currentQuestionIndex].correctAnswerIndex) || (isSelected && optionIndex === questions[currentQuestionIndex].correctAnswerIndex);
                      const isWrong = isSelected && !isCorrect;
                      return (
                        <div
                          key={optionIndex}
                          className={`options  p-2 bg-light shadow text-dark rounded ${isSelected ? 'selected' : ''
                            } ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
                          onClick={() => handleOptionClick(optionIndex)}
                        >
                          {optionIndex + 1}) {option}
                        </div>
                      );
                    })}
                  </div>

                </div>
                {/* Show Answers and Explanation for each individual question */}
                <div className='mcqfooter text-center'>
                  <button className='btn btn-primary m-1' onClick={handlePreviousClick} disabled={currentQuestionIndex === 0}>
                    Previous
                  </button>
                  <button className='btn btn-success m-1' onClick={handleShowAnswers}>
                    Show Answer
                  </button>
                  <button className='btn btn-success m-1' onClick={handleShowExplanation}>
                    Show Explanation
                  </button>
                  <button
                    className='btn btn-primary m-1'
                    onClick={handleNextClick}
                    disabled={currentQuestionIndex === questions.length - 1}
                  >
                    Next
                  </button>
                  <button
                    className='btn btn-primary m-1'
                    onClick={handleShowScore}
                    
                  >
                    Show Score
                  </button>
                  {showAnswers && (
                    <div className='answers-container p-4 shadow m-3'>
                      <h3 className='fw-bold'>Solution:</h3>
                      <p>
                        Answer: {questions[currentQuestionIndex].options[questions[currentQuestionIndex].correctAnswerIndex]}
                      </p>
                    </div>
                  )}
                  {showExplanation && (
                    <div className='explanation-container p-2 m-3'>
                      <h3>Video Explanation:</h3>
                      {/* Add video player or any content for explanation */}
                    </div>
                  )}

                </div>
              </div>

            )}
          </div>
          {/* Sidebar */}
          <div className='col-md-3 bg-light col-sm-12'>
            <div className='bg-dark text-center text-light rounded shadow p-1'>
              <h2>Your Score</h2>
              <ul className='chapter-container'>
                <li>
                  {<div className='score-container fw-bold'>Your Score: {score}/{questions.length*4}</div>}
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div >
  );
}
