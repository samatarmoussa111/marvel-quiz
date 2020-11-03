import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import { QuizMarvel } from "../QuizMarvel";
import QuizOver from "../QuizOver";
import { FaChevronRight } from "react-icons/fa";
toast.configure();

const Quiz = (props) => {
  const [quizLevel, setQuizLevel] = useState(0);
  const [levelNames, setLevelNames] = useState([
    "debutant",
    "confirme",
    "expert",
  ]);

  const [storedQuestions, setStoredQuestions] = useState(null);
  const [questopts, setQuestopts] = useState({
    question: null,
    options: [],
  });
  const [idQuestion, setIdQuestion] = useState(0);
  const [displayOptions, setDisplayOptions] = useState(null);
  const [score, setScore] = useState(0);
  const [quizEnd, setQuizEnd] = useState(false);
  const [btnAndAnswer, setBtnAndAnswer] = useState({
    btnDisabled: true,
    newAnswer: null,
  });

  const storedDataRef = useRef();

  useEffect(() => {
    if (props.userData.pseudo) {
      toast.warn(`Binevenu ${props.userData.pseudo}, et bonne chance`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }
  }, [props]);

  useEffect(() => {
    const fetchArray = QuizMarvel[0].quizz[levelNames[quizLevel]];
    storedDataRef.current = fetchArray;
    const newArray = fetchArray.map(({ answer, ...item }) => item);
    setStoredQuestions(newArray);
  }, [quizLevel]);

  useEffect(() => {
    if (storedQuestions !== null) {
      setQuestopts({
        question: storedQuestions[idQuestion].question,
        options: storedQuestions[idQuestion].options,
      });
      setBtnAndAnswer({
        btnDisabled: true,
        newAnswer: null,
      });
    }
  }, [storedQuestions, idQuestion]);

  const handleclick = (answer) => {
    setBtnAndAnswer({
      btnDisabled: false,
      newAnswer: answer,
    });
    setDisplayOptions(
      questopts.options.map((option, index) => {
        return (
          <p
            key={index}
            onClick={() => {
              handleclick(option);
            }}
            className={`answerOptions ${option === answer ? "selected" : null}`}
          >
            <FaChevronRight /> {option}
          </p>
        );
      })
    );
  };

  useEffect(() => {
    setDisplayOptions(
      questopts.options.map((option, index) => {
        return (
          <p
            key={index}
            onClick={() => {
              handleclick(option);
            }}
            className="answerOptions"
          >
            <FaChevronRight /> {option}
          </p>
        );
      })
    );
  }, [questopts]);

  const handleChangeQuizLevel = () => {
    setQuizLevel((c) => c + 1);
    setIdQuestion(0);
    setScore(0);
    setQuizEnd(false);
  };

  const handleChangeQuizLevel2 = () => {
    setQuizLevel(0);
    setIdQuestion(0);
    setScore(0);
    setQuizEnd(false);
  };

  const handleChangeQuizLevel3 = () => {
    setIdQuestion(0);
    setScore(0);
    setQuizEnd(false);
  };

  const nextQuestion = () => {
    if (idQuestion === 9) {
      setQuizEnd(true);
    } else {
      setIdQuestion((c) => c + 1);
    }
    const goodAnswer = storedDataRef.current[idQuestion].answer;
    if (goodAnswer === btnAndAnswer.newAnswer) {
      setScore((c) => c + 1);
      toast.success("Bravo +1", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        bodyClassName: "toastify-color",
      });
    } else {
      toast.error("Raté 0", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        bodyClassName: "toastify-color",
      });
    }
  };

  return storedQuestions === null || displayOptions === null ? (
    <>
      <div className="loader"></div>
      <p style={{ color: "#fff" }}>Chargement...</p>
    </>
  ) : quizEnd ? (
    <QuizOver
      quizLevel={quizLevel}
      levelNames={levelNames.length}
      score={score}
      reference={storedDataRef}
      onChangeQuizLevel={handleChangeQuizLevel}
      onChangeQuizLevel2={handleChangeQuizLevel2}
      onChangeQuizLevel3={handleChangeQuizLevel3}
    />
  ) : (
    <>
      <Levels quizLevel={quizLevel} levelNames={levelNames} />
      <ProgressBar idQuestion={idQuestion} />
      <h2>{questopts.question}</h2>
      {displayOptions}
      <button
        onClick={nextQuestion}
        disabled={btnAndAnswer.btnDisabled}
        className="btnSubmit"
      >
        {idQuestion < 9 ? "Suivant" : "Terminer"}
      </button>
    </>
  );
};

export default Quiz;
