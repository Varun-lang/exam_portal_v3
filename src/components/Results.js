import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card"; // Import Card from react-bootstrap
import baseUrl from "./api/bootApi";
import { useNavigate } from "react-router";

function Results() {
  const [quizNames, setQuizNames] = useState([]); // State to hold quiz names
  const navigate = useNavigate();

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

  function showRes(quizName) {
    navigate("/ViewResult", { state: { quizName } });
  }

  return (
    <div>
      <h4 className="text-center" style={{ color: "Green" }}>
        Select a Quiz to View Result:
      </h4>
      <br></br>
      <div className="d-flex flex-wrap">
        {/* Container for cards */}
        {quizNames.map((quizName, index) => (
          <div
            key={index}
            className="m-2"
            style={{ cursor: "pointer" }}
            onClick={() => showRes(quizName)}
          >
            <Card style={{ width: "10rem" }}>
              <Card.Body>
                <Card.Title style={{ color: "Brown" }}>{quizName}</Card.Title>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Results;
