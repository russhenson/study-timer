import "../css/neu.css";

export const NeuButton = (props) => {
  return (
    <button
      className={`neu-btn ${props.className}`}
      type="button"
      onClick={props.onClick}
    >
      {props.btnName}
    </button>
  );
};
