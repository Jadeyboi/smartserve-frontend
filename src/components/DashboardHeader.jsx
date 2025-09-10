import { Link, useNavigate } from "react-router-dom";
import { ChefHat, User, LogOut, Bell, Home, BarChart3 } from "lucide-react";

function DashboardHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the authentication token
    localStorage.removeItem("idToken");
    // Redirect to login page
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center shadow-md">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">SmartServe</span>
          </Link>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/ai-management"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <BarChart3 className="w-4 h-4" />
              <span>AI Management</span>
            </Link>
          </nav>

          {/* User Profile */}
          <div className="flex items-center space-x-4">
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-all duration-200 shadow-md flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Jade Cordero</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-all duration-200 shadow-md flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
