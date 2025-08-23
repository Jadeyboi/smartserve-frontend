import { useState } from "react";

function DashboardTabs() {
  const [activeTab, setActiveTab] = useState("menu");

  const tabs = [
    { id: "menu", label: "Menu" },
    { id: "restaurant-info", label: "Restaurant Info" },
    { id: "ai-management", label: "AI Management" },
    { id: "staff-account", label: "Staff Account Management" },
  ];

  return (
    <div className="mb-8">
      <div className="flex space-x-8 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 px-1 font-medium text-lg transition-colors duration-200 ${
              activeTab === tab.id
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DashboardTabs;
