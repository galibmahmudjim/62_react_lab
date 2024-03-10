import React, { useEffect, useState } from "react";

function DynamicTextBoxes() {
  const [textboxes, setTextboxes] = useState([]);
  const [sum, setSum] = useState(0);
  const [total, setTotal] = useState(0);
  const [warning, setWarning] = useState(null);

  const addTextbox = () => {
    setTotal(total + 1);
    setTextboxes(textboxes.concat({ id: Date.now(), value: "" }));
  };

  const deleteTextbox = (id) => {
    setTotal(total - 1);
    calculateSum();
    setTextboxes(textboxes.filter((textbox) => textbox.id !== id));
  };

  const updateValue = (id, value) => {
    const newTextboxes = textboxes.map((textbox) =>
      textbox.id === id ? { ...textbox, value: value } : textbox
    );
    setTextboxes(newTextboxes);
    calculateSum(newTextboxes);
  };

  const calculateSum = () => {
    let isNanPresent = false;
    const total = textboxes.reduce(
      (acc, textbox) => acc + (textbox.value ? parseInt(textbox.value, 10) : 0),
      0
    );
    setSum(total);
  };
  useEffect(() => {
    calculateSum();
  }, [textboxes]);

  return (
    <div>
      <button onClick={addTextbox}>Add</button>
      {textboxes.map((textbox) => (
        <div key={textbox.id}>
          <input
            type="text"
            value={textbox.value}
            onChange={(e) => updateValue(textbox.id, e.target.value)}
            onBlur={calculateSum}
          />
          <button onClick={() => deleteTextbox(textbox.id)}>Delete</button>
        </div>
      ))}
      <div>Sum: {sum}</div>
      <div>Total: {total}</div>
      <div>
        {isNaN(sum) ? <span style={{ color: "red" }}>Input Numbers</span> : ""}
      </div>
    </div>
  );
}

export default DynamicTextBoxes;
