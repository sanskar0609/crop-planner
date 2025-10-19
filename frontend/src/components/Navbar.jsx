import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-green-700 text-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">AgroSmart</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/guide" className="hover:text-gray-300">Crop Guide</Link>
        <Link to="/planner" className="hover:text-gray-300">Planner</Link>
      </div>
    </nav>
  );
}
