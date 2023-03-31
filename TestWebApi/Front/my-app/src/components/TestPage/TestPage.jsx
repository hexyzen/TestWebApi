import React, { useState, useEffect } from "react";
import { GetTestById } from "../../ConstantRepository/api/TestApi";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ConstantsList from "../../ConstantRepository/ConstantsList";
import {
  Typography,
  Button,
  CircularProgress,
  Box,
  Paper,
} from "@material-ui/core";

function TestPage() {
  const [test, setTest] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(-1);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const { testId } = useParams();

  useEffect(() => {
    GetTestById(testId)
      .then((response) => response.json())
      .then((data) => setTest(data));
  }, []);

  function handleProceedClick() {
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(-1);
    setShowResults(false);
    setScore(0);
    navigate(`/${ConstantsList.ROUTE_MAIN_PAGE}`);
  }

  function handleAnswerClick(answerIndex) {
    setSelectedAnswerIndex(answerIndex);
  }

  function handleNextQuestionClick() {
    const currentQuestion = test.questions[currentQuestionIndex];
    const selectedAnswer = currentQuestion.answers[selectedAnswerIndex];
    if (selectedAnswer.isCorrect) {
      setScore(score + 1);
    }
    if (currentQuestionIndex === test.questions.length - 1) {
      setShowResults(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswerIndex(-1);
    }
  }

  if (!test) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  const currentQuestion = test.questions[currentQuestionIndex];
  const answerButtons = currentQuestion.answers.map((answer, index) => (
    <Button
      key={index}
      variant="outlined"
      onClick={() => handleAnswerClick(index)}
      disabled={selectedAnswerIndex !== -1}
      style={{ margin: "10px" }}
    >
      {answer.text}
    </Button>
  ));

  let content;
  if (showResults) {
    content = (
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5">
          You scored {score} out of {test.questions.length}!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleProceedClick}
          style={{ marginTop: "20px" }}
        >
          Proceed
        </Button>
      </Box>
    );
  } else {
    content = (
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4">{test.testTitle}</Typography>
        <Typography variant="body1">{test.testDescription}</Typography>
        <Typography variant="h5">{currentQuestion.text}</Typography>
        <Box display="flex" flexDirection="row" alignItems="center">
          {" "}
          {answerButtons}
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextQuestionClick}
          disabled={selectedAnswerIndex === -1}
          style={{ marginTop: "20px" }}
        >
          Next
        </Button>
      </Box>
    );
  }

  return <div>{content}</div>;
}

export default TestPage;
