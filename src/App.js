import React, { useState, useRef } from 'react';
import './SpeechToText.css';

function SpeechToText() {
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);

  const handleStart = () => {
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.onresult = handleResult;
    recognitionRef.current.start();
    console.log("start button clicked");
  };

  const handleStop = () => {
    recognitionRef.current.stop();
    console.log("Stop button clicked");
  };

  const handleResult = (event) => {
    const transcriptArray = Array.from(event.results)
      .map((result) => result[0])
      .map((result) => result.transcript);
    const currentTranscript = transcriptArray.join('');
    setTranscript(currentTranscript);
  };

  return (
    <div className="container">
      <h1>Speech to Text</h1>
      <div className="controls">
        <button className="start-button" onClick={handleStart}>
          Start
        </button>
        <button className="stop-button" onClick={handleStop}>
          Stop
        </button>
      </div>
      <div className="transcript-box">
        <textarea
          className="transcript-textarea"
          defaultValue={transcript}
        />
      </div>
    </div>
  );
}

export default SpeechToText;
