import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import baseUrl from "./api/bootApi";
import {
  Container,
  Table,
  Spinner,
  Alert,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import LogoutC from "./LogoutC";
import { toast, ToastContainer } from "react-toastify";

function ViewResult() {
  const location = useLocation();
  const quiz = location.state;
  const [scoreData, setScoreData] = useState([]); // State to hold score data
  const [loading, setLoading] = useState(true); // Start loading as true
  const [error, setError] = useState(null); // Error state
  const [questionCount, setQuestionCount] = useState(0); // State for question count

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when starting the fetch
      setError(null); // Reset error state

      try {
        // Fetch score data
        const scoreResponse = await axios.get(`${baseUrl}/v2/showScore`, {
          params: { quizName: quiz.quizName },
        });

        const parsedData = scoreResponse.data.map((item) => {
          const [userName, score, warning] = item.split(",");
          return {
            userName,
            score: parseInt(score),
            warning: parseInt(warning),
          };
        });

        setScoreData(parsedData); // Store the parsed data

        // Fetch question count
        const countResponse = await axios.get(`${baseUrl}/v2/getCount`, {
          params: { quizName: quiz.quizName },
        });

        setQuestionCount(countResponse.data); // Set question count
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch results."); // Set error message
      } finally {
        setLoading(false); // Ensure loading is set to false after data fetch
      }
    };

    fetchData(); // Call the function to fetch data
  }, [quiz.quizName]); // Dependency array ensures it runs when quizName changes

  // Function to determine cell color based on score and warning
  const getScoreClass = (score) => {
    if (score >= questionCount / 2) {
      return "table-success"; // Green for high scores
    }
    if (score < questionCount / 2) {
      return "table-danger"; // Red for low scores
    }
    return ""; // Default class
  };

  const getWarningClass = (warning) => {
    if (warning > 1) {
      return "table-warning"; // Yellow for warnings
    }
    return ""; // Default class
  };

  // Function to call the API to export results
  const handleExport = () => {
    axios
      .get(`${baseUrl}/v2/excel`, {
        params: { quizName: quiz.quizName },
        responseType: "blob", // Ensure response is treated as a blob
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `Scores_${quiz.quizName}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove(); // Clean up
      })
      .catch((error) => {
        console.error("Error exporting results:", error);
        toast.error("Failed to export results. Try Again!");
      });
  };

  return (
    <Container className="mt-4">
      <h1>Results for {quiz?.quizName}</h1>
      <Row className="align-items-center">
        <Col>
          <h3>Total Number of Questions: {questionCount}</h3>
        </Col>
        <Col className="text-end">
          <Button
            variant="primary"
            onClick={handleExport}
            className="mt-3 btn-lg"
          >
            Export Result To Excel
          </Button>
        </Col>
      </Row>
      {/* Display question count */}
      {loading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {error && <Alert variant="danger">{error}</Alert>}
      {scoreData.length > 0 ? (
        <>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Score</th>
                <th>Warning</th>
              </tr>
            </thead>
            <tbody>
              {scoreData.map((score, index) => (
                <tr key={index}>
                  <td>{score.userName}</td>
                  <td className={getScoreClass(score.score)}>{score.score}</td>
                  <td className={getWarningClass(score.warning)}>
                    {score.warning}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        !loading && <Alert variant="info">No score data available.</Alert>
      )}
      <LogoutC />
      <ToastContainer />
    </Container>
  );
}

export default ViewResult;
