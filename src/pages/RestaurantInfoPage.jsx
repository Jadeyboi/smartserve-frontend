import { DashboardHeader } from "../components";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  Users,
  Award,
  Utensils,
  Grid,
} from "lucide-react";

function RestaurantInfoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Restaurant Information
          </h1>
          <p className="text-gray-600 text-lg">
            Complete details about Pizza Napoleon - SM City Cebu
          </p>
        </div>

        {/* Restaurant Overview Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Basic Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Pizza Napoleon
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Utensils className="w-5 h-5 text-red-600" />
                  <span className="text-gray-700">
                    <span className="font-semibold">Cuisine:</span> Italian,
                    Pizza, Mediterranean
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-red-600" />
                  <span className="text-gray-700">
                    SM City Cebu, North Reclamation Area, Cebu City, Philippines
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-red-600" />
                  <span className="text-gray-700">+63 32 123 4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-red-600" />
                  <span className="text-gray-700">info@pizzanapoleon.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-red-600" />
                  <span className="text-gray-700">
                    Open Daily: 10:00 AM - 10:00 PM
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side - Stats */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Restaurant Capacity
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-2">
                    <Grid className="w-6 h-6 text-red-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">25</p>
                  <p className="text-sm text-gray-600">Tables</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-2">
                    <Users className="w-6 h-6 text-red-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">120</p>
                  <p className="text-sm text-gray-600">Seats</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-2">
                    <Star className="w-6 h-6 text-red-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">4.8</p>
                  <p className="text-sm text-gray-600">Customer Rating</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-2">
                    <Users className="w-6 h-6 text-red-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">500+</p>
                  <p className="text-sm text-gray-600">Happy Customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Menu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                🍕 Pizzas
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Margherita - ₱350</li>
                <li>• Pepperoni - ₱450</li>
                <li>• Hawaiian - ₱400</li>
                <li>• Four Cheese - ₱380</li>
                <li>• Supreme - ₱500</li>
                <li>• BBQ Chicken - ₱480</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                🍝 Pasta
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Spaghetti Carbonara - ₱280</li>
                <li>• Fettuccine Alfredo - ₱300</li>
                <li>• Penne Arrabbiata - ₱250</li>
                <li>• Lasagna - ₱350</li>
                <li>• Ravioli - ₱320</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                🥗 Salads & Sides
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Caesar Salad - ₱200</li>
                <li>• Greek Salad - ₱220</li>
                <li>• Garlic Bread - ₱80</li>
                <li>• Mozzarella Sticks - ₱150</li>
                <li>• Onion Rings - ₱120</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                🍰 Desserts
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Tiramisu - ₱180</li>
                <li>• Chocolate Lava Cake - ₱200</li>
                <li>• Cannoli - ₱150</li>
                <li>• Gelato - ₱120</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                🥤 Beverages
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Soft Drinks - ₱60</li>
                <li>• Fresh Lemonade - ₱80</li>
                <li>• Iced Tea - ₱70</li>
                <li>• Coffee - ₱90</li>
                <li>• Smoothies - ₱120</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                🍷 Alcoholic
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Red Wine - ₱250</li>
                <li>• White Wine - ₱230</li>
                <li>• Beer - ₱120</li>
                <li>• Cocktails - ₱180</li>
              </ul>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About Us</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Our Story
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Founded in 2008, Pizza Napoleon has been serving the Cebu
                community with authentic, hand-crafted pizzas that bring the
                taste of Italy to the Philippines. What started as a small
                family restaurant has grown into one of Cebu's most beloved
                pizza destinations.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our commitment to quality ingredients, traditional recipes, and
                exceptional service has earned us a loyal customer base and
                numerous awards for culinary excellence.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                To provide our customers with the most authentic Italian pizza
                experience, using only the finest ingredients and time-honored
                cooking techniques. We believe that great food brings people
                together and creates lasting memories.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Every pizza we serve is a testament to our passion for quality
                and our dedication to preserving the authentic flavors of
                traditional Italian cuisine.
              </p>
            </div>
          </div>
        </div>

        {/* Services & Features */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Services & Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍕</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Dine-In
              </h3>
              <p className="text-gray-600">
                Enjoy our cozy atmosphere with family and friends
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Delivery
              </h3>
              <p className="text-gray-600">
                Fast delivery to your doorstep within 30 minutes
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Online Ordering
              </h3>
              <p className="text-gray-600">
                Order through our website or mobile app
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎉</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Events & Catering
              </h3>
              <p className="text-gray-600">
                Special events and corporate catering services
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎁</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Loyalty Program
              </h3>
              <p className="text-gray-600">
                Earn points and rewards with every visit
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                VIP Experience
              </h3>
              <p className="text-gray-600">
                Exclusive dining experiences for special occasions
              </p>
            </div>
          </div>
        </div>

        {/* Contact & Location */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Contact & Location
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Get in Touch
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-gray-900">
                    General Inquiries:
                  </p>
                  <p className="text-gray-600">info@pizzanapoleon.com</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Reservations:</p>
                  <p className="text-gray-600">
                    reservations@pizzanapoleon.com
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Customer Support:</p>
                  <p className="text-gray-600">support@pizzanapoleon.com</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Phone:</p>
                  <p className="text-gray-600">+63 32 123 4567</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Mobile:</p>
                  <p className="text-gray-600">+63 917 123 4567</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Fax:</p>
                  <p className="text-gray-600">+63 32 123 4568</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Visit Us
              </h3>
              <div className="bg-gray-100 rounded-xl p-4">
                <p className="text-gray-700 font-medium mb-2">Pizza Napoleon</p>
                <p className="text-gray-700 font-medium mb-2">SM City Cebu</p>
                <p className="text-gray-600 text-sm">North Reclamation Area</p>
                <p className="text-gray-600 text-sm">Cebu City, 6000</p>
                <p className="text-gray-600 text-sm">Philippines</p>
                <p className="text-gray-600 text-sm mt-2">
                  Located on the 2nd floor, Food Court area
                </p>
                <p className="text-gray-600 text-sm">
                  Near the main entrance, next to Starbucks
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantInfoPage;
