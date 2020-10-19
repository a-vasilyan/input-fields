import React from "react";

const Input = ({ name, updateValue, clearAllCommand }) => {
  const [customName, setCustomName] = React.useState("");
  const [internalValue, setInternalValue] = React.useState("");

  React.useEffect(() => {
    if (clearAllCommand) {
      setInternalValue("");
      setCustomName("");
    }
  }, [clearAllCommand]);

  const updateInputValue = () => {
    updateValue(name, customName || name, internalValue);
  };

  return (
    <div style={{ marginBottom: "15px" }}>
      <label>Custom Name: </label>
      <input
        value={customName}
        onChange={(e) => {
          setCustomName(e.target.value);
          updateInputValue();
        }}
      />
      <br />
      {customName && <label>{customName} </label>}
      <input
        name={customName || name}
        value={internalValue}
        onChange={(e) => {
          setInternalValue(e.target.value);
          updateInputValue();
        }}
      />
      {internalValue && (
        <span
          style={{ cursor: "pointer" }}
          aria-label="Clear"
          onClick={() => {
            setInternalValue("");
            updateInputValue();
          }}
        >
          &times;
        </span>
      )}
    </div>
  );
};

export default Input;
