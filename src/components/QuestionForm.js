import axios from "axios";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import baseUrl from "./api/bootApi";

const QuestionForm = () => {
  const { quizName } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState("");

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postDataToServer(question, options, correctOption, quizName);
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectOption("");
  };

  const postDataToServer = (question, options, correctOption, quizName) => {
    axios
      .post(`${baseUrl}/v2/QuestionForm`, {
        question,
        options,
        correctOption,
        quizName,
      })
      .then(
        (response) => {
          alert("Saved");
        },
        (error) => {
          alert("Some error occurred");
        }
      );
  };

  const handleExit = () => {
    navigate("/admin"); // Change this to your desired exit route
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Set-up Quiz: {quizName}</h3>
      <form onSubmit={handleSubmit}>
        {/* Question Input */}
        <div className="mb-4">
          <label className="form-label">Question:</label>
          <input
            type="text"
            className="form-control"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>

        {/* Options Inputs */}
        <div className="row mb-4">
          <div className="col">
            <label className="form-label">Option A:</label>
            <input
              type="text"
              className="form-control"
              value={options[0]}
              onChange={(e) => handleOptionChange(0, e.target.value)}
              required
            />
          </div>
          <div className="col">
            <label className="form-label">Option B:</label>
            <input
              type="text"
              className="form-control"
              value={options[1]}
              onChange={(e) => handleOptionChange(1, e.target.value)}
              required
            />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col">
            <label className="form-label">Option C:</label>
            <input
              type="text"
              className="form-control"
              value={options[2]}
              onChange={(e) => handleOptionChange(2, e.target.value)}
              required
            />
          </div>
          <div className="col">
            <label className="form-label">Option D:</label>
            <input
              type="text"
              className="form-control"
              value={options[3]}
              onChange={(e) => handleOptionChange(3, e.target.value)}
              required
            />
          </div>
        </div>

        {/* Correct Option Selection */}
        <div className="mb-4">
          <label className="form-label">Select Correct Option:</label>
          <select
            className="form-select"
            value={correctOption}
            onChange={(e) => setCorrectOption(e.target.value)}
            required
          >
            <option value="">Choose...</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>

        {/* Buttons Row */}
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success">
            Add
          </button>
          <button type="button" className="btn btn-danger" onClick={handleExit}>
            Exit
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;
