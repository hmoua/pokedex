import React from "react"

export default function Button({ randomNumber }) {
  return (
    <div>
      <button onClick={randomNumber}>Random</button>
    </div>
  )
}
