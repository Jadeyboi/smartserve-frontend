import { Toaster, toast } from "react-hot-toast";
import { createContext, useContext } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  Home,
  Login,
  Signup,
  Dashboard,
  RestaurantBranchPage,
  AddRestaurantBranch,
  StaffLogin,
  StaffDashboardPage,
  StaffOrdersPage,
  PendingPage,
} from "./pages";

// Toast context for global toast access
const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Toast utility functions
export const showToast = {
  success: (message) => toast.success(message, { duration: 4000 }),
  error: (message) => toast.error(message, { duration: 5000 }),
  loading: (message) => toast.loading(message, { duration: 3000 }),
  info: (message) => toast(message, { duration: 3000 }),
  dismiss: () => toast.dismiss(),
};

function App() {
  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          success: {
            duration: 4000,
            style: {
              background: "#10B981",
              color: "#fff",
            },
          },
          error: {
            duration: 5000,
            style: {
              background: "#EF4444",
              color: "#fff",
            },
          },
          loading: {
            style: {
              background: "#3B82F6",
              color: "#fff",
            },
          },
        }}
      />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pending" element={<PendingPage />} />
          <Route path="/branch/:id" element={<RestaurantBranchPage />} />
          <Route path="/add-branch" element={<AddRestaurantBranch />} />
          <Route path="/staff-login" element={<StaffLogin />} />
          <Route path="/staff-dashboard" element={<StaffDashboardPage />} />
          <Route path="/staff-orders" element={<StaffOrdersPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ToastContext.Provider>
  );
}

export default App;
