import { Link } from "react-router-dom";
import { ChefHat, User } from "lucide-react";

function DashboardHeader() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-md">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">SmartServe</span>
          </Link>

          {/* User Profile */}
          <div className="flex items-center space-x-4">
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-all duration-200 shadow-md flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Kim Baring</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
