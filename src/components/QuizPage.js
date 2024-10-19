import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import baseUrl from "./api/bootApi";
import LogoutC from "./LogoutC";

const QuizPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const quizName = location.state;
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [quizTimer, setQuizTimer] = useState(0);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [warningCount, setWarningCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const scoreUpdatedRef = useRef(false); // Using a ref to track score updates

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${baseUrl}/v2/getQuizDetails`, {
          params: { quizName },
        });
        setQuestions(response.data);
        if (response.data.length > 0) {
          setQuizTimer(response.data[0].quizTimer * 60);
          setIsQuizActive(true);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [quizName]);

  useEffect(() => {
    let timer;
    if (isQuizActive && quizTimer > 0) {
      timer = setInterval(() => {
        setQuizTimer((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            endQuiz("timer");
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isQuizActive, quizTimer]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setWarningCount((prevCount) => prevCount + 1);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveAnswerToServer(currentQuestion.id, selectedOption, quizName);
    setSubmitted(true);
    handleNextQuestion();
  };

  const saveAnswerToServer = (id, answer, quizName) => {
    return axios.post(`${baseUrl}/v2/saveStudentAnswer`, {
      id,
      answer,
      quizName,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSubmitted(false);
      setSelectedOption(null);
    } else {
      endQuiz("completed");
    }
  };

  const endQuiz = (reason) => {
    setIsQuizActive(false);
    setQuizCompleted(true);
    // Update score only once based on the quiz end reason
    if (!scoreUpdatedRef.current) {
      updateScore(quizName, warningCount);
      scoreUpdatedRef.current = true; // Set the ref to true
    }
    setShowModal(true);
    setTimeout(() => {
      navigate("/login", {
        state: { message: "Thanks for attempting the quiz!" },
        replace: true,
      });
    }, 3500);
  };

  const updateScore = (quizName, warning) => {
    const params = new URLSearchParams();
    params.append("quizName", quizName);
    params.append("warning", warning);
    axios.post(`${baseUrl}/v2/updateScore`, params).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  if (questions.length === 0) {
    return <div className="text-center">Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">{quizName}</h1>
      <h2 className="text-center mb-4">Time Remaining: {quizTimer} seconds</h2>
      <form onSubmit={handleSubmit} className="card p-4">
        <div className="card-body">
          <h2 className="card-title">Question: {currentQuestion.ques}</h2>
          <p>Choose one of the options below:</p>
          {[
            currentQuestion.optionA,
            currentQuestion.optionB,
            currentQuestion.optionC,
            currentQuestion.optionD,
          ].map((option, index) => (
            <div className="form-check" key={index}>
              <input
                type="radio"
                className="form-check-input"
                id={`option${index}`}
                name="options"
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
              />
              <label className="form-check-label" htmlFor={`option${index}`}>
                {option}
              </label>
            </div>
          ))}
          <button
            type="submit"
            className="btn btn-primary mt-3"
            disabled={!selectedOption}
          >
            Submit
          </button>
        </div>
      </form>
      {submitted && (
        <div className="mt-3">
          {currentQuestionIndex < questions.length - 1 ? (
            <button className="btn btn-secondary" onClick={handleNextQuestion}>
              Next Question
            </button>
          ) : (
            quizCompleted &&
            showModal && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h4>Thank you for attempting the quiz!</h4>
                  <p>You will be redirected to the login page shortly.</p>
                </div>
              </div>
            )
          )}
        </div>
      )}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Thank you for attempting the quiz!</h4>
            <p>You will be redirected to the login page shortly.</p>
          </div>
        </div>
      )}
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default QuizPage;
