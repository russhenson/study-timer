import "../css/neu.css";

export const TimerContainer = (props) => {
  return (
    <div className="timer-container big-debossed circle">
      <div className="timer-content">
        <h4 className="subs">{props.subs}</h4>
        <h1 className="timer-count">{`${props.timer[0] ?? "00"}:${props.timer[1] ?? "00"}:${props.timer[2] ?? "00"}`}</h1>
      </div>
    </div>
  );
};
