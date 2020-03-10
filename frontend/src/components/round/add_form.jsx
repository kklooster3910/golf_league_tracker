import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { connect } from "react-redux";

import { createRound } from "../../actions/round";

import usePhaseStepper from "./phase_stepper";
// import SignUpModal from "../modal/signup_modal";
import SignUpForm from "../forms/signup_form";
import LoginForm from "../forms/login_form";

const RoundForm = ({ courseId, seasonId, rounds, players, createRound }) => {
  const [currentPhase, changePhase, phaseTypes] = usePhaseStepper();

  const renderCurrentPhase = () => {
    // debugger;
    // some sort of logic in here to determine if the
    // component actually needs those props?
    // don't want to be needlessly passing props fer no
    // reason
    const compProps = {
      courseId,
      seasonId,
      players,
      createRound
    };
    return (
      currentPhase?.displayComponent?.component && (
        <div className="current-phase-container">
          {currentPhase?.displayComponent?.component(compProps)}
        </div>
      )
    );
  };

  const mapRounds = () =>
    rounds.map(rnd => {
      // debugger;
      // console.log("location fam", location);
      // console.log("pathname", pathname);
      // just a link to the actual round ... not sure if it's really going
      // to be needed here fam
      return <Link to={`/round/${rnd._id}`}>{rnd._id}</Link>;
    });

  return (
    <>
      <button
        onClick={() => {
          changePhase({ type: phaseTypes.GET_PHASE_ONE });
        }}
      >
        get phase one
      </button>
      <button
        onClick={() => {
          changePhase({ type: phaseTypes.GET_PHASE_TWO });
        }}
      >
        get phase two
      </button>
      {currentPhase?.currentPhase === "phaseTwo" && mapRounds()}
      {renderCurrentPhase()}
    </>
  );
};

export default connect(null, { createRound })(RoundForm);
