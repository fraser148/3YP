import React from "react";
import { useStateMachine } from "little-state-machine";
import updateAction from "../services/updateAction";

const Result = () => {
  const {  state } = useStateMachine({ updateAction });

  return (
    <>
    <pre>{JSON.stringify(state, null, 2)}</pre>
    </>
    
  );
};

export default Result;
