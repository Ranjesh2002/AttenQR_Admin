import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Attendance from "./components/Attendance";
import Login from "./components/Login";
import AdminLayout from "./components/Layout";
import Students from "./components/Students";
import Teachers from "./components/Teachers";
import Alerts from "./components/Alert";
import ClassSession from "./components/session";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="students" element={<Students />} />
            <Route path="teachers" element={<Teachers />} />
            <Route path="alert" element={<Alerts />} />
            <Route path="session" element={<ClassSession />} />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
