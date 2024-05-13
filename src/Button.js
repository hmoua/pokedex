import React from "react"

export default function Button({ randomNumber }) {
  return (
    <div className="random">
      <button onClick={randomNumber}>Random</button>
    </div>
  )
}
