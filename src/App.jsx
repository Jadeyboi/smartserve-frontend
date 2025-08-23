import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  Home,
  Login,
  Dashboard,
  RestaurantInfoPage,
  StaffAccountManagement,
  AIManagement,
} from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/restaurant-info" element={<RestaurantInfoPage />} />
        <Route path="/ai-management" element={<AIManagement />} />
        <Route path="/staff-account" element={<StaffAccountManagement />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
