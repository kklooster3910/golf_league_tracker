import { useReducer } from "react";

import PhaseOne from "./round_phase/phase_one";
import PhaseTwo from "./round_phase/phase_two";
import ScoreCard from "./scorecard";

const phases = {
  phaseOne: {
    component: PhaseOne
  },
  phaseTwo: {
    component: PhaseTwo
  },
  scorecard: {
    component: ScoreCard
  }
};

const initialState = {
  displayComponent: {},
  currentPhase: ""
};

const phaseTypes = {
  GET_PHASE_ONE: "GET_PHASE_ONE",
  GET_PHASE_TWO: "GET_PHASE_TWO",
  GET_PHASE_THREE: "GET_PHASE_THREE",
  GET_PHASE_FOUR: "GET_PHASE_FOUR",
  NEXT_PHASE: "NEXT_PHASE",
  PREV_PHASE: "PREV_PHASE",
  GET_SCORECARD: "GET_SCORECARD"
};

const reducer = (state, { type }) => {
  switch (type) {
    case phaseTypes.NEXT_PHASE:
      return state;
    case phaseTypes.PREV_PHASE:
      return state;
    case phaseTypes.GET_PHASE_ONE:
      return {
        ...state,
        displayComponent: phases.phaseOne,
        currentPhase: "phaseOne"
      };
    case phaseTypes.GET_PHASE_TWO:
      return {
        ...state,
        displayComponent: phases.phaseTwo,
        currentPhase: "phaseTwo"
      };
    case phaseTypes.GET_PHASE_THREE:
    case phaseTypes.GET_PHASE_FOUR:
    case phaseTypes.GET_SCORECARD:
      return {
        ...state,
        displayComponent: phases.scorecard,
        currentPhase: "scorecard"
      };
    default:
      return state;
  }
};

const usePhaseStepper = () => {
  const [currentPhase, changePhase] = useReducer(reducer, initialState);
  return [currentPhase, changePhase, phaseTypes];
};

export default usePhaseStepper;
