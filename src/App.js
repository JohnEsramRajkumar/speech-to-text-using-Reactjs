import React, { useState, useRef } from 'react';
import './SpeechToText.css';

function SpeechToText() {
  const [transcript, setTranscript] = useState(''); 
  const recognitionRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false); //is Recording is the current state , setIsRecording is the function that is used to update our state.

  //handleStart(): sets isRecording to true and starts speech recognition using the webkitSpeechRecognition object.
  const handleStart = () => {
    setIsRecording(true);
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.onresult = handleResult;
    recognitionRef.current.start();
  };

  //handleStop(): sets isRecording to false and stops speech recognition.
  const handleStop = () => {
    setIsRecording(false);
    recognitionRef.current.stop();
  };

//handleResult(event): processes the result of speech recognition and updates the transcript state with the current transcript.

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
      <div className="transcript-box">
        <textarea
          className="transcript-textarea"
          value={transcript}
          placeholder="Click and hold to record, double-click to start/stop"
        />
        <button
          className={`record-button ${isRecording ? 'recording' : ''}`}
          //onMouseDown and onMouseUp event handlers are used to start and stop recording
          onMouseDown={handleStart}
          onMouseUp={handleStop}
          //onDoubleClick event handler toggles between starting and stopping recording
          onDoubleClick={isRecording ? handleStop : handleStart}
        >
          {/* If isRecording is true, the string 'Recording' will be displayed, and if it is false, the string 'Record' will be displayed. */}
          {isRecording ? 'Recording' : 'Record'} 
        </button>
      </div>
    </div>
  );
}

export default SpeechToText;
