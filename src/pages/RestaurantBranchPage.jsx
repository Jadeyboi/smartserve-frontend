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
import { useState } from "react";

function RestaurantBranchPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data - in real implementation this would come from API based on branch ID
  const branchData = {
    id: parseInt(id),
    name: "Pizza Napoleon - SM City Cebu",
    location: "SM City Cebu, North Reclamation Area, Cebu City, Philippines",
    status: "active",
    totalTables: 25,
    totalChairs: 120,
    occupiedTables: 18,
    vacantTables: 7,
    occupiedChairs: 89,
    vacantChairs: 31,
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
    features: ["Dine-in", "Delivery", "Takeout", "Catering", "Private Events"],
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
  };

  // Mock menu data
  const menuData = {
    breakfast: [
      {
        id: 1,
        name: "Eggs Benedict",
        price: "₱280",
        description: "Poached eggs with hollandaise sauce",
        category: "Breakfast",
      },
      {
        id: 2,
        name: "Pancakes",
        price: "₱180",
        description: "Fluffy pancakes with maple syrup",
        category: "Breakfast",
      },
      {
        id: 3,
        name: "Omelette",
        price: "₱220",
        description: "Three-egg omelette with cheese",
        category: "Breakfast",
      },
    ],
    lunch: [
      {
        id: 4,
        name: "Margherita Pizza",
        price: "₱350",
        description: "Classic tomato and mozzarella",
        category: "Lunch",
      },
      {
        id: 5,
        name: "Caesar Salad",
        price: "₱200",
        description: "Fresh romaine with caesar dressing",
        category: "Lunch",
      },
      {
        id: 6,
        name: "Pasta Carbonara",
        price: "₱280",
        description: "Creamy pasta with bacon",
        category: "Lunch",
      },
    ],
    brunch: [
      {
        id: 7,
        name: "Avocado Toast",
        price: "₱160",
        description: "Sourdough with avocado and eggs",
        category: "Brunch",
      },
      {
        id: 8,
        name: "French Toast",
        price: "₱190",
        description: "Brioche with berries",
        category: "Brunch",
      },
    ],
    dinner: [
      {
        id: 9,
        name: "Pepperoni Pizza",
        price: "₱450",
        description: "Spicy pepperoni with cheese",
        category: "Dinner",
      },
      {
        id: 10,
        name: "Lasagna",
        price: "₱350",
        description: "Layered pasta with meat sauce",
        category: "Dinner",
      },
      {
        id: 11,
        name: "Tiramisu",
        price: "₱180",
        description: "Classic Italian dessert",
        category: "Dinner",
      },
    ],
  };

  // Mock AI real-time data
  const aiData = {
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
        status: "occupied",
        seats: 6,
        occupiedSeats: 3,
        timeOccupied: "12 min",
      },
      {
        id: 3,
        status: "vacant",
        seats: 4,
        occupiedSeats: 0,
        timeOccupied: "0 min",
      },
      {
        id: 4,
        status: "occupied",
        seats: 2,
        occupiedSeats: 2,
        timeOccupied: "28 min",
      },
      {
        id: 5,
        status: "vacant",
        seats: 6,
        occupiedSeats: 0,
        timeOccupied: "0 min",
      },
      {
        id: 6,
        status: "occupied",
        seats: 4,
        occupiedSeats: 4,
        timeOccupied: "1h 15m",
      },
      {
        id: 7,
        status: "occupied",
        seats: 8,
        occupiedSeats: 6,
        timeOccupied: "33 min",
      },
      {
        id: 8,
        status: "vacant",
        seats: 4,
        occupiedSeats: 0,
        timeOccupied: "0 min",
      },
      {
        id: 9,
        status: "occupied",
        seats: 2,
        occupiedSeats: 2,
        timeOccupied: "52 min",
      },
      {
        id: 10,
        status: "occupied",
        seats: 6,
        occupiedSeats: 4,
        timeOccupied: "19 min",
      },
    ],
  };

  // Mock staff data
  const staffData = [
    {
      id: 1,
      name: "Juan Dela Cruz",
      role: "Chef",
      email: "juan@pizzanapoleon.com",
      status: "active",
      lastLogin: "2 hours ago",
    },
    {
      id: 2,
      name: "Ana Rodriguez",
      role: "Cashier",
      email: "ana@pizzanapoleon.com",
      status: "active",
      lastLogin: "1 hour ago",
    },
    {
      id: 3,
      name: "Carlos Martinez",
      role: "Waiter",
      email: "carlos@pizzanapoleon.com",
      status: "active",
      lastLogin: "30 min ago",
    },
    {
      id: 4,
      name: "Maria Garcia",
      role: "Chef",
      email: "maria@pizzanapoleon.com",
      status: "inactive",
      lastLogin: "2 days ago",
    },
  ];

  const handleBackClick = () => {
    navigate("/dashboard");
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
          <>
            {/* Key Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-600 font-medium">
                      Total Tables
                    </p>
                    <p className="text-2xl font-bold text-blue-900">
                      {branchData.totalTables}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-green-600 font-medium">
                      Occupancy Rate
                    </p>
                    <p className="text-2xl font-bold text-green-900">
                      {branchData.occupancyRate}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-purple-600 font-medium">
                      Rating
                    </p>
                    <p className="text-2xl font-bold text-purple-900">
                      {branchData.rating}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-orange-600 font-medium">
                      Daily Customers
                    </p>
                    <p className="text-2xl font-bold text-orange-900">
                      {branchData.dailyCustomers}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Information Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Basic Information */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Basic Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="font-medium text-gray-900">Address</p>
                      <p className="text-gray-600">
                        {branchData.address.street}
                      </p>
                      <p className="text-gray-600">
                        {branchData.address.area}, {branchData.address.city}
                      </p>
                      <p className="text-gray-600">
                        {branchData.address.province}{" "}
                        {branchData.address.zipCode}
                      </p>
                      <p className="text-gray-600">
                        {branchData.address.country}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p className="text-gray-600">{branchData.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-gray-600">{branchData.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Operating Hours
                      </p>
                      <p className="text-gray-600">
                        {branchData.operatingHours}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Details */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Business Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-gray-900">Cuisine Type</p>
                    <p className="text-gray-600">{branchData.cuisine}</p>
                  </div>

                  <div>
                    <p className="font-medium text-gray-900">Features</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {branchData.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="font-medium text-gray-900">Payment Methods</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {branchData.paymentMethods.map((method, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                        >
                          {method}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="font-medium text-gray-900">Manager</p>
                    <p className="text-gray-600">{branchData.manager}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Performance Metrics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <p className="text-3xl font-bold text-blue-600 mb-2">
                    {branchData.averageOrderValue}
                  </p>
                  <p className="text-gray-600">Average Order Value</p>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <p className="text-3xl font-bold text-green-600 mb-2">
                    {branchData.monthlyRevenue}
                  </p>
                  <p className="text-gray-600">Monthly Revenue</p>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <p className="text-3xl font-bold text-purple-600 mb-2">
                    {branchData.staffCount}
                  </p>
                  <p className="text-gray-600">Staff Members</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Menu Management Tab */}
        {activeTab === "menu" && (
          <div className="space-y-8">
            {/* Add New Menu Item */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Add New Menu Item
                </h2>
                <button className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                  <Plus className="w-4 h-4" />
                  <span>Add Dish</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dish Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter dish name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="₱0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    <option>Breakfast Menu</option>
                    <option>Lunch Menu</option>
                    <option>Brunch Menu</option>
                    <option>Dinner Menu</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter dish description"
                  />
                </div>
              </div>
            </div>

            {/* Menu Categories */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Breakfast Menu */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    🍳 Breakfast Menu
                  </h3>
                  <button className="text-red-600 hover:text-red-700">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-3">
                  {menuData.breakfast.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-red-600">
                          {item.price}
                        </span>
                        <button className="text-gray-400 hover:text-red-600">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lunch Menu */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    🍕 Lunch Menu
                  </h3>
                  <button className="text-red-600 hover:text-red-700">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-3">
                  {menuData.lunch.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-red-600">
                          {item.price}
                        </span>
                        <button className="text-gray-400 hover:text-red-600">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Brunch Menu */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    🥐 Brunch Menu
                  </h3>
                  <button className="text-red-600 hover:text-red-700">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-3">
                  {menuData.brunch.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-red-600">
                          {item.price}
                        </span>
                        <button className="text-gray-400 hover:text-red-600">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dinner Menu */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    🍽️ Dinner Menu
                  </h3>
                  <button className="text-red-600 hover:text-red-700">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-3">
                  {menuData.dinner.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-red-600">
                          {item.price}
                        </span>
                        <button className="text-gray-400 hover:text-red-600">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Management Tab */}
        {activeTab === "ai" && (
          <div className="space-y-8">
            {/* AI System Status */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  YOLO AI System Status
                </h2>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-600 font-semibold">
                    AI System Active
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="flex items-center space-x-3">
                    <Camera className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="text-sm text-blue-600 font-medium">
                        Camera Status
                      </p>
                      <p className="text-2xl font-bold text-blue-900">
                        {aiData.cameraStatus}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-6">
                  <div className="flex items-center space-x-3">
                    <Activity className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="text-sm text-green-600 font-medium">
                        AI Confidence
                      </p>
                      <p className="text-2xl font-bold text-green-900">
                        {aiData.aiConfidence}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-6">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-8 h-8 text-purple-600" />
                    <div>
                      <p className="text-sm text-purple-600 font-medium">
                        Last Update
                      </p>
                      <p className="text-2xl font-bold text-purple-900">
                        {aiData.lastUpdate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Real-time Table Monitoring */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-gray-600" />
                  Real-time Table Monitoring
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {aiData.tableStatus.map((table) => (
                    <div
                      key={table.id}
                      className={`p-4 rounded-xl border-2 ${
                        table.status === "occupied"
                          ? "border-red-200 bg-red-50"
                          : "border-green-200 bg-green-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-gray-900">
                          Table {table.id}
                        </h4>
                        <div
                          className={`p-2 rounded-full ${getStatusBgColor(
                            table.status
                          )}`}
                        >
                          {getStatusIcon(table.status)}
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Capacity:</span>
                          <span className="font-medium">
                            {table.seats} seats
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Occupied:</span>
                          <span
                            className={`font-medium ${getStatusColor(
                              table.status
                            )}`}
                          >
                            {table.occupiedSeats}/{table.seats}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Time:</span>
                          <span className="font-medium">
                            {table.timeOccupied}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Staff Management Tab */}
        {activeTab === "staff" && (
          <div className="space-y-8">
            {/* Add New Staff */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Add New Staff Account
                </h2>
                <button className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                  <UserPlus className="w-4 h-4" />
                  <span>Add Staff</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    <option>Chef</option>
                    <option>Cashier</option>
                    <option>Waiter</option>
                    <option>Manager</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter password"
                  />
                </div>
              </div>
            </div>

            {/* Staff List */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Current Staff
              </h2>
              <div className="space-y-4">
                {staffData.map((staff) => (
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
                          Last login: {staff.lastLogin}
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
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RestaurantBranchPage;
