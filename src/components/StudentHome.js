import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button, CardBody } from "reactstrap";
import baseUrl from "./api/bootApi";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router";
import LogoutC from "./LogoutC";
import { toast, ToastContainer } from "react-toastify";

function StudentHome() {
  const navigate = useNavigate();
  const [quizNames, setQuizNames] = useState([]);
  const [quizQues, setQuizQues] = useState({});

  useEffect(() => {
    loadQuizNames();
    loadQuizQues();
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

  function loadQuizQues() {
    axios.get(`${baseUrl}/v2/loadQuizQues`).then((response) => {
      setQuizQues(response.data);
    });
  }

  const handleQuizSelect = async (quizName) => {
    let v = await verifySubmission(quizName);
    if (v === true) {
      navigate("/quiz-page", { state: quizName });
    } else {
      toast.warning("You have already attempted this Quiz!!");
    }
  };

  async function verifySubmission(quizName) {
    const response = axios.get(`${baseUrl}/v2/verifySubmission`, {
      params: { quizName },
    });
    return (await response).data;
  }

  return (
    <Container className="mt-4">
      <h3 className="text-center mb-4">Select a Quiz to Attempt</h3>
      <Row>
        {quizNames.map((quizName) => (
          <Col md={4} key={quizName} className="mb-3">
            <Card className="text-center shadow">
              <div className="card-body">
                <h5 className="card-title">{quizName}</h5>
                <CardBody>
                  <p>Number of Questions: {quizQues[quizName] || 0}</p>
                </CardBody>
                <Button
                  color="info"
                  outline
                  onClick={() => handleQuizSelect(quizName)}
                >
                  Start Quiz
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <LogoutC />
      <ToastContainer />
    </Container>
  );
}

export default StudentHome;
