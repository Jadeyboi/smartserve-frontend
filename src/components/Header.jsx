import { Link } from "react-router-dom";
import { Sofa } from "lucide-react";

function Header() {
  return (
    <header className="bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
              <Sofa className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">SmartServe</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-red-600 transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <Link to="/login" className="btn-secondary">
              Login
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
