import "./App.css";
import DynamicTextBoxes from "./Forms.js";
import TaskManager from "./TaskManager";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<DynamicTextBoxes />} />
          <Route path="/TaskManager" element={<TaskManager />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
