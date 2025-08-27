import { Play, Square, Settings, Trash2 } from "lucide-react";

function AIInstanceCard({ ai, onStart, onStop, onDelete }) {
  const { id, name, url, status, isRunning, lastActive } = ai;

  const handleStart = () => {
    onStart(id);
  };

  const handleStop = () => {
    onStop(id);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "running":
        return "text-green-600 bg-green-100";
      case "stopped":
        return "text-red-600 bg-red-100";
      case "error":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "running":
        return (
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        );
      case "stopped":
        return <div className="w-2 h-2 bg-red-500 rounded-full"></div>;
      case "error":
        return <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>;
      default:
        return <div className="w-2 h-2 bg-gray-500 rounded-full"></div>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
          <p className="text-sm text-gray-600 mb-3 break-all">{url}</p>

          <div className="flex items-center space-x-3 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                status
              )}`}
            >
              {getStatusIcon(status)}
              <span className="ml-2 capitalize">{status}</span>
            </span>

            {lastActive && (
              <span className="text-xs text-gray-500">
                Last active: {lastActive}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={handleDelete}
          className="text-gray-400 hover:text-red-600 transition-colors p-1"
          title="Delete AI"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={handleStart}
          disabled={isRunning}
          className={`flex-1 py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 ${
            isRunning
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          <Play className="w-4 h-4" />
          <span>{isRunning ? "Running" : "Start"}</span>
        </button>

        <button
          onClick={handleStop}
          disabled={!isRunning}
          className={`flex-1 py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 ${
            !isRunning
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-red-600 text-white hover:bg-red-700"
          }`}
        >
          <Square className="w-4 h-4" />
          <span>Stop</span>
        </button>

        <button
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center space-x-2"
          title="Configure AI"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default AIInstanceCard;
