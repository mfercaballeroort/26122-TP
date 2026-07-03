import "./Count.css";

export const Count = ({ quantity, onIncrement, onDecrement, min = 0 }) => {
  return (
    <div className="count-container">
      <button
        className="btn primary"
        type="button"
        onClick={onDecrement}
        disabled={quantity <= min}
      >
        -
      </button>

      <p>Cantidad: {quantity}</p>

      <button className="btn primary" type="button" onClick={onIncrement}>
        +
      </button>
    </div>
  );
};