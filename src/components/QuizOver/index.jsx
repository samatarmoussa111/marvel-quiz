import React, { useEffect, useState } from "react";
import { GiTrophyCup } from "react-icons/gi";

const QuizOver = (props) => {
  const {
    quizLevel,
    levelNames,
    score,
    onChangeQuizLevel,
    onChangeQuizLevel2,
    onChangeQuizLevel3,
  } = props;
  const [asked, setAsked] = useState([]);
  useEffect(() => {
    setAsked(props.reference.current);
  }, [props]);

  const handleClick = () => {
    onChangeQuizLevel();
  };
  const handleClick2 = () => {
    onChangeQuizLevel2();
  };

  if (score < 5) {
    setTimeout(() => {
      onChangeQuizLevel3();
    }, 4000);
  }

  const decision =
    score >= 5 ? (
      <>
        <div className="stepsBtnContainer">
          {quizLevel < levelNames - 1 ? (
            <>
              <p className="successMsg">Bravo, Passez au niveau suivant !</p>
              <button className="btnResult success" onClick={handleClick}>
                Niveau Suivant
              </button>
            </>
          ) : (
            <>
              <p className="successMsg">
                {" "}
                <GiTrophyCup size="50px" /> Bravo, vous etes un expert !
              </p>
              <button className="btnResult gameOver" onClick={handleClick2}>
                Accueil{" "}
              </button>
            </>
          )}
        </div>
        <div className="percentage">
          <div className="progressPercent">
            Réussite: {`${props.score * 10}%`}
          </div>
          <div className="progressPercent">Note:{`${props.score}/10`}</div>
        </div>
      </>
    ) : (
      <>
        <div className="stepsBtnContainer">
          <p className="failureMsg">Vous avez échoué !</p>
        </div>
        <div className="percentage">
          <div className="progressPercent">
            Réussite: {`${props.score * 10}%`}
          </div>
          <div className="progressPercent">Note:{`${props.score}/10`}</div>
        </div>
      </>
    );

  const questionAnswer =
    score >= 5 ? (
      asked.map((item) => {
        return (
          <tr key={item.id}>
            <td>{item.question}</td>
            <td>{item.answer}</td>
            <td>
              <button className="btnInfo">Infos</button>
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan="3">
          <div className="loader"></div>
          <p
            style={{
              textAlign: "center",
              color: "red",
            }}
          >
            Pas de réponses
          </p>
        </td>
      </tr>
    );

  return (
    <>
      {decision}
      <hr />
      <p>Les réponses aux questions posées:</p>
      <div className="answerContainer">
        <table className="answers">
          <thead>
            <tr>
              <th>Question</th>
              <th>Réponse</th>
              <th>Infos</th>
            </tr>
          </thead>
          <tbody>{questionAnswer}</tbody>
        </table>
      </div>
    </>
  );
};

export default React.memo(QuizOver);
