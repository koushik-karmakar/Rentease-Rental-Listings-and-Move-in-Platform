import "./App.css";
import { BrowserRoute, Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
function App() {
  return (
    <BrowserRoute>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRoute>
  );
}

export default App;
