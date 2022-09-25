import { TimerContainer, NeuButton, OptionButton } from "../components/index";
import { useState, useEffect, useRef } from "react";
import * as workerTimers from "worker-timers";
import { minutesToSeconds } from "date-fns";
import "../css/landing.css";
import "../css/neu.css";

const studyOptions = [1, 40, 50, 60, 70, 80, 90, 100, 110, 120];
const breakOptions = [2, 15, 20, 25, 30, 35, 40, 45, 50, 60];

export const Landing = () => {
  const [selected, setSelected] = useState(
    localStorage.getItem("tab") ?? "configure"
  );
  const [selectedStudyOption, setSelectedStudyOption] = useState(
    parseInt(localStorage.getItem("studyDuration")) ?? 60
  );
  const [selectedBreakOption, setSelectedBreakOption] = useState(
    parseInt(localStorage.getItem("breakDuration")) ?? 15
  );
  const countRef = useRef(null);
  const [studyTimer, setStudyTimer] = useState(0);
  const [breakTimer, setBreakTimer] = useState(0);
  const [start, setStart] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    if (!start || isBreak) {
      setStudyTimer(minutesToSeconds(selectedStudyOption));
    }
    if (start && !isBreak) {
      countRef.current = workerTimers.setInterval(() => {
        setStudyTimer((prev) => prev - 1);
        if (studyTimer === 0) {
          setIsBreak(true);
          setBreakTimer(minutesToSeconds(selectedBreakOption));
        }
      }, 1000);
      return () => {
        workerTimers.clearInterval(countRef.current);
      };
    }
  }, [studyTimer, start, isBreak, selected, selectedStudyOption, selectedBreakOption]);

  useEffect(() => {
    if (start && isBreak) {
      countRef.current = workerTimers.setInterval(() => {
        setBreakTimer((prev) => prev - 1);
        if (breakTimer === 0) {
          setIsBreak(false);
        }
      }, 1000);
      return () => {
        workerTimers.clearInterval(countRef.current);
      };
    }
  }, [isBreak, start, breakTimer]);

  const handleStart = () => {
    setStart((prev) => !prev);
  };

  // FORMAT TIMER
  const formatTime = () => {
    let timer = !isBreak ? studyTimer : breakTimer;

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
        <TimerContainer
          timer={formatTime()}
          subs={isBreak ? "break" : start ? "Study" : ""}
          isBreak={isBreak}
        />
      ) : (
        <div className="configure-container square big-debossed">
          <div className="select-container-top">
            <h2>Select a study duration:</h2>
            <div className="options-wrapper">
              {studyOptions.map((option) => (
                <OptionButton
                  key={option}
                  btnName={option}
                  onClick={() => {
                    setSelectedStudyOption(option);
                    localStorage.setItem("studyDuration", option);
                  }}
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
                  onClick={() => {
                    setSelectedBreakOption(option);
                    localStorage.setItem("breakDuration", option);
                  }}
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
          onClick={() => {
            setSelected("timer");
            localStorage.setItem("tab", "timer");
            setStudyTimer(minutesToSeconds(selectedStudyOption));
            setBreakTimer(minutesToSeconds(selectedBreakOption));
          }}
          className={selected === "timer" ? "debossed" : "embossed"}
          btnName="timer"
        />
        <NeuButton
          onClick={() => {
            setSelected("configure");
            localStorage.setItem("tab", "configure");
          }}
          className={selected === "configure" ? "debossed" : "embossed"}
          btnName="configure"
        />
      </div>
    </div>
  );
};
