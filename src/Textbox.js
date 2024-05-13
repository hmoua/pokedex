import React, {useState} from "react"

export default function Textbox({ userInput }) {
  const [currentText, setText] = useState({text: ""});

  function getText(val)
  {
    setText({text: val.target.value});
  }

  if (document.getElementById("textbox") !== null) {
    document.getElementById("textbox").addEventListener("keyup", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("submitBtn").click();
      }
    })
  }

  return (
    <div>
      <input type="text" id="textbox" placeholder="Search for a Pok&eacute;mon" value={ currentText.text } onChange={ getText }/>
      <button id="submitBtn" onClick={ userInput }>Submit</button>
    </div>
  )
}
