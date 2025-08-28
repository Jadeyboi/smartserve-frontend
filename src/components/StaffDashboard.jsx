import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  Users,
  Utensils,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Plus,
  Calendar,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

function StaffDashboard() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Get current user from localStorage
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    setCurrentUser(user);

    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Mock notifications
    setNotifications([
      {
        id: 1,
        type: "order",
        message: "New order #1234 received",
        time: "2 min ago",
        read: false,
      },
      {
        id: 2,
        type: "table",
        message: "Table 5 is ready for service",
        time: "5 min ago",
        read: false,
      },
      {
        id: 3,
        type: "inventory",
        message: "Low stock alert: Tomatoes",
        time: "1 hour ago",
        read: true,
      },
    ]);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/staff-login");
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {currentUser?.firstname?.[0] || "S"}
                </span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {getGreeting()}, {currentUser?.firstname || "Staff"}!
                </h1>
                <p className="text-sm text-gray-600">
                  {currentUser?.position || "Staff Member"} •{" "}
                  {formatDate(currentTime)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Time Display */}
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {formatTime(currentTime)}
                </div>
                <div className="text-sm text-gray-600">
                  {formatDate(currentTime)}
                </div>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <Bell className="w-6 h-6" />
                  {notifications.filter((n) => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications.filter((n) => !n.read).length}
                    </span>
                  )}
                </button>
              </div>

              {/* Settings & Logout */}
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Utensils className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Active Orders
                </p>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-xs text-green-600">+2 from yesterday</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Tables Served
                </p>
                <p className="text-2xl font-bold text-gray-900">8</p>
                <p className="text-xs text-green-600">+1 this hour</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Avg. Wait Time
                </p>
                <p className="text-2xl font-bold text-gray-900">15m</p>
                <p className="text-xs text-green-600">-3m improvement</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Today's Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900">₱45.2K</p>
                <p className="text-xs text-green-600">+12% vs yesterday</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Actions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Orders Management */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Order Management
              </h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">Order #1234</p>
                    <p className="text-sm text-gray-600">Table 3 • 4 items</p>
                  </div>
                </div>
                <span className="text-sm text-yellow-700 font-medium">
                  Preparing
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">Order #1233</p>
                    <p className="text-sm text-gray-600">Table 7 • 2 items</p>
                  </div>
                </div>
                <span className="text-sm text-green-700 font-medium">
                  Ready
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">Order #1232</p>
                    <p className="text-sm text-gray-600">Takeout • 6 items</p>
                  </div>
                </div>
                <span className="text-sm text-blue-700 font-medium">
                  Served
                </span>
              </div>
            </div>

            <button className="w-full mt-4 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>New Order</span>
            </button>
          </div>

          {/* Table Status */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Table Status
              </h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Manage Tables
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((tableNum) => {
                const isOccupied = Math.random() > 0.5;
                const isReserved = Math.random() > 0.7;

                let status = "Available";
                let bgColor = "bg-green-100";
                let textColor = "text-green-800";
                let borderColor = "border-green-200";

                if (isReserved) {
                  status = "Reserved";
                  bgColor = "bg-yellow-100";
                  textColor = "text-yellow-800";
                  borderColor = "border-yellow-200";
                } else if (isOccupied) {
                  status = "Occupied";
                  bgColor = "bg-red-100";
                  textColor = "text-red-800";
                  borderColor = "border-red-200";
                }

                return (
                  <div
                    key={tableNum}
                    className={`p-4 rounded-lg border ${bgColor} ${borderColor} text-center cursor-pointer hover:shadow-md transition-shadow`}
                  >
                    <div className="text-lg font-bold text-gray-900">
                      Table {tableNum}
                    </div>
                    <div className={`text-sm font-medium ${textColor}`}>
                      {status}
                    </div>
                    {isOccupied && (
                      <div className="text-xs text-gray-600 mt-1">45 min</div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-600">Reserved</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-600">Occupied</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {[
                {
                  action: "Order completed",
                  time: "2 min ago",
                  type: "success",
                },
                { action: "Table 5 cleared", time: "5 min ago", type: "info" },
                { action: "New reservation", time: "12 min ago", type: "info" },
                {
                  action: "Inventory updated",
                  time: "1 hour ago",
                  type: "warning",
                },
                {
                  action: "Staff shift started",
                  time: "2 hours ago",
                  type: "info",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.type === "success"
                        ? "bg-green-500"
                        : activity.type === "warning"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>New Order</span>
              </button>
              <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Manage Tables</span>
              </button>
              <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                <Utensils className="w-4 h-4" />
                <span>Update Menu</span>
              </button>
              <button className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>View Reports</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffDashboard;
