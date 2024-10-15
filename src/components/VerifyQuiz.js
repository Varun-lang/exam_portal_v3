import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card"; // Import Card from react-bootstrap
import baseUrl from "./api/bootApi";
import { useNavigate } from "react-router";

function VerifyQuiz() {
  const navigate = useNavigate();
  const [quizNames, setQuizNames] = useState([]); // State to hold quiz names
  const [inputQuizName, setInputQuizName] = useState(""); // State for input value

  useEffect(() => {
    loadQuizNames();
  }, []);

  function loadQuizNames() {
    axios.get(`${baseUrl}/v2/getQuizName`).then(
      (response) => {
        setQuizNames(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  function checkQuizName() {
    const normalizedInputQuizName = inputQuizName.trim().toLowerCase();

    if (normalizedInputQuizName === "") {
      alert("Quiz Name can't be empty!");
    } else {
      // Normalize quizNames for comparison
      const normalizedQuizNames = quizNames.map((name) =>
        name.trim().toLowerCase()
      );

      if (normalizedQuizNames.includes(normalizedInputQuizName)) {
        alert("This quiz already exists. Please choose a different name.");
      } else {
        // Call createQuiz with quizName in props
        navigate(`/questionForm/${inputQuizName}`);
      }
    }
  }

  return (
    <div>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Enter a Unique Quiz Name"
          aria-describedby="basic-addon2"
          value={inputQuizName}
          onChange={(e) => setInputQuizName(e.target.value)} // Update input value
        />
        <Button
          variant="outline-primary"
          id="button-addon2"
          onClick={checkQuizName}
        >
          Next
        </Button>
      </InputGroup>
      <br></br>
      <h4 className="text-center">
        <u>List of Active Quizes:</u>
      </h4>
      <div className="d-flex flex-wrap">
        {/* Container for cards */}
        {quizNames.map((quizName, index) => (
          <Card key={index} className="m-2" style={{ width: "10rem" }}>
            <Card.Body>
              <Card.Title style={{ color: "Green" }}>{quizName}</Card.Title>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default VerifyQuiz;
