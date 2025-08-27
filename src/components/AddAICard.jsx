import { useState } from "react";
import { Plus, Play, Square, Settings } from "lucide-react";

function AddAICard({ onAddAI }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [aiName, setAiName] = useState("");
  const [aiUrl, setAiUrl] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAddAI) {
      onAddAI({ name: aiName, url: aiUrl });
    }
    console.log("Creating AI:", { aiName, aiUrl });
    setIsExpanded(false);
    setAiName("");
    setAiUrl("");
  };

  const handleStart = () => {
    setIsRunning(true);
    // TODO: Implement start AI logic
    console.log("Starting AI:", aiName);
  };

  const handleStop = () => {
    setIsRunning(false);
    // TODO: Implement stop AI logic
    console.log("Stopping AI:", aiName);
  };

  if (!isExpanded) {
    return (
      <div
        className="bg-white rounded-xl shadow-md border-2 border-dashed border-gray-300 hover:border-red-400 transition-colors duration-200 cursor-pointer group"
        onClick={() => setIsExpanded(true)}
      >
        <div className="flex flex-col items-center justify-center h-48 p-6">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-50 transition-colors duration-200">
            <Plus className="w-8 h-8 text-gray-400 group-hover:text-red-500 transition-colors duration-200" />
          </div>
          <p className="text-gray-500 font-medium text-center group-hover:text-red-600 transition-colors duration-200">
            Add New AI
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-red-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Add New AI</h3>
        <button
          onClick={() => setIsExpanded(false)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="aiName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            AI Name
          </label>
          <input
            type="text"
            id="aiName"
            value={aiName}
            onChange={(e) => setAiName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Enter AI name"
            required
          />
        </div>

        <div>
          <label
            htmlFor="aiUrl"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            AI URL
          </label>
          <input
            type="url"
            id="aiUrl"
            value={aiUrl}
            onChange={(e) => setAiUrl(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="https://example.com/ai-endpoint"
            required
          />
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Settings className="w-4 h-4" />
            <span>Create AI</span>
          </button>
        </div>
      </form>

      {aiName && aiUrl && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900">{aiName}</h4>
            <span className="text-sm text-gray-500">Ready to deploy</span>
          </div>

          <div className="flex space-x-2">
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
          </div>
        </div>
      )}
    </div>
  );
}

export default AddAICard;
