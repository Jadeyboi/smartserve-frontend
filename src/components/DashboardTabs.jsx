import { useNavigate, useLocation } from "react-router-dom";

function DashboardTabs() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: "menu", label: "List of Restaurant Branches", path: "/dashboard" },
  ];

  const handleTabClick = (path) => {
    navigate(path);
  };

  const getActiveTab = () => {
    const currentPath = location.pathname;
    const activeTab = tabs.find((tab) => tab.path === currentPath);
    return activeTab ? activeTab.id : "menu";
  };

  return (
    <div className="mb-8">
      <div className="flex space-x-8 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.path)}
            className={`pb-4 px-1 font-medium text-lg transition-colors duration-200 ${
              getActiveTab() === tab.id
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
