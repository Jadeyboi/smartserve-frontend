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
            Complete restaurant details and information
          </p>
        </div>

        {/* Restaurant Overview Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Basic Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Restaurant Name
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Utensils className="w-5 h-5 text-red-600" />
                  <span className="text-gray-700">
                    <span className="font-semibold">Cuisine:</span> Not
                    specified
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-red-600" />
                  <span className="text-gray-700">Address not specified</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-red-600" />
                  <span className="text-gray-700">Phone not specified</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-red-600" />
                  <span className="text-gray-700">Email not specified</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-red-600" />
                  <span className="text-gray-700">
                    Operating hours not specified
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
                  <p className="text-2xl font-bold text-gray-900">0</p>
                  <p className="text-sm text-gray-600">Tables</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-2">
                    <Users className="w-6 h-6 text-red-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                  <p className="text-sm text-gray-600">Seats</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-2">
                    <Star className="w-6 h-6 text-red-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                  <p className="text-sm text-gray-600">Customer Rating</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-2">
                    <Users className="w-6 h-6 text-red-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                  <p className="text-sm text-gray-600">Happy Customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Menu</h2>
          <div className="text-center py-12">
            <Utensils className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-lg text-gray-600 mb-2">Menu not available</p>
            <p className="text-sm text-gray-500">
              Menu items will be displayed here when available
            </p>
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
                Restaurant information not available. Please contact the
                restaurant for details about their history and story.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Additional information will be displayed here when available.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Restaurant mission statement not available. Please contact the
                restaurant for information about their mission and values.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Mission details will be displayed here when available.
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
                  <p className="text-gray-600">Email not specified</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Reservations:</p>
                  <p className="text-gray-600">
                    Reservations email not specified
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Customer Support:</p>
                  <p className="text-gray-600">Support email not specified</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Phone:</p>
                  <p className="text-gray-600">Phone not specified</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Mobile:</p>
                  <p className="text-gray-600">Mobile not specified</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Fax:</p>
                  <p className="text-gray-600">Fax not specified</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Visit Us
              </h3>
              <div className="bg-gray-100 rounded-xl p-4">
                <p className="text-gray-700 font-medium mb-2">
                  Restaurant Name
                </p>
                <p className="text-gray-700 font-medium mb-2">
                  Address not specified
                </p>
                <p className="text-gray-600 text-sm">Area not specified</p>
                <p className="text-gray-600 text-sm">City not specified</p>
                <p className="text-gray-600 text-sm">Country not specified</p>
                <p className="text-gray-600 text-sm mt-2">
                  Location details not available
                </p>
                <p className="text-gray-600 text-sm">
                  Additional location details not available
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
