import axios from "axios";
import React, { useEffect, useState } from "react";
import baseUrl from "./api/bootApi";
import { Container, Card, Row, Col, Button, Input } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Timer() {
  const [quizNames, setQuizNames] = useState([]);
  const [timerValues, setTimerValues] = useState({});

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

  const handleInputChange = (quizName, value) => {
    setTimerValues((prevValues) => ({
      ...prevValues,
      [quizName]: value,
    }));
  };

  const handleSubmit = (quizName) => {
    const timerValue = timerValues[quizName];
    postDataToServer(quizName, timerValue);
  };

  function postDataToServer(quizName, timerValue) {
    const params = new URLSearchParams();
    params.append("quizName", quizName);
    params.append("time", timerValue);
    if (timerValue < 1) {
      alert("Timer should be greater than 0");
    } else {
      axios.post(`${baseUrl}/v2/addTimer`, params).then(
        (response) => {
          alert("Value Updated Successfully");
          // Reset the timer value after successful submission
          setTimerValues((prevValues) => ({
            ...prevValues,
            [quizName]: "", // Reset the input for the specific quiz
          }));
        },
        (error) => {
          alert("Some error occurred");
        }
      );
    }
  }

  return (
    <Container className="mt-4">
      <h3 className="text-center mb-4" style={{ fontFamily: "Arial, cursive" }}>
        Set Timer for Quiz
      </h3>
      <Row>
        {quizNames.map((quizName) => (
          <Col xs={6} md={4} lg={3} key={quizName} className="mb-3">
            <Card
              className="shadow-sm"
              style={{ padding: "15px", textAlign: "center" }}
            >
              <span className="font-weight-bold">{quizName}</span>
              <Input
                type="number"
                placeholder="Minutes"
                value={timerValues[quizName] || ""} // Controlled input
                onChange={(e) => handleInputChange(quizName, e.target.value)}
                className="my-2"
                style={{ borderRadius: "0.5rem" }}
              />
              <Button
                color="primary"
                onClick={() => handleSubmit(quizName)}
                className="w-100 rounded-pill"
              >
                Submit
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Timer;
