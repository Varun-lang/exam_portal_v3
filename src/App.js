import logo from "./logo.svg";
import "./App.css";
import HomeNav from "./components/NavBar";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./components/Signin";
import Login from "./components/Login";
import Admin from "./components/Admin";
import QuestionForm from "./components/QuestionForm";
import VerifyQuiz from "./components/VerifyQuiz";
import Timer from "./components/Timer";
import StudentHome from "./components/StudentHome";
import QuizPage from "./components/QuizPage";
import ViewResult from "./components/ViewResult";

function App() {
  return (
    <>
      <Router>
        <HomeNav />
        <Routes>
          <Route path="/" Component={Home} exact />
          <Route path="/signin" Component={Signin} exact />
          <Route path="/login" Component={Login} exact />
          <Route path="/admin" Component={Admin} exact />
          <Route path="questionForm/:quizName" Component={QuestionForm} />
          <Route path="/student" Component={StudentHome} exact />
          <Route path="/quiz-page" Component={QuizPage} exact />
          <Route path="/ViewResult" Component={ViewResult} exact />
        </Routes>
      </Router>
    </>
  );
}

export default App;
