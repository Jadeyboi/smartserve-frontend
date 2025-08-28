import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Bell, Settings, LogOut, User, Menu, X } from "lucide-react";

function StaffHeader() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    setCurrentUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/staff-login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">SS</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SmartServe</h1>
                <p className="text-sm text-gray-600">Staff Portal</p>
              </div>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              to="/staff-dashboard"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/staff-orders"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Orders
            </Link>
            <Link
              to="/staff-tables"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Tables
            </Link>
            <Link
              to="/staff-menu"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Menu
            </Link>
            <Link
              to="/staff-reports"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Reports
            </Link>
          </nav>

          {/* User Menu and Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* User Profile */}
            <div className="relative">
              <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {currentUser?.firstname?.[0] || "S"}
                  </span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {currentUser?.firstname || "Staff"}{" "}
                    {currentUser?.lastname || "Member"}
                  </p>
                  <p className="text-xs text-gray-600">
                    {currentUser?.position || "Staff Member"}
                  </p>
                </div>
                <User className="w-4 h-4 text-gray-600" />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <Link
                  to="/staff-profile"
                  className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </Link>
                <Link
                  to="/staff-settings"
                  className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </Link>
                <hr className="my-2" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2 pt-4">
              <Link
                to="/staff-dashboard"
                className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/staff-orders"
                className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
              >
                Orders
              </Link>
              <Link
                to="/staff-tables"
                className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
              >
                Tables
              </Link>
              <Link
                to="/staff-menu"
                className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
              >
                Menu
              </Link>
              <Link
                to="/staff-reports"
                className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
              >
                Reports
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default StaffHeader;
