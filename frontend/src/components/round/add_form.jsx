import React from "react";

const RoundForm = ({ course, seasonId }) => {
  return (
    <div>
      {JSON.stringify(course)}
      <div>{seasonId}</div>
    </div>
  );
};

export default RoundForm;
