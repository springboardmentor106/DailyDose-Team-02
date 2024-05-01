import "./App.css";
import SideBar from "./components/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import FileManager from "./pages/Target";
import Analytics from "./pages/Analytics";
import Add from "./pages/Add";
function App() {
  return (
    <Router>
      <SideBar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Add" element={<Add />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/Target" element={<FileManager />} />
          <Route path="*" element={<> not found</>} />
        </Routes>
      </SideBar>
    </Router>
  );
}

export default App;