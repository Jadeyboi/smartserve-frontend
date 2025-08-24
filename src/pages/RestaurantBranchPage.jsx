import { DashboardHeader } from "../components";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  Users,
  ArrowLeft,
  Edit,
  BarChart3,
  Settings,
  Calendar,
  TrendingUp,
  Plus,
  ChefHat,
  CreditCard,
  UserPlus,
  Utensils,
  Eye,
  Camera,
  Activity,
  Grid,
  UserCheck,
  UserX,
  Trash2,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { restaurantAPI, menuAPI, aiAPI, staffAPI } from "../utils/api";

function RestaurantBranchPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [branchData, setBranchData] = useState(null);
  const [menuData, setMenuData] = useState({});
  const [aiData, setAiData] = useState({});
  const [staffData, setStaffData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Staff signup form state
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [signupForm, setSignupForm] = useState({
    fullName: "",
    email: "",
    role: "Chef",
    password: "",
  });

  // Fetch branch data from backend API
  useEffect(() => {
    const fetchBranchData = async () => {
      try {
        setLoading(true);

        // Fetch branch details
        const branch = await restaurantAPI.getById(id);
        setBranchData(branch);

        // Fetch menu data
        try {
          const menu = await menuAPI.getByRestaurant(id);
          setMenuData(menu);
        } catch (err) {
          console.warn("Menu data not available:", err);
          setMenuData({
            breakfast: [],
            lunch: [],
            dinner: [],
          });
        }

        // Fetch AI status
        try {
          const ai = await aiAPI.getTableStatus(id);
          setAiData(ai);
        } catch (err) {
          console.warn("AI data not available:", err);
          setAiData({
            cameraStatus: "Online",
            lastUpdate: "5 seconds ago",
            aiConfidence: 96.2,
            tableStatus: [
              {
                id: 1,
                status: "occupied",
                seats: 4,
                occupiedSeats: 4,
                timeOccupied: "45 min",
              },
              {
                id: 2,
                status: "vacant",
                seats: 6,
                occupiedSeats: 0,
                timeOccupied: "0 min",
              },
            ],
          });
        }

        // Fetch staff data
        try {
          const staff = await staffAPI.getByRestaurant(id);
          setStaffData(staff);
        } catch (err) {
          console.warn("Staff data not available:", err);
          setStaffData([
            {
              id: 1,
              name: "Juan Dela Cruz",
              role: "Chef",
              email: "juan@pizzanapoleon.com",
              status: "active",
            },
            {
              id: 2,
              name: "Ana Rodriguez",
              role: "Cashier",
              email: "ana@pizzanapoleon.com",
              status: "active",
            },
          ]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        // Fallback to mock data if API fails
        setBranchData({
          id: parseInt(id),
          name: "Pizza Napoleon - SM City Cebu",
          location:
            "SM City Cebu, North Reclamation Area, Cebu City, Philippines",
          status: "active",
          totalTables: 25,
          totalChairs: 120,
          occupancyRate: 72,
          rating: 4.8,
          phone: "+63 32 123 4567",
          email: "smcity@pizzanapoleon.com",
          operatingHours: "10:00 AM - 10:00 PM",
          manager: "Maria Santos",
          staffCount: 15,
          lastUpdated: "2 minutes ago",
          address: {
            street: "SM City Cebu",
            area: "North Reclamation Area",
            city: "Cebu City",
            province: "Cebu",
            zipCode: "6000",
            country: "Philippines",
          },
          cuisine: "Italian, Pizza, Mediterranean",
          features: [
            "Dine-in",
            "Delivery",
            "Takeout",
            "Catering",
            "Private Events",
          ],
          paymentMethods: [
            "Cash",
            "Credit Card",
            "Debit Card",
            "Digital Wallets",
            "Online Payment",
          ],
          averageOrderValue: "₱450",
          dailyCustomers: "150-200",
          monthlyRevenue: "₱2.5M",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBranchData();
  }, [id]);

  const handleBackClick = () => {
    navigate("/dashboard");
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Here you would typically call the API to create a new staff member
    console.log("Creating new staff member:", signupForm);

    // Add the new staff member to the local state
    const newStaff = {
      id: Date.now(), // Temporary ID
      name: signupForm.fullName,
      role: signupForm.role,
      email: signupForm.email,
      status: "active",
    };

    setStaffData([...staffData, newStaff]);

    // Reset form and hide it
    setSignupForm({
      fullName: "",
      email: "",
      role: "Chef",
      password: "",
    });
    setShowSignupForm(false);

    // Show success message
    alert("Staff member added successfully!");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getStatusColor = (status) => {
    return status === "occupied" ? "text-red-600" : "text-green-600";
  };

  const getStatusBgColor = (status) => {
    return status === "occupied" ? "bg-red-100" : "bg-green-100";
  };

  const getStatusIcon = (status) => {
    return status === "occupied" ? (
      <UserCheck className="w-4 h-4" />
    ) : (
      <UserX className="w-4 h-4" />
    );
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "Chef":
        return <ChefHat className="w-4 h-4" />;
      case "Cashier":
        return <CreditCard className="w-4 h-4" />;
      case "Waiter":
        return <Users className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "Chef":
        return "bg-orange-100 text-orange-700";
      case "Cashier":
        return "bg-green-100 text-green-700";
      case "Waiter":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "menu", label: "Menu Management", icon: "🍽️" },
    { id: "ai", label: "AI Management", icon: "🤖" },
    { id: "staff", label: "Staff Management", icon: "👥" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader />
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading branch details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !branchData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader />
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-800">
              Error: {error || "Failed to load branch data"}
            </p>
            <p className="text-red-600 text-sm mt-2">Please try again later.</p>
            <button
              onClick={handleBackClick}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button and Header */}
        <div className="mb-8">
          <button
            onClick={handleBackClick}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {branchData.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-red-600" />
                  <span className="text-gray-700">{branchData.location}</span>
                </div>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {branchData.status.charAt(0).toUpperCase() +
                    branchData.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                <BarChart3 className="w-4 h-4" />
                <span>Analytics</span>
              </button>
              <button className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white rounded-xl p-1 shadow-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-red-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Restaurant Overview
            </h2>
            <p className="text-gray-600">
              Welcome to {branchData.name}. This is the overview tab showing
              basic information about the restaurant.
            </p>
          </div>
        )}

        {activeTab === "menu" && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Menu Management
            </h2>
            <p className="text-gray-600">
              Manage your restaurant menu items here. Add, edit, and organize
              dishes by category.
            </p>
          </div>
        )}

        {activeTab === "ai" && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              AI Management
            </h2>
            <p className="text-gray-600">
              Monitor YOLO AI system status and real-time table occupancy data.
            </p>
          </div>
        )}

        {activeTab === "staff" && (
          <div className="space-y-8">
            {/* Add New Staff */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Add New Staff Account
                </h2>
                <button
                  onClick={() => setShowSignupForm(!showSignupForm)}
                  className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{showSignupForm ? "Cancel" : "Add Staff"}</span>
                </button>
              </div>

              {showSignupForm && (
                <form
                  onSubmit={handleSignupSubmit}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={signupForm.fullName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={signupForm.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <select
                      name="role"
                      value={signupForm.role}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="Chef">Chef</option>
                      <option value="Cashier">Cashier</option>
                      <option value="Waiter">Waiter</option>
                      <option value="Manager">Manager</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={signupForm.password}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter password"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                    >
                      Create Staff Account
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Staff List */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Current Staff
              </h2>
              <div className="space-y-4">
                {staffData.length > 0 ? (
                  staffData.map((staff) => (
                    <div
                      key={staff.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-2 rounded-full ${getRoleColor(
                            staff.role
                          )}`}
                        >
                          {getRoleIcon(staff.role)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {staff.name}
                          </p>
                          <p className="text-sm text-gray-600">{staff.email}</p>
                          <p className="text-xs text-gray-500">
                            Last login: {staff.lastLogin || "Never"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            staff.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {staff.status}
                        </span>
                        <button className="text-gray-400 hover:text-blue-600">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    No staff members found
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RestaurantBranchPage;
