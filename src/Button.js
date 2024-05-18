import React from "react"

export default function Button({ randomNumber }) {
  return (
    <div id="random">
      <button onClick={randomNumber}>Random</button>
    </div>
  );
}
