import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Card,
  CardBody,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import VerifyQuiz from "./VerifyQuiz";
import Timer from "./Timer";
import Results from "./Results";
import Panel from "./Panel";
import ManageUser from "./ManageUser";
import baseUrl from "./api/bootApi";
import axios from "axios";
import LogoutC from "./LogoutC";

function Admin() {
  const [componentToShow, setComponentToShow] = useState(null);
  const [role, setRole] = useState(""); // State for user role

  useEffect(() => {
    getRole();
  }, []);

  function ShowComp(component) {
    setComponentToShow(component);
  }

  function getRole() {
    axios.get(`${baseUrl}/v2/getloggedRole`).then((response) => {
      setRole(response.data); // Assuming the response contains the role
    });
  }

  const renderComponent = () => {
    switch (componentToShow) {
      case "CQ":
        return <VerifyQuiz />;
      case "AT":
        return <Timer />;
      case "SR":
        return <Results />;
      case "MU":
        return <ManageUser role={role} />;
      default:
        return <Panel />;
    }
  };

  return (
    <Container className="mt-4">
      <h3
        className="text-center mb-4"
        style={{
          fontFamily: "Monotype Corsiva, cursive",
          fontWeight: "bold",
          fontSize: "2.3rem",
        }}
      >
        Welcome to the Admin Dashboard
      </h3>
      <Row>
        <Col md={3}>
          <ListGroup>
            <Button
              color="primary"
              className="list-group-item list-group-item-action mb-2"
              onClick={() => ShowComp("CQ")}
            >
              Create Quiz
            </Button>
            <Button
              color="success"
              className="list-group-item list-group-item-action mb-2"
              onClick={() => ShowComp("AT")}
            >
              Add Timer
            </Button>
            <Button
              color="info"
              className="list-group-item list-group-item-action mb-2"
              onClick={() => ShowComp("SR")}
            >
              Show Results
            </Button>
            <Button
              color="warning"
              className="list-group-item list-group-item-action mb-2"
              onClick={() => ShowComp("MU")}
            >
              Manage User
            </Button>
          </ListGroup>
        </Col>
        <Col md={9}>
          <Card className="mt-3 shadow bg-light">
            <CardBody>{renderComponent()}</CardBody>
          </Card>
        </Col>
      </Row>
      <LogoutC />
    </Container>
  );
}

export default Admin;
