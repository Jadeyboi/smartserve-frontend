const API_BASE_URL = "http://127.0.0.1:5050";

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("access_token");
  console.log(
    "Retrieved token from localStorage:",
    token ? `${token.substring(0, 20)}...` : "No token found"
  );

  if (!token) {
    console.warn("No access token found in localStorage");
    return {
      "Content-Type": "application/json",
    };
  }

  // Check if token is expired (basic check - you might want to decode and check exp)
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  try {
    // Check if token is expired before making the call
    if (!isAuthenticated()) {
      console.warn("Token is expired or invalid, redirecting to login");
      // Clear expired auth data
      clearAuth();
      // Redirect to login (you might want to use a router hook here)
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      throw new Error("Authentication required");
    }

    const headers = getAuthHeaders();
    console.log(`Making API call to: ${API_BASE_URL}${endpoint}`);
    console.log("Headers:", headers);

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers,
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(
        `API call failed with status ${response.status}:`,
        errorData
      );

      // If we get a 401, clear the auth data and redirect
      if (response.status === 401) {
        console.warn("Received 401, clearing auth data");
        clearAuth();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }

      throw new Error(
        errorData.message ||
          errorData.error ||
          `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`API call to ${endpoint} failed:`, error);
    throw error;
  }
};

// Authentication API calls - Updated to match backend
export const authAPI = {
  login: async (email, password) => {
    return apiCall("/users/owners/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (userData) => {
    return apiCall("/users/owners/signup", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  logout: async () => {
    // Backend doesn't have logout endpoint, just clear local storage
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    return { message: "Logged out successfully" };
  },

  refreshToken: async () => {
    // Backend doesn't have refresh endpoint yet
    throw new Error("Token refresh not implemented");
  },
};

// Restaurant API calls - Updated to match backend
export const restaurantAPI = {
  getAll: async () => {
    // Backend has /restaurants/owned for authenticated users
    return apiCall("/restaurants/owned");
  },

  getById: async (id) => {
    const response = await apiCall(`/restaurants/${id}`);
    // Backend returns { restaurant: {...} }
    return response.restaurant || response;
  },

  create: async (restaurantData) => {
    return apiCall("/restaurants/add", {
      method: "POST",
      body: JSON.stringify(restaurantData),
    });
  },

  update: async (id, restaurantData) => {
    // Backend doesn't have update endpoint yet
    throw new Error("Restaurant update not implemented");
  },

  delete: async (id) => {
    // Backend doesn't have delete endpoint yet
    throw new Error("Restaurant delete not implemented");
  },

  // Debug endpoint for development
  debug: async () => {
    return apiCall("/restaurants/debug");
  },
};

// Menu API calls - Updated to match backend
export const menuAPI = {
  getAll: async () => {
    // Backend doesn't have get all menus endpoint
    throw new Error("Get all menus not implemented");
  },

  getByRestaurant: async (restaurantId) => {
    const response = await apiCall(`/menus/${restaurantId}/menu`);
    // Backend returns { success: true, menus: [...] }
    if (response.success) {
      return response.menus;
    }
    throw new Error(response.error || "Failed to fetch menu");
  },

  create: async (menuData) => {
    return apiCall("/menus/add/menu", {
      method: "POST",
      body: JSON.stringify(menuData),
    });
  },

  update: async (id, menuData) => {
    // Backend doesn't have update endpoint yet
    throw new Error("Menu update not implemented");
  },

  delete: async (id) => {
    // Backend doesn't have delete endpoint yet
    throw new Error("Menu delete not implemented");
  },

  getWithDishes: async (menuId) => {
    return apiCall(`/menus/dishes/${menuId}`);
  },
};

// AI Management API calls - Updated to match backend
export const aiAPI = {
  getStatus: async () => {
    // Backend doesn't have general status endpoint
    return {
      cameraStatus: "Online",
      lastUpdate: "5 seconds ago",
      aiConfidence: 96.2,
    };
  },

  getTableStatus: async (restaurantId) => {
    // Backend doesn't have table status endpoint yet
    // Return mock data for now
    return {
      cameraStatus: "Online",
      lastUpdate: "5 seconds ago",
      aiConfidence: 96.2,
      tableStatus: [
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
      ],
    };
  },

  updateTableStatus: async (restaurantId, tableData) => {
    // Backend doesn't have table status update endpoint yet
    throw new Error("Table status update not implemented");
  },

  // Backend AI endpoints
  startDetection: async () => {
    return apiCall("/ai/start", { method: "POST" });
  },

  stopDetection: async () => {
    return apiCall("/ai/stop", { method: "POST" });
  },

  getLatestDetection: async () => {
    return apiCall("/ai/latest");
  },

  updateDetection: async (data) => {
    return apiCall("/ai/update", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

// Staff Management API calls - Updated to match backend
export const staffAPI = {
  getAll: async () => {
    // Backend doesn't have get all users endpoint
    throw new Error("Get all users not implemented");
  },

  getByRestaurant: async (restaurantId) => {
    try {
      // Try to get staff from backend first
      const response = await apiCall(
        `/users/staffs?restaurantID=${restaurantId}`
      );
      if (response && Array.isArray(response)) {
        return response.map((staff) => ({
          id: staff.id,
          name: `${staff.firstname} ${staff.lastname}`.trim(),
          role: staff.position,
          email: staff.email,
          status: "active", // Backend doesn't have status field yet
          lastLogin: staff.lastLogin || "Never",
        }));
      }
      return [];
    } catch (error) {
      console.warn(
        "Failed to fetch staff from backend, using mock data:",
        error
      );
      // Fallback to mock data if backend call fails
      return [
        {
          id: 1,
          name: "Juan Dela Cruz",
          role: "Chef",
          email: "juan@pizzanapoleon.com",
          status: "active",
        },
        {
          id: 2,
          name: "Ana Rodriguez",
          role: "Cashier",
          email: "ana@pizzanapoleon.com",
          status: "active",
        },
      ];
    }
  },

  create: async (staffData) => {
    try {
      const response = await apiCall("/users/staffs/signup", {
        method: "POST",
        body: JSON.stringify(staffData),
      });
      return response;
    } catch (error) {
      console.error("Failed to create staff member:", error);
      throw error;
    }
  },

  update: async (id, staffData) => {
    // Backend doesn't have update user endpoint yet
    throw new Error("Staff update not implemented");
  },

  delete: async (id) => {
    // Backend doesn't have delete user endpoint yet
    throw new Error("Staff delete not implemented");
  },

  changePassword: async (id, passwordData) => {
    // Backend doesn't have change password endpoint yet
    throw new Error("Password change not implemented");
  },
};

// Utility functions
export const isAuthenticated = () => {
  const token = localStorage.getItem("access_token");
  if (!token) return false;

  try {
    // Basic JWT expiration check (decode without verification for expiration only)
    const payload = JSON.parse(atob(token.split(".")[1]));
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      console.warn("Token is expired, clearing auth data");
      clearAuth();
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error checking token expiration:", error);
    clearAuth();
    return false;
  }
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const clearAuth = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
};

export default {
  auth: authAPI,
  restaurants: restaurantAPI,
  menus: menuAPI,
  ai: aiAPI,
  staff: staffAPI,
  utils: {
    isAuthenticated,
    getCurrentUser,
    clearAuth,
  },
};
