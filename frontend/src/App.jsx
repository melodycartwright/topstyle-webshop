import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
 import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Add more routes later */}
      </Routes>
    </Router>
  );
 

  function App() {
    return (
      <>
        <Navbar />
        <Routes>{/* your routes here */}</Routes>
      </>
    );
  }

}

export default App;
