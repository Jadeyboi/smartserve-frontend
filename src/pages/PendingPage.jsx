import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { DashboardHeader } from "../components";
import api from "../utils/api";
import {
  Clock,
  Users,
  Calendar,
  Utensils,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Filter,
  Search,
  RefreshCw,
  Bell,
  UserPlus,
  Menu,
  CreditCard,
  Star,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";

function PendingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const restaurantId = searchParams.get("restaurant");
  const tabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState(tabParam || "all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // State for different types of pending items
  const [pendingItems, setPendingItems] = useState({
    reservations: [],
    confirmedReservations: [],
    rejectedReservations: [],
    staffApplications: [],
    menuChanges: [],
    reviews: [],
    orders: [],
    payments: [],
  });

  const [loading, setLoading] = useState(true);

  // Load pending items from backend
  useEffect(() => {
    loadPendingItems();
  }, []);

  const loadPendingItems = async () => {
    try {
      setLoading(true);

      // Get current user's restaurant ID
      const currentUser = api.utils.getCurrentUser();
      if (!currentUser) {
        console.error("No user found, cannot load pending items");
        console.log("Available localStorage items:", {
          idToken: localStorage.getItem("idToken"),
          user: localStorage.getItem("user"),
          currentUser: localStorage.getItem("currentUser"),
          isAuthenticated: localStorage.getItem("isAuthenticated"),
        });
        setPendingItems({
          reservations: [],
          confirmedReservations: [],
          rejectedReservations: [],
          staffApplications: [],
          menuChanges: [],
          reviews: [],
          orders: [],
          payments: [],
        });
        return;
      }

      // Get restaurant ID - prioritize URL parameter, then fallback to other methods
      let finalRestaurantId = restaurantId; // From URL parameter

      if (!finalRestaurantId) {
        try {
          // First try to get owned restaurants
          const ownedRestaurants = await api.restaurants.getAll();
          console.log("Owned restaurants:", ownedRestaurants);
          console.log("Restaurants response type:", typeof ownedRestaurants);
          console.log("Restaurants length:", ownedRestaurants?.length);

          if (ownedRestaurants && ownedRestaurants.length > 0) {
            finalRestaurantId =
              ownedRestaurants[0].restaurantID || ownedRestaurants[0].id;
            console.log(
              "Selected restaurant ID from owned restaurants:",
              finalRestaurantId
            );
          } else {
            console.warn("No restaurants found in ownedRestaurants");

            // Fallback: try to get any restaurant from the database
            // This matches your demo approach where you get restaurantID from menu
            try {
              const token = localStorage.getItem("idToken");
              const response = await fetch(
                "http://127.0.0.1:5050/restaurants/debug",
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              const debugData = await response.json();
              console.log("Debug restaurants data:", debugData);

              if (debugData && typeof debugData === "object") {
                const restaurantKeys = Object.keys(debugData);
                if (restaurantKeys.length > 0) {
                  finalRestaurantId = restaurantKeys[0]; // Use first restaurant found
                  console.log(
                    "Using first restaurant from debug data:",
                    finalRestaurantId
                  );
                }
              }
            } catch (debugError) {
              console.warn("Could not get debug restaurant data:", debugError);
            }
          }
        } catch (error) {
          console.warn("Could not fetch owned restaurants:", error);
          // Final fallback to user ID
          finalRestaurantId = currentUser.id;
          console.log(
            "Using user ID as fallback restaurant ID:",
            finalRestaurantId
          );
        }
      } else {
        console.log(
          "Using restaurant ID from URL parameter:",
          finalRestaurantId
        );
      }

      if (!finalRestaurantId) {
        console.error("No restaurant ID found");
        console.log("Current user:", currentUser);
        setPendingItems({
          reservations: [],
          confirmedReservations: [],
          rejectedReservations: [],
          staffApplications: [],
          menuChanges: [],
          reviews: [],
          orders: [],
          payments: [],
        });
        return;
      }

      console.log("Loading pending items for restaurant:", finalRestaurantId);

      // Fetch all types of reservations from backend - using direct approach like your demo
      console.log("Making API calls for reservations...");

      // Use direct axios calls like your working demo
      const token = localStorage.getItem("idToken");

      let pendingReservations = [];
      let confirmedReservations = [];
      let rejectedReservations = [];

      try {
        // Pending reservations
        const pendingRes = await fetch(
          `http://127.0.0.1:5050/reservations/${finalRestaurantId}/pending`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const pendingData = await pendingRes.json();
        pendingReservations = pendingData.pending_reservations || [];
        console.log("Pending reservations response:", pendingData);

        // Confirmed reservations
        const confirmedRes = await fetch(
          `http://127.0.0.1:5050/reservations/${finalRestaurantId}/confirmed`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const confirmedData = await confirmedRes.json();
        confirmedReservations = confirmedData.confirmed_reservations || [];
        console.log("Confirmed reservations response:", confirmedData);

        // Rejected reservations
        const rejectedRes = await fetch(
          `http://127.0.0.1:5050/reservations/${finalRestaurantId}/rejected`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const rejectedData = await rejectedRes.json();
        rejectedReservations = rejectedData.rejected_reservations || [];
        console.log("Rejected reservations response:", rejectedData);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        setError("Failed to fetch reservations: " + error.message);
        return;
      }

      console.log("Final reservation arrays:");
      console.log("- Pending:", pendingReservations);
      console.log("- Confirmed:", confirmedReservations);
      console.log("- Rejected:", rejectedReservations);

      // Transform backend data to match frontend format
      const transformReservation = (reservation, type) => ({
        id: reservation.reservationID || reservation.id,
        type: type,
        title: `Reservation for ${reservation.customerName}`,
        description: `${reservation.capacity} people at ${reservation.restaurantName}`,
        details: `Date: ${reservation.reservationDate} | Time: ${reservation.reservationTime}`,
        priority:
          type === "reservation"
            ? "medium"
            : type === "confirmedReservation"
            ? "low"
            : "high",
        createdAt: reservation.dateCreated || new Date().toISOString(),
        customerInfo: {
          name: reservation.customerName,
          id: reservation.customerID,
        },
        reservationData: reservation, // Keep original data for actions
        status:
          type === "reservation"
            ? "pending"
            : type === "confirmedReservation"
            ? "confirmed"
            : "rejected",
      });

      const transformedPending = pendingReservations.map((res) =>
        transformReservation(res, "reservation")
      );
      const transformedConfirmed = confirmedReservations.map((res) =>
        transformReservation(res, "confirmedReservation")
      );
      const transformedRejected = rejectedReservations.map((res) =>
        transformReservation(res, "rejectedReservation")
      );

      setPendingItems({
        reservations: transformedPending,
        confirmedReservations: transformedConfirmed,
        rejectedReservations: transformedRejected,
        staffApplications: [], // TODO: Implement when backend is ready
        menuChanges: [], // TODO: Implement when backend is ready
        reviews: [], // TODO: Implement when backend is ready
        orders: [], // TODO: Implement when backend is ready
        payments: [], // TODO: Implement when backend is ready
      });
    } catch (error) {
      console.error("Failed to load pending items:", error);
      // Set empty state on error
      setPendingItems({
        reservations: [],
        confirmedReservations: [],
        rejectedReservations: [],
        staffApplications: [],
        menuChanges: [],
        reviews: [],
        orders: [],
        payments: [],
      });
    } finally {
      setLoading(false);
    }
  };

  const getAllPendingItems = () => {
    return Object.values(pendingItems)
      .flat()
      .filter((item) => item !== undefined);
  };

  const tabs = [
    {
      id: "all",
      label: "All Items",
      icon: "📋",
      count: getAllPendingItems().length,
    },
    {
      id: "reservations",
      label: "Pending",
      icon: "⏳",
      count: pendingItems.reservations?.length || 0,
    },
    {
      id: "confirmed",
      label: "Confirmed",
      icon: "✅",
      count: pendingItems.confirmedReservations?.length || 0,
    },
    {
      id: "rejected",
      label: "Rejected",
      icon: "❌",
      count: pendingItems.rejectedReservations?.length || 0,
    },
    {
      id: "staff",
      label: "Staff",
      icon: "👥",
      count: pendingItems.staffApplications?.length || 0,
    },
    {
      id: "menu",
      label: "Menu",
      icon: "🍽️",
      count: pendingItems.menuChanges?.length || 0,
    },
    {
      id: "reviews",
      label: "Reviews",
      icon: "⭐",
      count: pendingItems.reviews?.length || 0,
    },
    {
      id: "orders",
      label: "Orders",
      icon: "📦",
      count: pendingItems.orders?.length || 0,
    },
    {
      id: "payments",
      label: "Payments",
      icon: "💳",
      count: pendingItems.payments?.length || 0,
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="w-4 h-4" />;
      case "medium":
        return <Clock className="w-4 h-4" />;
      case "low":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "reservation":
        return <Calendar className="w-5 h-5 text-blue-600" />;
      case "staff":
        return <UserPlus className="w-5 h-5 text-green-600" />;
      case "menu":
        return <Menu className="w-5 h-5 text-orange-600" />;
      case "review":
        return <Star className="w-5 h-5 text-yellow-600" />;
      case "order":
        return <Utensils className="w-5 h-5 text-purple-600" />;
      case "payment":
        return <CreditCard className="w-5 h-5 text-red-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const handleApprove = async (itemId, type) => {
    try {
      if (type === "reservation") {
        // Use the actual API call for reservations
        await api.reservations.accept(itemId);
        console.log(`Reservation ${itemId} accepted successfully`);
      } else {
        // TODO: Replace with actual API call when backend is ready for other types
        console.log(`Approving ${type} item ${itemId}`);
      }

      // Remove item from pending list after approval
      setPendingItems((prevItems) => {
        const updatedItems = { ...prevItems };
        const categoryMap = {
          reservation: "reservations",
          staff: "staffApplications",
          menu: "menuChanges",
          review: "reviews",
          order: "orders",
          payment: "payments",
        };

        const category = categoryMap[type];
        if (category) {
          updatedItems[category] = updatedItems[category].filter(
            (item) => item.id !== itemId
          );
        }

        return updatedItems;
      });

      // TODO: Show success toast when backend is connected
      // showToast.success(`${type} item approved successfully`);
    } catch (error) {
      console.error(`Failed to approve ${type} item:`, error);
      // TODO: Show error toast when backend is connected
      // showToast.error(`Failed to approve ${type} item`);
    }
  };

  const handleReject = async (itemId, type) => {
    try {
      if (type === "reservation") {
        // Use the actual API call for reservations
        await api.reservations.reject(itemId);
        console.log(`Reservation ${itemId} rejected successfully`);
      } else {
        // TODO: Replace with actual API call when backend is ready for other types
        console.log(`Rejecting ${type} item ${itemId}`);
      }

      // Remove item from pending list after rejection
      setPendingItems((prevItems) => {
        const updatedItems = { ...prevItems };
        const categoryMap = {
          reservation: "reservations",
          staff: "staffApplications",
          menu: "menuChanges",
          review: "reviews",
          order: "orders",
          payment: "payments",
        };

        const category = categoryMap[type];
        if (category) {
          updatedItems[category] = updatedItems[category].filter(
            (item) => item.id !== itemId
          );
        }

        return updatedItems;
      });

      // TODO: Show success toast when backend is connected
      // showToast.success(`${type} item rejected`);
    } catch (error) {
      console.error(`Failed to reject ${type} item:`, error);
      // TODO: Show error toast when backend is connected
      // showToast.error(`Failed to reject ${type} item`);
    }
  };

  const handleView = (itemId, type) => {
    console.log(`Viewing ${type} item ${itemId}`);
    // TODO: Implement view details logic
    // Could open a modal or navigate to a details page
    // Example: setSelectedItem(itemId); setShowModal(true);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await loadPendingItems();
    } catch (error) {
      console.error("Failed to refresh pending items:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const getFilteredItems = () => {
    let items = [];

    if (activeTab === "all") {
      items = getAllPendingItems();
    } else {
      const tabMap = {
        reservations: "reservations",
        confirmed: "confirmedReservations",
        rejected: "rejectedReservations",
        staff: "staffApplications",
        menu: "menuChanges",
        reviews: "reviews",
        orders: "orders",
        payments: "payments",
      };
      items = pendingItems[tabMap[activeTab]] || [];
    }

    if (searchTerm) {
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return items;
  };

  const filteredItems = getFilteredItems();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader />
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading pending items...</p>
            </div>
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
        {/* Page Header */}
        <div className="mb-8">
          {restaurantId && (
            <div className="mb-4">
              <button
                onClick={() => navigate(`/branch/${restaurantId}`)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Restaurant</span>
              </button>
            </div>
          )}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Reservation Management
              </h1>
              <p className="text-gray-600 text-lg">
                Review and manage all reservations - pending, confirmed, and
                rejected
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
                <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search pending items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">Filter by:</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white rounded-xl p-1 shadow-lg overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-red-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    activeTab === tab.id
                      ? "bg-white text-red-600"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Pending Items List */}
        <div className="space-y-6">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-shrink-0">
                      {getTypeIcon(item.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {item.title}
                        </h3>
                        <span
                          className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                            item.priority
                          )}`}
                        >
                          {getPriorityIcon(item.priority)}
                          <span>{item.priority}</span>
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{item.description}</p>
                      <p className="text-sm text-gray-500 mb-4">
                        {item.details}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Created: {item.createdAt}</span>
                        {item.customerInfo && (
                          <span>Customer: {item.customerInfo.name}</span>
                        )}
                        {item.applicantInfo && (
                          <span>Applicant: {item.applicantInfo.name}</span>
                        )}
                        {item.requestedBy && (
                          <span>Requested by: {item.requestedBy}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleView(item.id, item.type)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>

                    {/* Show different actions based on reservation status */}
                    {item.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleApprove(item.id, item.type)}
                          className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                          title="Approve"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleReject(item.id, item.type)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          title="Reject"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </>
                    )}

                    {item.status === "confirmed" && (
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                        Confirmed
                      </span>
                    )}

                    {item.status === "rejected" && (
                      <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                        Rejected
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <Bell className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Reservations Found
              </h3>
              <p className="text-gray-600">
                {searchTerm
                  ? "No reservations match your search criteria"
                  : activeTab === "all"
                  ? "No reservations found for this restaurant."
                  : `No ${activeTab} reservations found.`}
              </p>
            </div>
          )}
        </div>

        {/* Summary Statistics */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Reservation Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {pendingItems.reservations?.length || 0}
              </p>
              <p className="text-gray-600">Pending</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {pendingItems.confirmedReservations?.length || 0}
              </p>
              <p className="text-gray-600">Confirmed</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {pendingItems.rejectedReservations?.length || 0}
              </p>
              <p className="text-gray-600">Rejected</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {getAllPendingItems().length}
              </p>
              <p className="text-gray-600">Total Reservations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PendingPage;
