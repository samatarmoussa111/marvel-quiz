import React from "react";

const ProgressBar = ({ idQuestion }) => {
  const actualQuestion = idQuestion + 1;

  const getWidthPercentage = (totalQuestions, questionId) => {
    return (100 / totalQuestions) * questionId;
  };

  return (
    <>
      <div className="percentage">
        <div className="progressPercent">{`Question: ${actualQuestion}/10`}</div>
        <div className="progressPercent">{`Preogression : ${getWidthPercentage(
          10,
          actualQuestion
        )}%`}</div>
      </div>
      <div className="progressBar">
        <div
          className="progressBarChange"
          style={{ width: `${getWidthPercentage(10, actualQuestion)}%` }}
        ></div>
      </div>
    </>
  );
};

export default React.memo(ProgressBar);
