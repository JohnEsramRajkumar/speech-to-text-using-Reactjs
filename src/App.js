import React, { useState, useRef } from 'react';
import './SpeechToText.css';

function SpeechToText() {
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);

  const handleStart = () => {
    setIsRecording(true);
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.onresult = handleResult;
    recognitionRef.current.start();
  };

  const handleStop = () => {
    setIsRecording(false);
    recognitionRef.current.stop();
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
      <div className="transcript-box">
        <textarea
          className="transcript-textarea"
          value={transcript}
          placeholder="Click and hold to record, double-click to start/stop"
        />
        <button
          className={`record-button ${isRecording ? 'recording' : ''}`}
          onMouseDown={handleStart}
          onMouseUp={handleStop}
          onDoubleClick={isRecording ? handleStop : handleStart}
        >
          {isRecording ? 'Recording' : 'Record'}
        </button>
      </div>
    </div>
  );
}

export default SpeechToText;
