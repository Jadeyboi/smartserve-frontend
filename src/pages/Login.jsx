import { Header, LoginForm } from "../components";
import toast from "react-hot-toast";

function Example() {
  const handleClick = () => {
    toast.success("Reservation saved successfully!");
    // or toast.error("Failed to save reservation");
  };

  return <button onClick={handleClick}>Save</button>;
}

function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50">
      <Header />

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-120px)]">
        {/* Left Section - Login Form */}
        <div className="flex-1 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-md">
            {/* Welcome Section */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600">
                Sign in to your SmartServe account
              </p>
            </div>

            {/* Login Form Card */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
