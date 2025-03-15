import React, { useState, useEffect } from "react";

const TimeTracker = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Time Tracker</h1>
        <div className="text-6xl font-mono mb-8 text-gray-700">
          {formatTime(time)}
        </div>
        <div className="space-x-4">
          <button
            onClick={startTimer}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
          >
            Start
          </button>
          <button
            onClick={stopTimer}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
          >
            Stop
          </button>
          <button
            onClick={resetTimer}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeTracker;