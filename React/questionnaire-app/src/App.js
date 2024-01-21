import React, { useState, useEffect } from 'react';
import Results from './Result';
import './App.css';


const questions = [
  "What’s your preferred method of transportation and how often do you use it?",
  "How many times do you travel by airplane per year?",
  "Do you compost?",
  "How often do you recycle?",
  "What is your diet?"
];

const transportationModes = [
  "Combustion Engine Vehicle",
  "Electric Powered Car",
  "Public Transport",
  "Bicycle"
];

const numAirplane = [
  "0",
  "1",
  "2",
  "3",
  "4 or more"
]

const radioCompost = [
  "Yes",
  "No"
]

const radioDiet = [
  "Vegan",
  "Vegeterian",
  "Other diet"
]

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentTransportMode, setCurrentTransportMode] = useState('');
  const [currentSliderValue, setCurrentSliderValue] = useState('0.5');
  const [currentTextInput, setCurrentTextInput] = useState('');
  const [answers, setAnswers] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [processedResults, setProcessedResults] = useState(null);
  const [animateLeft, setAnimateLeft] = useState(false);

  useEffect(() => {
    const storedAnswers = localStorage.getItem('answers');
    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers));
    }
    if (storedAnswers.length > 4) {
      setCompleted(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('answers', JSON.stringify(answers));
  }, [answers]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let answer = currentTextInput;
    const updatedAnswers = [...answers, answer];
    setAnswers(updatedAnswers);

    // Convert the updatedAnswers array to a JSON string
    const answersJson = JSON.stringify(updatedAnswers);

    // Save the JSON string to local storage
    localStorage.setItem('answers', answersJson);

    // Send the JSON string to the backend
    try {
        const response = await fetch('http://localhost:8000/submit_answers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ answers: answersJson }) // Sending JSON string as a property of an object
        });

        if (response.ok) {
            const processedResults = await response.json();
            setProcessedResults(processedResults); // Assuming you want to do something with the processed results
            setCompleted(true); // Assuming you want to set some state to indicate completion
          } else {
            // Handle errors, if the response is not okay
            console.error('Server responded with status:', response.status);
        }
    } catch (error) {
        console.error('Error with submission:', error);
    }
};


  const handleNext = () => {
    let answer;
    setAnimateLeft(false);
    if (currentQuestionIndex === 0) {
      answer = `${currentTransportMode}, ${currentSliderValue}`;
    } 
    else if (currentQuestionIndex === 3) {
      answer = currentSliderValue;
    } else {
      answer = currentTextInput;
    }
  
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = answer;
    setAnswers(updatedAnswers);
  
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentTextInput('');
      setCurrentSliderValue('0.5'); // Reset slider for the next use if needed
    } else {
      console.log(updatedAnswers);
    }
  };

  const handleTextInputChange = (e) => {
    setCurrentTextInput(e.target.value);
  };

  const handleTransportChange = (e) => {
    setCurrentTransportMode(e.target.value);
  };

  const handleSliderChange = (e) => {
    setCurrentSliderValue(e.target.value);
  };

  if (completed) {
    return <Results processedResults={processedResults} />;
  }

  return (
      
    <div>
      <header className="header">
        <img src="/realLogo.png" className="logo-left" />
        <h1>Montreal Environmental Purity Score</h1>
        <img src="/realLogo.png" className="logo-right" />
      </header>
      <div className="separator"></div>
      <div className='About'>
        <section className="website-description">
        <div className="text-container">
          <h2>About</h2>
          <p>
            Welcome to the Montreal Environmental Purity Score (MEPS) website. This platform aims to gather information about your environmental habits to assess your environmental impact. Your responses to the following questions will help us calculate your environmental purity score.
          </p>
          </div>
          <div className="image-container">
          <h3>This could be <br></br>YOU</h3>
          <img src="/logo.png" className=""/>
          </div>
        </section>
      </div>
      <div className='Invitation'>
        <section className="website-invitation">
          <h2>Answer questions to learn about your eco-rank</h2>
        </section>
      </div>
      <div className="App">
      <section className="questionnaire">
      <h1>{questions[currentQuestionIndex]}</h1>
      {currentQuestionIndex === 0 ? (
        <div>
          <div className="radio-group">
            {transportationModes.map((mode, index) => (
              <label key={index}>
                <input
                  type="radio"
                  value={mode}
                  checked={currentTransportMode === mode}
                  onChange={handleTransportChange}
                />
                {mode}
              </label>
            ))}
          </div>
          <div className="slider-container">
            <div className="labels">
              <span>Rarely</span>
              <span>Moderate</span>
              <span>Often</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={currentSliderValue}
              onChange={handleSliderChange}
            />
          </div>
        </div>
      ) : currentQuestionIndex === 1 ? (
        <div className="radio-group">
          {numAirplane.map((option, index) => (
            <label key={index}>
              <input
                type="radio"
                value={option}
                checked={currentTextInput === option}
                onChange={handleTextInputChange}
              />
              {option}
            </label>
          ))}
        </div>
      ) : currentQuestionIndex === 2 ? (
        <div className="radio-group">
          {radioCompost.map((option, index) => (
            <label key={index}>
              <input
                type="radio"
                value={option}
                checked={currentTextInput === option}
                onChange={handleTextInputChange}
              />
              {option}
            </label>
          ))}
        </div>
      ) : currentQuestionIndex === 3 ? (
        <div className="slider-container">
          <div className="labels">
            <span>Rarely</span>
            <span>Moderate</span>
            <span>Often</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={currentSliderValue}
            onChange={handleSliderChange}
          />
        </div>
      ) : currentQuestionIndex === 4 ? (
        <div className="radio-group">
          {radioDiet.map((option, index) => (
            <label key={index}>
            <input
              type="radio"
              value={option}
              checked={currentTextInput === option}
              onChange={handleTextInputChange}
            />
            {option}
            </label>
          ))}
        </div>
      ) : (
        <input
          type="text"
          value={currentTextInput}
          onChange={handleTextInputChange}
        />
      )}
<button onClick={currentQuestionIndex === questions.length - 1 ? handleSubmit : handleNext}>
        {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
      </button>
      </section>
      <div className="center-button">
        <button onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default App;
