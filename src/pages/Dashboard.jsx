import { DashboardHeader, DashboardTabs } from "../components";
import { MapPin, Phone, Users, Star, Clock, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  // Sample data for restaurant branches - in real implementation this would come from API
  const restaurantBranches = [
    {
      id: 1,
      name: "Pizza Napoleon - SM City Cebu",
      location: "SM City Cebu, North Reclamation Area, Cebu City",
      status: "active",
      totalTables: 25,
      totalChairs: 120,
      occupancyRate: 72,
      rating: 4.8,
      phone: "+63 32 123 4567",
      operatingHours: "10:00 AM - 10:00 PM",
      manager: "Maria Santos",
      staffCount: 15,
      lastUpdated: "2 minutes ago",
    },
    {
      id: 2,
      name: "Pizza Napoleon - Ayala Center Cebu",
      location: "Ayala Center Cebu, Cebu Business Park, Cebu City",
      status: "active",
      totalTables: 20,
      totalChairs: 96,
      occupancyRate: 68,
      rating: 4.6,
      phone: "+63 32 234 5678",
      operatingHours: "11:00 AM - 11:00 PM",
      manager: "Juan Dela Cruz",
      staffCount: 12,
      lastUpdated: "5 minutes ago",
    },
    {
      id: 3,
      name: "Pizza Napoleon - IT Park",
      location: "Cebu IT Park, Lahug, Cebu City",
      status: "active",
      totalTables: 18,
      totalChairs: 84,
      occupancyRate: 55,
      rating: 4.7,
      phone: "+63 32 345 6789",
      operatingHours: "10:00 AM - 9:00 PM",
      manager: "Ana Rodriguez",
      staffCount: 10,
      lastUpdated: "1 minute ago",
    },
    {
      id: 4,
      name: "Pizza Napoleon - Mactan Airport",
      location: "Mactan-Cebu International Airport, Lapu-Lapu City",
      status: "active",
      totalTables: 12,
      totalChairs: 60,
      occupancyRate: 45,
      rating: 4.5,
      phone: "+63 32 456 7890",
      operatingHours: "6:00 AM - 10:00 PM",
      manager: "Carlos Martinez",
      staffCount: 8,
      lastUpdated: "3 minutes ago",
    },
    {
      id: 5,
      name: "Pizza Napoleon - Talisay",
      location: "Talisay City, Cebu",
      status: "planning",
      totalTables: 22,
      totalChairs: 108,
      occupancyRate: 0,
      rating: 0,
      phone: "+63 32 567 8901",
      operatingHours: "Coming Soon",
      manager: "TBD",
      staffCount: 0,
      lastUpdated: "1 hour ago",
    },
  ];

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
          <button className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200">
            <Plus className="w-5 h-5" />
            <span>Add New Branch</span>
          </button>
        </div>

        {/* Restaurant Branches Grid */}
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
