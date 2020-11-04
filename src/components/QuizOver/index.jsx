import React, { useEffect, useState } from "react";
import { GiTrophyCup } from "react-icons/gi";
import Modal from "../Modal";
import axios from "axios";

const QuizOver = (props) => {
  const {
    quizLevel,
    levelNames,
    score,
    onChangeQuizLevel,
    onChangeQuizLevel2,
    onChangeQuizLevel3,
  } = props;

  const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;
  const hash = "4ed13b493d446e68a290605d17cd059e";

  const [asked, setAsked] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [characterInfos, setCharacterInfos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAsked(props.reference.current);
    if (localStorage.getItem("marvelStorageDate")) {
      const date = localStorage.getItem("marvelStorageDate");
      checkDateAge(date);
    }
  }, [props]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const checkDateAge = (date) => {
    const today = Date.now();
    const timeDifference = today - date;
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    if (daysDifference >= 15) {
      localStorage.clear();
      localStorage.setItem("marvelStorageDate", Date.now());
    }
  };

  const showModal = (id) => {
    setOpenModal(true);
    if (localStorage.getItem(id)) {
      setCharacterInfos(JSON.parse(localStorage.getItem(id)));
      setLoading(false);
    } else {
      axios
        .get(
          `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`
        )
        .then((response) => {
          setCharacterInfos(response.data);
          setLoading(false);
          localStorage.setItem(id, JSON.stringify(response.data));
          if (!localStorage.getItem("marvelStorageDate")) {
            localStorage.setItem("marvelStorageDate", Date.now());
          }
        })
        .catch((error) => {});
    }
  };

  const hideModal = () => {
    setOpenModal(false);
    setLoading(true);
  };

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
              <button
                onClick={() => showModal(item.heroId)}
                className="btnInfo"
              >
                Infos
              </button>
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

  const resultInModal = !loading ? (
    <>
      <div className="modalHeader">
        <h2>{characterInfos.data.results[0].name}</h2>
      </div>
      <div className="modalBody">
        <div className="comicImage">
          <img
            src={
              characterInfos.data.results[0].thumbnail.path +
              "." +
              characterInfos.data.results[0].thumbnail.extension
            }
            alt={characterInfos.data.results[0].name}
          />
          {characterInfos.attributionText}
        </div>
        <div className="comicDetails">
          <h3>Description</h3>
          {characterInfos.data.results[0].description ? (
            <p>{characterInfos.data.results[0].description}</p>
          ) : (
            <p>Description indisponible...</p>
          )}
          <h3>Plus d'infos</h3>
          {characterInfos.data.results[0].urls &&
            characterInfos.data.results[0].urls.map((url, index) => {
              return (
                <a
                  key={index}
                  href={url.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {capitalizeFirstLetter(url.type)}
                </a>
              );
            })}
        </div>
      </div>
      <div className="modalFooter">
        <button className="modalBtn" onClick={hideModal}>
          Fermer
        </button>
      </div>
    </>
  ) : (
    <>
      <div className="modalHeader">
        <h2>réponse de Marvel...</h2>
      </div>
      <div className="modalBody">
        <div className="loader"></div>
      </div>
    </>
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
      <Modal showModal={openModal}>{resultInModal}</Modal>
    </>
  );
};

export default React.memo(QuizOver);
