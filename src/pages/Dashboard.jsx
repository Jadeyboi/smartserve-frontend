import { DashboardHeader, DashboardTabs } from "../components";
import { MapPin, Phone, Users, Star, Clock, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();

  // State for restaurants and error handling
  const [restaurantBranches, setRestaurants] = useState([]);
  const [error, setError] = useState("");

  // Fetch restaurants from backend
  const fetchRestaurants = () => {
    const token = localStorage.getItem("idToken");
    console.log(
      "Fetching restaurants with token:",
      token ? `${token.substring(0, 20)}...` : "No token"
    );

    if (!token) {
      setError("No authentication token found. Please login again.");
      return;
    }

    console.log("Making API call to fetch restaurants...");
    axios
      .get("http://127.0.0.1:5050/restaurants/owned", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("API response received:", res.data);
        if (res.data.success) {
          const data = Array.isArray(res.data.restaurants)
            ? res.data.restaurants
            : [];

          // Transform backend data to match frontend expectations
          const transformedData = data.map((restaurant) => ({
            id: restaurant.restaurantID || restaurant.id,
            name: restaurant.restaurantName || "Unknown Restaurant",
            location: restaurant.address || "Address not specified",
            status: "active", // Default status since backend doesn't have this
            totalTables: 0, // Default values since backend doesn't have these
            totalChairs: 0,
            occupancyRate: 0,
            rating: 0,
            phone: restaurant.contactNumber || "Phone not specified",
            email: "email@restaurant.com", // Default since backend doesn't have this
            operatingHours: "10:00 AM - 10:00 PM", // Default
            manager: "Manager not assigned", // Default
            staffCount: 0, // Default
            lastUpdated: "Just now", // Default
            address: {
              street: restaurant.address || "Address not specified",
              area: "Area not specified",
              city: "City not specified",
              province: "Province not specified",
              zipCode: "0000",
              country: "Philippines",
            },
            cuisine: "Cuisine not specified", // Default
            features: ["Dine-in"], // Default
            paymentMethods: ["Cash"], // Default
            averageOrderValue: "₱0", // Default
            dailyCustomers: "0", // Default
            monthlyRevenue: "₱0", // Default
          }));

          // If no restaurants found, show empty state
          if (transformedData.length === 0) {
            console.log("No restaurants found");
          }

          console.log("Original backend data:", data);
          console.log("Transformed data:", transformedData);

          setRestaurants(transformedData);
        } else {
          setError(res.data.message || "Failed to fetch restaurants.");
        }
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          setError("Authentication failed. Please login again.");
          // Clear auth data and redirect to login
          localStorage.removeItem("idToken");
          localStorage.removeItem("user");
          navigate("/login");
        } else {
          setError(err.response?.data?.error || "Failed to fetch restaurants.");
        }
      });
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-100";
      case "planning":
        return "text-blue-600 bg-blue-100";
      case "maintenance":
        return "text-yellow-600 bg-yellow-100";
      case "closed":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Active";
      case "planning":
        return "Planning";
      case "maintenance":
        return "Maintenance";
      case "closed":
        return "Closed";
      default:
        return "Unknown";
    }
  };

  const handleBranchClick = (branchId) => {
    navigate(`/branch/${branchId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Restaurant Branches
          </h1>
          <p className="text-gray-600 text-lg">
            Manage and monitor all your restaurant locations
          </p>
        </div>

        <DashboardTabs />

        {/* Add New Branch Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/add-branch")}
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Branch</span>
          </button>
        </div>

        {/* Error Message */}
        {error && <div className="mb-6 text-red-600 font-medium">{error}</div>}

        {/* Restaurant Branches Grid */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Found {restaurantBranches.length} restaurant(s)
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {restaurantBranches.map((branch) => (
            <div
              key={branch.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 cursor-pointer transform hover:scale-105"
              onClick={() => handleBranchClick(branch.id)}
            >
              {/* Branch Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {branch.name}
                  </h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600 text-sm">
                      {branch.location}
                    </span>
                  </div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      branch.status
                    )}`}
                  >
                    {getStatusText(branch.status)}
                  </span>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-semibold text-gray-900">
                      {branch.rating}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    Last updated: {branch.lastUpdated}
                  </span>
                </div>
              </div>

              {/* Branch Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">
                    {branch.totalTables}
                  </p>
                  <p className="text-xs text-gray-600">Tables</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">
                    {branch.totalChairs}
                  </p>
                  <p className="text-xs text-gray-600">Seats</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">
                    {branch.occupancyRate}%
                  </p>
                  <p className="text-xs text-gray-600">Occupancy</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">
                    {branch.staffCount}
                  </p>
                  <p className="text-xs text-gray-600">Staff</p>
                </div>
              </div>

              {/* Branch Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{branch.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{branch.operatingHours}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">
                    Manager: {branch.manager}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBranchClick(branch.id);
                  }}
                >
                  View Details
                </button>
                <button
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  Manage
                </button>
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  Reports
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Statistics */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Branch Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">
                {restaurantBranches.length}
              </p>
              <p className="text-gray-600">Total Branches</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                {restaurantBranches.filter((b) => b.status === "active").length}
              </p>
              <p className="text-gray-600">Active Branches</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">
                {restaurantBranches.reduce((sum, b) => sum + b.totalTables, 0)}
              </p>
              <p className="text-gray-600">Total Tables</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">
                {restaurantBranches.reduce((sum, b) => sum + b.totalChairs, 0)}
              </p>
              <p className="text-gray-600">Total Seats</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
