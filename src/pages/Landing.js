import { TimerContainer, NeuButton, OptionButton } from "../components/index";
import { useState, useEffect, useRef } from "react";
import * as workerTimers from "worker-timers";
import { differenceInSeconds } from "date-fns";
import "../css/landing.css";
import "../css/neu.css";

const studyOptions = [30, 40, 50, 60, 70, 80, 90, 100, 110, 120];
const breakOptions = [10, 15, 20, 25, 30, 35, 40, 45, 50, 60];

export const Landing = () => {
  const [selected, setSelected] = useState("configure");
  const [selectedStudyOption, setSelectedStudyOption] = useState(60);
  const [selectedBreakOption, setSelectedBreakOption] = useState(15);
  const countRef = useRef(null);
  const [timer, setTimer] = useState(0);
  const [start, setStart] = useState(false);

  // TIMER
  useEffect(() => {
    if (start) {
      countRef.current = workerTimers.setInterval(() => {
        setTimer(
          differenceInSeconds(new Date(), new Date(localStorage.getItem("startTime")))
        );
      }, 1000);
      return () => {
        workerTimers.clearInterval(countRef.current);
      };
    } else {
      setTimer(0);
    }
  }, [start, timer, countRef]);

  const handleStart = () => {
    localStorage.setItem("startTime", new Date());
    setStart((prev) => !prev);
  };

  // FORMAT TIMER
  const formatTime = () => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    const time = [getHours, getMinutes, getSeconds];

    return time;
  };

  return (
    <div className="wrapper">
      {selected === "timer" ? (
        <TimerContainer timer={formatTime()} />
      ) : (
        <div className="configure-container square big-debossed">
          <div className="select-container-top">
            <h2>Select a study duration:</h2>
            <div className="options-wrapper">
              {studyOptions.map((option) => (
                <OptionButton
                  key={option}
                  btnName={option}
                  onClick={() => setSelectedStudyOption(option)}
                  className={
                    option === selectedStudyOption ? "debossed-option" : ""
                  }
                />
              ))}
            </div>
          </div>
          <div className="select-container-bottom">
            <h2>Select a break duration:</h2>
            <div className="options-wrapper">
              {breakOptions.map((option) => (
                <OptionButton
                  key={option}
                  btnName={option}
                  onClick={() => setSelectedBreakOption(option)}
                  className={
                    option === selectedBreakOption ? "debossed-option" : ""
                  }
                />
              ))}
            </div>
          </div>
        </div>
      )}
      <button
        className={`neu-main-btn ${start ? "debossed" : "embossed"}`}
        type="button"
        onClick={handleStart}
      >
        {start ? "Stop" : "Start"}
      </button>
      <div className="button-wrapper">
        <NeuButton
          onClick={() => setSelected("timer")}
          className={selected === "timer" ? "debossed" : "embossed"}
          btnName="timer"
        />
        <NeuButton
          onClick={() => setSelected("configure")}
          className={selected === "configure" ? "debossed" : "embossed"}
          btnName="configure"
        />
      </div>
    </div>
  );
};
