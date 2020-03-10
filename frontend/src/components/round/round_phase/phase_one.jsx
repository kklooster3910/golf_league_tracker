import React from "react";

const PhaseOne = ({ courseId, seasonId, players = [], createRound }) => {
  // const createNewRound = () => {};
  const handleCreateNewRound = () => {
    // round needs startTime, endTime, players, course, season
    const playerIdsArr = players.map(({ _id }) => _id);
    const newRoundObj = {
      startTime: Date.now(),
      startDate: Date.now(),
      players: playerIdsArr,
      course: courseId,
      season: seasonId
    };
    createRound(newRoundObj);
  };
  return (
    <>
      <div>course ID: {courseId}</div>
      <div> season ID: {seasonId}</div>
      <div>players LUL {JSON.stringify(players)}</div>
      <div>
        start a new round ... and then redirect to scorecard for round? -- then
        also could view finalized score cards without editing after a round is
        'isFinisehd = true'
      </div>
      <div>
        some sort of drop down to choose players -- just selecting all three
        that are in the current season right now
      </div>

      <div onClick={handleCreateNewRound}>create && enter new round</div>
    </>
  );
};

export default PhaseOne;
