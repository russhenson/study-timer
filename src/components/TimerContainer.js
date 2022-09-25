import "../css/neu.css";

export const TimerContainer = (props) => {
  return (
    <div className="timer-container big-debossed circle">
      <h1 className="timer-count">{`${props.timer[0]}:${props.timer[1]}:${props.timer[2]}`}</h1>
    </div>
  );
};
