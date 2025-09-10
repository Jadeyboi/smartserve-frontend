import { useState, useEffect } from "react";
import { DashboardHeader } from "../components";
import { showToast } from "../App";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  UserPlus,
  Users,
  Shield,
  Clock,
  Mail,
  Phone,
  CheckCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import axios from "axios";

function StaffAccountManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newStaffCredentials, setNewStaffCredentials] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    position: "Server",
    contactNumber: "",
  });

  // Staff data state
  const [staffMembers, setStaffMembers] = useState([]);

  const roles = [
    "Server",
    "Chef",
    "Cashier",
    "Kitchen Staff",
    "Manager",
    "Host",
    "Bartender",
  ];
  const statuses = ["all", "Active", "Inactive", "Suspended"];

  const filteredStaff = staffMembers.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || staff.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-gray-100 text-gray-800";
      case "Suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "Manager":
        return "bg-purple-100 text-purple-800";
      case "Chef":
        return "bg-orange-100 text-orange-800";
      case "Server":
        return "bg-blue-100 text-blue-800";
      case "Cashier":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData((prev) => ({ ...prev, password }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Get the access token for authentication
      const token = localStorage.getItem("access_token");

      if (!token) {
        setError("Authentication required. Please login again.");
        return;
      }

      const response = await axios.post(
        "http://127.0.0.1:5050/users/staffs/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        // Create new staff member object for local state
        const newStaffMember = {
          id: Date.now(), // Generate a temporary ID
          name: `${formData.firstname} ${formData.lastname}`,
          email: formData.email,
          phone: formData.contactNumber || "N/A",
          role: formData.position,
          status: "Active",
          joinDate: new Date().toISOString().split("T")[0], // Today's date
          avatar: `${formData.firstname[0]}${formData.lastname[0]}`,
          permissions: ["orders"], // Default permissions
        };

        // Add new staff member to local state
        setStaffMembers((prev) => [...prev, newStaffMember]);

        // Store the credentials to show to the manager
        setNewStaffCredentials({
          email: formData.email,
          password: formData.password,
          name: `${formData.firstname} ${formData.lastname}`,
          position: formData.position,
        });

        // Close the add modal and show credentials modal
        setShowAddModal(false);
        setShowCredentialsModal(true);

        // Show success toast
        showToast.success(
          `Staff member ${formData.firstname} ${formData.lastname} added successfully!`
        );

        // Show success message
        setSuccessMessage(
          `Staff member ${formData.firstname} ${formData.lastname} added successfully!`
        );

        // Clear success message after 5 seconds
        setTimeout(() => setSuccessMessage(""), 5000);

        // Reset form
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          position: "Server",
          contactNumber: "",
        });
      }
    } catch (err) {
      console.error("Error creating staff member:", err);
      const errorMessage =
        err.response?.data?.error ||
        "Failed to create staff member. Please try again.";
      setError(errorMessage);
      showToast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeCredentialsModal = () => {
    setShowCredentialsModal(false);
    setNewStaffCredentials(null);
  };

  // Function to check current user authentication
  const checkUserAuth = () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        // Decode JWT token to see user info (this is just for debugging)
        const payload = JSON.parse(atob(token.split(".")[1]));
        console.log("Current user info:", payload);
        showToast.success(
          `Authenticated as: ${payload.email || "Unknown user"}`
        );
        return payload;
      } catch (error) {
        console.log("Error decoding token:", error);
        showToast.error("Invalid authentication token");
      }
    } else {
      showToast.error("No authentication token found");
    }
    return null;
  };

  // Function to refresh staff data from backend
  const refreshStaffData = async () => {
    const loadingToast = showToast.loading("Refreshing staff data...");
    try {
      const token = localStorage.getItem("access_token");
      console.log(
        "Attempting to refresh staff data with token:",
        token ? "Present" : "Missing"
      );

      // Try to fetch from admin route first, then fallback to staff route
      let response = await fetch("http://127.0.0.1:5050/users/admins/staffs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Admin route response status:", response.status);

      // If admin route fails, try the regular staff route
      if (!response.ok) {
        console.log("Admin route failed, trying staff route...");
        response = await fetch("http://127.0.0.1:5050/users/staffs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Staff route response status:", response.status);
      }

      if (response.ok) {
        const data = await response.json();
        console.log("Backend response data:", data);
        if (Array.isArray(data)) {
          const processedStaff = data.map((staff) => ({
            id: staff.id,
            name: `${staff.firstname} ${staff.lastname}`.trim(),
            email: staff.email,
            phone: staff.contactNumber || "N/A",
            role: staff.position,
            status: "Active",
            joinDate: staff.joinDate || new Date().toISOString().split("T")[0],
            avatar: `${staff.firstname?.[0] || "S"}${
              staff.lastname?.[0] || "T"
            }`,
            permissions: ["orders"], // Default permissions
          }));
          console.log("Processed staff data:", processedStaff);
          setStaffMembers(processedStaff);
          showToast.dismiss();
          showToast.success(
            `Successfully loaded ${processedStaff.length} staff members`
          );
        } else {
          console.log("Response data is not an array:", typeof data, data);
          showToast.dismiss();
          showToast.error("Invalid data format received from server");
        }
      } else {
        console.log("Backend response not OK:", response.status);
        const errorText = await response.text();
        console.log("Error response:", errorText);
        showToast.dismiss();
        showToast.error(`Failed to refresh staff data: ${response.status}`);
      }
    } catch (error) {
      console.warn("Failed to refresh staff data from backend:", error);
      showToast.dismiss();
      showToast.error("Network error while refreshing staff data");
      // Keep using local state if backend refresh fails
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Staff Account Management
            </h1>
            <p className="text-gray-600 text-lg">
              Manage your restaurant staff accounts and permissions
            </p>
            {successMessage && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                {successMessage}
              </div>
            )}
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-all duration-200 shadow-md flex items-center space-x-2 mt-4 sm:mt-0"
          >
            <UserPlus className="w-5 h-5" />
            <span>Add Staff Member</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Staff</p>
                <p className="text-2xl font-bold text-gray-900">
                  {staffMembers.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Active Staff
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {staffMembers.filter((s) => s.status === "Active").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  New This Month
                </p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Pending Invites
                </p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search staff by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role === "all" ? "All Roles" : role}
                  </option>
                ))}
              </select>
              <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>More Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Staff Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Current Staff Members
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={checkUserAuth}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <span>Check Auth</span>
                </button>
                <button
                  onClick={async () => {
                    const loadingToast = showToast.loading(
                      "Testing endpoint..."
                    );
                    try {
                      const response = await fetch(
                        "http://127.0.0.1:5050/users/staffs"
                      );
                      console.log(
                        "Test staff endpoint response:",
                        response.status
                      );
                      if (response.ok) {
                        const data = await response.json();
                        console.log("Test staff endpoint data:", data);
                        showToast.dismiss();
                        showToast.success(
                          `Endpoint test successful! Status: ${response.status}`
                        );
                      } else {
                        showToast.dismiss();
                        showToast.error(
                          `Endpoint test failed! Status: ${response.status}`
                        );
                      }
                    } catch (error) {
                      console.log("Test staff endpoint error:", error);
                      showToast.dismiss();
                      showToast.error("Network error during endpoint test");
                    }
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  <span>Test Endpoint</span>
                </button>
                <button
                  onClick={refreshStaffData}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Refresh</span>
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Staff Member
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Join Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Permissions
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStaff.map((staff) => (
                  <tr key={staff.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-red-600">
                            {staff.avatar}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {staff.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {staff.email}
                          </div>
                          <div className="text-sm text-gray-500">
                            {staff.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(
                          staff.role
                        )}`}
                      >
                        {staff.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          staff.status
                        )}`}
                      >
                        {staff.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(staff.joinDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {staff.permissions.map((permission, index) => (
                          <span
                            key={index}
                            className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded"
                          >
                            {permission}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900 transition-colors duration-200">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900 transition-colors duration-200">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">{filteredStaff.length}</span> of{" "}
            <span className="font-medium">{staffMembers.length}</span> results
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-2 bg-red-600 text-white rounded-md text-sm font-medium">
              1
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Add New Staff Member
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors text-2xl"
              >
                ×
              </button>
            </div>

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter first name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="staff@restaurant.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="+63 917 123 4567"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position/Role *
                  </label>
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter password"
                      required
                    />
                    <button
                      type="button"
                      onClick={generatePassword}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Generate
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    This will be the staff member's login password
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>Create Staff Account</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Staff Credentials Modal */}
      {showCredentialsModal && newStaffCredentials && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Staff Account Created Successfully!
              </h2>
              <p className="text-gray-600">
                Here are the login credentials for {newStaffCredentials.name}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={newStaffCredentials.email}
                      readOnly
                      className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-mono"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        navigator.clipboard.writeText(newStaffCredentials.email)
                      }
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={newStaffCredentials.password}
                      readOnly
                      className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-mono"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          newStaffCredentials.password
                        )
                      }
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium mb-1">Important:</p>
                  <ul className="space-y-1">
                    <li>
                      • Share these credentials securely with the staff member
                    </li>
                    <li>• They can use these to login at the Staff Portal</li>
                    <li>
                      • Recommend they change their password after first login
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={closeCredentialsModal}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StaffAccountManagement;
