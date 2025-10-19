import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CropGuide from "./pages/CropGuide";
import CropPlanner from "./pages/CropPlanner";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-800">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guide" element={<CropGuide />} />
          <Route path="/planner" element={<CropPlanner />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
