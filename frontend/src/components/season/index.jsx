import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import RoundForm from "../round/add_form";
import { fetchSeason } from "../../actions/season";
import { Header, Button } from "../shared_comps";
import { Modal, ModalWrapper } from "../modal/modal";
// import { json } from "body-parser";
// JSON.stringify(courses);
// json and JSON difference? I'm sure I could
// explain it but make sure you that you look it and actually do
// understand it

import "./season.scss";

const Season = ({ fetchSeason, season = {}, location }) => {
  const [isRoundModalOpen, setIsRoundModalOpen] = useState(false);

  const { pathname } = location;
  const seasonId = pathname.split("/");
  const {
    _id,
    scheduledRounds = [],
    players = [],
    startDate,
    endDate,
    name: seasonName,
    course,
    rounds
  } = season.currentSeason;
  const { courseName } = course;
  useEffect(() => {
    // add some logic for last fetched type of thing? -- probably going to want to have this run on
    // more than just mount
    fetchSeason(seasonId[seasonId.length - 1]);
  }, []);

  const mapPlayers =
    !!players?.length &&
    players.map(({ averages, handicap, username, putts }) => {
      const formatAverages =
        !!averages?.length &&
        averages.map(avg => <div className="average">{avg}</div>);
      const formatPutts =
        !!putts?.length &&
        putts.map(putt => <div className="putt">{putt}</div>);
      return (
        <div className="player">
          <div className="username">Username: {username}</div>
          <div className="handicap">Handicap: {handicap}</div>
          {formatAverages.length && (
            <div className="averages">{formatAverages}</div>
          )}
          {formatPutts && <div className="putts">{formatPutts}</div>}
        </div>
      );
    });

  const mapRounds =
    !!rounds?.length &&
    rounds.map(({ startTime, startDate, scores = [] }) => {
      const formattedScores =
        !!scores?.length && scores.map(({ playerScores, hole }) => {});
    });

  // return an empty fragment if the season hasn't been fetched yet
  if (!_id) return <></>;

  return (
    <div className="season-container">
      <Header copy={seasonName} />
      <Header copy={courseName} />
      <Button
        copy="Add Round"
        classes={["add-round"]}
        action={() => setIsRoundModalOpen(true)}
      />
      <div className="players-container">Players: {mapPlayers}</div>
      <div className="rounds-container">Rounds: {JSON.stringify(rounds)}</div>
      <div className="season-container">
        Season Info: {JSON.stringify(season)}
      </div>
      <Modal
        closeModal={() => setIsRoundModalOpen(false)}
        isModalOpen={isRoundModalOpen}
        render={() => (
          <ModalWrapper>
            <RoundForm course={course} seasonId={_id} />
          </ModalWrapper>
        )}
      ></Modal>
    </div>
  );
};

export default connect(
  ({ season }) => ({
    season
  }),
  { fetchSeason }
)(Season);
