import { DashboardHeader } from "../components";
import { AddAICard, AIInstanceCard } from "../components";
import { useState, useEffect } from "react";
import { aiAPI } from "../utils/api";
import { showToast } from "../App";
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
  RefreshCw,
} from "lucide-react";

function AIManagement() {
  // State for AI instances
  const [aiInstances, setAiInstances] = useState([]);
  const [currentRestaurantId, setCurrentRestaurantId] = useState("1"); // Default restaurant ID
  const [currentCameraIndex, setCurrentCameraIndex] = useState("0"); // Default camera index

  // AI system state
  const [aiStatus, setAiStatus] = useState({
    cameraStatus: "Offline",
    lastUpdate: "Never",
    totalTables: 0,
    totalChairs: 0,
    occupiedTables: 0,
    vacantTables: 0,
    occupiedChairs: 0,
    vacantChairs: 0,
    occupancyRate: 0,
    aiConfidence: 0,
  });

  const [tableStatus, setTableStatus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [detectionStatus, setDetectionStatus] = useState("stopped");
  const [mainVideoKey, setMainVideoKey] = useState(Date.now());
  const [mainVideoError, setMainVideoError] = useState(false);

  // Load initial AI data
  useEffect(() => {
    loadAIInstances();
    loadAIData();
    // Set up periodic refresh every 10 seconds
    const interval = setInterval(() => {
      loadAIInstances();
      loadAIData();
    }, 10000);
    return () => clearInterval(interval);
  }, [currentRestaurantId]);

  // Refresh main video feed every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMainVideoKey(Date.now());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const loadAIInstances = async () => {
    try {
      const ais = await aiAPI.getAIs(currentRestaurantId);
      const processedAIs = ais.map((ai) => ({
        id: ai.aiID,
        name: ai.aiName,
        url: `Camera ${ai.urlStream}`,
        status: "stopped", // Will be updated based on detection status
        isRunning: false,
        lastActive: "Never",
        restaurantId: ai.restaurantID,
        cameraIndex: ai.urlStream, // This is the camera index (0, 1, 2)
      }));
      setAiInstances(processedAIs);
    } catch (error) {
      console.warn("Failed to load AI instances:", error);
      showToast.error("Failed to load AI instances");
    }
  };

  const loadAIData = async () => {
    try {
      setIsRefreshing(true);
      const detectionData = await aiAPI.getLatestDetection(currentRestaurantId);

      if (detectionData && detectionData.tables && detectionData.chairs) {
        // Process table data
        const tables = Object.entries(detectionData.tables).map(
          ([id, status], index) => ({
            id: index + 1,
            status: status === "occupied" ? "occupied" : "vacant",
            seats: 4, // Default seats, could be made dynamic
            occupiedSeats: status === "occupied" ? 4 : 0,
            timeOccupied: status === "occupied" ? "45 min" : "0 min",
          })
        );

        // Process chair data
        const chairs = Object.entries(detectionData.chairs).map(
          ([id, status]) => status
        );

        const totalTables = tables.length;
        const totalChairs = chairs.length;
        const occupiedTables = tables.filter(
          (t) => t.status === "occupied"
        ).length;
        const vacantTables = totalTables - occupiedTables;
        const occupiedChairs = chairs.filter((c) => c === "occupied").length;
        const vacantChairs = totalChairs - occupiedChairs;
        const occupancyRate =
          totalTables > 0
            ? Math.round((occupiedTables / totalTables) * 100)
            : 0;

        setTableStatus(tables);
        setAiStatus({
          cameraStatus: "Online",
          lastUpdate: detectionData.time
            ? new Date(detectionData.time).toLocaleTimeString()
            : "Just now",
          totalTables,
          totalChairs,
          occupiedTables,
          vacantTables,
          occupiedChairs,
          vacantChairs,
          occupancyRate,
          aiConfidence: 94.5, // Could be made dynamic based on backend data
        });
      }
    } catch (error) {
      console.warn("Failed to load AI data, using fallback:", error);
      showToast.error("Failed to load AI detection data, using fallback");

      // Use fallback data if backend fails
      setTableStatus([
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
      ]);
      setAiStatus({
        cameraStatus: "Offline",
        lastUpdate: "Never",
        totalTables: 2,
        totalChairs: 10,
        occupiedTables: 1,
        vacantTables: 1,
        occupiedChairs: 4,
        vacantChairs: 6,
        occupancyRate: 50,
        aiConfidence: 0,
      });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleStartAI = async (aiId) => {
    try {
      const loadingToast = showToast.loading("Starting AI detection...");
      await aiAPI.startDetection(currentRestaurantId, aiId);
      showToast.dismiss();
      showToast.success("AI detection started successfully!");

      setDetectionStatus("running");
      setAiInstances((prev) =>
        prev.map((ai) =>
          ai.id === aiId ? { ...ai, isRunning: true, status: "running" } : ai
        )
      );
      // Refresh data after starting
      setTimeout(loadAIData, 2000);
    } catch (error) {
      console.error("Failed to start AI:", error);
      showToast.error("Failed to start AI detection");
    }
  };

  const handleStopAI = async (aiId) => {
    try {
      const loadingToast = showToast.loading("Stopping AI detection...");
      await aiAPI.stopDetection(aiId);
      showToast.dismiss();
      showToast.success("AI detection stopped successfully!");

      setDetectionStatus("stopped");
      setAiInstances((prev) =>
        prev.map((ai) =>
          ai.id === aiId ? { ...ai, isRunning: false, status: "stopped" } : ai
        )
      );
    } catch (error) {
      console.error("Failed to stop AI:", error);
      showToast.error("Failed to stop AI detection");
    }
  };

  const handleDeleteAI = async (aiId) => {
    try {
      const loadingToast = showToast.loading("Deleting AI instance...");
      await aiAPI.deleteAI(aiId);
      showToast.dismiss();
      showToast.success("AI instance deleted successfully!");

      // Refresh AI instances
      await loadAIInstances();
    } catch (error) {
      console.error("Failed to delete AI:", error);
      showToast.error("Failed to delete AI instance");
    }
  };

  const handleAddAI = async (newAI) => {
    try {
      const loadingToast = showToast.loading("Adding new AI instance...");
      const aiData = {
        aiName: newAI.name,
        restaurantID: currentRestaurantId,
        urlStream: newAI.url, // Now directly using the camera index (0, 1, 2)
      };

      const response = await aiAPI.addAI(aiData);
      showToast.dismiss();
      showToast.success("AI instance added successfully!");

      // Refresh AI instances
      await loadAIInstances();
    } catch (error) {
      console.error("Failed to add AI:", error);
      showToast.error("Failed to add AI instance");
    }
  };

  const handleRefreshData = async () => {
    try {
      await loadAIInstances();
      await loadAIData();
      showToast.success("AI data refreshed successfully!");
    } catch (error) {
      console.error("Failed to refresh data:", error);
      showToast.error("Failed to refresh AI data");
    }
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

  const handleSwitchCamera = async (aiId, direction) => {
    try {
      const loadingToast = showToast.loading(
        `Switching camera ${direction}...`
      );
      await aiAPI.switchCamera(aiId, direction);
      showToast.dismiss();
      showToast.success(`Camera switched ${direction} successfully!`);

      // Refresh AI instances to get updated camera index
      await loadAIInstances();
    } catch (error) {
      console.error("Failed to switch camera:", error);
      showToast.error("Failed to switch camera");
    }
  };

  const handleTestCamera = async () => {
    try {
      const loadingToast = showToast.loading(
        `Testing YOLO with Camera ${currentCameraIndex}...`
      );
      await aiAPI.testCameraDetection(currentRestaurantId, currentCameraIndex);
      showToast.dismiss();
      showToast.success(
        `YOLO camera test started successfully with Camera ${currentCameraIndex}!`
      );

      // Set detection status to running for camera test
      setDetectionStatus("running");

      // Refresh AI instances to show the new test AI
      setTimeout(async () => {
        await loadAIInstances();
        await loadAIData();
      }, 2000);
    } catch (error) {
      console.error("Failed to test camera:", error);
      showToast.error("Failed to start YOLO camera test");
    }
  };

  const handleStartCamera = async () => {
    try {
      const loadingToast = showToast.loading("Starting camera detection...");
      const response = await aiAPI.startCameraDetection(currentRestaurantId);
      showToast.dismiss();
      showToast.success("Camera detection started successfully!");

      // Set detection status to running
      setDetectionStatus("running");

      // Refresh AI instances to show the new test AI
      setTimeout(async () => {
        await loadAIInstances();
        await loadAIData();
      }, 2000);
    } catch (error) {
      console.error("Failed to start camera:", error);
      showToast.error("Failed to start camera detection");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                AI Management Dashboard
              </h1>
              <p className="text-gray-600 text-lg">
                Real-time monitoring powered by YOLO AI camera system
              </p>
            </div>
            <div className="mt-4 sm:mt-0 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Restaurant ID
                </label>
                <input
                  type="text"
                  value={currentRestaurantId}
                  onChange={(e) => setCurrentRestaurantId(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter restaurant ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Camera Index
                </label>
                <select
                  value={currentCameraIndex}
                  onChange={(e) => setCurrentCameraIndex(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="0">Camera 0 (Default)</option>
                  <option value="1">Camera 1</option>
                  <option value="2">Camera 2</option>
                </select>
              </div>
            </div>
          </div>
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

          {/* Debug Info */}
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Debug Info:</strong> AI Instances: {aiInstances.length} |
              Detection Status: {detectionStatus} | Current Restaurant:{" "}
              {currentRestaurantId}
            </p>
            {aiInstances.length > 0 && (
              <p className="text-xs text-gray-500 mt-1">
                AI IDs: {aiInstances.map((ai) => ai.id).join(", ")}
              </p>
            )}
          </div>

          <div className="mb-6">
            <AddAICard onAddAI={handleAddAI} />
          </div>

          {aiInstances.length > 0 ? (
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
          ) : (
            <div className="text-center py-8">
              <Bot className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg text-gray-600 mb-2">
                No AI instances found
              </p>
              <p className="text-sm text-gray-500">
                Add your first AI instance to get started with smart monitoring
              </p>
            </div>
          )}
        </div>

        {/* Camera Controls */}
        {aiInstances.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Camera Controls
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {aiInstances.map((ai) => (
                <div key={ai.id} className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    {ai.name}
                  </h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">
                      Camera {ai.cameraIndex}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        ai.isRunning
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {ai.isRunning ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSwitchCamera(ai.id, "back")}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => handleSwitchCamera(ai.id, "next")}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI System Status */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">System Status</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full animate-pulse ${
                    detectionStatus === "running"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                ></div>
                <span
                  className={`font-semibold ${
                    detectionStatus === "running"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  AI System{" "}
                  {detectionStatus === "running" ? "Active" : "Inactive"}
                </span>
              </div>
              <button
                onClick={handleRefreshData}
                disabled={isRefreshing}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
                <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
              </button>
              <button
                onClick={handleTestCamera}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Camera className="w-4 h-4" />
                <span>Test YOLO Camera</span>
              </button>

              <button
                onClick={handleStartCamera}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Camera className="w-4 h-4" />
                <span>Start Camera</span>
              </button>

              <button
                onClick={() =>
                  window.open(
                    `/ai/camera-stream/${currentCameraIndex}`,
                    "_blank"
                  )
                }
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Camera className="w-4 h-4" />
                <span>Direct Camera Stream</span>
              </button>
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

        {/* Live AI Video Feed */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Live AI Video Feed
            </h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Eye className="w-4 h-4" />
                <span>Live from YOLO AI Camera</span>
              </div>
              <button
                onClick={() => setMainVideoKey(Date.now())}
                className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                title="Refresh video feed"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl overflow-hidden">
            {!mainVideoError ? (
              <img
                key={mainVideoKey}
                src={`http://127.0.0.1:5050/ai/camera-stream/${currentCameraIndex}?t=${mainVideoKey}`}
                alt="Live AI Detection Feed"
                className="w-full h-96 object-cover"
                onError={() => setMainVideoError(true)}
                onLoad={() => setMainVideoError(false)}
              />
            ) : (
              <div className="h-96 flex items-center justify-center text-white">
                <div className="text-center">
                  <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg mb-2">Video feed not available</p>
                  <p className="text-sm text-gray-400 mb-4">
                    Camera {currentCameraIndex} may be offline
                  </p>
                  <button
                    onClick={() => {
                      setMainVideoError(false);
                      setMainVideoKey(Date.now());
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}
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

          {isLoading ? (
            <div className="col-span-full flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading AI detection data...</p>
              </div>
            </div>
          ) : tableStatus.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600">
                No table data available. Start AI detection to begin monitoring.
              </p>
            </div>
          ) : (
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
                    <h3 className="font-bold text-gray-900">
                      Table {table.id}
                    </h3>
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
                        className={`font-medium ${getStatusColor(
                          table.status
                        )}`}
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
          )}
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
