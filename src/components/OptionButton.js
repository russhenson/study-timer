import "../css/neu.css";

export const OptionButton = (props) => {
  return (
    <button
      className={`neu-option-btn ${props.className}`}
      type="button"
      onClick={props.onClick}
    >
      {props.btnName}
    </button>
  );
};
