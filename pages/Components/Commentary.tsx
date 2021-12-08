import React from "react";
import { Challenge } from "../../types/index";

const Commentary = (props: Challenge) => {
  console.log(props);
  return (
    <div>
      {props.example}
      <p>{props.commentary}</p>
    </div>
  );
};

export default Commentary;
