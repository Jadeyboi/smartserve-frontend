import { Header } from "../components";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 bg-white">
      <Header />

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)] px-8 bg-gray-50">
        <div className="text-center max-w-4xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-red-600">SmartServe</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your smart service management platform designed to streamline
            operations and enhance customer experiences.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="btn-primary">Get Started</button>
            <button className="bg-white text-red-600 border-2 border-red-600 px-6 py-3 rounded-lg font-medium hover:bg-red-50 transition-all duration-200 shadow-md">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
