import React from "react";
import Input from "./Input";

const fields = new Array(30).fill("input");

const generateDefaults = () => {
  let inputRefs = {};
  fields.forEach((val, index) => {
    inputRefs = {
      ...inputRefs,
      [val + index]: { customName: val + index, value: "" },
    };
  });
  return inputRefs;
};

function App() {
  const [clearAll, setClearAll] = React.useState(false);
  const [inputRefs, setInputRefs] = React.useState(generateDefaults());

  const updateValue = (name, customName, value) => {
    setInputRefs({ ...inputRefs, [name]: { customName, value } });
  };

  const submitAll = () => {
    const values = {};
    Object.keys(inputRefs).forEach((key) => {
      values[inputRefs[key].customName] = inputRefs[key].value;
    });

    try {
      fetch("http://localhost:3000/rest", {
        method: "POST",
        body: JSON.stringify({ data: values }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      <h1>Input fields</h1>
      {fields.map((val, index) => (
        <div key={val + index}>
          <Input
            name={val + index}
            clearAllCommand={clearAll}
            updateValue={updateValue}
          />
        </div>
      ))}
      <button onClick={() => submitAll()}>Submit</button>
      <button
        onClick={() => {
          setClearAll(true);
          setInputRefs(generateDefaults());
          setTimeout(() => setClearAll(false), 1000);
        }}
      >
        Clear
      </button>
    </div>
  );
}

export default App;
