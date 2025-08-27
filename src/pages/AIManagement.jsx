import { DashboardHeader } from "../components";
import { AddAICard, AIInstanceCard } from "../components";
import { useState } from "react";
import {
  Camera,
  Users,
  UserCheck,
  UserX,
  Grid,
  Clock,
  Activity,
  Wifi,
  Signal,
  AlertCircle,
  CheckCircle,
  Eye,
  Bot,
} from "lucide-react";

function AIManagement() {
  // State for AI instances
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

  // Mock data - in real implementation this would come from YOLO AI API
  const aiStatus = {
    cameraStatus: "Online",
    lastUpdate: "2 seconds ago",
    totalTables: 25,
    totalChairs: 120,
    occupiedTables: 18,
    vacantTables: 7,
    occupiedChairs: 89,
    vacantChairs: 31,
    occupancyRate: 72,
    aiConfidence: 94.5,
  };

  const tableStatus = [
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
  ];

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

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Management Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Real-time monitoring powered by YOLO AI camera system
          </p>
        </div>

        {/* AI Instances Management */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">
              AI Instances Management
            </h2>
            <div className="flex items-center space-x-2">
              <Bot className="w-6 h-6 text-blue-600" />
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
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">System Status</h2>
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
                <Camera className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm text-blue-600 font-medium">
                    Camera Status
                  </p>
                  <p className="text-2xl font-bold text-blue-900">
                    {aiStatus.cameraStatus}
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
                    {aiStatus.aiConfidence}%
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
                    {aiStatus.lastUpdate}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <Signal className="w-8 h-8 text-orange-600" />
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

        {/* Occupancy Overview */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Occupancy Overview
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tables Status */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Grid className="w-6 h-6 mr-2 text-gray-600" />
                Tables Status
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Total Tables</span>
                  <span className="font-bold text-gray-900">
                    {aiStatus.totalTables}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                  <span className="text-red-700">Occupied Tables</span>
                  <span className="font-bold text-red-900">
                    {aiStatus.occupiedTables}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span className="text-green-700">Vacant Tables</span>
                  <span className="font-bold text-green-900">
                    {aiStatus.vacantTables}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <span className="text-blue-700">Occupancy Rate</span>
                  <span className="font-bold text-blue-900">
                    {aiStatus.occupancyRate}%
                  </span>
                </div>
              </div>
            </div>

            {/* Chairs Status */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="w-6 h-6 mr-2 text-gray-600" />
                Chairs Status
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Total Chairs</span>
                  <span className="font-bold text-gray-900">
                    {aiStatus.totalChairs}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                  <span className="text-red-700">Occupied Chairs</span>
                  <span className="font-bold text-red-900">
                    {aiStatus.occupiedChairs}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span className="text-green-700">Vacant Chairs</span>
                  <span className="font-bold text-green-900">
                    {aiStatus.vacantChairs}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <span className="text-blue-700">Seat Utilization</span>
                  <span className="font-bold text-blue-900">
                    {Math.round(
                      (aiStatus.occupiedChairs / aiStatus.totalChairs) * 100
                    )}
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Table Monitoring */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Real-time Table Monitoring
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Eye className="w-4 h-4" />
              <span>Live from YOLO AI Camera</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {tableStatus.map((table) => (
              <div
                key={table.id}
                className={`p-4 rounded-xl border-2 ${
                  table.status === "occupied"
                    ? "border-red-200 bg-red-50"
                    : "border-green-200 bg-green-50"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-900">Table {table.id}</h3>
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
                    <span className="font-medium">{table.seats} seats</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Occupied:</span>
                    <span
                      className={`font-medium ${getStatusColor(table.status)}`}
                    >
                      {table.occupiedSeats}/{table.seats}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{table.timeOccupied}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Analytics */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            AI Analytics & Insights
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Peak Hours Analysis
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">
                    Lunch Peak (12:00-2:00 PM)
                  </span>
                  <span className="font-bold text-gray-900">85%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">
                    Dinner Peak (6:00-8:00 PM)
                  </span>
                  <span className="font-bold text-gray-900">92%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Off-Peak (3:00-5:00 PM)</span>
                  <span className="font-bold text-gray-900">45%</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                AI Performance Metrics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-700">
                    Object Detection Accuracy
                  </span>
                  <span className="font-bold text-blue-900">96.2%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-green-700">Real-time Processing</span>
                  <span className="font-bold text-green-900">0.3s</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-purple-700">False Positive Rate</span>
                  <span className="font-bold text-purple-900">2.1%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            System Alerts & Notifications
          </h2>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-800">
                All cameras are functioning normally
              </span>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Wifi className="w-5 h-5 text-blue-600" />
              <span className="text-blue-800">
                AI model successfully updated to v2.1.0
              </span>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <span className="text-yellow-800">
                Table 7 has been occupied for over 1 hour
              </span>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-800">
                Data backup completed successfully
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIManagement;
