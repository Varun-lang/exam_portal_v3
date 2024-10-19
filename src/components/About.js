import React from "react";
import { FaLinkedin } from "react-icons/fa";

const About = () => {
  const features = [
    {
      title: "Create Quiz",
      description: "Easily create and customize your own quizzes.",
    },
    {
      title: "Timers",
      description: "Set timers for each quiz to enhance the challenge.",
    },
    {
      title: "View Results",
      description: "Review your quiz performance and see detailed results.",
    },
    {
      title: "Export Results to Excel",
      description: "Download your results in Excel format for easy sharing.",
    },
    {
      title: "Role-Based Authentication",
      description: "Secure access based on user roles.",
    },
    {
      title: "Secure Anti-Cheating Environment",
      description: "Take quizzes in a secure environment to prevent cheating.",
    },
  ];

  return (
    <div className="about-container d-flex flex-column justify-content-center align-items-center vh-100">
      <div
        className="card shadow"
        style={{ width: "90%", maxWidth: "600px", borderRadius: "10px" }}
      >
        <div className="card-body">
          <h2
            className="card-title text-center mb-4"
            style={{ color: "#343a40" }}
          >
            Developed by Varun Gupta
          </h2>
          <p className="card-text text-center" style={{ color: "#495057" }}>
            Welcome to QuizApp, your go-to platform for testing your knowledge
            and improving your skills! Whether you want to prepare for an exam,
            learn something new, or just have fun, QuizApp has you covered with
            a wide variety of quizzes across different subjects and difficulty
            levels.
          </p>
        </div>
      </div>

      <div className="mt-4 text-center">
        <a
          href="https://www.linkedin.com/in/varun-gupta-dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-link"
        >
          <FaLinkedin size={24} /> LinkedIn Profile
        </a>
      </div>

      <div className="container mt-3">
        <h3 className="text-center mb-2">Features</h3>
        <div className="row">
          {features.map((feature, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{feature.title}</h5>
                  <p className="card-text">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
