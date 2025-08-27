import { DashboardHeader, AddAICard, AIInstanceCard } from "../components";
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
  Search,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { restaurantAPI, menuAPI, aiAPI, staffAPI } from "../utils/api";
import axios from "axios";

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

  // Menu management state
  const [showMenuForm, setShowMenuForm] = useState(false);
  const [showDishForm, setShowDishForm] = useState(null);
  const [menuForm, setMenuForm] = useState({
    menuName: "",
  });
  const [dishForm, setDishForm] = useState({
    dishName: "",
    dishDescription: "",
    price: "",
    category: "",
    imageURL: "",
  });
  const [menuFormLoading, setMenuFormLoading] = useState(false);
  const [dishFormLoading, setDishFormLoading] = useState(false);
  const [staffFormLoading, setStaffFormLoading] = useState(false);
  const [staffSearchTerm, setStaffSearchTerm] = useState("");
  const [staffFilterRole, setStaffFilterRole] = useState("");
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState([]);

  // AI Management state
  const [aiInstances, setAiInstances] = useState([
    {
      id: 1,
      name: "YOLO Table Detection",
      url: "https://api.smartserve.com/yolo/table-detection",
      status: "running",
      isRunning: true,
      lastActive: "2 seconds ago",
    },
    {
      id: 2,
      name: "Customer Count AI",
      url: "https://api.smartserve.com/ai/customer-count",
      status: "stopped",
      isRunning: false,
      lastActive: "5 minutes ago",
    },
  ]);

  // Fetch branch data from backend API
  useEffect(() => {
    const fetchBranchData = async () => {
      try {
        setLoading(true);
        console.log("Fetching data for restaurant ID:", id);

        // Fetch branch details
        try {
          const branch = await restaurantAPI.getById(id);
          console.log("Received branch data:", branch);

          // Transform backend data to match component expectations
          const transformedBranch = {
            id: branch.restaurantID || branch.id || id,
            name: branch.restaurantName || "Unknown Restaurant",
            location: branch.address || "Address not specified",
            status: "active", // Default status since backend doesn't have this
            totalTables: 0, // Default values since backend doesn't have these
            totalChairs: 0,
            occupancyRate: 0,
            rating: 0,
            phone: branch.contactNumber || "Phone not specified",
            email: "email@restaurant.com", // Default since backend doesn't have this
            operatingHours: "10:00 AM - 10:00 PM", // Default
            manager: "Manager not assigned", // Default
            staffCount: 0, // Default
            lastUpdated: "Just now", // Default
            address: {
              street: branch.address || "Address not specified",
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
          };

          setBranchData(transformedBranch);
        } catch (apiError) {
          console.error("API call failed, using mock data:", apiError);
          // Use mock data if API fails
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
        }

        // Fetch menu data
        try {
          const menu = await menuAPI.getByRestaurant(id);
          console.log("Raw menu data:", menu);

          // Fetch dishes for each menu
          const menuWithDishes = {};
          if (Array.isArray(menu)) {
            for (const menuItem of menu) {
              try {
                const dishes = await menuAPI.getWithDishes(
                  menuItem.menuID || menuItem.id
                );
                menuWithDishes[menuItem.menuID || menuItem.id] = {
                  ...menuItem,
                  dishes: dishes.dishes || [],
                };
              } catch (err) {
                console.warn(
                  `Failed to fetch dishes for menu ${menuItem.menuID}:`,
                  err
                );
                menuWithDishes[menuItem.menuID || menuItem.id] = {
                  ...menuItem,
                  dishes: [],
                };
              }
            }
          }

          console.log("Menu data with dishes:", menuWithDishes);
          setMenuData(menuWithDishes);
        } catch (err) {
          console.warn("Menu data not available:", err);
          setMenuData({});
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
      } finally {
        setLoading(false);
      }
    };

    fetchBranchData();
  }, [id]);

  const handleBackClick = () => {
    navigate("/dashboard");
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setStaffFormLoading(true);

    try {
      const token = localStorage.getItem("access_token");

      // Split full name into first, middle, and last names
      const nameParts = signupForm.fullName.trim().split(" ");
      const firstname = nameParts[0] || "";
      const lastname = nameParts[nameParts.length - 1] || "";
      const middlename = nameParts.slice(1, -1).join(" ") || "";

      const response = await staffAPI.create({
        firstname,
        middlename,
        lastname,
        email: signupForm.email,
        password: signupForm.password,
        position: signupForm.role.toLowerCase(),
        restaurantID: id,
      });

      // The API utility returns the response data directly
      // Add the new staff member to the local state
      const newStaff = {
        id: response.user?.id || Date.now(), // Fallback ID if backend doesn't return one
        name: `${firstname} ${lastname}`.trim(),
        role: signupForm.role,
        email: signupForm.email,
        status: "active",
        lastLogin: "Never",
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

      // Refresh staff data to show the new member
      await refreshStaffData();
    } catch (err) {
      console.error("Error creating staff member:", err);
      if (err.response?.data?.error) {
        alert(`Failed to create staff member: ${err.response.data.error}`);
      } else if (err.code === "ERR_NETWORK") {
        alert(
          "Network error: Please check if the backend server is running and CORS is properly configured."
        );
      } else {
        alert("Failed to create staff member. Please try again.");
      }
    } finally {
      setStaffFormLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Menu management functions
  const handleMenuInputChange = (e) => {
    const { name, value } = e.target;
    setMenuForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDishInputChange = (e) => {
    const { name, value } = e.target;
    setDishForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    setMenuFormLoading(true);

    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(
        "http://127.0.0.1:5050/menus/add/menu",
        {
          menuName: menuForm.menuName,
          restaurantID: id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        // Reset form and refresh menu data
        setMenuForm({ menuName: "" });
        setShowMenuForm(false);

        // Refresh menu data
        await refreshMenuData();
      }
    } catch (err) {
      console.error("Error creating menu:", err);
      alert("Failed to create menu. Please try again.");
    } finally {
      setMenuFormLoading(false);
    }
  };

  const handleDishSubmit = async (e, menuId) => {
    e.preventDefault();
    setDishFormLoading(true);

    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(
        "http://127.0.0.1:5050/dishes/add/dish",
        {
          ...dishForm,
          menuID: menuId,
          status: "available",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        // Reset form and hide dish form
        setDishForm({
          dishName: "",
          dishDescription: "",
          price: "",
          category: "",
          imageURL: "",
        });
        setShowDishForm(null);

        // Refresh menu data to show new dish
        await refreshMenuData();
      }
    } catch (err) {
      console.error("Error adding dish:", err);
      alert("Failed to add dish. Please try again.");
    } finally {
      setDishFormLoading(false);
    }
  };

  const handleDeleteMenu = async (menuId) => {
    if (
      !confirm(
        "Are you sure you want to delete this menu? This will also delete all dishes in the menu."
      )
    ) {
      return;
    }

    try {
      // For now, just remove from local state
      // In a real app, you'd call a delete API endpoint
      const updatedMenuData = { ...menuData };
      delete updatedMenuData[menuId];
      setMenuData(updatedMenuData);
      alert("Menu deleted successfully");
    } catch (err) {
      console.error("Error deleting menu:", err);
      alert("Failed to delete menu. Please try again.");
    }
  };

  const handleDeleteDish = async (dishId) => {
    if (!confirm("Are you sure you want to delete this dish?")) {
      return;
    }

    try {
      // For now, just remove from local state
      // In a real app, you'd call a delete API endpoint
      const updatedMenuData = { ...menuData };
      Object.keys(updatedMenuData).forEach((menuId) => {
        if (updatedMenuData[menuId].dishes) {
          updatedMenuData[menuId].dishes = updatedMenuData[
            menuId
          ].dishes.filter((dish) => (dish.id || dish.dishID) !== dishId);
        }
      });
      setMenuData(updatedMenuData);
      alert("Dish deleted successfully");
    } catch (err) {
      console.error("Error deleting dish:", err);
      alert("Failed to delete dish. Please try again.");
    }
  };

  // Function to refresh menu data
  const refreshMenuData = async () => {
    try {
      const menu = await menuAPI.getByRestaurant(id);
      console.log("Refreshing menu data:", menu);

      // Fetch dishes for each menu
      const menuWithDishes = {};
      if (Array.isArray(menu)) {
        for (const menuItem of menu) {
          try {
            const dishes = await menuAPI.getWithDishes(
              menuItem.menuID || menuItem.id
            );
            menuWithDishes[menuItem.menuID || menuItem.id] = {
              ...menuItem,
              dishes: dishes.dishes || [],
            };
          } catch (err) {
            console.warn(
              `Failed to fetch dishes for menu ${menuItem.menuID}:`,
              err
            );
            menuWithDishes[menuItem.menuID || menuItem.id] = {
              ...menuItem,
              dishes: [],
            };
          }
        }
      }

      setMenuData(menuWithDishes);
    } catch (err) {
      console.error("Failed to refresh menu data:", err);
    }
  };

  // Function to refresh staff data
  const refreshStaffData = async () => {
    try {
      const staff = await staffAPI.getByRestaurant(id);
      setStaffData(staff);
    } catch (err) {
      console.error("Failed to refresh staff data:", err);
    }
  };

  // Staff management functions
  const handleEditStaff = (staff) => {
    // For now, just show an alert. In a real app, you'd open an edit form
    alert(`Edit functionality for ${staff.name} would be implemented here.`);
  };

  const handleDeleteStaff = async (staffId) => {
    if (
      !confirm(
        "Are you sure you want to delete this staff member? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      // For now, just remove from local state
      // In a real app, you'd call a delete API endpoint
      const updatedStaffData = staffData.filter(
        (staff) => staff.id !== staffId
      );
      setStaffData(updatedStaffData);
      alert("Staff member deleted successfully");
    } catch (err) {
      console.error("Error deleting staff member:", err);
      alert("Failed to delete staff member. Please try again.");
    }
  };

  const handleToggleStaffStatus = (staffId) => {
    const updatedStaffData = staffData.map((staff) =>
      staff.id === staffId
        ? {
            ...staff,
            status: staff.status === "active" ? "inactive" : "active",
          }
        : staff
    );
    setStaffData(updatedStaffData);
  };

  // Filter and search staff data
  const filteredStaffData = staffData.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(staffSearchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(staffSearchTerm.toLowerCase()) ||
      staff.role.toLowerCase().includes(staffSearchTerm.toLowerCase());

    const matchesRole =
      !staffFilterRole ||
      staff.role.toLowerCase() === staffFilterRole.toLowerCase();

    return matchesSearch && matchesRole;
  });

  // Bulk actions functions
  const handleSelectAllStaff = () => {
    if (selectedStaff.length === filteredStaffData.length) {
      setSelectedStaff([]);
    } else {
      setSelectedStaff(filteredStaffData.map((staff) => staff.id));
    }
  };

  const handleSelectStaff = (staffId) => {
    if (selectedStaff.includes(staffId)) {
      setSelectedStaff(selectedStaff.filter((id) => id !== staffId));
    } else {
      setSelectedStaff([...selectedStaff, staffId]);
    }
  };

  const handleBulkStatusChange = (newStatus) => {
    const updatedStaffData = staffData.map((staff) =>
      selectedStaff.includes(staff.id) ? { ...staff, status: newStatus } : staff
    );
    setStaffData(updatedStaffData);
    setSelectedStaff([]);
    setShowBulkActions(false);
    alert(
      `Updated ${selectedStaff.length} staff members to ${newStatus} status`
    );
  };

  const handleBulkDelete = () => {
    if (
      !confirm(
        `Are you sure you want to delete ${selectedStaff.length} staff members? This action cannot be undone.`
      )
    ) {
      return;
    }

    const updatedStaffData = staffData.filter(
      (staff) => !selectedStaff.includes(staff.id)
    );
    setStaffData(updatedStaffData);
    setSelectedStaff([]);
    setShowBulkActions(false);
    alert(`Deleted ${selectedStaff.length} staff members successfully`);
  };

  // AI Management handlers
  const handleStartAI = (aiId) => {
    setAiInstances((prev) =>
      prev.map((ai) =>
        ai.id === aiId ? { ...ai, isRunning: true, status: "running" } : ai
      )
    );
    // TODO: Implement actual start logic
    console.log("Starting AI:", aiId);
  };

  const handleStopAI = (aiId) => {
    setAiInstances((prev) =>
      prev.map((ai) =>
        ai.id === aiId ? { ...ai, isRunning: false, status: "stopped" } : ai
      )
    );
    // TODO: Implement actual stop logic
    console.log("Stopping AI:", aiId);
  };

  const handleDeleteAI = (aiId) => {
    setAiInstances((prev) => prev.filter((ai) => ai.id !== aiId));
    // TODO: Implement actual delete logic
    console.log("Deleting AI:", aiId);
  };

  const handleAddAI = (newAI) => {
    const aiInstance = {
      id: Date.now(),
      name: newAI.name,
      url: newAI.url,
      status: "stopped",
      isRunning: false,
      lastActive: "Never",
    };
    setAiInstances((prev) => [...prev, aiInstance]);
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
              <p className="text-sm text-gray-500 mt-2">Restaurant ID: {id}</p>
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
            <p className="text-red-600 text-sm mt-2">Restaurant ID: {id}</p>
            <p className="text-red-600 text-sm mt-2">
              Branch Data: {JSON.stringify(branchData)}
            </p>
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

          {/* Debug Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-blue-800 text-sm">
              <strong>Debug Info:</strong> Restaurant ID: {id}, Branch Data:{" "}
              {branchData ? "Loaded" : "Not loaded"}, Error: {error || "None"}
            </p>
          </div>

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
          <div className="space-y-8">
            {/* Menu Management Header */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Menu Management
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Create and manage menus for {branchData.name}
                  </p>
                </div>
                <button
                  onClick={() => setShowMenuForm(!showMenuForm)}
                  className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                  <span>{showMenuForm ? "Cancel" : "Create Menu"}</span>
                </button>
              </div>

              {/* Create New Menu Form */}
              {showMenuForm && (
                <form
                  onSubmit={handleMenuSubmit}
                  className="bg-gray-50 rounded-lg p-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Menu Name
                      </label>
                      <input
                        type="text"
                        name="menuName"
                        value={menuForm.menuName}
                        onChange={handleMenuInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="e.g., Breakfast Menu, Lunch Menu"
                        required
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        type="submit"
                        disabled={menuFormLoading}
                        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                      >
                        {menuFormLoading ? "Creating..." : "Create Menu"}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Existing Menus */}
            {Object.keys(menuData).length > 0 ? (
              Object.entries(menuData).map(([menuId, menu]) => (
                <div
                  key={menuId}
                  className="bg-white rounded-2xl shadow-lg p-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {menu.menuName || "Unnamed Menu"}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Menu ID: {menu.menuID || menuId}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setShowDishForm(menuId)}
                        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors duration-200"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Dish</span>
                      </button>
                      <button
                        onClick={() => handleDeleteMenu(menuId)}
                        className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>

                  {/* Add Dish Form */}
                  {showDishForm === menuId && (
                    <form
                      onSubmit={(e) => handleDishSubmit(e, menuId)}
                      className="bg-gray-50 rounded-lg p-6 mb-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Dish Name
                          </label>
                          <input
                            type="text"
                            name="dishName"
                            value={dishForm.dishName}
                            onChange={handleDishInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="e.g., Margherita Pizza"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category
                          </label>
                          <select
                            name="category"
                            value={dishForm.category}
                            onChange={handleDishInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            required
                          >
                            <option value="">Select Category</option>
                            <option value="appetizer">Appetizer</option>
                            <option value="main">Main Course</option>
                            <option value="dessert">Dessert</option>
                            <option value="beverage">Beverage</option>
                            <option value="side">Side Dish</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Price (₱)
                          </label>
                          <input
                            type="number"
                            name="price"
                            value={dishForm.price}
                            onChange={handleDishInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                          </label>
                          <textarea
                            name="dishDescription"
                            value={dishForm.dishDescription}
                            onChange={handleDishInputChange}
                            rows="3"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="Describe the dish..."
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Image URL
                          </label>
                          <input
                            type="url"
                            name="imageURL"
                            value={dishForm.imageURL}
                            onChange={handleDishInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                        <div className="md:col-span-3">
                          <button
                            type="submit"
                            disabled={dishFormLoading}
                            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                          >
                            {dishFormLoading ? "Adding..." : "Add Dish"}
                          </button>
                        </div>
                      </div>
                    </form>
                  )}

                  {/* Dishes List */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Dishes
                    </h4>
                    {menu.dishes && menu.dishes.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {menu.dishes.map((dish, index) => (
                          <div
                            key={dish.id || index}
                            className="bg-gray-50 rounded-lg p-4"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-900">
                                  {dish.dishName}
                                </h5>
                                <p className="text-sm text-gray-600">
                                  {dish.dishDescription}
                                </p>
                                <p className="text-lg font-bold text-red-600 mt-2">
                                  ₱{dish.price}
                                </p>
                                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mt-2">
                                  {dish.category}
                                </span>
                              </div>
                              <button
                                onClick={() =>
                                  handleDeleteDish(dish.id || dish.dishID)
                                }
                                className="text-red-500 hover:text-red-700 ml-2"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">
                        No dishes added yet. Click "Add Dish" to get started.
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Utensils className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Menus Created
                </h3>
                <p className="text-gray-600 mb-4">
                  Start by creating your first menu to organize your
                  restaurant's dishes.
                </p>
                <button
                  onClick={() => setShowMenuForm(true)}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Create Your First Menu
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "ai" && (
          <div className="space-y-8">
            {/* AI Instances Management */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">
                  AI Instances Management
                </h2>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-600 font-semibold">
                    Manage AI Services
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <AddAICard onAddAI={handleAddAI} />
              </div>

              {aiInstances.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {aiInstances.map((ai) => (
                    <AIInstanceCard
                      key={ai.id}
                      ai={ai}
                      onStart={handleStartAI}
                      onStop={handleStopAI}
                      onDelete={handleDeleteAI}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* AI System Status */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">
                  System Status
                </h2>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-600 font-semibold">
                    AI System Active
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">📷</span>
                    </div>
                    <div>
                      <p className="text-sm text-blue-600 font-medium">
                        Camera Status
                      </p>
                      <p className="text-2xl font-bold text-blue-900">Online</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">⚡</span>
                    </div>
                    <div>
                      <p className="text-sm text-green-600 font-medium">
                        AI Confidence
                      </p>
                      <p className="text-2xl font-bold text-green-900">94.5%</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">🕒</span>
                    </div>
                    <div>
                      <p className="text-sm text-purple-600 font-medium">
                        Last Update
                      </p>
                      <p className="text-2xl font-bold text-purple-900">
                        2 seconds ago
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 rounded-xl p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">📊</span>
                    </div>
                    <div>
                      <p className="text-sm text-orange-600 font-medium">
                        Data Quality
                      </p>
                      <p className="text-2xl font-bold text-orange-900">
                        Excellent
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                      disabled={staffFormLoading}
                      className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                    >
                      {staffFormLoading
                        ? "Creating..."
                        : "Create Staff Account"}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Staff Statistics */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Staff Overview
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {
                      staffData.filter((s) => s.role.toLowerCase() === "chef")
                        .length
                    }
                  </div>
                  <div className="text-sm text-gray-600">Chefs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {
                      staffData.filter(
                        (s) => s.role.toLowerCase() === "cashier"
                      ).length
                    }
                  </div>
                  <div className="text-sm text-gray-600">Cashiers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {
                      staffData.filter((s) => s.role.toLowerCase() === "waiter")
                        .length
                    }
                  </div>
                  <div className="text-sm text-gray-600">Waiters</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {
                      staffData.filter(
                        (s) => s.role.toLowerCase() === "manager"
                      ).length
                    }
                  </div>
                  <div className="text-sm text-gray-600">Managers</div>
                </div>
              </div>
            </div>

            {/* Staff List */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Current Staff
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search staff..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      onChange={(e) => setStaffSearchTerm(e.target.value)}
                    />
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  <select
                    value={staffFilterRole}
                    onChange={(e) => setStaffFilterRole(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">All Roles</option>
                    <option value="chef">Chef</option>
                    <option value="cashier">Cashier</option>
                    <option value="waiter">Waiter</option>
                    <option value="manager">Manager</option>
                  </select>
                  {filteredStaffData.length > 0 && (
                    <button
                      onClick={() => setShowBulkActions(!showBulkActions)}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
                    >
                      Bulk Actions
                    </button>
                  )}
                </div>

                {/* Bulk Actions */}
                {showBulkActions && (
                  <div className="bg-gray-50 rounded-lg p-4 mt-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={
                              selectedStaff.length === filteredStaffData.length
                            }
                            onChange={handleSelectAllStaff}
                            className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                          />
                          <span className="text-sm font-medium text-gray-700">
                            Select All ({filteredStaffData.length})
                          </span>
                        </label>
                        <span className="text-sm text-gray-600">
                          {selectedStaff.length} staff members selected
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleBulkStatusChange("active")}
                          disabled={selectedStaff.length === 0}
                          className="px-3 py-1 bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white text-sm rounded transition-colors duration-200"
                        >
                          Activate
                        </button>
                        <button
                          onClick={() => handleBulkStatusChange("inactive")}
                          disabled={selectedStaff.length === 0}
                          className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-300 text-white text-sm rounded transition-colors duration-200"
                        >
                          Deactivate
                        </button>
                        <button
                          onClick={handleBulkDelete}
                          disabled={selectedStaff.length === 0}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white text-sm rounded transition-colors duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                {filteredStaffData.length > 0 ? (
                  filteredStaffData.map((staff) => (
                    <div
                      key={staff.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <input
                          type="checkbox"
                          checked={selectedStaff.includes(staff.id)}
                          onChange={() => handleSelectStaff(staff.id)}
                          className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                        />
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
                        <button
                          onClick={() => handleToggleStaffStatus(staff.id)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                            staff.status === "active"
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : "bg-red-100 text-red-800 hover:bg-red-200"
                          }`}
                        >
                          {staff.status}
                        </button>
                        <button
                          onClick={() => handleEditStaff(staff)}
                          className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                          title="Edit Staff Member"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteStaff(staff.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                          title="Delete Staff Member"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    {staffData.length > 0 ? (
                      <p className="text-gray-500">
                        No staff members match your search criteria
                      </p>
                    ) : (
                      <p className="text-gray-500">No staff members found</p>
                    )}
                    {staffData.length > 0 && (
                      <p className="text-sm text-gray-400 mt-2">
                        Showing {filteredStaffData.length} of {staffData.length}{" "}
                        staff members
                      </p>
                    )}
                  </div>
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
