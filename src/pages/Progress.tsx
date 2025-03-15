import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

<<<<<<< HEAD
=======
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

>>>>>>> af535d33c96a92e17fe0290f4083740327c2970b
// Dummy data - replace with real data from your backend
const studyData = [
  { day: 'Mon', hours: 2, questions: 15 },
  { day: 'Tue', hours: 3, questions: 20 },
  { day: 'Wed', hours: 4, questions: 25 },
  { day: 'Thu', hours: 2, questions: 10 },
  { day: 'Fri', hours: 5, questions: 30 },
  { day: 'Sat', hours: 1, questions: 5 },
  { day: 'Sun', hours: 3, questions: 18 },
];

const Progress = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div className="animate-fadeIn">
      <h1 className="text-4xl font-bold text-neutral-900 mb-8">Your Progress</h1>
      
      {/* Study Timer */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Study Timer</h2>
        <div className="flex flex-col items-center gap-4">
          <div className="text-5xl font-mono font-bold text-primary">
            {formatTime(time)}
          </div>
          <div className="flex gap-2">
            <Button
              variant={isRunning ? "destructive" : "default"}
              onClick={handleStartStop}
              className="w-32"
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4 mr-2" /> Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" /> Start
                </>
              )}
            </Button>
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" /> Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Study Statistics */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Weekly Progress</h2>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={studyData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis yAxisId="left" orientation="left" stroke="#9b87f5" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="hours" name="Hours Studied" fill="#9b87f5" />
              <Bar yAxisId="right" dataKey="questions" name="Questions Solved" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Progress;