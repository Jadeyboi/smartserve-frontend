import {
  DashboardHeader,
  RestaurantInfo,
  DashboardTabs,
  MenuCard,
  AddNewCard,
} from "../components";

function Dashboard() {
  // Sample data for menu cards
  const menuItems = [
    {
      image:
        "https://images.unsplash.com/photo-1535920527002-bc6c6bdfb3b5?w=400&h=300&fit=crop",
      title: "Breakfast Meals",
      description:
        "Start your day with our delicious breakfast options including eggs, bacon, pancakes, and fresh fruit. Perfect for early risers and brunch lovers.",
      category: "BREAKFAST MENU",
      categoryColor: "bg-orange-600",
    },
    {
      image:
        "https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=300&fit=crop",
      title: "Beverages",
      description:
        "Quench your thirst with our selection of refreshing drinks, from classic sodas to specialty cocktails and fresh juices.",
      category: "DRINKS",
      categoryColor: "bg-blue-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <RestaurantInfo />
        <DashboardTabs />

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <MenuCard
              key={index}
              image={item.image}
              title={item.title}
              description={item.description}
              category={item.category}
              categoryColor={item.categoryColor}
            />
          ))}
          <AddNewCard />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
