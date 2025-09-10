import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Phone, Building } from "lucide-react";
import axios from "axios";

function AddRestaurantBranch() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    restaurantName: "",
    address: "",
    contactNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("idToken");
      console.log("Submitting restaurant data:", formData);
      console.log(
        "Using token:",
        token ? `${token.substring(0, 20)}...` : "No token"
      );

      const response = await axios.post(
        "http://127.0.0.1:5050/restaurants/add",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Backend response:", response);

      if (response.status === 201) {
        // Successfully added restaurant
        console.log("Restaurant added successfully, navigating to dashboard");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Error adding restaurant:", err);
      console.error("Error response:", err.response);

      if (err.response?.status === 401) {
        setError("Authentication failed. Please login again.");
        // Clear auth data and redirect to login
        localStorage.removeItem("idToken");
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        setError(
          err.response?.data?.error || "Failed to add restaurant branch"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Add New Branch
              </h1>
              <p className="text-gray-600">Create a new restaurant location</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Restaurant Name */}
            <div>
              <label
                htmlFor="restaurantName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <Building className="w-4 h-4 inline mr-2" />
                Restaurant Name
              </label>
              <input
                type="text"
                id="restaurantName"
                name="restaurantName"
                value={formData.restaurantName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter restaurant name"
              />
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <MapPin className="w-4 h-4 inline mr-2" />
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter full address"
              />
            </div>

            {/* Contact Number */}
            <div>
              <label
                htmlFor="contactNumber"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <Phone className="w-4 h-4 inline mr-2" />
                Contact Number
              </label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter contact number"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg font-medium transition-colors duration-200"
              >
                {loading ? "Adding..." : "Add Branch"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddRestaurantBranch;
